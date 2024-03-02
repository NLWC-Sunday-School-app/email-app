"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React, { useState } from "react";
// import "md-editor-rt/lib/style.css";
// import dynamic from "next/dynamic";
// import "@uiw/react-markdown-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";

// import MarkdownEditor from "@uiw/react-markdown-editor";
import { usePathname, useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useTemplatesList } from "./useTemplatesList";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [campaignName, setCampaignName] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("No Template");
  const [selectedEmailService, setSelectedEmailService] = useState("");
  const [trackOpens, setTrackOpens] = useState(false);
  const [trackClicks, setTrackClicks] = useState(false);
  const [mailContent, setMailContent] = useState("");

  const clearContents = () => {
    setCampaignName("");
    setMailSubject("");
    setFromName("");
    setFromEmail("");
    setSelectedTemplate("No Template");
    setSelectedEmailService("");
    setTrackOpens(false);
    setTrackClicks(false);
    setMailContent("");
  };

  const isTemplate = React.useMemo(() => {
    if (selectedTemplate === "No Template") return true;
    return false;
  }, [selectedTemplate]);

  const [isOpen, setIsOpen] = React.useState(false);
  // const { items, hasMore, isLoading, onLoadMore } = useListTemplates({
  //   fetchDelay: 1500,
  // });
  const { items, hasMore, isLoading, onLoadMore } = useTemplatesList({
    fetchDelay: 1500,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const validateEmail = (value:string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isFromEmailInvalid = React.useMemo(() => {
    if (!fromEmail) return false;
    return validateEmail(fromEmail) ? false : true;
  }, [fromEmail]);

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
          width: "70%",
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
            Campaign Name <p style={{ color: "red" }}>*</p>
          </label>
          <Input
            radius={"sm"}
            variant="bordered"
            labelPlacement="outside"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            Email Subject <p style={{ color: "red" }}>*</p>
          </label>
          <Input
            radius={"sm"}
            labelPlacement="outside"
            variant="bordered"
            value={mailSubject}
            onChange={(e) => setMailSubject(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            From Name <p style={{ color: "red" }}>*</p>
          </label>
          <Input
            radius={"sm"}
            labelPlacement="outside"
            variant="bordered"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            From Email <p style={{ color: "red" }}>*</p>
          </label>
          <Input
            radius={"sm"}
            labelPlacement="outside"
            variant="bordered"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            isInvalid={isFromEmailInvalid}
            errorMessage={
              isFromEmailInvalid ? "Please enter a valid email" : ""
            }
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            Template
          </label>
          <Select
            aria-label="Select Template"
            variant={"bordered"}
            isLoading={isLoading}
            labelPlacement="outside"
            radius={"sm"}
            items={items}
            placeholder="Select Template"
            scrollRef={scrollerRef}
            selectionMode="single"
            onOpenChange={setIsOpen}
            value={[selectedTemplate]}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {(item: any) => (
              <SelectItem key={item.name} className="capitalize">
                {item.name}
              </SelectItem>
            )}
          </Select>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label style={{ display: "flex", gap: "5px", fontSize: "14px" }}>
            Email Service<p style={{ color: "red" }}>*</p>
          </label>
          <Select
            aria-label="Select Template"
            variant={"bordered"}
            isLoading={isLoading}
            labelPlacement="outside"
            radius={"sm"}
            items={items}
            placeholder="Select Email Service"
            scrollRef={scrollerRef}
            selectionMode="single"
            onOpenChange={setIsOpen}
            value={[selectedEmailService]}
            onChange={(e) => setSelectedEmailService(e.target.value)}
          >
            {(item: any) => (
              <SelectItem key={item.name} className="capitalize">
                {item.name}
              </SelectItem>
            )}
          </Select>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
            }}
          >
            Track Opens<p style={{ color: "red" }}>*</p>
          </label>
          <Checkbox isSelected={trackOpens} onValueChange={setTrackOpens} />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
            }}
          >
            Track Clicks<p style={{ color: "red" }}>*</p>
          </label>
          <Checkbox isSelected={trackClicks} onValueChange={setTrackClicks} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            flex: 1,
            width: "100%",
            height: "500px",
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
         
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            gap: "10px",
          }}
        >
          <Button
            color="default"
            radius="sm"
            style={{ borderRadius: "5px" }}
            onPress={() => {
              clearContents();
              router.push("/app/campaigns");
            }}
          >
            Back to Drafts
          </Button>
          <Button
            color="primary"
            style={{ borderRadius: "5px" }}
            isDisabled={
              !mailContent ||
              !campaignName ||
              !selectedEmailService ||
              !selectedTemplate ||
              !fromEmail ||
              !mailSubject ||
              !mailSubject ||
              !fromName
            }
            onPress={() => {
              router.push("/app/campaigns/2/preview");
              clearContents();
            }}
          >
            Save and continue
          </Button>
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
