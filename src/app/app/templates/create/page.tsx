"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { Suspense } from "react";
import EasyEdit from "react-easy-edit";
import dynamic from "next/dynamic";

import Editor from "ckeditor5-custom-build";
import { useAxios } from "@/context/AxiosContext";

export default function Home() {
  const [richText, setRichText] = useState("Edit your new template here...");
  const [name, setName] = useState("Untitled Template");
  const { publicAxios }: any = useAxios();
  const [viewEditor, setViewEditor] = useState(false);

  const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     setViewEditor(true);
  //   }, 3000);
  // }, []);

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
                const data = await publicAxios.post(`user/template/create`, {
                  name,
                  content: richText,
                });
                console.log(data);
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
            {/* {!isMarkup && (
              <ReactQuill
                theme="snow"
                value={richText}
                onChange={setRichText}
                modules={Modules}
                formats={Formats}
                style={{
                  height: "90%",
                }}
              />
            )}

            {isMarkup && (
              <MarkdownEditor
                value={richText}
                onChange={(value) => {
                  console.log("md", value);

                  setRichText(value);
                }}
                // height="700px"
                width="100%"
                hideToolbar
                style={{
                  // display: "flex",
                  flex: 1,
                }}
              />
            )} */}
            {/* <CKEditor5
              editor={Editor}
              data={richText}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                setRichText(editor.getData());
                // console.log("change", editor.getData());
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            /> */}
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
