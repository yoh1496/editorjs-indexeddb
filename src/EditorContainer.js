import React, { useEffect, useRef, useState } from 'react';

import Editor from '@stfy/react-editor.js';
import Header from '@editorjs/header';
import Marker from '@editorjs/marker';

export function EditorContainer() {
  return (
    <>
      <div id="editor-container" />
      <Editor holderId="editor-container" />
    </>
  );
}
