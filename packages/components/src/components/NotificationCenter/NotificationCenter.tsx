import React, { useState, useEffect, useRef } from 'react';
import './NotificationCenter.scss';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | string;
  timestamp: Date | string | number;
  read: boolean;
}

const useRelativeTime = (timestamp: Date | string | number) => {
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const update = () => {
      const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
      if (isNaN(diff) || diff < 60) setTimeStr('just now');
      else if (diff < 3600) setTimeStr(`${Math.floor(diff / 60)}m ago`);
      else if (diff < 86400) setTimeStr(`${Math.floor(diff / 3600)}h ago`);
      else setTimeStr(`${Math.floor(diff / 86400)}d ago`);
    };
    update();
    const int = setInterval(update, 60000);
    return () => clearInterval(int);
  }, [timestamp]);
  return timeStr;
};

interface NotificationItemProps {
  notif: Notification;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notif, onMarkRead, onDismiss }) => {
  const relTime = useRelativeTime(notif.timestamp);
  const typeIcon = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '🚨',
  }[notif.type || 'info'] || '🔔';

  return (
    <div className={`ds-NotificationItem ${notif.read ? 'ds-NotificationItem--read' : 'ds-NotificationItem--unread'}`}>
      <span className="ds-NotificationItem__icon" aria-hidden="true">{typeIcon}</span>
      <div className="ds-NotificationItem__content" onClick={() => onMarkRead(notif.id)}>
        <div className="ds-NotificationItem__header">
          <span className="ds-NotificationItem__title">{notif.title}</span>
          <span className="ds-NotificationItem__time">{relTime}</span>
        </div>
        <p className="ds-NotificationItem__message">{notif.message}</p>
      </div>
      <button
        type="button"
        className="ds-NotificationItem__dismiss-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notif.id);
        }}
        aria-label="Dismiss notification"
      >
        &times;
      </button>
    </div>
  );
};

export interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  onDismissAll?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maxHeight?: string | number;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications: propNotifs,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const defaultNotifs: Notification[] = [
    { id: '1', title: 'System Deployment', message: 'Design system tokens v1.0 successfully published.', type: 'success', timestamp: new Date(Date.now() - 1000 * 60 * 5), read: false },
    { id: '2', title: 'Security Alert', message: 'New audit rules generated for WCAG 2.2 AA conformance.', type: 'info', timestamp: new Date(Date.now() - 1000 * 60 * 30), read: false },
    { id: '3', title: 'Build Warning', message: 'Bundle size exceeded budget in test workspace.', type: 'warning', timestamp: new Date(Date.now() - 1000 * 3600 * 3), read: true },
  ];

  const [notifs, setNotifs] = useState<Notification[]>(propNotifs || defaultNotifs);

  useEffect(() => {
    if (propNotifs) setNotifs(propNotifs);
  }, [propNotifs]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isControlled) onOpenChange?.(false);
        else setInternalOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, isControlled, onOpenChange]);

  const toggleOpen = () => {
    const next = !isOpen;
    if (isControlled) onOpenChange?.(next);
    else setInternalOpen(next);
  };

  const handleMarkRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    onMarkRead?.(id);
  };

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllRead?.();
  };

  const handleDismiss = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    onDismiss?.(id);
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="ds-NotificationCenter" ref={containerRef}>
      <button
        type="button"
        className="ds-NotificationCenter__bell"
        onClick={toggleOpen}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="ds-NotificationCenter__badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="ds-NotificationCenter__popover">
          <div className="ds-NotificationCenter__header">
            <h4 className="ds-NotificationCenter__title">Notifications</h4>
            {unreadCount > 0 && (
              <button
                type="button"
                className="ds-NotificationCenter__action-btn"
                onClick={handleMarkAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="ds-NotificationCenter__list">
            {notifs.length === 0 ? (
              <div className="ds-NotificationCenter__empty">No notifications</div>
            ) : (
              notifs.map((n) => (
                <NotificationItem
                  key={n.id}
                  notif={n}
                  onMarkRead={handleMarkRead}
                  onDismiss={handleDismiss}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
