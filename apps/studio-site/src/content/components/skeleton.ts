export const SkeletonData = {
  title: "Skeleton Loader",
  name: "Skeleton",
  slug: "skeleton",
  description: "Perceived performance placeholder rendering animated shimmer bones matching real component geometry.",
  usage: `
## Architectural Overview
The ${"Skeleton"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-background-muted, --border-radius-md, --motion-duration-slow"}.

### Structural Rationale
When architecting ${"Skeleton"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Skeleton"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Marked with aria-hidden=\"true\" so screen readers skip decorative wireframes and wait for content announcement."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Skeleton with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-background-muted", description: "System token applied to Skeleton boundary." },
    { name: "--border-radius-md", description: "System token applied to Skeleton boundary." },
    { name: "--motion-duration-slow", description: "System token applied to Skeleton boundary." },
    { name: "--motion-easing-linear", description: "System token applied to Skeleton boundary." }
  ]
};
export default SkeletonData;
