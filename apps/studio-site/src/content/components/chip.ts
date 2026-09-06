export const ChipData = {
  title: "Interactive Chip",
  name: "Chip",
  slug: "chip",
  description: "Selectable, filterable tag badge allowing users to trigger faceted queries and delete tokens.",
  usage: `
## Architectural Overview
The ${"Chip"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-interactive-primary, --border-radius-full, --color-background-subtle"}.

### Structural Rationale
When architecting ${"Chip"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Chip"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Receives focus and accepts Enter/Space for toggles, and Delete/Backspace for removal."
  },
  {
    "sc": "4.1.2",
    "level": "A",
    "name": "Name, Role, Value",
    "description": "When selectable, implements aria-pressed=\"true|false\"."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Chip with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-interactive-primary", description: "System token applied to Chip boundary." },
    { name: "--border-radius-full", description: "System token applied to Chip boundary." },
    { name: "--color-background-subtle", description: "System token applied to Chip boundary." },
    { name: "--spacing-scale-2-rem", description: "System token applied to Chip boundary." }
  ]
};
export default ChipData;
