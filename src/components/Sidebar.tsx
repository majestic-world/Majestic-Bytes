import React from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div style={{ padding: '32px 24px' }}>
        <h1 style={{ 
          color: 'var(--text-primary)', 
          fontWeight: 900, 
          letterSpacing: '0.1em', 
          fontSize: '14px',
          fontFamily: 'var(--font-heading)'
        }}>Majestic Bytes</h1>
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '11px', 
          fontWeight: 700,
          color: 'var(--text-secondary)',
          marginTop: '4px'
        }}>Cheat Engine Assistant</p>
      </div>
      
      <nav style={{ flex: 1 }}>
        <a 
          href="#" 
          className={`nav-item ${currentPage === 'converter' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('converter'); }}
        >
          <span className="material-symbols-outlined">analytics</span>
          HEX CONVERTER
        </a>
        <a 
          href="#" 
          className={`nav-item ${currentPage === 'aob' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('aob'); }}
        >
          <span className="material-symbols-outlined">data_object</span>
          AOB SIGNATURE
        </a>
        <a 
          href="#" 
          className={`nav-item ${currentPage === 'lua' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('lua'); }}
        >
          <span className="material-symbols-outlined">script</span>
          LUA AOB SCRIPT
        </a>
        <a 
          href="#" 
          className={`nav-item ${currentPage === 'pointer' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('pointer'); }}
        >
          <span className="material-symbols-outlined">format_list_numbered</span>
          POINTER FORMAT
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
