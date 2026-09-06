import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from './Breadcrumb';

const mockItems = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/sub' },
  { label: 'Current Page' }
];

describe('Breadcrumb Component', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<Breadcrumb items={mockItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all items', () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('sets aria-current on the last item', () => {
    render(<Breadcrumb items={mockItems} />);
    const current = screen.getByText('Current Page');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('collapses items when maxItems is specified', () => {
    render(<Breadcrumb items={mockItems} maxItems={3} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('has correct ARIA nav role', () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});
