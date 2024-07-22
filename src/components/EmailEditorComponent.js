'use client'

import React, { useEffect, useRef } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';



/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const CustomEditor = ({ data, setData, design = null, setDesign = null, editorRef = null }) => {
    // return <CKEditor
    //     editor={Editor}
    //     data={data}
    //     onReady={(editor) => {
    //         if (editorRef) {
    //             editorRef.current = editor
    //         }
    //     }}
    //     onChange={(event, editor) => {
    //         setData(editor.getData());
    //     }}
    //     onBlur={(event, editor) => {
    //     }}
    //     onFocus={(event, editor) => {
    //     }}
    // />

    // const emailEditorRef = useRef(null);
    const unlayer = editorRef?.current?.editor;



    if (design && editorRef?.current) {
        // console.log(data)
        unlayer.loadDesign(design);
    }

    // console.log(data)
    const onReady = (unlayer, data) => {
        unlayer.addEventListener('design:updated', function (data) {
            unlayer.exportHtml((data) => {
                const { design, html } = data;
                setData(html)
                if (setDesign) {
                    setDesign(design)
                }
                console.log('exportHtmllll', data);
            })
        })
    };
    return (
        <EmailEditor ref={editorRef} onReady={onReady} options={{}} />
    );
}

export default CustomEditor