import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import './Toast.scss';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  message: string;
  title?: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  duration?: number;
  dismissible?: boolean;
  action?: ToastAction;
}

export interface ToastContextType {
  add: (toast: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode, position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center', maxItems?: number }> = ({
  children,
  position = 'top-right',
  maxItems = 5
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id, duration: toast.duration ?? 3000, variant: toast.variant ?? 'default' };
    
    setToasts((prev) => {
      const updated = [...prev, newToast];
      if (updated.length > maxItems) updated.shift();
      return updated;
    });

    if (newToast.duration > 0) {
      setTimeout(() => dismiss(id), newToast.duration);
    }
    return id;
  }, [maxItems]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo(() => ({ add, dismiss, clear }), [add, dismiss, clear]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={`ds-ToastContainer ds-ToastContainer--${position}`} aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`ds-Toast ds-Toast--${toast.variant}`} role="alert">
            <div className="ds-Toast__content">
              {toast.title && <div className="ds-Toast__title">{toast.title}</div>}
              <div className="ds-Toast__message">{toast.message}</div>
            </div>
            {toast.action && (
              <button className="ds-Toast__action" onClick={toast.action.onClick}>
                {toast.action.label}
              </button>
            )}
            {toast.dismissible !== false && (
              <button className="ds-Toast__close" onClick={() => dismiss(toast.id)} aria-label="Dismiss toast">
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export interface ToastContainerProps {
  children?: React.ReactNode;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  maxItems?: number;
}

export const ToastContainer = ToastProvider;

export const Toast: React.FC<ToastItem> = ({
  id,
  title,
  message,
  variant = 'default',
  dismissible = true,
  action
}) => (
  <div id={id} className={`ds-Toast ds-Toast--${variant}`} role="alert">
    <div className="ds-Toast__content">
      {title && <div className="ds-Toast__title">{title}</div>}
      <div className="ds-Toast__message">{message}</div>
    </div>
    {action && (
      <button className="ds-Toast__action" onClick={action.onClick}>
        {action.label}
      </button>
    )}
    {dismissible && (
      <button className="ds-Toast__close" aria-label="Dismiss toast">
        &times;
      </button>
    )}
  </div>
);

export default Toast;

