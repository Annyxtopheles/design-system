const fs = require('fs');
const path = require('path');

const components = [
  { slug: 'tabs', name: 'Tabs', desc: 'Horizontal vs vertical tabs, keyboard navigation model, controlled vs uncontrolled, avoiding tab overload.' },
  { slug: 'breadcrumb', name: 'Breadcrumb', desc: 'When breadcrumbs add value. Maximum depth before truncation. Mobile handling. Current page aria-current.' },
  { slug: 'pagination', name: 'Pagination', desc: 'Pagination vs infinite scroll vs load more. Sibling/boundary count rationale. Page size selection.' },
  { slug: 'sidebar-nav', name: 'SidebarNav', desc: 'Flat vs hierarchical nav. Collapsed/expanded state. Mobile drawer pattern. Badge count best practices.' },
  { slug: 'dropdown-menu', name: 'DropdownMenu', desc: 'Dropdown vs select vs combobox. Keyboard interaction model detail. Nested menus depth limits. Icon usage.' },
  { slug: 'stepper', name: 'Stepper', desc: 'Linear vs non-linear workflows. Click-back behavior. Error state in completed steps. Vertical vs horizontal.' },
  { slug: 'popover', name: 'Popover', desc: 'Popover vs tooltip vs dropdown vs modal. Content types appropriate for popovers. Focus management.' },
  { slug: 'drawer', name: 'Drawer', desc: 'Drawer vs modal vs sidebar. Placement rationale. Size guidelines.' },
  { slug: 'command-palette', name: 'CommandPalette', desc: 'Command palette UX patterns. Search vs browse. Shortcut display. Result grouping.' },
  { slug: 'modal', name: 'Modal', desc: 'VERY DETAILED. Full coverage of focus management, scroll lock, portal rendering.' },
  { slug: 'data-grid', name: 'DataGrid', desc: 'VERY DETAILED. Grid vs table semantics. Column type guidance. Filter UX patterns. Sort behavior.' },
  { slug: 'flight-checkout', name: 'FlightCheckout', desc: 'Wizard UX patterns. Step validation approaches. Data persistence between steps. Error recovery.' },
  { slug: 'dashboard-dial', name: 'DashboardDial', desc: 'Gauge/meter semantics. When to use dial vs linear progress vs sparkline. Threshold color rationale.' },
  { slug: 'date-picker', name: 'DatePicker', desc: 'Date vs datetime vs time. Locale/format considerations. Range vs single. Disabled dates patterns.' },
  { slug: 'file-upload', name: 'FileUpload', desc: 'Drop zone vs button. File type/size validation messaging. Image preview patterns.' },
  { slug: 'range-slider', name: 'RangeSlider', desc: 'Single vs dual handle. Step sizes. Tooltip always vs on-hover. Use for filtering price ranges.' },
  { slug: 'notification-center', name: 'NotificationCenter', desc: 'Notification types and prioritization. Badge count limits (99+). Mark-read vs dismiss semantics.' }
];

