import React, { useState } from 'react';

const PointerFormat: React.FC = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const formatPointer = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, "text/xml");
      
      const address = xmlDoc.getElementsByTagName("Address")[0]?.textContent;
      if (!address) {
        setResult('ERROR: Address tag not found in XML');
        return;
      }

      const offsetNodes = xmlDoc.getElementsByTagName("Offset");
      const offsets = Array.from(offsetNodes).map(n => n.textContent || "0");

      if (offsets.length === 0) {
        setResult('ERROR: No offsets found in XML');
        return;
      }

      // Ignore the last offset (first one in CE XML list)
      offsets.shift();

      // Reverse to build from Base upwards
      const reversedOffsets = offsets.reverse();

      // Build nested string: [[[[Base]+Offset1]+Offset2]...]
      let formatted = address;
      
      for (const offset of reversedOffsets) {
        formatted = `[${formatted}]+${offset}`;
      }

      setResult(formatted);
    } catch (error) {
      setResult('ERROR: Invalid XML format');
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div className="card">
        <div style={{ borderBottom: '1px solid var(--outline-color)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined">format_list_numbered</span>
            POINTER FORMATTER
          </h2>
        </div>

        <div className="input-group">
          <label className="label-caps">CHEAT ENGINE XML</label>
          <textarea 
            className="input-field" 
            style={{ height: '200px', resize: 'none' }}
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder='Paste your <CheatEntry> XML here...'
          />
        </div>

        <button className="btn-primary" style={{ margin: '16px 0' }} onClick={formatPointer}>
          <span className="material-symbols-outlined">auto_fix_high</span>
          FORMAT POINTER
        </button>

        <div className="input-group">
          <label className="label-caps">FORMATTED RESULT</label>
          <textarea 
            className="input-field" 
            style={{ height: '100px', resize: 'none', backgroundColor: '#161616', opacity: 0.8 }}
            value={result}
            readOnly
            placeholder="Result will appear here..."
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
          This tool parses Cheat Engine XML entries and converts them into a nested pointer string. 
          The first offset in the XML (the final offset applied) is automatically ignored as requested.
        </p>
      </div>
    </div>
  );
};

export default PointerFormat;
