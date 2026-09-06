import React from "react";
import { PaginationData } from "@/content/components/pagination";
import PaginationPlayground from "@/components/playgrounds/PaginationPlayground";

export default function PaginationPage() {
  return (
    <main>
      <h1>{PaginationData.title}</h1>
      <p>{PaginationData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <PaginationPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: PaginationData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {PaginationData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}