import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders text skeleton by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('ds-Skeleton--text');
  });

  it('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    // container > ds-Skeleton-group > ds-Skeleton (x3)
    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('ds-Skeleton-group');
    expect(group.children).toHaveLength(3);
  });

  it('renders sub-components correctly', () => {
    const { container: textContainer } = render(<Skeleton.Text />);
    expect(textContainer.firstChild).toHaveClass('ds-Skeleton--text');

    const { container: rectContainer } = render(<Skeleton.Rect />);
    expect(rectContainer.firstChild).toHaveClass('ds-Skeleton--rect');

    const { container: circleContainer } = render(<Skeleton.Circle />);
    expect(circleContainer.firstChild).toHaveClass('ds-Skeleton--circle');

    const { container: cardContainer } = render(<Skeleton.Card />);
    expect(cardContainer.firstChild).toHaveClass('ds-Skeleton-card');
  });

  it('applies animation classes', () => {
    const { container } = render(<Skeleton animate="pulse" />);
    expect(container.firstChild).toHaveClass('ds-Skeleton--animate-pulse');
  });
});
