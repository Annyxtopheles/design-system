'use client';
import React from 'react';
import { DataGrid } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DataGridPlayground() {
  const defaultProps = {
    striped: true,
    dense: false,
    selectable: true,
    loading: false,
  };

  const controls = [
    { name: 'striped', label: 'Striped Rows', type: 'toggle' },
    { name: 'dense', label: 'Dense Padding', type: 'toggle' },
    { name: 'selectable', label: 'Row Selection (Checkboxes)', type: 'toggle' },
    { name: 'loading', label: 'Loading Shimmer', type: 'toggle' },
  ];

  const columns = [
    { key: 'id', header: 'ID', width: '80px', sortable: true },
    { key: 'name', header: 'User Name', sortable: true, filterable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'status', header: 'Status', type: 'badge' as const },
    { key: 'score', header: 'Health Score', sortable: true },
  ];

  const sampleData = [
    { id: 101, name: 'Alice Chen', role: 'Staff Designer', status: 'Active', score: 98 },
    { id: 102, name: 'Marcus Vance', role: 'Frontend Lead', status: 'Active', score: 94 },
    { id: 103, name: 'Elena Rostova', role: 'Design Technologist', status: 'Review', score: 88 },
    { id: 104, name: 'Devon Miles', role: 'Design Systems Eng', status: 'Active', score: 91 },
    { id: 105, name: 'Sora Tanaka', role: 'Accessibility Auditor', status: 'Pending', score: 82 },
  ];

  return (
    <ControlPanel
      componentName="DataGrid"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ width: '100%', padding: '16px' }}>
          <DataGrid
            columns={columns as any}
            data={sampleData}
            striped={props.striped}
            dense={props.dense}
            selectable={props.selectable}
            loading={props.loading}
            stickyHeader
          />
        </div>
      )}
    />
  );
}