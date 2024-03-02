"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import "md-editor-rt/lib/style.css";
// import "@uiw/react-markdown-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import MarkdownEditor from "@uiw/react-markdown-editor";
import { usePathname, useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
// import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";

import { Suspense } from "react";
import EasyEdit from "react-easy-edit";

import "@/components/template-globals.css";
import { Switch } from "@nextui-org/react";
import Editor from "ckeditor5-custom-build";
import { useFetchSingleTemplate } from "@/services/TemplateServices";
import { useAxios } from "@/context/AxiosContext";

const mdStr = ``;

export default function Home({ params }) {
  const [richText, setRichText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [text, setText] = useState("# Hello Editor");
  const [name, setName] = useState("Untitled Template");
  const [isPreview, setIsPreview] = useState(false);
  const [isMarkup, setIsMarkup] = React.useState(false);
  const { publicAxios }: any = useAxios();

  const router = useRouter();
  const { data } = useFetchSingleTemplate({ uuid: params.id });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setRichText(data.content);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingBottom: "30px",
        height: "100%",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          padding: "30px 0px",
          paddingBottom: "10px",
          fontSize: "30px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <EasyEdit
            type="text"
            onSave={(value) => {
              setName(value);
            }}
            attributes={{ name: "awesome-input", id: 1 }}
            // instructions="Star this repo!"
            saveOnBlur
            value={name}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              color="primary"
              style={{
                borderRadius: "5px",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                alignItems: "center",
                gap: "3px",
                padding: "10px 15px",
              }}
              onClick={async () => {
                const data = await publicAxios.post(
                  `user/template/${params.id}/edit`,
                  {
                    name,
                    content: richText,
                  }
                );
                router.push("/app/templates");
              }}
            >
              Save
            </Button>
            <Button
              color="danger"
              style={{
                borderRadius: "5px",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                alignItems: "center",
                gap: "3px",
                padding: "10px 15px",
              }}
              onClick={() => router.push("/app/templates")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex md:flex-row flex-col"
        style={{
          minHeight: "700px",
          justifyContent: "space-between",
          width: "100%",
          gap: "30px",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              gap: "20px",
              height: "700px",
              width: "100%",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* <Suspense fallback={null}>
              <CKEditor5
                editor={Editor}
                data={richText}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  setRichText(editor.getData());
                  console.log("change", editor.getData());
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </Suspense> */}
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // gap: "10px",
            flex: 1,
            width: "100%",
            // height: "100%",
            // borderWidth: "1px",
            // backgroundColor: "yellow",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "20px",
              padding: "20px 0px",
            }}
          >
            Preview
          </label>
          <iframe
            id="123532"
            name="123532render"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              gap: "20px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            sandbox="allow-scripts allow-same-origin"
            srcDoc={isMarkup ? richText : richText}
          />
        </div> */}
      </div>
    </div>
  );
}

