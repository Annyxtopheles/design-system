import { ComponentMeta, UsageContent, A11yContent, DesignContent, ApiContent } from '@/lib/component-meta';

export const meta: ComponentMeta = {
  name: 'Button',
  slug: 'button',
  type: 'primitive',
  description: 'Interactive button component for primary, secondary, and tertiary actions.',
};

export const usage: UsageContent = {
  whenToUse: `Primary vs secondary vs ghost buttons represent the foundational hierarchy of actions in our application. Primary buttons should be used exactly once per screen or context block to indicate the main action. They draw the user's attention and drive them towards the intended conversion or primary workflow step. Secondary buttons act as alternative actions, supporting the primary button or serving as the main action in less critical contexts. They use less visual weight. Ghost buttons are for tertiary actions, often used for 'Cancel' or minor functions where you want to minimize visual clutter. When a loading state matters (e.g., submitting a form, making an API call), the button must clearly indicate processing while disabling interaction to prevent double-submissions. Icon-only buttons must have an accessible label (aria-label) and are best used in toolbars where space is constrained but the icon's meaning is universally understood.`,
  whenNotToUse: `Do not use Button when you need to navigate to another page (use a Link instead). Do not use multiple primary buttons in the same view.`,
  contentGuidelines: `Keep labels concise. Use verbs indicating the action (e.g., 'Save', 'Delete', 'Submit'). Avoid long phrases.`,
  interactionModel: `Buttons have clear visual feedback on hover, active (press), and focus states. Disabled buttons do not respond to pointer or keyboard events and are visually muted.`,
  compositionPatterns: `Buttons can contain icons on the left or right of the text. Icon-only buttons must have tooltips.`,
  responsiveBehavior: `Buttons generally maintain their width based on content but can be set to full-width on smaller screens.`,
  states: [
    { name: 'Default', description: 'Resting state' },
    { name: 'Hover', description: 'Pointer over the button' },
    { name: 'Active', description: 'Being clicked or pressed' },
    { name: 'Focus', description: 'Keyboard focus' },
    { name: 'Disabled', description: 'Non-interactive state' },
    { name: 'Loading', description: 'Action in progress' }
  ],
  dosDonts: [
    { type: 'do', description: 'Use strong verbs', example: '<Button>Save Changes</Button>' },
    { type: 'dont', description: 'Use multiple primary buttons', example: '<Button variant="primary">Save</Button><Button variant="primary">Cancel</Button>' },
    { type: 'do', description: 'Add icons to clarify actions', example: '<Button leftIcon={<SaveIcon />}>Save</Button>' },
    { type: 'dont', description: 'Wrap long text inside buttons', example: '<Button>This is a very long text that wraps</Button>' }
  ]
};

export const accessibility: A11yContent = {
  summary: `The Button component uses the native <button> element to ensure robust accessibility. It handles focus, keyboard interactions, and ARIA attributes out of the box.`,
  wcagCriteria: [
    { sc: '2.1.1', level: 'A', name: 'Keyboard', description: 'Accessible via Tab key and activated via Space/Enter.' },
    { sc: '4.1.2', level: 'A', name: 'Name, Role, Value', description: 'Uses native button role and accessible name.' },
    { sc: '2.4.7', level: 'AA', name: 'Focus Visible', description: 'Clear focus ring when keyboard navigated.' },
    { sc: '1.4.3', level: 'AA', name: 'Contrast (Minimum)', description: 'Text contrast meets 4.5:1.' },
    { sc: '2.5.3', level: 'A', name: 'Label in Name', description: 'Visible text is included in accessible name.' }
  ],
  ariaAttributes: [
    { attr: 'aria-label', value: 'string', description: 'Required for icon-only buttons' },
    { attr: 'aria-disabled', value: 'boolean', description: 'Set when the button is disabled but needs to remain focusable (advanced use cases)' }
  ],
  keyboardInteractions: [
    { key: 'Tab', action: 'Focus', notes: 'Moves focus to the button' },
    { key: 'Enter/Space', action: 'Activate', notes: 'Triggers the onClick handler' }
  ],
  screenReaderNotes: `Screen readers will announce the button's accessible name (text content or aria-label) and its role ('button'). If the loading state is active, it should announce 'Loading'.`,
  contrastRatios: [
    { combination: 'Primary button text on background', ratio: '>4.5:1', passes: true },
    { combination: 'Secondary button text on background', ratio: '>4.5:1', passes: true }
  ],
  focusManagement: `Uses standard browser focus. When used within a modal, focus should be trapped appropriately.`,
  reducedMotion: `Hover and active transitions should be disabled when prefers-reduced-motion is active.`
};

export const design: DesignContent = {
  principles: `Button design emphasizes clear hierarchy and target areas. Sizing and spacing are built around a minimum 44px touch target on mobile to comply with touch accessibility guidelines.`,
  tokensUsed: [
    { name: '--color-interactive-primary', type: 'color' },
    { name: '--color-interactive-primaryHover', type: 'color' },
    { name: '--color-interactive-primaryActive', type: 'color' },
    { name: '--color-text-onBrand', type: 'color' },
    { name: '--color-interactive-danger', type: 'color' },
    { name: '--border-radius-lg', type: 'dimension' },
    { name: '--spacing-inset-md', type: 'dimension' },
    { name: '--motion-duration-moderate', type: 'time' },
    { name: '--motion-easing-standard', type: 'easing' },
    { name: '--elevation-light-1-boxShadow', type: 'shadow' }
  ],
  spacingAnatomy: `Horizontal padding: 16px (md), Vertical padding: 8px (md), Gap between icon and text: 8px.`,
  colorUsage: [
    { state: 'Primary Default', token: '--color-interactive-primary', value: '#0052CC', rationale: 'Brand primary color' },
    { state: 'Primary Hover', token: '--color-interactive-primaryHover', value: '#0047B3', rationale: 'Darkened primary for interaction feedback' }
  ],
  motionSpec: [
    { property: 'background-color, transform', duration: '150ms', easing: 'ease-in-out', rationale: 'Snappy response' }
  ],
  theming: `Adjusts automatically across light and dark themes using semantic color tokens.`,
  darkModeNotes: `Primary buttons may use a slightly desaturated color in dark mode to reduce eye strain.`,
  highContrastNotes: `In high contrast mode, a solid border is applied to all button variants to ensure boundaries are visible.`
};

export const api: ApiContent = {
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", required: false, description: 'Visual variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Size of the button' },
    { name: 'disabled', type: 'boolean', required: false, description: 'Disables the button' },
    { name: 'loading', type: 'boolean', required: false, description: 'Shows loading spinner and disables interaction' },
    { name: 'leftIcon', type: 'ReactNode', required: false, description: 'Icon rendered before text' },
    { name: 'rightIcon', type: 'ReactNode', required: false, description: 'Icon rendered after text' },
    { name: 'fullWidth', type: 'boolean', required: false, description: 'Makes button 100% width of parent' }
  ],
  typeDefinitions: `export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';\n  size?: 'sm' | 'md' | 'lg';\n  loading?: boolean;\n  leftIcon?: React.ReactNode;\n  rightIcon?: React.ReactNode;\n  fullWidth?: boolean;\n}`,
  cssOverrides: [
    { var: '--btn-bg', description: 'Override background color', defaultValue: 'var(--color-interactive-primary)' }
  ],
  examples: [
    { title: 'Variants', description: 'The different visual styles', code: '<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>' }
  ]
};
