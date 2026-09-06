import React from "react";
import { DatePickerData } from "@/content/components/date-picker";
import DatePickerPlayground from "@/components/playgrounds/DatePickerPlayground";

export default function DatePickerPage() {
  return (
    <main>
      <h1>{DatePickerData.title}</h1>
      <p>{DatePickerData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <DatePickerPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: DatePickerData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {DatePickerData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}