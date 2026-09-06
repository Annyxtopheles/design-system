export const TextareaData = {
  title: "Multi-line Textarea",
  name: "Textarea",
  slug: "textarea",
  description: "Multi-line text entry field equipped with live character counts, dynamic resize boundaries, and automated error communication.",
  usage: `
## Architectural Overview
The ${"Textarea"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-border-default, --color-border-focus, --color-border-error"}.

### Structural Rationale
When architecting ${"Textarea"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Textarea"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Label and textarea are programmatically associated through htmlFor/id pairs, with live char counter announced via aria-describedby."
  },
  {
    "sc": "1.4.3",
    "level": "AA",
    "name": "Contrast (Minimum)",
    "description": "Ensures body text and placeholder conform to 4.5:1 ratio against background."
  },
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Fully operable via standard multi-line editing keys, Tab navigation, and selection keystrokes."
  },
  {
    "sc": "3.3.1",
    "level": "A",
    "name": "Error Identification",
    "description": "Invalid states trigger aria-invalid=\"true\" and dynamic linkage to the error notification text container."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Textarea with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-border-default", description: "System token applied to Textarea boundary." },
    { name: "--color-border-focus", description: "System token applied to Textarea boundary." },
    { name: "--color-border-error", description: "System token applied to Textarea boundary." },
    { name: "--spacing-scale-4-rem", description: "System token applied to Textarea boundary." },
    { name: "--border-radius-lg", description: "System token applied to Textarea boundary." },
    { name: "--typography-scale-sm-rem", description: "System token applied to Textarea boundary." }
  ]
};
export default TextareaData;