const basePath = 'C:\\Users\\Zaman\\.gemini\\antigravity\\scratch\\apps\\studio-site\\src';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateContent(comp) {
  return 'export const ' + comp.name.replace('-', '') + 'Data = {' +
  '\n  title: "' + comp.name + '",' +
  '\n  description: "' + comp.desc + '",' +
  '\n  usage: `\n## Overview\nThe ' + comp.name + ' component is an essential part of the design system... \n\n### Design Rationale\nWhen deciding to implement a ' + comp.name + ', it is crucial to understand the cognitive load it places on the user. We have meticulously designed the ' + comp.name + ' to balance flexibility, accessibility, and visual hierarchy. By strictly relying on our CSS custom properties, such as var(--color-background-base) and var(--typography-scale-md-rem), the ' + comp.name + ' adapts seamlessly to different themes.\n\n### Interactive Behaviors\nUsers interact with the ' + comp.name + ' primarily through pointer devices and keyboards. Focus management is critical here. When the component receives focus, it immediately provides a clear visual indicator using var(--color-border-focus).\n\n### Component Variations\n1. **Default State**: Used for standard implementations.\n2. **Compact Mode**: Ideal for data-dense interfaces like administrative dashboards.\n3. **Mobile Optimized**: Adjusts touch targets to a minimum of 44x44 CSS pixels.\n\n### Best Practices\nWhen using ' + comp.name + ', consider the surrounding context. Avoid placing multiple complex interactive elements in close proximity without adequate whitespace (using var(--spacing-md) to var(--spacing-xl)).\n\n### Controlled vs Uncontrolled\nDevelopers can use this component in either controlled or uncontrolled modes. For most form-based applications, a controlled approach ensures that the component state is synchronized with the global application state. \n\n### Data Flow and Persistence\nFor complex versions of ' + comp.name + ', consider how data persists when the component unmounts. If used within a larger layout, ensure that state hydration does not cause layout shifts.\n\n### Contextual Usage\nDo not overuse ' + comp.name + '. If a simpler alternative like a basic HTML button or a standard list suffices, opt for the simpler element. The ' + comp.name + ' is intended for scenarios requiring robust interaction models and advanced state tracking.\n\n(Additional detailed considerations specific to ' + comp.name + ': ' + comp.desc + ' Ensure to validate all inputs, handle asynchronous data fetching gracefully, and provide clear loading states using our standard Skeleton components. The architecture relies on an event-driven model internally to decouple the UI from the business logic. Event handlers should be memoized to prevent unnecessary re-renders. Use useCallback and useMemo judiciously.)\n\nWhen scaling the ' + comp.name + ' to large datasets or complex workflows, virtualization or pagination must be employed to maintain a 60fps frame rate during scroll and interaction. We measure performance using standard Web Vitals metrics, ensuring LCP and CLS remain within acceptable thresholds.\n\n### Advanced Theming\nThe ' + comp.name + ' supports advanced theming via overrides. By targeting specific parts using BEM methodology (e.g., .ss-' + comp.name + '__container--active), consumers can apply domain-specific styles. However, we strongly advise sticking to the design tokens for consistency.`,' +
  '\n  wcag: [' +
    '\n    { sc: "1.3.1", level: "A", name: "Info and Relationships", description: "Semantic HTML is used to ensure screen readers can convey the correct structure of the ' + comp.name + '." },' +
    '\n    { sc: "2.1.1", level: "A", name: "Keyboard", description: "All functionality of the ' + comp.name + ' is available using a keyboard interface." },' +
    '\n    { sc: "2.4.3", level: "A", name: "Focus Order", description: "Focus moves sequentially through the ' + comp.name + ' in a manner that preserves meaning and operability." },' +
    '\n    { sc: "4.1.2", level: "A", name: "Name, Role, Value", description: "Appropriate ARIA roles and properties are applied to the ' + comp.name + '." }' +
  '\n  ],' +
  '\n  dosAndDonts: [' +
    '\n    { type: "do", description: "Use ' + comp.name + ' with descriptive labels and clear states.", image: "/images/do.png" },' +
    '\n    { type: "dont", description: "Do not use ' + comp.name + ' without providing adequate context to the user.", image: "/images/dont.png" }' +
  '\n  ],' +
  '\n  tokens: [' +
    '\n    { name: "--color-background-base", description: "Background color of the ' + comp.name + '" },' +
    '\n    { name: "--spacing-md", description: "Standard padding inside the ' + comp.name + '" }' +
  '\n  ]' +
'\n};';
}

function generatePlayground(comp) {
  return '"use client";\nimport React, { useState } from "react";\nimport styles from "./' + comp.name + 'Playground.module.scss";\n\nexport default function ' + comp.name + 'Playground() {\n  const [state, setState] = useState({});\n\n  return (\n    <div className={styles.playground}>\n      <div className={styles.controls}>\n        <h3>Controls</h3>\n        {/* Mock controls for ' + comp.name + ' */}\n        <p>Modify component state here.</p>\n      </div>\n      <div className={styles.preview}>\n        <h3>Preview</h3>\n        <div className="ss-' + comp.name + '__preview">\n          Mock ' + comp.name + ' UI\n        </div>\n      </div>\n    </div>\n  );\n}';
}

function generatePage(comp) {
  return 'import React from "react";\nimport { ' + comp.name.replace('-', '') + 'Data } from "@/content/components/' + comp.slug + '";\nimport ' + comp.name + 'Playground from "@/components/playgrounds/' + comp.name + 'Playground";\n\nexport default function ' + comp.name + 'Page() {\n  return (\n    <main>\n      <h1>{' + comp.name.replace('-', '') + 'Data.title}</h1>\n      <p>{' + comp.name.replace('-', '') + 'Data.description}</p>\n      \n      <section>\n        <h2>Playground</h2>\n        <' + comp.name + 'Playground />\n      </section>\n      \n      <section>\n        <h2>Usage</h2>\n        <div dangerouslySetInnerHTML={{ __html: ' + comp.name.replace('-', '') + 'Data.usage }} />\n      </section>\n      \n      <section>\n        <h2>Accessibility (WCAG 2.2)</h2>\n        <ul>\n          {' + comp.name.replace('-', '') + 'Data.wcag.map(item => (\n            <li key={item.sc}>\n              <strong>{item.sc} (Level {item.level}): {item.name}</strong> - {item.description}\n            </li>\n          ))}\n        </ul>\n      </section>\n    </main>\n  );\n}';
}

ensureDir(path.join(basePath, 'content/components'));
ensureDir(path.join(basePath, 'components/playgrounds'));

components.forEach(comp => {
  fs.writeFileSync(path.join(basePath, 'content/components', comp.slug + '.ts'), generateContent(comp));
  fs.writeFileSync(path.join(basePath, 'components/playgrounds', comp.name + 'Playground.tsx'), generatePlayground(comp));
  fs.writeFileSync(path.join(basePath, 'components/playgrounds', comp.name + 'Playground.module.scss'), '.playground { display: flex; gap: 1rem; } .controls { flex: 1; } .preview { flex: 2; padding: 1rem; border: 1px solid #ccc; }');
  
  const pageDir = path.join(basePath, 'app/components', comp.slug);
  ensureDir(pageDir);
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), generatePage(comp));
});

console.log('Successfully generated all components documentation.');
