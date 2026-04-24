import React, { useState } from 'react';

const AobSignature: React.FC = () => {
  const [aob1, setAob1] = useState('');
  const [aob2, setAob2] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSignature = () => {
    const bytes1 = aob1.trim().split(/\s+/);
    const bytes2 = aob2.trim().split(/\s+/);

    if (bytes1.length !== bytes2.length) {
      setResult('ERROR: Arrays must have the same length');
      return;
    }

    const signature = bytes1.map((byte, index) => {
      return byte.toUpperCase() === bytes2[index].toUpperCase() ? byte.toUpperCase() : '??';
    });

    setResult(signature.join(' '));
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ borderBottom: '1px solid var(--outline-color)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined">data_object</span>
            AOB SIGNATURE GENERATOR
          </h2>
        </div>

        <div className="input-group">
          <label className="label-caps">ARRAY OF BYTES 1</label>
          <input 
            type="text" 
            className="input-field" 
            value={aob1}
            onChange={(e) => setAob1(e.target.value)}
            placeholder="e.g., 28 DF 94 44 01 00 00 00 00"
          />
        </div>

        <div className="input-group">
          <label className="label-caps">ARRAY OF BYTES 2</label>
          <input 
            type="text" 
            className="input-field" 
            value={aob2}
            onChange={(e) => setAob2(e.target.value)}
            placeholder="e.g., 28 DF 80 44 01 00 00 00 00"
          />
        </div>

        <button className="btn-primary" style={{ margin: '16px 0' }} onClick={generateSignature}>
          <span className="material-symbols-outlined">auto_fix_high</span>
          GENERATE SIGNATURE
        </button>

        <div className="input-group">
          <label className="label-caps">RESULT SIGNATURE</label>
          <textarea 
            className="input-field" 
            style={{ height: '100px', resize: 'none', backgroundColor: '#161616', opacity: 0.8 }}
            value={result}
            readOnly
            placeholder="Generated signature will appear here..."
          />
        </div>

        <button 
          className="btn-primary" 
          onClick={copyToClipboard}
          disabled={!result || result.startsWith('ERROR')}
          style={{ 
            color: copied ? '#4ade80' : 'var(--text-primary)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <span className="material-symbols-outlined" style={{ 
            transform: copied ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s'
          }}>
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'COPIED SUCCESSFULLY' : 'COPY TO CLIPBOARD'}
        </button>
      </div>

      <div className="card" style={{ padding: '12px' }}>
        <h3 className="label-caps" style={{ marginBottom: '8px' }}>HOW IT WORKS</h3>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          Compare two arrays of bytes. If the bytes at the same position match, the byte is kept. If they differ, it is replaced by a wildcard (??).
        </p>
      </div>
    </div>
  );
};

export default AobSignature;
