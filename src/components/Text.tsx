import React from 'react';

interface TextProps {
  label: string;
  type?: 'title' | 'default';
}

const Text: React.FC<TextProps> = ({ label, type = 'default' }) => {
  const style: React.CSSProperties =
    type === 'title'
      ? {
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '16px 0',
          color: 'white',
        }
      : {
          fontSize: '14px',
          fontWeight: 'normal',
          color: '#213547',
        };

  return type === 'title' ? (
    <h1 style={style}>{label}</h1>
  ) : (
    <p style={style}>{label}</p>
  );
};

export default Text;
