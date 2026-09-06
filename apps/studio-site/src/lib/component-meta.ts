export interface ComponentMeta {
  name: string; 
  slug: string; 
  description: string;
  type?: string;
  status?: 'stable' | 'beta';
  version?: string;
  wcagLevel?: 'AA' | 'AAA' | 'N/A';
  wcagCriteria?: string[]; 
  tokensUsed?: string[]; 
  ariaRoles?: string[];
  keyboardInteractions?: Array<{key: string; action: string}>;
  since?: string;
}

export interface UsageContent {
  whenToUse: string;
  whenNotToUse?: string;
  contentGuidelines?: string;
  interactionModel?: string;
  compositionPatterns?: string;
  responsiveBehavior?: string;
  states?: Array<{name: string; description: string}>;
  dosDonts?: Array<{do?: any; dont?: any; [key: string]: any}>;
}

export interface A11yContent {
  summary?: string;
  wcagCriteria?: any[];
  ariaAttributes?: Array<{attr: string; value?: string; description?: string; [key: string]: any}>;
  keyboardInteractions?: Array<{key: string; action: string; notes?: string}>;
  screenReaderNotes?: string;
  contrastRatios?: Array<{combination: string; ratio: string; passes: boolean}>;
  focusManagement?: string;
  reducedMotion?: string;
}

export interface DesignContent {
  principles?: string;
  tokensUsed?: any[];
  spacingAnatomy?: string;
  colorUsage?: Array<{state: string; token: string; value: string; rationale?: string}>;
  motionSpec?: Array<{property: string; duration: string; easing: string; rationale?: string}>;
  theming?: string;
  darkModeNotes?: string;
  highContrastNotes?: string;
}

export interface ApiContent {
  props?: any[];
  typeDefinitions?: string;
  cssOverrides?: Array<{var: string; description: string; defaultValue?: string}>;
  examples?: Array<{title: string; description?: string; code: string}>;
}

export const COMPONENT_META: Record<string, ComponentMeta> = {
  button: {
    name: 'Button',
    slug: 'button',
    description: 'A primitive button component',
    status: 'stable',
    version: '1.0.0',
    wcagLevel: 'AA',
    wcagCriteria: ['1.4.3', '2.1.1', '2.4.7', '4.1.2'],
    tokensUsed: ['--color-background-brand', '--spacing-md', '--typography-scale-md'],
    ariaRoles: ['button'],
    keyboardInteractions: [
      { key: 'Enter', action: 'Activates the button' },
      { key: 'Space', action: 'Activates the button' }
    ],
    since: '1.0.0'
  }
};
