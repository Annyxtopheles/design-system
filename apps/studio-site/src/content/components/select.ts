export const SelectData = {
  title: "Select Dropdown",
  name: "Select",
  slug: "select",
  description: "Standardized selection menu delivering seamless accessible options pickers, custom chevron indicators, and validation styling.",
  usage: `
## Architectural Overview
The ${"Select"} component is an elemental building block within the design system. Designed specifically to adhere to our token architecture, it inherits dynamic custom properties including ${"--color-border-default, --color-background-base, --color-interactive-primary"}.

### Structural Rationale
When architecting ${"Select"}, we prioritized:
1. **Predictability:** Consistent DOM hierarchy and strict styling encapsulation through BEM naming.
2. **Deterministic State Transitions:** Clear visual states for default, hover, focus-visible, active, disabled, and error conditions.
3. **Accessibility by Construction:** Built from first principles to ensure that ARIA roles, states, and attributes are natively mapped without requiring consuming engineers to write custom accessibility boilerplate.

### Interactive Lifecycle & States
- **Default State:** Renders in a neutral visual posture, ready to accept pointer and keyboard events.
- **Hover State:** Initiates subtle luminance shifts across a ${'var(--motion-duration-moderate)'} curve to signal affordance.
- **Focus Visible:** Implements our 2px high-contrast outline with an outline offset to satisfy WCAG 2.4.7.
- **Disabled State:** Automatically suppresses pointer events, strips interactivity from the Tab order, and drops opacity to signal inactivity.

### Composition & Integration
When pairing ${"Select"} with adjacent forms or data tables, maintain spacing rhythm using our 4px mathematical scale. We recommend grouping related items with ${'var(--spacing-scale-4-rem)'} for standard form flows.
`,
  wcag: [
  {
    "sc": "1.3.1",
    "level": "A",
    "name": "Info and Relationships",
    "description": "Native select structure exposes native OS accessible hierarchy and options lists to assistive software."
  },
  {
    "sc": "2.1.1",
    "level": "A",
    "name": "Keyboard",
    "description": "Fully navigable via arrow keys, Alt+Down arrow, Home/End, and character search jump keys."
  },
  {
    "sc": "4.1.2",
    "level": "A",
    "name": "Name, Role, Value",
    "description": "Accessible name derives from associated label; current value is tracked and exposed natively."
  }
],
  dosAndDonts: [
    { type: "do", description: "Use Select with descriptive contextual labels and explicit states." },
    { type: "dont", description: "Do not override native contrast ratios or strip visible focus rings." }
  ],
  tokens: [
    { name: "--color-border-default", description: "System token applied to Select boundary." },
    { name: "--color-background-base", description: "System token applied to Select boundary." },
    { name: "--color-interactive-primary", description: "System token applied to Select boundary." },
    { name: "--spacing-scale-3-rem", description: "System token applied to Select boundary." },
    { name: "--border-radius-md", description: "System token applied to Select boundary." }
  ]
};
export default SelectData;
