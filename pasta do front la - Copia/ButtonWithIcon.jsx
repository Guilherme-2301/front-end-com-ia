import React from 'react';

const ButtonWithIcon = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#FFF',
        color: '#4F46E5',
        border: '1px solid #4F46E5',
        padding: '10px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#EEF2FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#FFF';
      }}
    >
      {title}
      <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
    </button>
  );
};

export default ButtonWithIcon;