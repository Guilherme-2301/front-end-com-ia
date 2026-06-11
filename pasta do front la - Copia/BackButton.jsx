import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'transparent',
        color: '#71717A',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        padding: '8px 0',
      }}
    >
      ⬅ Voltar
    </button>
  );
};

export default BackButton;