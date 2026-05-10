import React, { useState } from 'react';

const MassHexConverter: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleConvert = () => {
    if (!inputVal) return;
    
    try {
      const lines = inputVal.split('\n');
      const results = lines.map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';
        
        const match = trimmedLine.match(/^([^=\s]+)\s*=\s*([0-9A-Fa-f]+)$/);
        if (match) {
          const [_, name, hex] = match;
          try {
            const dec = BigInt('0x' + hex).toString();
            return `${name}=${dec}`;
          } catch (e) {
            return `${name}=ERROR`;
          }
        }
        return line;
      });
      setOutputVal(results.join('\n'));
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

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--outline-color)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span className="material-symbols-outlined">dataset</span>
            MASS DATA CONVERTER
          </h2>
        </div>

        <div className="input-group">
          <label className="label-caps">HEXADECIMAL DATA (KEY=HEX)</label>
          <div style={{ position: 'relative' }}>
            <textarea 
              className="input-field" 
              rows={12}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="RAX=000001E7F6910270&#10;RBX=000000000000001D"
              style={{ resize: 'vertical', minHeight: '200px' }}
            />
            <button 
              className="btn-primary" 
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                width: 'auto', 
                padding: '4px 8px', 
                color: copiedInput ? '#4ade80' : 'var(--text-primary)',
                fontSize: '10px'
              }}
              onClick={() => copyToClipboard(inputVal, 'input')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{copiedInput ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>

        <button className="btn-primary" style={{ margin: '16px 0' }} onClick={handleConvert}>
          <span className="material-symbols-outlined">play_arrow</span>
          CONVERT MASS DATA
        </button>

        <div className="input-group">
          <label className="label-caps">RESULT OUTPUT (KEY=DECIMAL)</label>
          <div style={{ position: 'relative' }}>
            <textarea 
              className="input-field" 
              rows={18}
              value={outputVal}
              readOnly
              placeholder="Waiting for input..."
              style={{ 
                backgroundColor: '#161616', 
                opacity: 0.8, 
                resize: 'vertical', 
                minHeight: '350px' 
              }}
            />
            <button 
              className="btn-primary" 
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                width: 'auto', 
                padding: '4px 8px', 
                color: copiedOutput ? '#4ade80' : 'var(--text-primary)',
                fontSize: '10px'
              }}
              onClick={() => copyToClipboard(outputVal, 'output')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{copiedOutput ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '12px' }}>
        <h3 className="label-caps" style={{ marginBottom: '8px' }}>SYSTEM LOG</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
          <div>[INFO] Mass converter ready.</div>
          <div>[READY] Awaiting block data...</div>
        </div>
      </div>
    </div>
  );
};

export default MassHexConverter;
