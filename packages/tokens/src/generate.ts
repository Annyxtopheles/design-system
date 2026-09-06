#!/usr/bin/env ts-node
/**
 * Design Token Generation Script
 * ================================
 * Reads all raw JSON token files from src/tokens/, resolves alias references
 * of the form {path.to.token}, and emits three output files into dist/:
 *
 *   dist/tokens.json   — flat merged token manifest (all aliases resolved)
 *   dist/tokens.css    — CSS custom properties for all themes
 *   dist/tokens.d.ts   — TypeScript declaration file with full type safety
 *
 * Zero runtime dependencies. Only requires typescript + ts-node.
 *
 * Usage:
 *   npx ts-node src/generate.ts
 */

import * as fs from "fs";
import * as path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type TokenValue = string | number | boolean | null;
type TokenNode = TokenValue | TokenTree;
interface TokenTree {
  [key: string]: TokenNode;
}

interface TokenModule {
  name: string;
  data: TokenTree;
}

interface GeneratedOutput {
  json: TokenTree;
  css: string;
  dts: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Paths
// ─────────────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(__dirname, "tokens");
const DIST_DIR = path.join(ROOT, "dist");

const THEME_NAMES = [
  "light",
  "dark",
  "accessibility-high-contrast",
  "cosmic-neon",
] as const;

type ThemeName = (typeof THEME_NAMES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Load all token JSON files
// ─────────────────────────────────────────────────────────────────────────────

function loadTokenModules(): TokenModule[] {
  const indexPath = path.join(TOKENS_DIR, "index.json");
  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as {
    modules: Record<string, string>;
  };

  return Object.entries(index.modules).map(([name, filePath]) => {
    const fullPath = path.resolve(TOKENS_DIR, filePath);
    const data = JSON.parse(fs.readFileSync(fullPath, "utf-8")) as TokenTree;
    return { name, data };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Merge all modules into a single namespace-prefixed tree
// ─────────────────────────────────────────────────────────────────────────────

function mergeModules(modules: TokenModule[]): TokenTree {
  const merged: TokenTree = {};
  for (const mod of modules) {
    merged[mod.name] = mod.data;
  }
  return merged;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Flatten a nested token tree into dot-path keys
// ─────────────────────────────────────────────────────────────────────────────

function flatten(
  node: TokenNode,
  prefix = "",
  out: Record<string, TokenValue> = {}
): Record<string, TokenValue> {
  if (node === null || typeof node !== "object") {
    out[prefix] = node as TokenValue;
    return out;
  }
  for (const [key, val] of Object.entries(node as TokenTree)) {
    if (key.startsWith("_")) continue; // skip meta/comment keys
    const fullKey = prefix ? `${prefix}.${key}` : key;
    flatten(val, fullKey, out);
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Resolve alias references — {path.to.token}
//
// Token files use relative paths like {palette.white} but after namespace
// merging the full key becomes color.palette.white. We build a suffix index
// so any alias can be matched against its namespace-prefixed full key.
// ─────────────────────────────────────────────────────────────────────────────

const ALIAS_RE = /^\{([^}]+)\}$/;
const INLINE_ALIAS_RE = /\{([^}]+)\}/g;

/** Build a map of every suffix → full dot-path so short aliases resolve */
function buildSuffixIndex(
  flat: Record<string, TokenValue>
): Map<string, string> {
  const index = new Map<string, string>();
  for (const key of Object.keys(flat)) {
    const parts = key.split(".");
    for (let i = 0; i < parts.length; i++) {
      const suffix = parts.slice(i).join(".");
      if (!index.has(suffix)) {
        index.set(suffix, key);
      }
    }
  }
  return index;
}

function lookupAlias(
  ref: string,
  resolved: Record<string, TokenValue>,
  suffixIndex: Map<string, string>
): TokenValue | undefined {
  if (resolved[ref] !== undefined) return resolved[ref];
  const fullKey = suffixIndex.get(ref);
  if (fullKey && resolved[fullKey] !== undefined) return resolved[fullKey];
  return undefined;
}

function resolveAliases(
  flat: Record<string, TokenValue>,
  maxPasses = 15
): Record<string, TokenValue> {
  const resolved = { ...flat };
  let changed = true;
  let pass = 0;

  while (changed && pass < maxPasses) {
    changed = false;
    pass++;

    const suffixIndex = buildSuffixIndex(resolved);

    for (const [key, val] of Object.entries(resolved)) {
      if (typeof val !== "string") continue;

      // Exact alias: "{some.path}"
      const exact = ALIAS_RE.exec(val);
      if (exact) {
        const target = exact[1];
        const found = lookupAlias(target, resolved, suffixIndex);
        if (found !== undefined && found !== val) {
          resolved[key] = found;
          changed = true;
          continue;
        }
      }

      // Inline alias within a string: "0px {some.path} 4px"
      if (INLINE_ALIAS_RE.test(val)) {
        INLINE_ALIAS_RE.lastIndex = 0;
        const newVal = val.replace(INLINE_ALIAS_RE, (_, ref) => {
          const found = lookupAlias(ref, resolved, suffixIndex);
          return found !== undefined ? String(found) : `{${ref}}`;
        });
        if (newVal !== val) {
          resolved[key] = newVal;
          changed = true;
        }
      }
    }
  }

  const unresolved = Object.entries(resolved).filter(
    ([, v]) => typeof v === "string" && /\{[^}]+\}/.test(v)
  );

  if (unresolved.length > 0) {
    console.warn(
      `⚠  ${unresolved.length} unresolved alias(es) after ${pass} passes:`
    );
    unresolved.slice(0, 10).forEach(([k, v]) => console.warn(`   ${k}: ${v}`));
  }

  return resolved;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Rebuild a flat Record back into a nested tree
// ─────────────────────────────────────────────────────────────────────────────

function unflatten(flat: Record<string, TokenValue>): TokenTree {
  const tree: TokenTree = {};
  for (const [dotPath, value] of Object.entries(flat)) {
    const parts = dotPath.split(".");
    let node: TokenTree = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in node) || typeof node[part] !== "object") {
        node[part] = {};
      }
      node = node[part] as TokenTree;
    }
    node[parts[parts.length - 1]] = value;
  }
  return tree;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Convert a dot-path key to a CSS custom property name
//    e.g. "color.semantic.light.background.base" → "--color-semantic-light-background-base"
// ─────────────────────────────────────────────────────────────────────────────

function toCssVarName(dotPath: string): string {
  return "--" + dotPath.replace(/\./g, "-");
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Emit CSS — :root for light theme, [data-theme="X"] for others
// ─────────────────────────────────────────────────────────────────────────────

function buildCss(flat: Record<string, TokenValue>): string {
  const lines: string[] = [];

  lines.push("/**");
  lines.push(" * Design System — CSS Custom Properties");
  lines.push(" * Auto-generated by packages/tokens/src/generate.ts");
  lines.push(" * DO NOT EDIT MANUALLY");
  lines.push(" */");
  lines.push("");
  lines.push("@layer tokens {");
  lines.push("");

  // ── :root → base palette + structural tokens (non-semantic) ──────────────
  lines.push("  /* ── Base Palette & Structural Tokens ── */");
  lines.push("  :root {");
  const baseKeys = Object.entries(flat).filter(
    ([k]) => !k.startsWith("color.semantic.")
  );
  for (const [k, v] of baseKeys) {
    lines.push(`    ${toCssVarName(k)}: ${v};`);
  }
  lines.push("  }");
  lines.push("");

  // ── Theme layers ──────────────────────────────────────────────────────────
  const themeConfigs: Array<{ selector: string; prefix: string; label: string }> =
    [
      {
        selector: ':root, [data-theme="light"]',
        prefix: "color.semantic.light.",
        label: "Light Theme (default)",
      },
      {
        selector: '[data-theme="dark"]',
        prefix: "color.semantic.dark.",
        label: "Dark Theme",
      },
      {
        selector: '[data-theme="accessibility-high-contrast"]',
        prefix: "color.semantic.accessibility-high-contrast.",
        label: "Accessibility High-Contrast Theme",
      },
      {
        selector: '[data-theme="cosmic-neon"]',
        prefix: "color.semantic.cosmic-neon.",
        label: "Cosmic Neon Theme",
      },
    ];

  for (const { selector, prefix, label } of themeConfigs) {
    const themeEntries = Object.entries(flat).filter(([k]) =>
      k.startsWith(prefix)
    );
    if (themeEntries.length === 0) continue;

    lines.push(`  /* ── ${label} ── */`);
    lines.push(`  ${selector} {`);

    for (const [k, v] of themeEntries) {
      // Strip the theme-specific prefix → expose as theme-agnostic var
      const shortKey = k.replace(prefix, "color.");
      lines.push(`    ${toCssVarName(shortKey)}: ${v};`);
    }

    lines.push("  }");
    lines.push("");
  }

  // ── Reduced-motion override ───────────────────────────────────────────────
  lines.push("  /* ── Reduced Motion Accessibility Override ── */");
  lines.push("  @media (prefers-reduced-motion: reduce) {");
  lines.push("    :root {");
  lines.push("      --motion-duration-faster: 0ms;");
  lines.push("      --motion-duration-fast: 0ms;");
  lines.push("      --motion-duration-normal: 0ms;");
  lines.push("      --motion-duration-moderate: 0ms;");
  lines.push("      --motion-duration-slow: 0ms;");
  lines.push("      --motion-duration-slower: 0ms;");
  lines.push("      --motion-duration-slowest: 0ms;");
  lines.push("      --motion-duration-glacial: 0ms;");
  lines.push("    }");
  lines.push("  }");
  lines.push("");

  lines.push("}"); // end @layer tokens
  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Emit TypeScript declaration file
// ─────────────────────────────────────────────────────────────────────────────

function buildDts(tree: TokenTree, flat: Record<string, TokenValue>): string {
  const lines: string[] = [];

  lines.push("/**");
  lines.push(" * Design System — TypeScript Token Declarations");
  lines.push(" * Auto-generated by packages/tokens/src/generate.ts");
  lines.push(" * DO NOT EDIT MANUALLY");
  lines.push(" */");
  lines.push("");

  // ── DeepReadonly helper ───────────────────────────────────────────────────
  lines.push("type DeepReadonly<T> = {");
  lines.push("  readonly [P in keyof T]: T[P] extends object");
  lines.push("    ? DeepReadonly<T[P]>");
  lines.push("    : T[P];");
  lines.push("};");
  lines.push("");

  // ── Build recursive interface from the tree ───────────────────────────────
  function buildInterface(node: TokenTree, indent = 0): string[] {
    const pad = "  ".repeat(indent);
    const result: string[] = [];
    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith("_")) continue;
      const safeProp = /^[a-zA-Z_$][a-zA-Z0-9_$-]*$/.test(key)
        ? key
        : `"${key}"`;
      if (val !== null && typeof val === "object") {
        result.push(`${pad}${safeProp}: {`);
        result.push(...buildInterface(val as TokenTree, indent + 1));
        result.push(`${pad}};`);
      } else {
        const tsType =
          typeof val === "number"
            ? "number"
            : typeof val === "boolean"
            ? "boolean"
            : val === null
            ? "null"
            : "string";
        result.push(`${pad}${safeProp}: ${tsType};`);
      }
    }
    return result;
  }

  lines.push("export interface TokenSchema {");
  lines.push(...buildInterface(tree, 1));
  lines.push("}");
  lines.push("");

  // ── Flat token path union type ────────────────────────────────────────────
  const allPaths = Object.keys(flat).filter((k) => !k.startsWith("_"));
  lines.push("/** Union of all resolved token dot-paths */");
  lines.push(
    "export type TokenPath ="
  );
  allPaths.forEach((p, i) => {
    lines.push(`  | "${p}"${i < allPaths.length - 1 ? "" : ";"}`);
  });
  lines.push("");

  // ── CSS variable name union ───────────────────────────────────────────────
  lines.push("/** Union of all CSS custom property names emitted in tokens.css */");
  const cssVarNames = allPaths.map(toCssVarName);
  lines.push("export type CssTokenVar =");
  cssVarNames.forEach((n, i) => {
    lines.push(`  | "${n}"${i < cssVarNames.length - 1 ? "" : ";"}`);
  });
  lines.push("");

  // ── getToken helper ───────────────────────────────────────────────────────
  lines.push("/** Retrieve a resolved token value by its dot-path */");
  lines.push(
    "export declare function getToken(path: TokenPath): string | number | boolean | null;"
  );
  lines.push("");

  // ── cssVar helper ─────────────────────────────────────────────────────────
  lines.push("/** Get the CSS var() reference string for a token path */");
  lines.push(
    "export declare function cssVar(path: TokenPath): string;"
  );
  lines.push("");

  // ── tokens object export ─────────────────────────────────────────────────
  lines.push("/** Fully resolved, deeply readonly token object */");
  lines.push(
    "export declare const tokens: DeepReadonly<TokenSchema>;"
  );
  lines.push("");

  // ── theme type ───────────────────────────────────────────────────────────
  lines.push("export type ThemeName =");
  THEME_NAMES.forEach((t, i) => {
    lines.push(`  | "${t}"${i < THEME_NAMES.length - 1 ? "" : ";"}`);
  });
  lines.push("");

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Build the runnable tokens.js (CJS) alongside the .d.ts
// ─────────────────────────────────────────────────────────────────────────────

function buildJs(
  resolvedFlat: Record<string, TokenValue>,
  resolvedTree: TokenTree
): string {
  const lines: string[] = [];
  lines.push('"use strict";');
  lines.push("/**");
  lines.push(" * Design System — Runtime Token Module");
  lines.push(" * Auto-generated by packages/tokens/src/generate.ts");
  lines.push(" * DO NOT EDIT MANUALLY");
  lines.push(" */");
  lines.push("");
  lines.push(
    `const _flat = ${JSON.stringify(resolvedFlat, null, 2)};`
  );
  lines.push("");
  lines.push(
    `const tokens = ${JSON.stringify(resolvedTree, null, 2)};`
  );
  lines.push("");
  lines.push("function getToken(path) {");
  lines.push("  return _flat[path] ?? null;");
  lines.push("}");
  lines.push("");
  lines.push("function cssVar(path) {");
  lines.push(
    "  return `var(--${path.replace(/\\./g, '-')})`;",
  );
  lines.push("}");
  lines.push("");
  lines.push("module.exports = { tokens, getToken, cssVar };");
  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Orchestrate
// ─────────────────────────────────────────────────────────────────────────────

function generate(): GeneratedOutput {
  console.log("🔷  Design Token Generator");
  console.log("   Loading token modules…");

  const modules = loadTokenModules();
  console.log(`   ✓ Loaded ${modules.length} modules: ${modules.map((m) => m.name).join(", ")}`);

  const merged = mergeModules(modules);

  console.log("   Flattening tokens…");
  const flat = flatten(merged);
  console.log(`   ✓ ${Object.keys(flat).length} raw token entries`);

  console.log("   Resolving alias references…");
  const resolved = resolveAliases(flat);
  const stillUnresolved = Object.values(resolved).filter(
    (v) => typeof v === "string" && /\{[^}]+\}/.test(v as string)
  ).length;
  console.log(
    stillUnresolved === 0
      ? `   ✓ All aliases resolved`
      : `   ⚠  ${stillUnresolved} aliases remain unresolved`
  );

  const resolvedTree = unflatten(resolved);

  console.log("   Building CSS custom properties…");
  const css = buildCss(resolved);

  console.log("   Building TypeScript declarations…");
  const dts = buildDts(resolvedTree, resolved);

  console.log("   Building JS runtime module…");
  const js = buildJs(resolved, resolvedTree);

  // ── Write dist/ ────────────────────────────────────────────────────────────
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const jsonPath = path.join(DIST_DIR, "tokens.json");
  const cssPath = path.join(DIST_DIR, "tokens.css");
  const dtsPath = path.join(DIST_DIR, "tokens.d.ts");
  const jsPath = path.join(DIST_DIR, "tokens.js");
  const flatPath = path.join(DIST_DIR, "tokens.flat.json");

  fs.writeFileSync(jsonPath, JSON.stringify(resolvedTree, null, 2), "utf-8");
  fs.writeFileSync(cssPath, css, "utf-8");
  fs.writeFileSync(dtsPath, dts, "utf-8");
  fs.writeFileSync(jsPath, js, "utf-8");
  fs.writeFileSync(flatPath, JSON.stringify(resolved, null, 2), "utf-8");

  const stats = {
    json: fs.statSync(jsonPath).size,
    css: fs.statSync(cssPath).size,
    dts: fs.statSync(dtsPath).size,
    js: fs.statSync(jsPath).size,
    flat: fs.statSync(flatPath).size,
  };

  console.log("");
  console.log("✅  dist/ output:");
  console.log(`   tokens.json       ${(stats.json / 1024).toFixed(1)} KB  — resolved token tree`);
  console.log(`   tokens.flat.json  ${(stats.flat / 1024).toFixed(1)} KB  — flat dot-path map`);
  console.log(`   tokens.css        ${(stats.css / 1024).toFixed(1)} KB  — CSS custom properties (all themes)`);
  console.log(`   tokens.d.ts       ${(stats.dts / 1024).toFixed(1)} KB  — TypeScript declarations`);
  console.log(`   tokens.js         ${(stats.js / 1024).toFixed(1)} KB  — CJS runtime module`);
  console.log("");
  console.log(`   Total token count: ${Object.keys(resolved).length}`);
  console.log("");

  // ── Summary stats ──────────────────────────────────────────────────────────
  const colorCount = Object.keys(resolved).filter((k) =>
    k.startsWith("color")
  ).length;
  const typoCount = Object.keys(resolved).filter((k) =>
    k.startsWith("typography")
  ).length;
  const spacingCount = Object.keys(resolved).filter((k) =>
    k.startsWith("spacing")
  ).length;
  const elevationCount = Object.keys(resolved).filter((k) =>
    k.startsWith("elevation")
  ).length;
  const motionCount = Object.keys(resolved).filter((k) =>
    k.startsWith("motion")
  ).length;
  const borderCount = Object.keys(resolved).filter((k) =>
    k.startsWith("border")
  ).length;

  console.log("   Token breakdown:");
  console.log(`     color:      ${colorCount}`);
  console.log(`     typography: ${typoCount}`);
  console.log(`     spacing:    ${spacingCount}`);
  console.log(`     elevation:  ${elevationCount}`);
  console.log(`     motion:     ${motionCount}`);
  console.log(`     border:     ${borderCount}`);
  console.log("");

  return { json: resolvedTree, css, dts };
}

// ─────────────────────────────────────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────────────────────────────────────

generate();
