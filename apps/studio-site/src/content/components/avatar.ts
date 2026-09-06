export const AvatarData = {
  title: "Avatar & Identity",
  name: "Avatar",
  slug: "avatar",
  description: "Representational identity element supporting broken image fallbacks, generated color initials, and status pips.",
  usage: `
## Architectural Overview
The ${"Avatar"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--border-radius-full, --color-surface-raised, --color-text-inverse"}.

### Structural Rationale
When architecting ${"Avatar"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Avatar"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.1.1",
    "level": "A",
    "name": "Non-text Content",
    "description": "Provides programmatic alt attributes matching the user identity name, avoiding decorative image flags."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Avatar with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--border-radius-full", description: "System token applied to Avatar boundary." },
    { name: "--color-surface-raised", description: "System token applied to Avatar boundary." },
    { name: "--color-text-inverse", description: "System token applied to Avatar boundary." },
    { name: "--elevation-light-1-boxShadow", description: "System token applied to Avatar boundary." }
  ]
};
export default AvatarData;
