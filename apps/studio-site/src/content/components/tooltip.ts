export const TooltipData = {
  title: "Floating Tooltip",
  name: "Tooltip",
  slug: "tooltip",
  description: "Transient informative floating label revealed upon keyboard focus and cursor hover in strict accordance with WCAG 2.2 SC 1.4.13.",
  usage: `
## Architectural Overview
The ${"Tooltip"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-surface-tooltip, --color-text-inverse, --elevation-light-7-boxShadow"}.

### Structural Rationale
When architecting ${"Tooltip"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Tooltip"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.4.13",
    "level": "AA",
    "name": "Content on Hover or Focus",
    "description": "Ensures dismissible (via Escape), hoverable (pointer can move over tooltip), and persistent (until hover loss or esc)."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Tooltip with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-surface-tooltip", description: "System token applied to Tooltip boundary." },
    { name: "--color-text-inverse", description: "System token applied to Tooltip boundary." },
    { name: "--elevation-light-7-boxShadow", description: "System token applied to Tooltip boundary." },
    { name: "--border-radius-md", description: "System token applied to Tooltip boundary." },
    { name: "--typography-scale-xs-rem", description: "System token applied to Tooltip boundary." }
  ]
};
export default TooltipData;
