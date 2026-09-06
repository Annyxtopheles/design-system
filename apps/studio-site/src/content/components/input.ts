export const InputData = {
  title: "Text Input",
  name: "Input",
  slug: "input",
  description: "Accessible single-line text input field supporting prefixes, suffixes, validation states, and floating labels.",
  usage: `
## Architectural Overview
The ${"Input"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-border-default, --color-border-focus, --color-border-error"}.

### Structural Rationale
When architecting ${"Input"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Input"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Explicit <label htmlFor> and aria-describedby binding for error and hint text ensure assistive technology identifies control relationships."
  },
  {
    "sc": "1.3.5",
    "level": "AA",
    "name": "Identify Input Purpose",
    "description": "Supports standard autocomplete attributes (e.g., email, username, current-password) to satisfy input purpose criteria."
  },
  {
    "sc": "1.4.3",
    "level": "AA",
    "name": "Contrast (Minimum)",
    "description": "Placeholder, label, and input text maintain minimum 4.5:1 luminance contrast against the field background across all 4 themes."
  },
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Operable fully via keyboard; receives standard Tab order and responds to standard cursor and clipboard keystrokes."
  },
  {
    "sc": "2.4.7",
    "level": "AA",
    "name": "Focus Visible",
    "description": "Focus ring provides a high-contrast 2px outline using var(--color-border-focus) with an outline offset."
  },
  {
    "sc": "3.3.1",
    "level": "A",
    "name": "Error Identification",
    "description": "When validation fails, aria-invalid=\"true\" is applied and the error message element is linked via aria-describedby."
  },
  {
    "sc": "3.3.2",
    "level": "A",
    "name": "Labels or Instructions",
    "description": "Every input instance requires a visible label or an explicit aria-label for non-visual presentation."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Input with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-border-default", description: "System token applied to Input boundary." },
    { name: "--color-border-focus", description: "System token applied to Input boundary." },
    { name: "--color-border-error", description: "System token applied to Input boundary." },
    { name: "--color-background-base", description: "System token applied to Input boundary." },
    { name: "--color-text-primary", description: "System token applied to Input boundary." },
    { name: "--spacing-scale-3-rem", description: "System token applied to Input boundary." },
    { name: "--border-radius-md", description: "System token applied to Input boundary." },
    { name: "--typography-scale-base-rem", description: "System token applied to Input boundary." }
  ]
};
export default InputData;
