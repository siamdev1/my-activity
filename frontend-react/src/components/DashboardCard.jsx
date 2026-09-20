import React from 'react';

export const DashboardCard = ({ title, value, subtitle, icon, badge, badgeType = 'blue' }) => {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>
          {title}
        </span>
        {icon && <span style={{ fontSize: '1.25rem' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '1.875rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {subtitle && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {subtitle}
          </span>
        )}
        {badge && (
          <span className={`badge badge-${badgeType}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
