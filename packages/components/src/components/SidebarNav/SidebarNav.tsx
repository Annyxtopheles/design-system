import React, { useState } from 'react';
import './SidebarNav.scss';

export interface NavItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  badge?: React.ReactNode;
  children?: NavItem[];
  disabled?: boolean;
}

export interface SidebarNavProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (id: string, item: NavItem) => void;
  collapsed?: boolean;
  collapsible?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const NavItemComponent: React.FC<{
  item: NavItem;
  level: number;
  activeItem?: string;
  onItemClick?: (id: string, item: NavItem) => void;
  collapsed?: boolean;
}> = ({ item, level, activeItem, onItemClick, collapsed }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeItem === item.id || (hasChildren && item.children?.some(c => c.id === activeItem));
  
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;
    if (hasChildren) {
      e.preventDefault();
      setExpanded(!expanded);
    } else if (onItemClick) {
      onItemClick(item.id, item);
    }
  };

  const isCurrent = activeItem === item.id;

  return (
    <li className={`ds-SidebarNav__item ${isActive ? 'ds-SidebarNav__item--active' : ''} ${item.disabled ? 'ds-SidebarNav__item--disabled' : ''}`}>
      {item.href && !hasChildren ? (
        <a 
          href={item.href}
          className="ds-SidebarNav__link"
          style={{ paddingLeft: `${level * 1 + 1}rem` }}
          onClick={handleClick}
          aria-current={isCurrent ? 'page' : undefined}
          title={collapsed && typeof item.label === 'string' ? item.label : undefined}
        >
          {item.icon && <span className="ds-SidebarNav__icon">{item.icon}</span>}
          {!collapsed && <span className="ds-SidebarNav__label">{item.label}</span>}
          {!collapsed && item.badge && <span className="ds-SidebarNav__badge">{item.badge}</span>}
        </a>
      ) : (
        <button 
          className="ds-SidebarNav__link ds-SidebarNav__button"
          style={{ paddingLeft: `${level * 1 + 1}rem` }}
          onClick={handleClick}
          aria-expanded={hasChildren ? expanded : undefined}
          title={collapsed && typeof item.label === 'string' ? item.label : undefined}
        >
          {item.icon && <span className="ds-SidebarNav__icon">{item.icon}</span>}
          {!collapsed && <span className="ds-SidebarNav__label">{item.label}</span>}
          {!collapsed && item.badge && <span className="ds-SidebarNav__badge">{item.badge}</span>}
          {!collapsed && hasChildren && (
            <span className={`ds-SidebarNav__chevron ${expanded ? 'ds-SidebarNav__chevron--expanded' : ''}`}>
              ▼
            </span>
          )}
        </button>
      )}
      {!collapsed && hasChildren && expanded && (
        <ul className="ds-SidebarNav__sublist">
          {item.children!.map(child => (
            <NavItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              activeItem={activeItem}
              onItemClick={onItemClick}
              collapsed={collapsed}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  collapsible = false,
  header,
  footer
}) => {
  return (
    <nav 
      className={`ds-SidebarNav ${collapsed ? 'ds-SidebarNav--collapsed' : ''}`}
      aria-label="Sidebar Navigation"
      data-collapsible={collapsible ? 'true' : undefined}
    >
      {header && <div className="ds-SidebarNav__header">{header}</div>}
      
      <div className="ds-SidebarNav__content">
        <ul className="ds-SidebarNav__list">
          {items.map(item => (
            <NavItemComponent
              key={item.id}
              item={item}
              level={0}
              activeItem={activeItem}
              onItemClick={onItemClick}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </div>

      {footer && <div className="ds-SidebarNav__footer">{footer}</div>}
    </nav>
  );
};

export default SidebarNav;
