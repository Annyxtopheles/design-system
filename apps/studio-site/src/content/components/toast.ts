export const ToastData = {
  title: "Toast Notification",
  name: "Toast",
  slug: "toast",
  description: "Non-disruptive feedback banner presented in viewport notification stacks with automated timeout intervals and manual dismiss actions.",
  usage: `
## Architectural Overview
The ${"Toast"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-surface-toast, --elevation-light-11-boxShadow, --border-radius-xl"}.

### Structural Rationale
When architecting ${"Toast"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Toast"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "4.1.3",
    "level": "AA",
    "name": "Status Messages",
    "description": "Utilizes role=\"status\" and aria-live=\"polite\" so screen readers speak messages without interrupting critical actions."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Toast with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-surface-toast", description: "System token applied to Toast boundary." },
    { name: "--elevation-light-11-boxShadow", description: "System token applied to Toast boundary." },
    { name: "--border-radius-xl", description: "System token applied to Toast boundary." },
    { name: "--motion-duration-moderate", description: "System token applied to Toast boundary." }
  ]
};
export default ToastData;
