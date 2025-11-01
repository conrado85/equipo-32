import React, { useState, useEffect } from 'react';

const Alert = ({ 
  isOpen, 
  onClose, 
  type = "success", // "success", "error", "warning", "info"
  title = "", 
  message = "", 
  duration = 5000 // Duración en ms, 0 = no auto-close
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Esperar a que termine la animación
  };

  if (!isOpen) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: 'text-green-600',
          title: 'text-green-800',
          message: 'text-green-700',
          iconSymbol: '✅'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          title: 'text-red-800',
          message: 'text-red-700',
          iconSymbol: '❌'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          iconSymbol: '⚠️'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-800',
          message: 'text-blue-700',
          iconSymbol: 'ℹ️'
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          title: 'text-gray-800',
          message: 'text-gray-700',
          iconSymbol: 'ℹ️'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div 
        className={`${styles.container} border rounded-lg shadow-lg p-4 transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`text-xl ${styles.icon}`}>
            {styles.iconSymbol}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`text-sm font-semibold ${styles.title} mb-1`}>
                {title}
              </h4>
            )}
            <p className={`text-sm ${styles.message}`}>
              {message}
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className={`${styles.icon} hover:opacity-70 transition-opacity text-lg font-bold`}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
