import React from "react";
import { TabsData } from "@/content/components/tabs";
import TabsPlayground from "@/components/playgrounds/TabsPlayground";

export default function TabsPage() {
  return (
    <main>
      <h1>{TabsData.title}</h1>
      <p>{TabsData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <TabsPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: TabsData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {TabsData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}