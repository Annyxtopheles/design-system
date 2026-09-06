import React, { useState, useCallback, useRef, useEffect } from 'react';
import './DataGrid.scss';

export interface Column<T> {
  key: keyof T & string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'badge';
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface DataGridProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationInfo;
  onSortChange?: (key: keyof T & string, direction: 'asc' | 'desc' | null) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
  striped?: boolean;
  dense?: boolean;
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  pagination,
  onSortChange,
  onFilterChange,
  selectable = false,
  onSelectionChange,
  emptyMessage = 'No data available',
  stickyHeader = false,
  striped = false,
  dense = false,
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSort = (key: keyof T & string, sortable?: boolean) => {
    if (!sortable) return;
    let nextDirection: 'asc' | 'desc' | null = 'asc';
    if (sortKey === key) {
      if (sortDirection === 'asc') nextDirection = 'desc';
      else if (sortDirection === 'desc') nextDirection = null;
    }

    setSortKey(nextDirection ? key : null);
    setSortDirection(nextDirection);
    onSortChange?.(key, nextDirection);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) delete newFilters[key];
    setFilters(newFilters);

    if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    filterTimeoutRef.current = setTimeout(() => {
      onFilterChange?.(newFilters);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIndices = new Set(data.map((_, i) => i));
      setSelectedIndices(allIndices);
      onSelectionChange?.(data);
    } else {
      setSelectedIndices(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIndices(newSelected);
    const selectedRows = data.filter((_, i) => newSelected.has(i));
    onSelectionChange?.(selectedRows);
  };

  const allSelected = data.length > 0 && selectedIndices.size === data.length;
  const isIndeterminate = selectedIndices.size > 0 && selectedIndices.size < data.length;
  const hasFilterable = columns.some(c => c.filterable);

  const renderCell = (col: Column<T>, row: T) => {
    if (col.renderCell) return col.renderCell(row[col.key], row);
    return String(row[col.key] ?? '');
  };

  return (
    <div className={`ds-DataGrid ${stickyHeader ? 'ds-DataGrid--sticky' : ''} ${dense ? 'ds-DataGrid--dense' : ''}`}>
      <div className="ds-DataGrid__table-container">
        <table role="grid" className={`ds-DataGrid__table ${striped ? 'ds-DataGrid__table--striped' : ''}`}>
          <thead>
            <tr>
              {selectable && (
                <th className="ds-DataGrid__th ds-DataGrid__th--checkbox" role="columnheader">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`ds-DataGrid__th ${col.sortable ? 'ds-DataGrid__th--sortable' : ''}`}
                  style={{ width: col.width }}
                  onClick={() => handleSort(col.key, col.sortable)}
                  role="columnheader"
                  aria-sort={sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <div className="ds-DataGrid__th-content">
                    {col.header}
                    {col.sortable && (
                      <span className="ds-DataGrid__sort-icon">
                        {sortKey === col.key ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
            {hasFilterable && (
              <tr className="ds-DataGrid__filter-row">
                {selectable && <th className="ds-DataGrid__th"></th>}
                {columns.map((col) => (
                  <th key={`filter-${col.key}`} className="ds-DataGrid__th">
                    {col.filterable && (
                      <input
                        type="text"
                        className="ds-DataGrid__filter-input"
                        placeholder={`Filter ${col.header}...`}
                        value={filters[col.key] || ''}
                        onChange={(e) => handleFilterChange(col.key, e.target.value)}
                        aria-label={`Filter by ${col.header}`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="ds-DataGrid__row ds-DataGrid__row--loading">
                  {selectable && (
                    <td className="ds-DataGrid__td ds-DataGrid__td--checkbox">
                      <div className="ds-DataGrid__skeleton-box" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={`skeleton-cell-${col.key}`} className="ds-DataGrid__td">
                      <div className="ds-DataGrid__skeleton-text" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr className="ds-DataGrid__row ds-DataGrid__row--empty">
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="ds-DataGrid__td">
                  <div className="ds-DataGrid__empty-state">
                    <span className="ds-DataGrid__empty-icon">📂</span>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const isSelected = selectedIndices.has(i);
                return (
                  <tr
                    key={i}
                    className={`ds-DataGrid__row ${isSelected ? 'ds-DataGrid__row--selected' : ''}`}
                    aria-selected={isSelected}
                  >
                    {selectable && (
                      <td className="ds-DataGrid__td ds-DataGrid__td--checkbox" role="gridcell">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(i)}
                          aria-label={`Select row ${i + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="ds-DataGrid__td" role="gridcell">
                        {renderCell(col, row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="ds-DataGrid__pagination">
          <span className="ds-DataGrid__pagination-info">
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)} ({pagination.total} total)
          </span>
          <div className="ds-DataGrid__pagination-controls">
            <button
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page <= 1 || loading}
            >
              First
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
            >
              Prev
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize) || loading}
            >
              Next
            </button>
            <button
              onClick={() => pagination.onPageChange(Math.ceil(pagination.total / pagination.pageSize))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize) || loading}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataGrid;
