"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "md-editor-rt/lib/style.css";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
// import MarkdownEditor from "@uiw/react-markdown-editor";
import { usePathname, useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";

import { Suspense } from "react";
import EasyEdit from "react-easy-edit";

import "@/components/template-globals.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Switch } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";

const mdStr = ``;

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [richText, setRichText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [text, setText] = useState("# Hello Editor");
  const [name, setName] = useState("Untitled Template");
  const [isPreview, setIsPreview] = useState(false);
  const [isMarkup, setIsMarkup] = React.useState(true);

  const router = useRouter();

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
              onClick={() => router.push("/app/templates")}
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
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p
              style={{
                display: "flex",
                gap: "5px",
                fontSize: "20px",
                padding: "20px 0px",
              }}
            >
              Content
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p style={{ fontSize: "10px" }}>RichText Editor</p>
              <Switch isSelected={isMarkup} onValueChange={setIsMarkup}>
                {" "}
                <p style={{ fontSize: "10px" }}>Markup Editor</p>
              </Switch>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              gap: "20px",
              height: "700px",
              width: "100%",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {!isMarkup && (
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
                value={markdown}
                onChange={(value) => {
                  console.log("md", value);

                  setMarkdown(value);
                }}
                // height="700px"
                width="100%"
                hideToolbar
                style={{
                  // display: "flex",
                  flex: 1,
                }}
              />
            )}
            {/* <Suspense fallback={null}>
            </Suspense> */}
          </div>
        </div>
        <div
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
            srcDoc={isMarkup ? markdown : richText}
          />
        </div>
      </div>
    </div>
  );
}

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

const Modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const Formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
