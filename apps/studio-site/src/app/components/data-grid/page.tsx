import React from "react";
import { DataGridData } from "@/content/components/data-grid";
import DataGridPlayground from "@/components/playgrounds/DataGridPlayground";

export default function DataGridPage() {
  return (
    <main>
      <h1>{DataGridData.title}</h1>
      <p>{DataGridData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <DataGridPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: DataGridData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {DataGridData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}