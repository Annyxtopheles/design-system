export const AccordionData = {
  title: "Accordion Drawer",
  name: "Accordion",
  slug: "accordion",
  description: "Collapsible content disclosure panels managing vertical screen real estate with fluid height transitions.",
  usage: `
## Architectural Overview
The ${"Accordion"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-surface-card, --color-border-default, --motion-duration-moderate"}.

### Structural Rationale
When architecting ${"Accordion"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Accordion"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Header button controls panel via aria-expanded and aria-controls; panel body linked via aria-labelledby."
  },
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Receives focus and opens on Enter/Space; navigates between accordion triggers via Arrow keys."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Accordion with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-surface-card", description: "System token applied to Accordion boundary." },
    { name: "--color-border-default", description: "System token applied to Accordion boundary." },
    { name: "--motion-duration-moderate", description: "System token applied to Accordion boundary." },
    { name: "--motion-easing-standard", description: "System token applied to Accordion boundary." }
  ]
};
export default AccordionData;
