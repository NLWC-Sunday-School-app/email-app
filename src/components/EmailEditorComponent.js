'use client'

import React, {useEffect, useRef, useState} from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';



/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const CustomEditor = ({ data, setData, design = null, setDesign = null, editorRef = null, onBlur = null }) => {
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
    const [loaded, setLoaded] = useState(false);
    const unlayer = editorRef?.current?.editor;

    useEffect(() => {
        if (design && unlayer && !loaded) {
            console.log('editing')
            setLoaded(true);
            unlayer.loadDesign(design);
        }
    }, [design, unlayer,loaded]);


    // console.log(data)
    const onReady = (unlayer, data) => {
        const debounce = (func, delay) => {
            console.log(delay)
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        };

        const debouncedExport = debounce((data) => {
            unlayer.exportHtml((data) => {
                const { design, html } = data;
                setData(html);
                if (setDesign) {
                    setDesign(design);
                }
                console.log('exportHtmllll', data);
            });
        }, 300);

        unlayer.addEventListener('design:updated', function (data) {
            debouncedExport(data);
        });

        if (onBlur) {
            unlayer.addEventListener('blur', ()=>{
                console.log('just blurred')
            });
        }
    };
    return (
        <EmailEditor ref={editorRef} onReady={onReady} options={{
            appearance: {
                theme: 'modern_light'
            },
            tools: {
                form: {
                    enabled: false
                }
            }
        }} />
    );
}

export default CustomEditor