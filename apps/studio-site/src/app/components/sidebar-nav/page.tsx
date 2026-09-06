import React from "react";
import { SidebarNavData } from "@/content/components/sidebar-nav";
import SidebarNavPlayground from "@/components/playgrounds/SidebarNavPlayground";

export default function SidebarNavPage() {
  return (
    <main>
      <h1>{SidebarNavData.title}</h1>
      <p>{SidebarNavData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <SidebarNavPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: SidebarNavData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {SidebarNavData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}