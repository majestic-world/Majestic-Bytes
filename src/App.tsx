import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HexConverter from './pages/HexConverter';
import AobSignature from './pages/AobSignature';

function App() {
  const [currentPage, setCurrentPage] = useState('converter');

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        <Header />
        <div className="content-area">
          {currentPage === 'converter' && <HexConverter />}
          {currentPage === 'aob' && <AobSignature />}
        </div>
        <footer style={{ 
          height: '24px', 
          backgroundColor: '#0e0e0e', 
          borderTop: '1px solid var(--outline-color)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-heading)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E0E0E0' }}></span>
              KERNEL ATTACHED
            </span>
            <span>THREADS: 12</span>
            <span>LATENCY: 0.2ms</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>MEMORY: 4.2GB / 16.0GB</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
