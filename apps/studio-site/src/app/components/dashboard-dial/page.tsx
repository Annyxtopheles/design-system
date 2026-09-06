import React from "react";
import { DashboardDialData } from "@/content/components/dashboard-dial";
import DashboardDialPlayground from "@/components/playgrounds/DashboardDialPlayground";

export default function DashboardDialPage() {
  return (
    <main>
      <h1>{DashboardDialData.title}</h1>
      <p>{DashboardDialData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <DashboardDialPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: DashboardDialData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {DashboardDialData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}