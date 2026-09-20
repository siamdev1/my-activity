import React from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { Navbar } from './components/Navbar';
import { DashboardCard } from './components/DashboardCard';
import { ActivityGraph } from './components/ActivityGraph';

export const App = () => {
  const { theme, toggleTheme } = useDarkMode();

  const techStacks = [
    { name: 'Node.js & Express', status: 'Active', commits: '820+', tag: 'Backend Microservices', color: 'badge-green' },
    { name: 'React 18 & Modern Hooks', status: 'Active', commits: '650+', tag: 'Frontend Dashboards', color: 'badge-blue' },
    { name: 'Python & FastAPI', status: 'Active', commits: '590+', tag: 'ETL & Automation', color: 'badge-amber' },
    { name: 'WordPress & WooCommerce', status: 'Active', commits: '480+', tag: 'Custom Plugins & API', color: 'badge-purple' },
  ];

  const recentCommits = [
    { hash: '86eeb00', type: 'feat', msg: 'Implement rate limiting middleware & token caching', time: '1 hour ago' },
    { hash: '7968bab', type: 'feat', msg: 'Integrate async ETL pipeline with exponential retry logic', time: '4 hours ago' },
    { hash: '8be322e', type: 'refactor', msg: 'Modularize WordPress REST API route handlers', time: 'Yesterday' },
    { hash: '79609b2', type: 'style', msg: 'Refine glassmorphism card elevation & typography system', time: '2 days ago' },
    { hash: 'cd91308', type: 'docs', msg: 'Update architecture diagrams & OpenAPI specification', time: '3 days ago' },
  ];

  return (
    <div className="app-layout">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container">
        {/* Welcome Banner */}
        <div
          className="glass-card"
          style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
                Engineering Activity Hub
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                Full-Stack Workspace & Telemetry
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.925rem' }}>
                Centralized multi-stack workspace maintaining production services, reusable components, automated data pipelines, and custom WordPress systems.
              </p>
            </div>
            <a
              href="https://github.com/siamdev1"
              target="_blank"
              rel="noreferrer"
              className="button-primary"
              style={{ textDecoration: 'none' }}
            >
              View GitHub Profile →
            </a>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid-cols-4">
          <DashboardCard
            title="Total Commits"
            value="2,540+"
            subtitle="Verified Git history"
            icon="⚡"
            badge="Top 5%"
            badgeType="green"
          />
          <DashboardCard
            title="Tech Stacks"
            value="4 Core"
            subtitle="Node, React, Python, WP"
            icon="🛠️"
            badge="Full-Stack"
            badgeType="blue"
          />
          <DashboardCard
            title="Microservices"
            value="3 Active"
            subtitle="REST, FastAPI, WP-JSON"
            icon="🚀"
            badge="100% Uptime"
            badgeType="purple"
          />
          <DashboardCard
            title="Code Quality"
            value="A+ Score"
            subtitle="CI/CD automated checks"
            icon="🛡️"
            badge="Passed"
            badgeType="amber"
          />
        </div>

        {/* Tech Stacks Grid & Recent Activity */}
        <div className="grid-cols-2">
          {/* Tech Stacks Status */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
              Tech Stacks & Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {techStacks.map((stack, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{stack.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stack.tag}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${stack.color}`}>{stack.commits} commits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Commits Feed */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
              Recent Production Commits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recentCommits.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#818cf8',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}
                  >
                    {item.hash}
                  </code>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.msg}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Activity Visualizer */}
        <ActivityGraph />
      </main>
    </div>
  );
};

export default App;
