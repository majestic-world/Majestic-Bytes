import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HexConverter from './pages/HexConverter';
import AobSignature from './pages/AobSignature';
import LuaScriptGenerator from './pages/LuaScriptGenerator';

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
          {currentPage === 'lua' && <LuaScriptGenerator />}
        </div>
      </main>
    </div>
  );
}

export default App;