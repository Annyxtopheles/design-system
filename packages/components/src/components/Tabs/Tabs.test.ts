import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from './Tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3', disabled: true },
];

describe('Tabs Component', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<Tabs tabs={mockTabs} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders tabs and content', () => {
    render(<Tabs tabs={mockTabs} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs on click', () => {
    render(<Tabs tabs={mockTabs} />);
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('does not switch to disabled tabs', () => {
    render(<Tabs tabs={mockTabs} />);
    const disabledTab = screen.getByRole('tab', { name: 'Tab 3' });
    fireEvent.click(disabledTab);
    expect(disabledTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Content 1')).toBeInTheDocument(); // Still on first tab
  });

  it('handles keyboard navigation', () => {
    render(<Tabs tabs={mockTabs} />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();
    
    // Arrow Right to tab 2
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('has correct ARIA attributes', () => {
    render(<Tabs tabs={mockTabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-controls', 'panel-tab1');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-tab1');
  });
});
