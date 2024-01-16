"use client";
import Image from "next/image";
import { useAuth } from "../../../../context/AuthContext";
import CustomTable from "../../../../components/table";
import React, { useState } from "react";
import "md-editor-rt/lib/style.css";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
// import MarkdownEditor from "@uiw/react-markdown-editor";
import { usePathname, useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";

import { Suspense } from "react";
import EasyEdit from "react-easy-edit";

import "@/components/template-globals.css";

const mdStr = ``;

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [markdown, setMarkdown] = useState("");
  const [text, setText] = useState("# Hello Editor");
  const [name, setName] = useState("Untitled Template");
  const [isPreview, setIsPreview] = useState(false);

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
              backgroundColor: "white",
              // padding: "20px 10px",
              gap: "20px",
              // margin: "30px 20px",
              width: "100%",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MarkdownEditor
              value={markdown}
              onChange={(value) => setMarkdown(value)}
              // height="700px"
              hideToolbar
              style={
                {
                  // display: "flex",
                  // flex: 1,
                }
              }
            />
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
              // minHeight: "700px",
              width: "100%",
              backgroundColor: "white",
              // padding: "20px 10px",
              gap: "20px",
              // margin: "30px 20px",
              // width: "100%",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            sandbox="allow-scripts allow-same-origin"
            srcDoc={markdown}
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
