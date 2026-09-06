export const SpinnerData = {
  title: "Loading Spinner",
  name: "Spinner",
  slug: "spinner",
  description: "Continuous SVG dash-array circular progress spinner engineered to communicate indeterminate loading states.",
  usage: `
## Architectural Overview
The ${"Spinner"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-interactive-primary, --motion-duration-moderate, --motion-easing-linear"}.

### Structural Rationale
When architecting ${"Spinner"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Spinner"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "4.1.3",
    "level": "AA",
    "name": "Status Messages",
    "description": "Renders an accessible screen-reader announcement label via aria-live=\"polite\" and role=\"status\"."
  },
  {
    "sc": "2.2.2",
    "level": "A",
    "name": "Pause, Stop, Hide",
    "description": "Adheres to system reduced-motion preferences, pausing continuous spin animations if requested."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Spinner with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-interactive-primary", description: "System token applied to Spinner boundary." },
    { name: "--motion-duration-moderate", description: "System token applied to Spinner boundary." },
    { name: "--motion-easing-linear", description: "System token applied to Spinner boundary." }
  ]
};
export default SpinnerData;
