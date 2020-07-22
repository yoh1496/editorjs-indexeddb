import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

import Editor from '@stfy/react-editor.js';
import Header from '@editorjs/header';
import Marker from '@editorjs/marker';
import ImageTool from '@editorjs/image';
import Dexie from 'dexie';

const db = new Dexie('draftData');
db.version(1).stores({
  images: '++id, file',
});

export function EditorContainer() {
  const Image = useMemo(
    () => ({
      class: ImageTool,
      config: {
        uploader: {
          async uploadByFile(file) {
            const fileKey = await db.images.put({
              file,
            });
            const content = await db.images.get(fileKey);
            console.log(content);
            const imgURL = URL.createObjectURL(content.file);
            return {
              success: 1,
              file: { url: imgURL, key: fileKey },
            };
          },
          uploadByUrl(url) {
            return {
              success: 1,
              file: { url },
            };
          },
        },
      },
    }),
    []
  );

  const tools = useMemo(
    () => ({
      header: Header,
      marker: Marker,
      image: Image,
    }),
    [Image]
  );
  return (
    <>
      <div
        className="editor-landing__demo"
        style={{
          backgroundColor: '#eef5fa',
          borderRadius: '100px',
          maxWidth: '950px',
          margin: '0 auto',
          padding: '72px 64px',
        }}
      >
        <div
          className="editor_landing__inner"
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow:
              '0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12)',
            padding: '72px 56px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div id="editor-container" />
          <Editor holder="editor-container" tools={tools} />
        </div>
      </div>
    </>
  );
}
