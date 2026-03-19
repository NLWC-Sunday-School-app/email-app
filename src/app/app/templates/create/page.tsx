"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import EasyEdit from "react-easy-edit";
import dynamic from "next/dynamic";
import { useAxios } from "@/context/AxiosContext";

const CustomEditor = dynamic(
  () => {
    return import("@/components/EmailEditorComponent");
  },
  { ssr: false }
);

export default function Home() {
  const [richText, setRichText] = useState("");
  const [richDesign, setRichDesign] = useState("");
  const [name, setName] = useState("Untitled Template");
  const { publicAxios }: any = useAxios();

  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await publicAxios.post(`user/template/create`, {
        name,
        content: richText,
        design: richDesign,
      });
      console.log("Template saved:", response.data);
      router.push("/app/templates");
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center w-full pb-8 h-full">
      <div className="self-start py-8 pb-4 w-full">
        <div className="flex justify-between w-full items-center">
          <div className="text-2xl font-bold">
            <EasyEdit
              type="text"
              onSave={(value) => setName(value)}
              attributes={{ name: "template-name", id: 1 }}
              saveOnBlur
              value={name}
            />
          </div>
          <div className="flex gap-3">
            <Button
              color="primary"
              className="font-bold px-6"
              onClick={handleSave}
            >
              Save Template
            </Button>
            <Button
              color="danger"
              variant="flat"
              className="font-bold"
              onClick={() => router.push("/app/templates")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-8 flex-1">
        <div className="flex flex-col items-start flex-1 min-h-[700px]">
          <div className="bg-white w-full h-full rounded-2xl overflow-hidden soft-shadow">
            <CustomEditor 
                data={richText} 
                setData={setRichText} 
                design={richDesign}
                setDesign={setRichDesign}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
