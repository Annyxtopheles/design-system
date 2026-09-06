/**
 * Token validation script — verifies all aliases are resolved in dist/tokens.flat.json
 * and checks structural integrity of the dist/ files.
 */

const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "..", "dist");

let errors = 0;
let warnings = 0;

function check(label, condition, message) {
  if (!condition) {
    console.error(`  ✗ ${label}: ${message}`);
    errors++;
  } else {
    console.log(`  ✓ ${label}`);
  }
}

console.log("\n🔍  Token Package Validation\n");

// ── 1. Check dist/ files exist ───────────────────────────────────────────────
console.log("── File existence ──");
const requiredFiles = ["tokens.json", "tokens.flat.json", "tokens.css", "tokens.d.ts", "tokens.js"];
for (const file of requiredFiles) {
  const filePath = path.join(DIST, file);
  check(file, fs.existsSync(filePath), "File not found");
}

// ── 2. Load flat token map ────────────────────────────────────────────────────
console.log("\n── Alias resolution ──");
const flat = JSON.parse(fs.readFileSync(path.join(DIST, "tokens.flat.json"), "utf-8"));
const entries = Object.entries(flat);

const unresolved = entries.filter(([k, v]) => {
  if (typeof v !== "string") return false;
  // Match {word.word} patterns — must start with a letter
  return /\{[a-zA-Z][^}]*\}/.test(v);
});

check(
  `All aliases resolved (${entries.length} total tokens)`,
  unresolved.length === 0,
  `${unresolved.length} unresolved aliases: ${unresolved.slice(0, 3).map(([k]) => k).join(", ")}`
);

// ── 3. Count tokens per namespace ─────────────────────────────────────────────
console.log("\n── Token namespace coverage ──");
const namespaces = ["color", "typography", "spacing", "elevation", "motion", "border"];
for (const ns of namespaces) {
  const count = entries.filter(([k]) => k.startsWith(ns)).length;
  check(`${ns} (${count} tokens)`, count > 0, "No tokens found for namespace");
}

// ── 4. Verify typography has 24 scale steps ───────────────────────────────────
console.log("\n── Typography scale ──");
const typoScaleKeys = entries
  .filter(([k]) => k.startsWith("typography.scale.") && k.endsWith(".step"))
  .map(([k, v]) => v);

check(
  `24 typography scale steps defined (found ${typoScaleKeys.length})`,
  typoScaleKeys.length === 24,
  `Expected 24, got ${typoScaleKeys.length}`
);

// ── 5. Verify elevation has 12 levels per theme ───────────────────────────────
console.log("\n── Elevation levels ──");
for (const theme of ["light", "dark", "cosmic-neon"]) {
  const levels = entries.filter(([k]) =>
    k.startsWith(`elevation.${theme}.`) && k.endsWith(".boxShadow")
  );
  check(
    `${theme}: 12 elevation levels (found ${levels.length})`,
    levels.length === 12,
    `Expected 12, got ${levels.length}`
  );
}

// ── 6. Verify 4 color themes have semantic tokens ────────────────────────────
console.log("\n── Color themes ──");
const themes = ["light", "dark", "accessibility-high-contrast", "cosmic-neon"];
for (const theme of themes) {
  const themeTokens = entries.filter(([k]) =>
    k.startsWith(`color.semantic.${theme}.`)
  );
  check(
    `${theme}: ${themeTokens.length} semantic color tokens`,
    themeTokens.length >= 40,
    `Expected ≥40 tokens, got ${themeTokens.length}`
  );
}

// ── 7. Verify CSS contains theme selectors ────────────────────────────────────
console.log("\n── CSS theme selectors ──");
const css = fs.readFileSync(path.join(DIST, "tokens.css"), "utf-8");
for (const theme of themes) {
  const selector = theme === "light"
    ? '[data-theme="light"]'
    : `[data-theme="${theme}"]`;
  check(`CSS contains ${selector}`, css.includes(selector), "Selector missing from CSS");
}
check("CSS contains @layer tokens", css.includes("@layer tokens"), "Missing @layer tokens");
check("CSS contains @media prefers-reduced-motion", css.includes("prefers-reduced-motion"), "Missing reduced-motion media query");

// ── 8. Verify spacing scale has 24 entries ────────────────────────────────────
console.log("\n── Spacing scale ──");
const spacingScaleKeys = entries
  .filter(([k]) => k.startsWith("spacing.scale.") && k.endsWith(".px"))
  .length;
check(
  `24 spacing scale entries (found ${spacingScaleKeys})`,
  spacingScaleKeys === 24,
  `Expected 24, got ${spacingScaleKeys}`
);

// ── Summary ────────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
if (errors === 0) {
  console.log(`\n✅  All checks passed! ${entries.length} tokens, 0 errors.\n`);
} else {
  console.error(`\n❌  ${errors} error(s) found.\n`);
  process.exit(1);
}
