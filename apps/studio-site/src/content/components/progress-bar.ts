export const ProgressBarData = {
  title: "Progress Bar & Meter",
  name: "ProgressBar",
  slug: "progress-bar",
  description: "Determinate and indeterminate progress indicator rendered in linear and circular SVG geometries.",
  usage: `
## Architectural Overview
The ${"ProgressBar"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-interactive-primary, --color-background-subtle, --border-radius-full"}.

### Structural Rationale
When architecting ${"ProgressBar"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"ProgressBar"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "4.1.2",
    "level": "A",
    "name": "Name, Role, Value",
    "description": "Carries role=\"progressbar\" with aria-valuenow, aria-valuemin=\"0\", and aria-valuemax=\"100\"."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use ProgressBar with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-interactive-primary", description: "System token applied to ProgressBar boundary." },
    { name: "--color-background-subtle", description: "System token applied to ProgressBar boundary." },
    { name: "--border-radius-full", description: "System token applied to ProgressBar boundary." },
    { name: "--motion-duration-slow", description: "System token applied to ProgressBar boundary." }
  ]
};
export default ProgressBarData;
