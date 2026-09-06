export const CardData = {
  title: "Card Container",
  name: "Card",
  slug: "card",
  description: "Surface container structuring related content sections with customizable elevation shadows, paddings, and header slots.",
  usage: `
## Architectural Overview
The ${"Card"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-surface-card, --color-border-default, --elevation-light-2-boxShadow"}.

### Structural Rationale
When architecting ${"Card"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Card"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "When cards contain headers and interactive targets, heading levels and link context remain distinct."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Card with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-surface-card", description: "System token applied to Card boundary." },
    { name: "--color-border-default", description: "System token applied to Card boundary." },
    { name: "--elevation-light-2-boxShadow", description: "System token applied to Card boundary." },
    { name: "--border-radius-xl", description: "System token applied to Card boundary." },
    { name: "--spacing-scale-6-rem", description: "System token applied to Card boundary." }
  ]
};
export default CardData;
