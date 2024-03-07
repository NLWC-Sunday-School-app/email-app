'use client'

import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build"



/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const CustomEditor = ({ data, setData, editorRef = null }) => {
    return <CKEditor
        editor={Editor}
        data={data}
        onReady={(editor) => {
            if (editorRef) {
                editorRef.current = editor
            }
        }}
        onChange={(event, editor) => {
            setData(editor.getData());
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
    />
}

export default CustomEditor