export const CheckboxData = {
  title: "Checkbox Control",
  name: "Checkbox",
  slug: "checkbox",
  description: "Accessible binary and indeterminate selection control featuring custom checkmarks and synchronized label hitboxes.",
  usage: `
## Architectural Overview
The ${"Checkbox"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-interactive-primary, --color-background-base, --border-radius-sm"}.

### Structural Rationale
When architecting ${"Checkbox"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Checkbox"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Role checkbox coupled with aria-checked (\"true\", \"false\", or \"mixed\" for indeterminate) accurately mirrors state."
  },
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Toggles via Spacebar keypress when focused via Tab sequence."
  },
  {
    "sc": "2.4.7",
    "level": "AA",
    "name": "Focus Visible",
    "description": "Focus outline ring wraps the custom visual indicator without clipping."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Checkbox with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-interactive-primary", description: "System token applied to Checkbox boundary." },
    { name: "--color-background-base", description: "System token applied to Checkbox boundary." },
    { name: "--border-radius-sm", description: "System token applied to Checkbox boundary." },
    { name: "--motion-duration-fast", description: "System token applied to Checkbox boundary." },
    { name: "--motion-easing-standard", description: "System token applied to Checkbox boundary." }
  ]
};
export default CheckboxData;
