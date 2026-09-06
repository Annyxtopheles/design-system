import React from "react";
import { NotificationCenterData } from "@/content/components/notification-center";
import NotificationCenterPlayground from "@/components/playgrounds/NotificationCenterPlayground";

export default function NotificationCenterPage() {
  return (
    <main>
      <h1>{NotificationCenterData.title}</h1>
      <p>{NotificationCenterData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <NotificationCenterPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: NotificationCenterData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {NotificationCenterData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}