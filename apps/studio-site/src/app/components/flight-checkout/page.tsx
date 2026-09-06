import React from "react";
import { FlightCheckoutData } from "@/content/components/flight-checkout";
import FlightCheckoutPlayground from "@/components/playgrounds/FlightCheckoutPlayground";

export default function FlightCheckoutPage() {
  return (
    <main>
      <h1>{FlightCheckoutData.title}</h1>
      <p>{FlightCheckoutData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <FlightCheckoutPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: FlightCheckoutData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {FlightCheckoutData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}