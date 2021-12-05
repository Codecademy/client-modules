import React from 'react';

export type CopyButtonMode = 'hide' | undefined;

type EditorProps = {
  text: string;
  onChange: (text: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ text, onChange }) => {
  return <textarea value={text} onChange={(e) => onChange(e.target.value)} />;
};
