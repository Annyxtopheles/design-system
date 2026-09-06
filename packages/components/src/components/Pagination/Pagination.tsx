import React from 'react';
import './Pagination.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = false,
  showPrevNext = true,
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel = 'Pagination Navigation',
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPaginationItems = () => {
    const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - (boundaryCount + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      const rightRange = range(totalPages - boundaryCount + 1, totalPages);
      return [...leftRange, '...', ...rightRange];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      const leftRange = range(1, boundaryCount);
      return [...leftRange, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      const leftRange = range(1, boundaryCount);
      const rightRange = range(totalPages - boundaryCount + 1, totalPages);
      return [...leftRange, '...', ...middleRange, '...', ...rightRange];
    }

    return [];
  };

  const items = getPaginationItems();

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label={ariaLabel} className={`ds-Pagination ds-Pagination--${size}`}>
      <ul className="ds-Pagination__list">
        {showFirstLast && (
          <li className="ds-Pagination__item">
            <button
              className="ds-Pagination__button"
              onClick={() => handlePageChange(1)}
              disabled={disabled || currentPage === 1}
              aria-label="Go to first page"
            >
              &laquo;
            </button>
          </li>
        )}
        
        {showPrevNext && (
          <li className="ds-Pagination__item">
            <button
              className="ds-Pagination__button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={disabled || currentPage === 1}
              aria-label="Go to previous page"
            >
              &lsaquo;
            </button>
          </li>
        )}

        {items.map((item, index) => {
          if (item === '...') {
            return (
              <li key={`ellipsis-${index}`} className="ds-Pagination__item ds-Pagination__ellipsis">
                &#8230;
              </li>
            );
          }

          const pageNumber = item as number;
          const isActive = pageNumber === currentPage;

          return (
            <li key={pageNumber} className="ds-Pagination__item">
              <button
                className={`ds-Pagination__button ${isActive ? 'ds-Pagination__button--active' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
                aria-label={isActive ? `Page ${pageNumber}` : `Go to page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {showPrevNext && (
          <li className="ds-Pagination__item">
            <button
              className="ds-Pagination__button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Go to next page"
            >
              &rsaquo;
            </button>
          </li>
        )}

        {showFirstLast && (
          <li className="ds-Pagination__item">
            <button
              className="ds-Pagination__button"
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Go to last page"
            >
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
