import React from "react";
import { StepperData } from "@/content/components/stepper";
import StepperPlayground from "@/components/playgrounds/StepperPlayground";

export default function StepperPage() {
  return (
    <main>
      <h1>{StepperData.title}</h1>
      <p>{StepperData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <StepperPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: StepperData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {StepperData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}