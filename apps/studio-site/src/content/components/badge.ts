export const BadgeData = {
  title: "Badge & Status Indicator",
  name: "Badge",
  slug: "badge",
  description: "Compact metadata indicator conveying quantitative counts, status tags, and removable token chips.",
  usage: `
## Architectural Overview
The ${"Badge"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-feedback-info, --color-feedback-success, --color-feedback-warning"}.

### Structural Rationale
When architecting ${"Badge"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Badge"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.4.1",
    "level": "A",
    "name": "Use of Color",
    "description": "Status meaning is augmented with text descriptions or icons so color is never the sole communicator."
  },
  {
    "sc": "1.4.3",
    "level": "AA",
    "name": "Contrast",
    "description": "Badge foreground text meets minimum 4.5:1 ratio against the tinted variant background."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Badge with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-feedback-info", description: "System token applied to Badge boundary." },
    { name: "--color-feedback-success", description: "System token applied to Badge boundary." },
    { name: "--color-feedback-warning", description: "System token applied to Badge boundary." },
    { name: "--color-feedback-error", description: "System token applied to Badge boundary." },
    { name: "--border-radius-full", description: "System token applied to Badge boundary." }
  ]
};
export default BadgeData;
