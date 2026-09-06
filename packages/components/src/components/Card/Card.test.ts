import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders content correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header, media, and footer when provided', () => {
    render(
      <Card
        header={<h2>Header</h2>}
        media={<img src="test.jpg" alt="Media" />}
        footer={<button>Footer Button</button>}
      >
        Content
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByAltText('Media')).toBeInTheDocument();
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles click events and accessibility when clickable', () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>Click Me</Card>);
    
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
    
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
