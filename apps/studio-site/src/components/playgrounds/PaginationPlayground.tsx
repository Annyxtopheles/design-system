'use client';
import React, { useState } from 'react';
import { Pagination } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function PaginationPlayground() {
  const [currentPage, setCurrentPage] = useState(3);

  const defaultProps = {
    totalPages: 10,
    size: 'md',
    showFirstLast: true,
    showPrevNext: true,
    disabled: false,
  };

  const controls = [
    {
      name: 'totalPages',
      label: 'Total Pages',
      type: 'select',
      options: [
        { label: '5 Pages', value: 5 },
        { label: '10 Pages', value: 10 },
        { label: '25 Pages', value: 25 },
        { label: '50 Pages', value: 50 },
      ],
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    { name: 'showFirstLast', label: 'First / Last Buttons', type: 'toggle' },
    { name: 'showPrevNext', label: 'Prev / Next Buttons', type: 'toggle' },
    { name: 'disabled', label: 'Disabled State', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="Pagination"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={props.totalPages}
            size={props.size}
            showFirstLast={props.showFirstLast}
            showPrevNext={props.showPrevNext}
            disabled={props.disabled}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Viewing page <strong>{currentPage}</strong> of <strong>{props.totalPages}</strong>
          </div>
        </div>
      )}
    />
  );
}