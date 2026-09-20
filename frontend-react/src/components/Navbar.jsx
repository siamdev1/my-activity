import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            S
          </div>
          <div>
            <h1 style={{ fontSize: '1.125rem', fontWeight: '700', lineHeight: 1.2 }}>
              siamdev1 / my-activity
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Engineering Activity & Microservice Hub
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="https://github.com/siamdev1/my-activity"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            GitHub Repo ↗
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};
