import React from 'react';

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s ease'
      }}
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};
