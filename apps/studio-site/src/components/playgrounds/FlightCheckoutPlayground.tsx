'use client';
import React from 'react';
import { FlightCheckout } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function FlightCheckoutPlayground() {
  const defaultProps = {
    showBorder: true,
  };

  const controls = [
    { name: 'showBorder', label: 'Surrounding Card Border', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="FlightCheckout"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{
          width: '100%',
          maxWidth: '820px',
          margin: '0 auto',
          padding: '24px',
          border: props.showBorder ? '1px solid var(--color-border-default)' : 'none',
          borderRadius: '16px',
          background: 'var(--color-background-base)'
        }}>
          <FlightCheckout
            onComplete={(state) => {
              alert(`Booking Confirmed! Passenger: ${state.passengers[0]?.firstName || 'Guest'}, Seat: ${state.selectedSeats?.[0] || 'Auto'}`);
            }}
          />
        </div>
      )}
    />
  );
}