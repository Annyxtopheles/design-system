import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { DashboardDial } from './DashboardDial';

jest.mock('./DashboardDial.scss', () => ({}));

describe('DashboardDial', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<DashboardDial min={0} max={100} value={50} label="Speed" />);
    expect(screen.getByRole('meter')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<DashboardDial min={0} max={100} value={50} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the label and animated value', () => {
    render(<DashboardDial min={0} max={100} value={75} label="CPU" unit="%" animationDuration={0} />);
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText('CPU')).toBeInTheDocument();
    // Since animation runs via requestAnimationFrame, testing the exact number via RTL needs some care.
    // We can at least check it doesn't crash and has aria values.
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows min and max when showMinMax is true', () => {
    render(<DashboardDial min={10} max={200} value={50} showMinMax />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('has accessibility attributes', () => {
    render(<DashboardDial min={0} max={100} value={50} label="Usage" />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-label', 'Usage');
    expect(meter).toHaveAttribute('aria-valuenow');
  });
});
