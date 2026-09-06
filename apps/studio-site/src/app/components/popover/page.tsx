import React from "react";
import { PopoverData } from "@/content/components/popover";
import PopoverPlayground from "@/components/playgrounds/PopoverPlayground";

export default function PopoverPage() {
  return (
    <main>
      <h1>{PopoverData.title}</h1>
      <p>{PopoverData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <PopoverPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: PopoverData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {PopoverData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}