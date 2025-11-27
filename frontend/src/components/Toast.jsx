import { useEffect } from 'react';

// WHY: Reusable toast notification component for success/error messages
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  // WHY: Auto-close toast after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // WHY: Define styles for different toast types
  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-400',
      text: 'text-green-800',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-400',
      text: 'text-red-800',
      iconPath: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-400',
      text: 'text-blue-800',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  };

  const styles = typeStyles[type] || typeStyles.success;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${styles.bg} border rounded-lg shadow-lg p-4 max-w-md`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className={`h-6 w-6 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`ml-3 flex-shrink-0 ${styles.icon} hover:opacity-75`}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
