"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React, { useState } from "react";
import "md-editor-rt/lib/style.css";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { usePathname, useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
const mdStr = ``;

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [markdown, setMarkdown] = useState(mdStr);
  const [text, setText] = useState("# Hello Editor");
  const [name, setName] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "white",
          padding: "20px 30px",
          gap: "20px",
          margin: "30px 20px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            Template Name <p style={{ color: "red" }}>*</p>
          </label>
          <Input
            radius={"sm"}
            isRequired
            labelPlacement="outside"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            flex: 1,
            width: "100%",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
            }}
          >
            Content
          </label>
          <MarkdownEditor
            value={markdown}
            onChange={(value, viewUpdate) => setMarkdown(value)}
            height="1000px"
            width="100%"
            style={{ display: "flex", flex: 1 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            gap: "10px",
          }}
        >
          {isPreview && (
            <Button
              color="default"
              radius="sm"
              style={{ borderRadius: "5px" }}
              onPress={() => {
                setIsPreview(false);
              }}
            >
              Show Design
            </Button>
          )}
          {!isPreview && (
            <Button
              color="default"
              radius="sm"
              style={{ borderRadius: "5px" }}
              onPress={() => {
                setIsPreview(true);
              }}
            >
              Show Preview
            </Button>
          )}
          <Button
            color="primary"
            style={{ borderRadius: "5px" }}
            isDisabled={!name || !markdown}
            onPress={() => {
              router.push("/app/campaigns/2/preview");
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
