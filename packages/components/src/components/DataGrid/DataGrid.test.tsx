import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataGrid, Column } from './DataGrid';

jest.mock('./DataGrid.scss', () => ({}));

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', filterable: true, sortable: true },
  { key: 'age', header: 'Age', sortable: true }
];

const data: User[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
];

describe('DataGrid', () => {
  it('renders columns and data rows without crashing', () => {
    render(<DataGrid columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<DataGrid columns={columns} data={data} />);
    expect(container).toMatchSnapshot();
  });

  it('filter changes call onFilterChange debounced', async () => {
    jest.useFakeTimers();
    const handleFilter = jest.fn();
    render(<DataGrid columns={columns} data={data} onFilterChange={handleFilter} />);
    
    const filterInput = screen.getByLabelText('Filter by Name');
    fireEvent.change(filterInput, { target: { value: 'Ali' } });
    
    expect(handleFilter).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(handleFilter).toHaveBeenCalledWith({ name: 'Ali' });
    jest.useRealTimers();
  });

  it('sort click calls onSortChange', () => {
    const handleSort = jest.fn();
    render(<DataGrid columns={columns} data={data} onSortChange={handleSort} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('select row and select all work correctly', () => {
    const handleSelect = jest.fn();
    render(<DataGrid columns={columns} data={data} selectable onSelectionChange={handleSelect} />);
    
    const selectAll = screen.getByLabelText('Select all rows');
    fireEvent.click(selectAll);
    expect(handleSelect).toHaveBeenCalledWith(data);
    
    fireEvent.click(selectAll);
    expect(handleSelect).toHaveBeenCalledWith([]);
    
    const row1Check = screen.getByLabelText('Select row 1');
    fireEvent.click(row1Check);
    expect(handleSelect).toHaveBeenCalledWith([data[0]]);
  });

  it('shows empty state when data is empty', () => {
    render(<DataGrid columns={columns} data={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows loading skeletons when loading is true', () => {
    const { container } = render(<DataGrid columns={columns} data={[]} loading />);
    const skeletons = container.querySelectorAll('.ds-DataGrid__skeleton-text');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('has accessibility attributes', () => {
    render(<DataGrid columns={columns} data={data} />);
    const table = screen.getByRole('grid');
    expect(table).toBeInTheDocument();
    
    const colheaders = screen.getAllByRole('columnheader');
    expect(colheaders.length).toBeGreaterThan(0);
  });
});
