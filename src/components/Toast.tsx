import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, autoCloseTime, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-gradient-to-r from-primary-500 to-accent-500',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`${bgColor[type]} text-white p-4 rounded-lg shadow-lg max-w-md flex items-center justify-between`}>
        <div className="flex-1">{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;