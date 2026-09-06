import React from "react";
import { FileUploadData } from "@/content/components/file-upload";
import FileUploadPlayground from "@/components/playgrounds/FileUploadPlayground";

export default function FileUploadPage() {
  return (
    <main>
      <h1>{FileUploadData.title}</h1>
      <p>{FileUploadData.description}</p>
      
      <section>
        <h2>Playground</h2>
        <FileUploadPlayground />
      </section>
      
      <section>
        <h2>Usage</h2>
        <div dangerouslySetInnerHTML={{ __html: FileUploadData.usage }} />
      </section>
      
      <section>
        <h2>Accessibility (WCAG 2.2)</h2>
        <ul>
          {FileUploadData.wcag.map(item => (
            <li key={item.sc}>
              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}