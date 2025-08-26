// src/components/CodeEditor.jsx
import React from 'react';

function CodeEditor({ value, onChange }) {
  return (
    <div>
      <label>Code Snippet</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Write your code here..."
        style={{ fontFamily: 'monospace', background: '#f4f4f4' }}
      />
    </div>
  );
}

export default CodeEditor;