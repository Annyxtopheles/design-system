import React from 'react';
import './Breadcrumb.scss';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: '/' | '>' | React.ReactNode;
  maxItems?: number;
  'aria-label'?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  maxItems,
  'aria-label': ariaLabel = 'Breadcrumb',
}) => {
  let displayedItems = items;
  let hasCollapsed = false;

  if (maxItems && items.length > maxItems && maxItems > 1) {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    displayedItems = [firstItem, { label: '...', isEllipsis: true } as any, ...lastItems];
    hasCollapsed = true;
  }

  return (
    <nav aria-label={ariaLabel} className="ds-Breadcrumb">
      <ol className="ds-Breadcrumb__list">
        {displayedItems.map((item, index) => {
          const isLast = index === displayedItems.length - 1;
          const isEllipsis = 'isEllipsis' in item;

          return (
            <li key={index} className="ds-Breadcrumb__item">
              {isEllipsis ? (
                <span className="ds-Breadcrumb__ellipsis" aria-hidden="true">
                  ...
                </span>
              ) : (
                <div className="ds-Breadcrumb__link-wrapper">
                  {item.icon && <span className="ds-Breadcrumb__icon">{item.icon}</span>}
                  {isLast ? (
                    <span className="ds-Breadcrumb__current" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="ds-Breadcrumb__link"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className="ds-Breadcrumb__link ds-Breadcrumb__button"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              )}
              
              {!isLast && (
                <span className="ds-Breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
