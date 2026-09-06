import React from "react";
import { DropdownMenuData } from "@/content/components/dropdown-menu";
import DropdownMenuPlayground from "@/components/playgrounds/DropdownMenuPlayground";

export default function DropdownMenuPage() {
  return (
    <main>
      <h1>{DropdownMenuData.title}</h1>
      <p>{DropdownMenuData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <DropdownMenuPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: DropdownMenuData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {DropdownMenuData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}