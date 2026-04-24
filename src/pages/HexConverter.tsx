import React, { useState } from 'react';

const HexConverter: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [isHexToDec, setIsHexToDec] = useState(true);
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleConvert = () => {
    if (!inputVal) return;
    
    try {
      if (isHexToDec) {
        const cleanHex = inputVal.replace(/^0x/i, '');
        const dec = parseInt(cleanHex, 16);
        setOutputVal(isNaN(dec) ? 'ERROR' : dec.toString());
      } else {
        const dec = parseInt(inputVal, 10);
        setOutputVal(isNaN(dec) ? 'ERROR' : '0x' + dec.toString(16).toUpperCase());
      }
    } catch (e) {
      setOutputVal('ERROR');
    }
  };

  const copyToClipboard = (text: string, type: 'input' | 'output') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'input') {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const toggleMode = () => {
    setIsHexToDec(!isHexToDec);
    setInputVal('');
    setOutputVal('');
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-color)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span className="material-symbols-outlined">analytics</span>
            DATA CONVERTER
          </h2>
          <button 
            onClick={toggleMode}
            className="btn-primary" 
            style={{ width: 'auto', padding: '4px 12px', fontSize: '10px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>sync_alt</span>
            {isHexToDec ? 'HEX TO DEC' : 'DEC TO HEX'}
          </button>
        </div>

        <div className="input-group">
          <label className="label-caps">{isHexToDec ? 'HEXADECIMAL INPUT' : 'DECIMAL INPUT'}</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="input-field" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isHexToDec ? 'e.g., 0x1A2B' : 'e.g., 6699'}
            />
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '0 16px', color: copiedInput ? '#4ade80' : 'var(--text-primary)' }}
              onClick={() => copyToClipboard(inputVal, 'input')}
            >
              <span className="material-symbols-outlined">{copiedInput ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>

        <button className="btn-primary" style={{ margin: '16px 0' }} onClick={handleConvert}>
          <span className="material-symbols-outlined">play_arrow</span>
          GENERATE OUTPUT
        </button>

        <div className="input-group">
          <label className="label-caps">RESULT OUTPUT</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="input-field" 
              value={outputVal}
              readOnly
              placeholder="Waiting for input..."
              style={{ backgroundColor: '#161616', opacity: 0.8 }}
            />
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '0 16px', color: copiedOutput ? '#4ade80' : 'var(--text-primary)' }}
              onClick={() => copyToClipboard(outputVal, 'output')}
            >
              <span className="material-symbols-outlined">{copiedOutput ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '12px' }}>
        <h3 className="label-caps" style={{ marginBottom: '8px' }}>SYSTEM LOG</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
          <div>[INFO] Converters initialized.</div>
          <div>[READY] Awaiting user interaction...</div>
        </div>
      </div>
    </div>
  );
};

export default HexConverter;
