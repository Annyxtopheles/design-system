import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FlightCheckout } from './FlightCheckout';

jest.mock('./FlightCheckout.scss', () => ({}));

describe('FlightCheckout', () => {
  it('renders correctly', () => {
    render(<FlightCheckout onComplete={jest.fn()} />);
    expect(screen.getByRole('heading', { name: 'Search Flights' })).toBeInTheDocument();
  });

  it('validates search step', async () => {
    render(<FlightCheckout onComplete={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Search Flights' }));
    expect(screen.getByText('Origin is required')).toBeInTheDocument();
  });

  it('can progress through steps', async () => {
    const handleComplete = jest.fn();
    render(<FlightCheckout onComplete={handleComplete} />);
    
    // Step 1
    fireEvent.change(screen.getByLabelText('Origin'), { target: { value: 'JFK' } });
    fireEvent.change(screen.getByLabelText('Destination'), { target: { value: 'LHR' } });
    fireEvent.change(screen.getByLabelText('Depart Date'), { target: { value: '2023-12-01' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search Flights' }));
    
    // Mock animation wait
    await waitFor(() => {
      expect(screen.getByText('Select Flight')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<FlightCheckout onComplete={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
