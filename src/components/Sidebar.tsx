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
        }}>CORE_SYSTEM</h1>
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '11px', 
          fontWeight: 700,
          color: 'var(--text-secondary)',
          marginTop: '4px'
        }}>MONITOR_ACTIVE</p>
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
          AOB_SIGNATURE
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">account_tree</span>
          POINTER_SCAN
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">code</span>
          HEX_EDITOR
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">bug_report</span>
          DEBUGGER
        </a>
      </nav>

      <div style={{ padding: '16px 0', borderTop: '1px solid var(--outline-color)' }}>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">list_alt</span>
          LOGS
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">help_outline</span>
          HELP
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
