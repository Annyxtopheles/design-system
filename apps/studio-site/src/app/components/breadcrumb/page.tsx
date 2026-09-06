import React from "react";
import { BreadcrumbData } from "@/content/components/breadcrumb";
import BreadcrumbPlayground from "@/components/playgrounds/BreadcrumbPlayground";

export default function BreadcrumbPage() {
  return (
    <main>
      <h1>{BreadcrumbData.title}</h1>
      <p>{BreadcrumbData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <BreadcrumbPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: BreadcrumbData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {BreadcrumbData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}