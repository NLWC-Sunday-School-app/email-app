"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";
import React, { useRef } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

export default function Home() {
  redirect(`/auth/login`);

  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    // unlayer?.exportHtml((data) => {
    //   const { design, html } = data;
    //   // console.log('exportHtml', html);
    //   console.log('exportHtml', design);
    // });

    unlayer?.saveDesign((data) => {
      // const { design, html } = data;
      // console.log('exportHtml', html);
      console.log('exportHtmllll', data);
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log(unlayer)
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);

    unlayer.addEventListener('design:updated', function (data) {
      var type = data.type; // html:updated 
      console.log('design:updated', data);
    })
  };
  return (
    <div>
      <p>Hello World</p>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <EmailEditor ref={emailEditorRef} onReady={onReady} editorId="editor-2" />
    </div>
  );
}
