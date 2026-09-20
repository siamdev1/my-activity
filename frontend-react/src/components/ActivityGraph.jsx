import React, { useMemo } from 'react';

export const ActivityGraph = () => {
  // Generate mock weeks of realistic contribution intensity
  const cells = useMemo(() => {
    const totalDays = 52 * 7;
    const items = [];
    const colors = [
      'rgba(255,255,255,0.06)',
      '#0e4429',
      '#006d32',
      '#26a641',
      '#39d353'
    ];

    for (let i = 0; i < totalDays; i++) {
      const level = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
      items.push({
        id: i,
        level,
        color: colors[level]
      });
    }
    return items;
  }, []);

  return (
    <div className="glass-card" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Annual Contribution Heatmap</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            2,540+ commits engineered across Node.js, Python, React & WordPress repositories
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Less</span>
          {['rgba(255,255,255,0.06)', '#0e4429', '#006d32', '#26a641', '#39d353'].map((bg, idx) => (
            <span
              key={idx}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: bg,
                display: 'inline-block'
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(7, 11px)',
          gridAutoFlow: 'column',
          gridAutoColumns: '11px',
          gap: '3px',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell.id}
            title={`Activity intensity level: ${cell.level}`}
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '2px',
              backgroundColor: cell.color,
              transition: 'transform 0.1s ease',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};
