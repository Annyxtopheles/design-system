import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correct page numbers', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />);
    // 1 ... 4 5 6 ... 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onPageChange when a page is clicked', () => {
    const handleChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} />);
    
    fireEvent.click(screen.getByText('2'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />);
    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('marks current page with aria-current', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    const current = screen.getByText('3');
    expect(current).toHaveAttribute('aria-current', 'page');
  });
});
