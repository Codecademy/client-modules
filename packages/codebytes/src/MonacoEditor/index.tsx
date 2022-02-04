// DO NOT CHANGE ANYTHING HERE
// This component is part of the Codebytes MVP and only includes basic configuration around theming
// We are working on a monaco package in client-modules that has more configuration around themes and languages
// Monaco as a shared package RFC https://www.notion.so/codecademy/Monaco-editor-as-a-shared-package-1f4484db165b4abc8394c3556451ef6a

import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import ReactMonacoEditor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useRef } from 'react';
import ResizeObserver from 'react-resize-observer';

import { dark } from './theme';
import { Monaco } from './types';

export type SimpleMonacoEditorProps = {
  value: string;
  language: string;
  onChange?: (value: string) => void;
};

type ThemedEditor = Parameters<OnMount>[0];

// A hidden element in monaco was causing its container to overflow
// https://github.com/microsoft/monaco-editor/issues/29#issuecomment-753854541
const EditorWrapper = styled(Box)`
  & .monaco-editor.rename-box,
  .monaco-hover {
    top: 0;
  }
  // A hidden overflowing element causes accessibility errors
  // The background of the overflowing element causes triggers color contrast errors
  & .lines-content {
    height: 100% !important;
  }
`;

export const SimpleMonacoEditor: React.FC<SimpleMonacoEditorProps> = ({
  value,
  language,
  onChange,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorWillMount = useCallback(
    (editor: ThemedEditor, monaco: Monaco) => {
      editorRef.current = editor;
      monaco.editor.defineTheme('dark', dark);
      monaco.editor.setTheme('dark');
    },
    []
  );
  return (
    <EditorWrapper>
      <ResizeObserver
        onResize={({ height, width }) => {
          editorRef.current?.layout({
            height,
            width,
          });
        }}
      />
      <ReactMonacoEditor
        onMount={editorWillMount}
        onChange={onChange}
        options={{ minimap: { enabled: false } }}
        theme="vs-dark"
        value={value}
        language={language}
      />
    </EditorWrapper>
  );
};
