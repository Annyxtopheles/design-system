import React from "react";
import { ModalData } from "@/content/components/modal";
import ModalPlayground from "@/components/playgrounds/ModalPlayground";

export default function ModalPage() {
  return (
    <main>
      <h1>{ModalData.title}</h1>
      <p>{ModalData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <ModalPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: ModalData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {ModalData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}