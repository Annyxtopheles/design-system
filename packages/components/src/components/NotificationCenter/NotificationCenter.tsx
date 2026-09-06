import React, { useState, useEffect } from 'react';
import './NotificationCenter.scss';

export interface Notification {
  id: string; title: string; message: string; type: string; timestamp: Date; read: boolean;
}

const useRelativeTime = (date: Date) => {
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const update = () => {
      const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
      if (diff < 60) setTimeStr('just now');
      else if (diff < 3600) setTimeStr(`${Math.floor(diff/60)}m ago`);
      else if (diff < 86400) setTimeStr(`${Math.floor(diff/3600)}h ago`);
      else setTimeStr('yesterday');
    };
    update();
    const int = setInterval(update, 60000);
    return () => clearInterval(int);
  }, [date]);
  return timeStr;
};

const NotificationItem = ({ notif, onMarkRead, onDismiss }: any) => {
  const relTime = useRelativeTime(notif.timestamp);
  return (
    <div className={`ds-NotificationItem ${notif.read ? 'read' : 'unread'}`}>
      <div onClick={() => onMarkRead(notif.id)}>
        <strong>{notif.title}</strong> - {relTime}
        <p>{notif.message}</p>
      </div>
      <button onClick={() => onDismiss(notif.id)}>&times;</button>
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
  groupByType?: boolean;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications: initNotifs = [] }) => {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(initNotifs);

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="ds-NotificationCenter">
      <button className="ds-NotificationCenter__bell" onClick={() => setOpen(!open)}>
        🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      {open && (
        <div className="ds-NotificationCenter__popover">
          <div className="ds-NotificationCenter__header">
            <h4>Notifications</h4>
            <button onClick={() => setNotifs(notifs.map(n => ({...n, read: true})))}>Mark all read</button>
          </div>
          <div className="ds-NotificationCenter__list">
            {notifs.map(n => (
              <NotificationItem 
                key={n.id} notif={n} 
                onMarkRead={(id: string) => setNotifs(ns => ns.map(x => x.id === id ? {...x, read: true} : x))}
                onDismiss={(id: string) => setNotifs(ns => ns.filter(x => x.id !== id))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationCenter;
