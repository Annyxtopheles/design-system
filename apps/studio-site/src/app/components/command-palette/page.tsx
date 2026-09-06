import React from "react";
import { CommandPaletteData } from "@/content/components/command-palette";
import CommandPalettePlayground from "@/components/playgrounds/CommandPalettePlayground";

export default function CommandPalettePage() {
  return (
    <main>
      <h1>{CommandPaletteData.title}</h1>
      <p>{CommandPaletteData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <CommandPalettePlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: CommandPaletteData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {CommandPaletteData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}