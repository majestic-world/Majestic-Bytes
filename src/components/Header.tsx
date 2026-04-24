import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ 
          color: 'var(--text-primary)', 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          fontSize: '14px',
          fontFamily: 'var(--font-heading)'
        }}>Majestic Bytes v0.1</span>
        <span style={{ width: '1px', height: '16px', backgroundColor: 'var(--outline-color)' }}></span>
        <span style={{ 
          color: 'var(--text-primary)', 
          fontSize: '12px', 
          fontWeight: 700,
          fontFamily: 'var(--font-heading)' 
        }}>By Mk</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>terminal</span>
        <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>settings</span>
      </div>
    </header>
  );
};

export default Header;