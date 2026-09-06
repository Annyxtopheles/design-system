import React from "react";
import { DrawerData } from "@/content/components/drawer";
import DrawerPlayground from "@/components/playgrounds/DrawerPlayground";

export default function DrawerPage() {
  return (
    <main>
      <h1>{DrawerData.title}</h1>
      <p>{DrawerData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <DrawerPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: DrawerData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {DrawerData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}