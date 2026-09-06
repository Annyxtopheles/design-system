export const DataGridData = {
  title: "DataGrid",
  description: "VERY DETAILED. Grid vs table semantics. Column type guidance. Filter UX patterns. Sort behavior.",
  usage: `
## Overview
The DataGrid component is an essential part of the design system... 

### Design Rationale
When deciding to implement a DataGrid, it is crucial to understand the cognitive load it places on the user. We have meticulously designed the DataGrid to balance flexibility, accessibility, and visual hierarchy. By strictly relying on our CSS custom properties, such as var(--color-background-base) and var(--typography-scale-md-rem), the DataGrid adapts seamlessly to different themes.

### Interactive Behaviors
Users interact with the DataGrid primarily through pointer devices and keyboards. Focus management is critical here. When the component receives focus, it immediately provides a clear visual indicator using var(--color-border-focus).

### Component Variations
1. **Default State**: Used for standard implementations.
2. **Compact Mode**: Ideal for data-dense interfaces like administrative dashboards.
3. **Mobile Optimized**: Adjusts touch targets to a minimum of 44x44 CSS pixels.

### Best Practices
When using DataGrid, consider the surrounding context. Avoid placing multiple complex interactive elements in close proximity without adequate whitespace (using var(--spacing-md) to var(--spacing-xl)).

### Controlled vs Uncontrolled
Developers can use this component in either controlled or uncontrolled modes. For most form-based applications, a controlled approach ensures that the component state is synchronized with the global application state. 

### Data Flow and Persistence
For complex versions of DataGrid, consider how data persists when the component unmounts. If used within a larger layout, ensure that state hydration does not cause layout shifts.

### Contextual Usage
Do not overuse DataGrid. If a simpler alternative like a basic HTML button or a standard list suffices, opt for the simpler element. The DataGrid is intended for scenarios requiring robust interaction models and advanced state tracking.

(Additional detailed considerations specific to DataGrid: VERY DETAILED. Grid vs table semantics. Column type guidance. Filter UX patterns. Sort behavior. Ensure to validate all inputs, handle asynchronous data fetching gracefully, and provide clear loading states using our standard Skeleton components. The architecture relies on an event-driven model internally to decouple the UI from the business logic. Event handlers should be memoized to prevent unnecessary re-renders. Use useCallback and useMemo judiciously.)

When scaling the DataGrid to large datasets or complex workflows, virtualization or pagination must be employed to maintain a 60fps frame rate during scroll and interaction. We measure performance using standard Web Vitals metrics, ensuring LCP and CLS remain within acceptable thresholds.

### Advanced Theming
The DataGrid supports advanced theming via overrides. By targeting specific parts using BEM methodology (e.g., .ss-DataGrid__container--active), consumers can apply domain-specific styles. However, we strongly advise sticking to the design tokens for consistency.`,
  wcag: [
    { sc: "1.3.1", level: "A", name: "Info and Relationships", description: "Semantic HTML is used to ensure screen readers can convey the correct structure of the DataGrid." },
    { sc: "2.1.1", level: "A", name: "Keyboard", description: "All functionality of the DataGrid is available using a keyboard interface." },
    { sc: "2.4.3", level: "A", name: "Focus Order", description: "Focus moves sequentially through the DataGrid in a manner that preserves meaning and operability." },
    { sc: "4.1.2", level: "A", name: "Name, Role, Value", description: "Appropriate ARIA roles and properties are applied to the DataGrid." }
  ],
  dosAndDonts: [
    { type: "do", description: "Use DataGrid with descriptive labels and clear states.", image: "/images/do.png" },
    { type: "dont", description: "Do not use DataGrid without providing adequate context to the user.", image: "/images/dont.png" }
  ],
  tokens: [
    { name: "--color-background-base", description: "Background color of the DataGrid" },
    { name: "--spacing-md", description: "Standard padding inside the DataGrid" }
  ]
};