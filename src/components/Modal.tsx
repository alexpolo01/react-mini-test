import React, { useEffect } from 'react';
import Button from './Button';

interface ModalProps {
  title: string;
  body: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, body, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Close icon on upper right corner */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            lineHeight: 1,
            padding: '4px',
          }}
          aria-label='Close'
        >
          ×
        </button>

        {/* Title */}
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#213547',
            paddingRight: '24px',
          }}
        >
          {title}
        </h2>

        {/* Body */}
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            color: '#444',
            lineHeight: 1.6,
            textAlign: 'justify',
          }}
        >
          {body}
        </p>

        {/* Footer with close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #eee',
            paddingTop: '16px',
          }}
        >
          <Button label='Close' onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
