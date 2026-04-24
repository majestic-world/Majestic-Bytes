import React, { useState } from 'react';

const LuaScriptGenerator: React.FC = () => {
  const [aob, setAob] = useState('');
  const [pointerName, setPointerName] = useState('MySymbol');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generateScript = () => {
    if (!aob || !pointerName) return;

    const template = `[ENABLE]
{$lua}
if syntaxcheck then return end

local aob = "${aob}"
local scan = AOBScan(aob)

if scan == nil or scan.Count == 0 then
  print("Error: [Majestic Byte] Signature not found -> " .. aob)
  if scan then scan.destroy() end
  return false
end

registerSymbol("${pointerName}", scan[0])
scan.destroy() 
{$asm}

[DISABLE]
{$lua}
if syntaxcheck then return end

unregisterSymbol("${pointerName}")
{$asm}`;

    setResult(template);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ borderBottom: '1px solid var(--outline-color)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined">script</span>
            LUA_SCRIPT_GENERATOR
          </h2>
        </div>

        <div className="input-group">
          <label className="label-caps">ARRAY OF BYTES (AOB)</label>
          <input 
            type="text" 
            className="input-field" 
            value={aob}
            onChange={(e) => setAob(e.target.value)}
            placeholder="e.g., 28 DF 94 44 01 ?? ?? 00 00"
          />
        </div>

        <div className="input-group">
          <label className="label-caps">POINTER / SYMBOL NAME</label>
          <input 
            type="text" 
            className="input-field" 
            value={pointerName}
            onChange={(e) => setPointerName(e.target.value)}
            placeholder="e.g., INVENTORY_BASE"
          />
        </div>

        <button className="btn-primary" style={{ margin: '16px 0' }} onClick={generateScript}>
          <span className="material-symbols-outlined">terminal</span>
          GENERATE_LUA_SCRIPT
        </button>

        <div className="input-group">
          <label className="label-caps">LUA_TEMPLATE_OUTPUT</label>
          <textarea 
            className="input-field" 
            style={{ height: '300px', resize: 'none', backgroundColor: '#0e0e0e', opacity: 0.9, fontSize: '12px' }}
            value={result}
            readOnly
            placeholder="Generated Lua script will appear here..."
          />
        </div>

        <button 
          className="btn-primary" 
          onClick={copyToClipboard}
          disabled={!result}
          style={{ color: copied ? '#4ade80' : 'var(--text-primary)' }}
        >
          <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
          {copied ? 'SCRIPT_COPIED' : 'COPY_SCRIPT'}
        </button>
      </div>
    </div>
  );
};

export default LuaScriptGenerator;
