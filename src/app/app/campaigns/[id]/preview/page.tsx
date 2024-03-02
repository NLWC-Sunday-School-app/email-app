"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import { TickCircleIcon } from "@/components/TickCircleIcon";
import React, { useState, Component, useEffect, Suspense, useRef } from "react";
// import "md-editor-rt/lib/style.css";
// import dynamic from "next/dynamic";
// import "@uiw/react-markdown-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
import "@/components/template-globals.css";

// import MarkdownEditor from "@uiw/react-markdown-editor";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useRouter as nextRouter } from "next/router";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  User,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useTemplatesList } from "@/components/useTemplatesList";
import { Accordion, AccordionItem, Switch } from "@nextui-org/react";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import EasyEdit from "react-easy-edit";
import {
  canEditQueuedCampaign,
  useDeleteOneCampaign,
  useViewOneCampaign,
} from "@/services/CampaignServices";
import { useListTemplates } from "@/services/TemplateServices";
// import { CKEditor as CKEditor5 } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import AsyncSelect, { useAsync } from "react-select/async";
import { useAxios } from "@/context/AxiosContext";
import { useAsyncList } from "@react-stately/data";
import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import debounce from "lodash.debounce";

export default function Home({ params }) {
  const [campaignName, setCampaignName] = useState("Untitled Campaign");
  const [mailSubject, setMailSubject] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>({});
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [selectedEmailService, setSelectedEmailService] = useState<any>({});
  const [mailingList, setMailingList] = useState<any>({});
  const [trackOpens, setTrackOpens] = useState(false);
  const [trackClicks, setTrackClicks] = useState(false);
  const [mailContent, setMailContent] = useState("");
  const [sendTime, setSendTime] = React.useState("send-now");
  const [sendLaterTime, setSendLaterTime] = React.useState(
    dayjs("+5 minutes").format("YYYY-MM-DD HH:mm:ss")
  );
  const [testEmail, setTestEmail] = React.useState("");
  const [sendLaterDate, setSendLaterDate] = React.useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const {
    isOpen: isOpenPreview,
    onOpen: onOpenPreview,
    onOpenChange: onOpenChangePreview,
  } = useDisclosure();
  let editorRef = useRef<any>();

  const { publicAxios }: any = useAxios();

  const clearContents = () => {
    setCampaignName("");
    setMailSubject("");
    setFromName("");
    setFromEmail("");
    setSelectedTemplate("-1");
    setSelectedEmailService("");
    setTrackOpens(false);
    setTrackClicks(false);
    setMailContent("");
  };

  const isTemplate = React.useMemo(() => {
    if (selectedTemplate === "New Template") return true;
    return false;
  }, [selectedTemplate]);
  const isToSectionFilled = React.useMemo(
    () => (mailingList ? true : false),
    [mailingList]
  );

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isFromEmailInvalid = React.useMemo(() => {
    if (!fromEmail) return false;
    return validateEmail(fromEmail) ? false : true;
  }, [fromEmail]);
  const isTestEmailInvalid = React.useMemo(() => {
    if (!testEmail) return false;
    return validateEmail(testEmail) ? false : true;
  }, [testEmail]);

  const isFromSectionFilled = React.useMemo(
    () => (fromName && !isFromEmailInvalid ? true : false),
    [fromName, fromEmail]
  );
  const isSubjectSectionFilled = React.useMemo(
    () => (mailSubject ? true : false),
    [mailSubject]
  );
  const isSendTimeSectionFilled = React.useMemo(() => {}, [sendTime]);
  const isEmailServiceSectionFilled = React.useMemo(
    () => (selectedEmailService ? true : false),
    [selectedEmailService]
  );
  const isContentSectionFilled = React.useMemo(
    () => (mailContent ? true : false),
    [mailContent]
  );

  const [isOpen, setIsOpen] = React.useState(false);

  let templateList = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText) {
        return {
          items: [],
        };
      }
      let res = await publicAxios.get(
        `/user/template/list?search=${filterText}&page=1&page_size=30`,
        { signal }
      );

      return {
        items: res?.data?.data,
      };
    },
  });

  let mailingListList = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText) {
        return {
          items: [],
        };
      }
      let res = await publicAxios.get(
        `/user/mailing-list/list?search=${filterText}&page=1&page_size=30`,
        { signal }
      );

      return {
        items: res?.data?.data,
      };
    },
  });

  let emailServicesList = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText) {
        return {
          items: [],
        };
      }
      let res = await publicAxios.get(
        `/user/services/list?search=${filterText}&page=1&page_size=30`,
        { signal }
      );
      console.log(res);

      return {
        items: res?.data?.data?.data ?? [],
      };
    },
  });

  const router = useRouter();

  const save = (value) => {
    // alert(value);
    setCampaignName(value);
  };
  const cancel = () => {
    alert("Cancelled");
  };

  const { data, isError } = useViewOneCampaign({ uuid: params.id });

  useEffect(() => {
    if (data) {
      // if (
      //   data?.status == "QUEUED" &&
      //   !canEditQueuedCampaign(data?.scheduled_at)
      // ) {
      //   router.push(`/app/campaigns/${data?.uuid}/status`);
      // }

      setCampaignName(data?.name);
      setMailSubject(data?.subject);
      setFromName(data?.from_name);
      setFromEmail(data?.from_email);
      setSelectedTemplate(data?.template);
      setSelectedEmailService(data?.email_service);
      setTrackOpens(data?.is_open_tracking);
      setTrackClicks(data?.is_click_tracking);
      setMailContent(data?.content ?? data?.template?.content);
      if (data?.template_uuid && data?.template != null) {
        // setSelectedTemplateName(data?.template?.name);
      }
      setMailingList(data?.mailing_list);
      setSelectedEmailService(data?.service);
      setSendLaterTime(
        data?.scheduled_at ??
          dayjs().add(5, "minutes").format("YYYY-MM-DD HH:mm:ss")
      );
    }
  }, [data]);

  const updateCampaign = debounce(async () => {
    let res = await publicAxios.post(`/user/campaign/${params.id}/edit`, {
      name: campaignName,
      from_name: fromName,
      from_email: fromEmail,
      subject: mailSubject,
      content: mailContent,
      is_open_tracking: trackOpens,
      status: "DRAFT",
      is_click_tracking: trackClicks,
      template_uuid: selectedTemplate?.uuid ?? null,
      email_service_uuid: selectedEmailService?.uuid ?? null,
      mailing_list_uuid: mailingList?.uuid ?? null,
      send_when: sendTime == "send-later" ? "SEND_LATER" : "SEND_NOW",
      scheduled_at:
        sendTime == "send-later"
          ? sendLaterTime
          : dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    console.log(res);
    console.log("Auto-saving:", fromName);
  }, 1500);
  useEffect(() => {
    if (!isFromEmailInvalid) {
      updateCampaign();
    }
    return () => {
      updateCampaign.cancel();
    };
  }, [fromName, fromEmail]);

  useEffect(() => {
    updateCampaign();
    return () => {
      updateCampaign.cancel();
    };
  }, [
    sendTime,
    sendLaterTime,
    trackClicks,
    trackOpens,
    selectedTemplate,
    mailContent,
    selectedEmailService,
    mailingList,
    mailSubject,
    campaignName,
  ]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignSelf: "center",
          gap: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "20px",
          height: "100%",
          fontSize: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <EasyEdit
            type="text"
            onSave={save}
            attributes={{ name: "awesome-input", id: 1 }}
            // instructions="Star this repo!"
            saveOnBlur
            value={campaignName}
          />
          <span
            style={{
              fontSize: "12px",
              paddingTop: "12px",
              color: "rgb(25, 169, 116)",
            }}
          >
            (Changes are automatically saved in draft.)
          </span>
        </div>
        <div style={{ gap: "10px", display: "flex" }}>
          {/* <Link href="/app/campaigns"> */}
          <Button onPress={onOpenPreview}>Preview in full</Button>
          <Button
            color="default"
            style={{ borderRadius: "5px" }}
            onPress={() => {
              router.push(`/app/campaigns`);
            }}
          >
            Return to Drafts
          </Button>
          {/* </Link> */}
          <Button
            color="danger"
            style={{ borderRadius: "5px" }}
            onPress={() => {
              setIsOpenDelete(true);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex md:flex-row flex-col" style={{ height: "100%" }}>
        <div
          style={{
            flex: 3,
            margin: "30px 10px",
          }}
        >
          <Accordion variant="shadow">
            <AccordionItem
              key="1"
              aria-label="To"
              subtitle="Who are you sending this email to?"
              title="To"
              startContent={
                <TickCircleIcon
                  color={isToSectionFilled ? "black" : "lightgray"}
                />
              }
            >
              <div style={{ padding: "10px 35px" }}>
                <div>
                  <label
                    style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                  >
                    Selected Mailing List
                  </label>
                  <Chip
                    onClose={() => {
                      setMailingList(null);
                    }}
                  >
                    {mailingList?.name ?? "No Mailing List Selected"}
                  </Chip>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      paddingTop: "20px",
                    }}
                  >
                    <Autocomplete
                      aria-label="Select Template"
                      variant={"bordered"}
                      inputValue={mailingListList?.filterText}
                      isLoading={mailingListList?.isLoading}
                      items={mailingListList?.items}
                      onInputChange={mailingListList.setFilterText}
                      onSelectionChange={(e) => {
                        let selectedItem = mailingListList.items.find(
                          (option: any) => option.uuid === e
                        );
                        setMailingList(selectedItem);

                        // setMailContent(selectedItem ? selectedItem.content : "");
                      }}
                      labelPlacement="outside"
                      radius={"sm"}
                      placeholder="Select Mailing List"
                      onOpenChange={setIsOpen}
                    >
                      {(item: any) => (
                        <AutocompleteItem
                          key={item.uuid}
                          className="capitalize"
                        >
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Link href="/app/mailing-list" target="_blank">
                      <Button
                        color="default"
                        radius="sm"
                        style={{
                          borderRadius: "25px",
                          borderWidth: "0.5px",
                          backgroundColor: "#1e2442",
                          color: "white",
                        }}
                        className="border-2 "
                      >
                        Upload Contacts
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="From"
              subtitle="Who is sending this email?"
              title="From"
              startContent={
                <TickCircleIcon
                  color={isFromSectionFilled ? "black" : "lightgray"}
                />
              }
              style={{
                cursor: "default",
              }}
            >
              <div
                style={{
                  padding: "10px 35px",
                }}
              >
                <div
                  style={{
                    // display: "flex",
                    // flexDirection: "row",
                    // flexWrap: "wrap",

                    flex: 1,
                    gap: "20px",
                  }}
                  className="flex md:flex-row flex-col"
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      minWidth: "40%",
                    }}
                  >
                    <label
                      style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                    >
                      Name of Sender <p style={{ color: "red" }}>*</p>
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
                    <label
                      style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                    >
                      Email of Sender <p style={{ color: "red" }}>*</p>
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
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    gap: "10px",
                    // paddingLeft: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    color="default"
                    radius="sm"
                    style={{
                      borderRadius: "5px",
                      borderWidth: "0.5px",
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      router.push("/app/campaigns/2/edit");
                    }}
                    className="border-2 "
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    style={{ borderRadius: "5px" }}
                    onPress={() => {
                      router.push("/app/campaigns/2/status");
                    }}
                  >
                    Cancel
                  </Button>
                </div> */}
              </div>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Subject"
              subtitle="What's the subject line for this email?"
              title="Subject"
              startContent={
                <TickCircleIcon
                  color={isSubjectSectionFilled ? "black" : "lightgray"}
                />
              }
            >
              <div
                style={{
                  padding: "10px 35px",
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
                  <label
                    style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                  >
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
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    gap: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    color="default"
                    radius="sm"
                    style={{
                      borderRadius: "5px",
                      borderWidth: "0.5px",
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      router.push("/app/campaigns/2/edit");
                    }}
                    className="border-2 "
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    style={{ borderRadius: "5px" }}
                    onPress={() => {
                      router.push("/app/campaigns/2/status");
                    }}
                  >
                    Cancel
                  </Button>
                </div> */}
              </div>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Send time"
              subtitle="When should we send this email?"
              title="Send time"
              startContent={<TickCircleIcon color={"black"} />}
            >
              <div
                style={{
                  padding: "10px 35px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    gap: "20px",
                  }}
                  className="flex md:flex-row flex-col"
                >
                  {/* <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderWidth: "1px",
                      height: "90px",
                      paddingLeft: "20px",
                    }}
                  >
                    <Checkbox />
                    <p>Send now</p>
                  </div> */}
                  <Checkbox
                    aria-label={"send-now"}
                    classNames={{
                      base: cn(
                        "inline-flex max-w-md w-full bg-content2 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-gray-500"
                      ),
                      label: "w-full",
                    }}
                    value={"send-now"}
                    onValueChange={() => {
                      setSendTime("send-now");
                    }}
                    isSelected={sendTime === "send-now"}
                  >
                    <div className="w-full flex justify-between gap-2">
                      Send Now
                    </div>
                  </Checkbox>
                  <Checkbox
                    aria-label={"send-now"}
                    classNames={{
                      base: cn(
                        "inline-flex max-w-md w-full bg-content2 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-gray-500"
                      ),
                      label: "w-full",
                    }}
                    value={"send-later"}
                    onValueChange={() => {
                      setSendTime("send-later");
                    }}
                    isSelected={sendTime === "send-later"}
                  >
                    <div className="w-full flex justify-between gap-2">
                      Send Later
                    </div>
                  </Checkbox>
                </div>
                {sendTime == "send-later" && (
                  <div
                    style={{
                      flex: 1,
                      gap: "20px",
                      paddingTop: "20px",
                    }}
                    className="flex md:flex-row flex-col"
                  >
                    <div>
                      <p>Select Date</p>
                      {/* <DatePicker
                        value={sendLaterDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setSendLaterDate(newValue);
                        }}
                      /> */}

                      <DateTimePicker
                        disablePast
                        value={dayjs(sendLaterTime)}
                        onChange={(newValue) => {
                          setSendLaterTime(
                            dayjs(newValue).format("YYYY-MM-DD HH:mm:ss")
                          );
                        }}
                      />
                    </div>

                    {/* <div>
                      <p>Select Time</p>
                      <TimePicker
                        value={sendLaterTime}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setSendLaterTime(newValue);
                        }}
                      />
                    </div> */}
                  </div>
                )}
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    gap: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    color="default"
                    radius="sm"
                    style={{
                      borderRadius: "5px",
                      borderWidth: "0.5px",
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      router.push("/app/campaigns/2/edit");
                    }}
                    className="border-2 "
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    style={{ borderRadius: "5px" }}
                    onPress={() => {
                      router.push("/app/campaigns/2/status");
                    }}
                  >
                    Cancel
                  </Button>
                </div> */}
              </div>
              {/* <TimePicker label="Basic time picker" /> */}
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Tracking Option"
              subtitle="What should we track after sending the mail?"
              title="Tracking Option"
              startContent={<TickCircleIcon color={"black"} />}
            >
              <div
                style={{
                  padding: "10px 35px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    gap: "20px",
                  }}
                  className="flex md:flex-row flex-col"
                >
                  <Switch
                    isSelected={trackOpens}
                    onValueChange={setTrackOpens}
                    classNames={{
                      base: cn(
                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                      wrapper: "p-0 h-4 overflow-visible",
                      thumb: cn(
                        "w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-primary",
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4"
                      ),
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-medium">Track Open</p>
                      <p className="text-tiny text-default-400">
                        Know the number of times your email was opened
                      </p>
                    </div>
                  </Switch>
                  <Switch
                    isSelected={trackClicks}
                    onValueChange={setTrackClicks}
                    classNames={{
                      base: cn(
                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                      wrapper: "p-0 h-4 overflow-visible",
                      thumb: cn(
                        "w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-primary",
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4"
                      ),
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-medium">Track Clicks</p>
                      <p className="text-tiny text-default-400">
                        Get the number of times links in your email was clicked
                      </p>
                    </div>
                  </Switch>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    gap: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    color="default"
                    radius="sm"
                    style={{
                      borderRadius: "5px",
                      borderWidth: "0.5px",
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      router.push("/app/campaigns/2/edit");
                    }}
                    className="border-2 "
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    style={{ borderRadius: "5px" }}
                    onPress={() => {
                      router.push("/app/campaigns/2/status");
                    }}
                  >
                    Cancel
                  </Button>
                </div> */}
              </div>
              {/* <TimePicker label="Basic time picker" /> */}
            </AccordionItem>
            <AccordionItem
              key="6"
              aria-label="Email Service"
              subtitle="Which service are you using to send this email?"
              title="Email Service"
              startContent={
                <TickCircleIcon
                  color={isEmailServiceSectionFilled ? "black" : "lightgrey"}
                />
              }
            >
              <div
                style={{
                  padding: "10px 35px",
                }}
              >
                <div>
                  <label
                    style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                  >
                    Selected Email Service
                  </label>
                  <Chip
                    onClose={() => {
                      setSelectedEmailService(null);
                    }}
                  >
                    {selectedEmailService?.name ?? "No Service Selected"}
                  </Chip>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      paddingTop: "20px",
                    }}
                  >
                    <Autocomplete
                      aria-label="Select Template"
                      variant={"bordered"}
                      inputValue={emailServicesList?.filterText}
                      isLoading={emailServicesList?.isLoading}
                      items={emailServicesList?.items}
                      onInputChange={emailServicesList.setFilterText}
                      onSelectionChange={(e) => {
                        let selectedItem = emailServicesList.items.find(
                          (option: any) => option.uuid === e
                        );
                        setSelectedEmailService(selectedItem);

                        // setMailContent(selectedItem ? selectedItem.content : "");
                      }}
                      labelPlacement="outside"
                      radius={"sm"}
                      placeholder="Select Mailing List"
                      onOpenChange={setIsOpen}
                      value={[selectedTemplate]}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                      {(item: any) => (
                        <AutocompleteItem
                          key={item.uuid}
                          className="capitalize"
                        >
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem
              key="7"
              aria-label="Content"
              subtitle="Design the Content for your email."
              title="Content"
              startContent={
                <TickCircleIcon
                  color={isContentSectionFilled ? "black" : "lightgrey"}
                />
              }
            >
              <div
                style={{
                  padding: "10px 35px",
                }}
              >
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  Selected Template
                </label>
                <Chip
                  onClose={() => {
                    setSelectedTemplate(null);
                    setSelectedTemplateName(null);
                  }}
                >
                  {selectedTemplate?.name ?? "No Template Selected"}
                </Chip>
                {/* <Chip></Chip> */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    paddingTop: "20px",
                  }}
                >
                  <label
                    style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                  >
                    Change Template
                  </label>
                  <Autocomplete
                    aria-label="Change Template"
                    variant={"bordered"}
                    inputValue={templateList.filterText}
                    isLoading={templateList.isLoading}
                    items={templateList.items}
                    // scrollRef={scrollerRef}
                    onOpenChange={setIsOpen}
                    onInputChange={templateList.setFilterText}
                    value={[selectedTemplate]}
                    onSelectionChange={(e) => {
                      let selectedItem: any = templateList.items.find(
                        (option: any) => option.uuid === e
                      );
                      setSelectedTemplate(selectedItem);
                      setSelectedTemplateName(
                        selectedItem ? selectedItem.name : ""
                      );
                      if (editorRef) {
                        editorRef?.current.data.set(
                          selectedItem ? selectedItem.content : "",
                          { batchType: { isUndoable: true } }
                        );
                      }
                      // setMailContent(selectedItem ? selectedItem.content : "");
                    }}
                    labelPlacement="outside"
                    radius={"sm"}
                    placeholder="Change Template"
                    autoComplete="on"
                  >
                    {(item: any) => (
                      <AutocompleteItem key={item.uuid} className="capitalize">
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
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
                    paddingTop: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontSize: "14px",
                    }}
                  ></label>
                  <div style={{ overflow: "scroll" }}>
                    {/* <Suspense fallback={null}>
                      <CKEditor5
                        ref={editorRef}
                        editor={Editor}
                        data={mailContent}
                        onReady={(editor) => {
                          editorRef.current = editor;
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          // console.log(editor);
                          setMailContent(editor.getData());
                          // console.log("change", editor.getData());
                        }}
                        onBlur={(event, editor) => {
                          // console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          // console.log("Focus.", editor);
                        }}
                      />
                    </Suspense> */}
                  </div>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    gap: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    color="default"
                    radius="sm"
                    style={{
                      borderRadius: "5px",
                      borderWidth: "0.5px",
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      router.push("/app/campaigns/2/edit");
                    }}
                    className="border-2 "
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    style={{ borderRadius: "5px" }}
                    onPress={() => {
                      router.push("/app/campaigns/2/status");
                    }}
                  >
                    Cancel
                  </Button>
                </div> */}
              </div>
            </AccordionItem>
          </Accordion>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 2,
              position: "static",
            }}
            className=""
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "30px 10px",
                padding: "30px 20px",
                backgroundColor: "white",
              }}
              className="shadow rounded"
            >
              <p style={{ fontSize: "20px", fontWeight: "600", color: "#555" }}>
                Test Email
              </p>
              <br />
              <hr></hr>
              <br />

              {/* <div>sampleTemplate</div> */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    gap: "5px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#555",
                  }}
                >
                  RECIPIENT
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  size="sm"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  // isInvalid={isToEmailInvalid}
                  // errorMessage={isToEmailInvalid ? "Please enter a valid email" : ""}
                />
                <Button
                  style={{
                    borderRadius: "3px",
                    padding: "5px 10px",
                    fontSize: "11px",
                    color: "#5d63ff",
                    backgroundColor: "#d9e2ec",
                    width: "120px",
                    paddingTop: "5px",
                  }}
                  onClick={() => {
                    publicAxios.get(
                      `user/campaign/${params.id}/send/test?to=${testEmail}`
                    );
                  }}
                  disabled={
                    isTestEmailInvalid ||
                    !isFromSectionFilled ||
                    !isContentSectionFilled ||
                    !isEmailServiceSectionFilled ||
                    !isSubjectSectionFilled
                  }
                >
                  Send Test Email
                </Button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                gap: "10px",
                paddingBottom: "30px",
              }}
            >
              {/* <Button
                color="default"
                radius="sm"
                style={{
                  borderRadius: "5px",
                  borderWidth: "0.5px",
                  backgroundColor: "white",
                }}
                onPress={() => {
                  router.push("/app/campaigns");
                }}
                className="border-2 "
              >
                Back
              </Button> */}
              <Button
                color="primary"
                style={{ borderRadius: "5px" }}
                disabled={
                  !isFromSectionFilled ||
                  !isContentSectionFilled ||
                  !isEmailServiceSectionFilled ||
                  !isToSectionFilled ||
                  !isSubjectSectionFilled
                }
                onPress={() => {
                  publicAxios
                    .get(`/user/campaign/${params.id}/send`)
                    .then((res) => {
                      router.push(`/app/campaigns/${params.id}/status`);
                    });
                }}
              >
                Send Campaign
              </Button>
            </div>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "30px 10px",
            flex: 2,
            // width: "100%",
            height: "900px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 20px",
              backgroundColor: "white",
              flex: 3,
              height: "700px",
              // width: "100%",
            }}
            className="shadow rounded"
          >
            <p style={{ fontSize: "20px", fontWeight: "600", color: "#555" }}>
              Content Preview
            </p>
            <br />
            <hr></hr>
            <br />
            <iframe
              id="123532"
              name="123532render"
              style={{ width: "100%", minHeight: "700px" }}
              sandbox="allow-scripts allow-same-origin"
              srcDoc={
                selectedTemplate == "New Template"
                  ? mailContent
                  : sampleTemplate
              }
            />
          </div>
        </div> */}
      </div>

      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        campaign={data}
      />
      {isOpenPreview && (
        <PreviewModal
          isOpen={isOpenPreview}
          onOpenChange={onOpenChangePreview}
          campaign={data}
          content={mailContent}
        />
      )}
    </div>
  );
}

function DeleteModal({ isOpen, setIsOpen, campaign }) {
  const { publicAxios }: any = useAxios();
  const router = useRouter();
  return (
    <Modal
      isOpen={isOpen}
      // onOpenChange={onOpenChange}
      placement="auto"
      scrollBehavior="inside"
      backdrop="blur"
      isDismissable={false}
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete: {campaign?.name}
            </ModalHeader>
            <ModalBody>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  Are you sure that you want to delete this campaign?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="flat"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  publicAxios
                    .delete(`/user/campaign/${campaign?.uuid}/delete`)
                    .then(() => {
                      setIsOpen(false);
                      router.push("/app/campaigns");
                    });
                  setIsOpen(false);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
function PreviewModal({ isOpen, onOpenChange, campaign, content }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      scrollBehavior="outside"
      backdrop="blur"
      size="5xl"
      isDismissable={false}
      style={{
        width: "80vw",
        // height: "80vh",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <div style={{ width: "100%" }}>
                <div className="bg-white" style={{ width: "100%" }}>
                  <iframe
                    id="123532"
                    name="123532render"
                    style={{ width: "100%", height: "80vh" }}
                    sandbox="allow-scripts allow-same-origin"
                    srcDoc={content}
                  />
                </div>
              </div>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
