import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarNav from './SidebarNav';

const mockItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'settings', label: 'Settings', disabled: true },
  { 
    id: 'projects', 
    label: 'Projects', 
    children: [
      { id: 'proj1', label: 'Project 1' },
      { id: 'proj2', label: 'Project 2' }
    ]
  }
];

describe('SidebarNav Component', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<SidebarNav items={mockItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders items', () => {
    render(<SidebarNav items={mockItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('expands nested items on click', () => {
    render(<SidebarNav items={mockItems} />);
    const projectsBtn = screen.getByText('Projects');
    
    // Sub-items should not be visible initially
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    
    fireEvent.click(projectsBtn);
    
    // Sub-items should now be visible
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('highlights active item', () => {
    render(<SidebarNav items={mockItems} activeItem="home" />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not fire click on disabled items', () => {
    const handleClick = jest.fn();
    render(<SidebarNav items={mockItems} onItemClick={handleClick} />);
    
    const settingsBtn = screen.getByText('Settings');
    fireEvent.click(settingsBtn);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows only icons when collapsed', () => {
    const itemsWithIcons = [
      { id: 'home', label: 'Home', icon: <span data-testid="icon-home" /> }
    ];
    render(<SidebarNav items={itemsWithIcons} collapsed />);
    
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
