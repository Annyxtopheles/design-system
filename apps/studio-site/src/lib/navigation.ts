export interface NavItem {
  label: string;
  slug: string;
  group: 'foundations' | 'primitives' | 'display' | 'navigation' | 'complex';
  description: string;
  status: 'stable' | 'beta' | 'deprecated';
  wcagLevel: 'AA' | 'AAA' | 'N/A';
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  // ── Foundations ──
  { label: 'Color', slug: 'foundations/colors', group: 'foundations', description: '4 complete theme layers, raw palette and WCAG contrast matrix', status: 'stable', wcagLevel: 'AAA', icon: 'palette' },
  { label: 'Typography', slug: 'foundations/typography', group: 'foundations', description: '24-step Minor Third type scale anchored at 16px', status: 'stable', wcagLevel: 'AA', icon: 'type' },
  { label: 'Spacing', slug: 'foundations/spacing', group: 'foundations', description: '24-step mathematical spatial grid on a 4px base unit', status: 'stable', wcagLevel: 'AA', icon: 'grid' },
  { label: 'Elevation', slug: 'foundations/elevation', group: 'foundations', description: '12-level multi-shadow elevation depth system across 3 themes', status: 'stable', wcagLevel: 'AA', icon: 'layers' },
  { label: 'Motion', slug: 'foundations/motion', group: 'foundations', description: '9 duration steps and 14 cubic-bezier easing curves', status: 'stable', wcagLevel: 'AA', icon: 'activity' },
  { label: 'Border', slug: 'foundations/border', group: 'foundations', description: '10 radii steps, hairline-to-thick border widths and focus rings', status: 'stable', wcagLevel: 'AA', icon: 'square' },

  // ── Primitives (9) ──
  { label: 'Button', slug: 'components/button', group: 'primitives', description: 'Tactile action trigger with loading states, icons, and variants', status: 'stable', wcagLevel: 'AA', icon: 'mouse-pointer' },
  { label: 'Input', slug: 'components/input', group: 'primitives', description: 'Single-line text entry with floating label and validation states', status: 'stable', wcagLevel: 'AA', icon: 'edit-3' },
  { label: 'Textarea', slug: 'components/textarea', group: 'primitives', description: 'Multi-line text input with character counting and auto-resize', status: 'stable', wcagLevel: 'AA', icon: 'file-text' },
  { label: 'Select', slug: 'components/select', group: 'primitives', description: 'Accessible dropdown selection menu with custom chevron styling', status: 'stable', wcagLevel: 'AA', icon: 'chevron-down' },
  { label: 'Checkbox', slug: 'components/checkbox', group: 'primitives', description: 'Binary and indeterminate selection box with high-contrast ring', status: 'stable', wcagLevel: 'AA', icon: 'check-square' },
  { label: 'Radio', slug: 'components/radio', group: 'primitives', description: 'Mutually exclusive selection item with roving tabindex navigation', status: 'stable', wcagLevel: 'AA', icon: 'radio' },
  { label: 'Switch', slug: 'components/switch', group: 'primitives', description: 'Physical toggle switch for immediate preference activation', status: 'stable', wcagLevel: 'AA', icon: 'toggle-right' },
  { label: 'Badge', slug: 'components/badge', group: 'primitives', description: 'Compact status chip with color-tinted semantic states', status: 'stable', wcagLevel: 'AA', icon: 'tag' },
  { label: 'Spinner', slug: 'components/spinner', group: 'primitives', description: 'Circular SVG stroke-dasharray indeterminate loading spinner', status: 'stable', wcagLevel: 'AA', icon: 'loader' },

  // ── Display & Feedback (9) ──
  { label: 'Avatar', slug: 'components/avatar', group: 'display', description: 'User identity thumbnail with generated initials and presence pips', status: 'stable', wcagLevel: 'AA', icon: 'user' },
  { label: 'Card', slug: 'components/card', group: 'display', description: 'Elevated content container with header, media, and footer slots', status: 'stable', wcagLevel: 'AA', icon: 'credit-card' },
  { label: 'Chip', slug: 'components/chip', group: 'display', description: 'Interactive compact token supporting filter selection and deletion', status: 'stable', wcagLevel: 'AA', icon: 'hash' },
  { label: 'Tooltip', slug: 'components/tooltip', group: 'display', description: 'Persistent floating label complying with WCAG 2.2 SC 1.4.13', status: 'stable', wcagLevel: 'AA', icon: 'info' },
  { label: 'Toast', slug: 'components/toast', group: 'display', description: 'Temporary status alert banner with automatic dismiss timeout', status: 'stable', wcagLevel: 'AA', icon: 'bell' },
  { label: 'ProgressBar', slug: 'components/progress-bar', group: 'display', description: 'Determinate and indeterminate progress indicator in linear and circular SVG', status: 'stable', wcagLevel: 'AA', icon: 'percent' },
  { label: 'Skeleton', slug: 'components/skeleton', group: 'display', description: 'Content placeholder with animated shimmer bones', status: 'stable', wcagLevel: 'AA', icon: 'square' },
  { label: 'Accordion', slug: 'components/accordion', group: 'display', description: 'Vertically stacked disclosure panels with smooth height transitions', status: 'stable', wcagLevel: 'AA', icon: 'align-justify' },
  { label: 'Divider', slug: 'components/divider', group: 'display', description: 'Visual and programmatic separator partitioning layout blocks', status: 'stable', wcagLevel: 'AA', icon: 'minus' },

  // ── Navigation & Overlay (9) ──
  { label: 'Tabs', slug: 'components/tabs', group: 'navigation', description: 'Tabbed workspace navigation with sliding underline indicators', status: 'stable', wcagLevel: 'AA', icon: 'folder' },
  { label: 'Breadcrumb', slug: 'components/breadcrumb', group: 'navigation', description: 'Hierarchical navigation trail with middle ellipsis truncation', status: 'stable', wcagLevel: 'AA', icon: 'more-horizontal' },
  { label: 'Pagination', slug: 'components/pagination', group: 'navigation', description: 'Smart boundary and sibling page pagination controls', status: 'stable', wcagLevel: 'AA', icon: 'chevrons-right' },
  { label: 'SidebarNav', slug: 'components/sidebar-nav', group: 'navigation', description: 'Multi-level hierarchical navigation rail with collapsed icon mode', status: 'stable', wcagLevel: 'AA', icon: 'sidebar' },
  { label: 'DropdownMenu', slug: 'components/dropdown-menu', group: 'navigation', description: 'Contextual actions menu with nested submenus and shortcut keys', status: 'stable', wcagLevel: 'AA', icon: 'menu' },
  { label: 'Stepper', slug: 'components/stepper', group: 'navigation', description: 'Multi-step process progression bar with validation markers', status: 'stable', wcagLevel: 'AA', icon: 'check-circle' },
  { label: 'Popover', slug: 'components/popover', group: 'navigation', description: 'Rich interactive overlay with focus-trap and positioning logic', status: 'stable', wcagLevel: 'AA', icon: 'message-square' },
  { label: 'Drawer', slug: 'components/drawer', group: 'navigation', description: 'Slide-out screen sheet with backdrop focus trap and scroll lock', status: 'stable', wcagLevel: 'AA', icon: 'sliders' },
  { label: 'CommandPalette', slug: 'components/command-palette', group: 'navigation', description: 'Fuzzy-search modal palette triggered by global keyboard shortcuts', status: 'stable', wcagLevel: 'AA', icon: 'command' },

  // ── Complex & Specialized (8) ──
  { label: 'Modal', slug: 'components/modal', group: 'complex', description: 'Fully accessible dialog with portal rendering, scroll lock, and Tab focus trap', status: 'stable', wcagLevel: 'AAA', icon: 'maximize-2' },
  { label: 'DataGrid', slug: 'components/data-grid', group: 'complex', description: 'High-density virtualized data table with debounced multi-column filters', status: 'stable', wcagLevel: 'AA', icon: 'database' },
  { label: 'FlightCheckout', slug: 'components/flight-checkout', group: 'complex', description: '6-step flight booking checkout wizard with interactive seat map', status: 'stable', wcagLevel: 'AA', icon: 'send' },
  { label: 'DashboardDial', slug: 'components/dashboard-dial', group: 'complex', description: 'Mathematical 270° SVG arc meter with requestAnimationFrame interpolation', status: 'stable', wcagLevel: 'AA', icon: 'compass' },
  { label: 'DatePicker', slug: 'components/date-picker', group: 'complex', description: 'Keyboard navigable popover calendar with date range selection', status: 'stable', wcagLevel: 'AA', icon: 'calendar' },
  { label: 'FileUpload', slug: 'components/file-upload', group: 'complex', description: 'Drag-and-drop file staging area with thumbnail previews and progress meters', status: 'stable', wcagLevel: 'AA', icon: 'upload-cloud' },
  { label: 'RangeSlider', slug: 'components/range-slider', group: 'complex', description: 'Dual-handle range selector preventing thumb collision with live tooltips', status: 'stable', wcagLevel: 'AA', icon: 'sliders' },
  { label: 'NotificationCenter', slug: 'components/notification-center', group: 'complex', description: 'Live notification drawer with unread counter badges and categoric filters', status: 'stable', wcagLevel: 'AA', icon: 'bell' },
];
