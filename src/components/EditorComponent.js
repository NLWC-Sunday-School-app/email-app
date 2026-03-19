'use client'

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

/**
 * CustomEditor for CKEditor 5.
 * This component should always be imported using dynamic(..., { ssr: false }) 
 * because CKEditor 5 accesses global browser objects (window, document) on import.
 */
const CustomEditor = ({ data, setData, editorRef = null }) => {
    return (
        <div className="ck-editor-container">
            <CKEditor
                editor={Editor}
                data={data}
                onReady={(editor) => {
                    if (editorRef) {
                        editorRef.current = editor;
                    }
                    // Apply some basic styling to ensure it takes up space
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "min-height",
                            "500px",
                            editor.editing.view.document.getRoot()
                        );
                    });
                }}
                onChange={(event, editor) => {
                    const content = editor.getData();
                    setData(content);
                }}
                config={{
                    // Ensure the editor fits the container
                    width: '100%',
                    height: '100%'
                }}
            />
            <style jsx global>{`
                .ck-editor__editable_inline {
                    min-height: 500px;
                }
                .ck-editor-container .ck-editor {
                    width: 100% !important;
                }
            `}</style>
        </div>
    );
};

export default CustomEditor;
