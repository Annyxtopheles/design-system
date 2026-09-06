import React from "react";
import { RangeSliderData } from "@/content/components/range-slider";
import RangeSliderPlayground from "@/components/playgrounds/RangeSliderPlayground";

export default function RangeSliderPage() {
  return (
    <main>
      <h1>{RangeSliderData.title}</h1>
      <p>{RangeSliderData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <RangeSliderPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: RangeSliderData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {RangeSliderData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}