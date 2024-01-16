"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import CustomTable from "../../../components/table";
import React, { useEffect, useState } from "react";

import { columns, users, statusOptions } from "../../../components/data";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  const actionCell = (item) => {
    return (
      <div className="relative flex justify-start items-center gap-2">
        <Dropdown className="bg-background border-1 border-default-200">
          <DropdownTrigger>
            <Button isIconOnly={false} radius="full" size="sm" variant="light">
              <VerticalDotsIcon className="text-default-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => setIsOpenTest(true)}>
              Test
            </DropdownItem>
            <DropdownItem onClick={() => setIsOpenEdit(true)}>
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => setIsOpenDelete(true)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "SERVICE", uid: "service" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#5d63ff",
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
          onClick={() => setIsOpenAdd(true)}
        >
          <p>he</p>
          Add Email Service
        </button>
      </div>
      <div>
        <CustomTable
          headers={tableHeaders}
          columns={columns}
          data={users}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
          pages={pages}
          setPages={setPages}
          renderActionCell={actionCell}
        />
      </div>
      <DeleteModal isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} />
      <AddNewModal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
      <EditModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <TestServiceModal isOpen={isOpenTest} setIsOpen={setIsOpenTest} />
    </div>
  );
}

 function AddNewModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [name, setName] = React.useState("");
  const [emailService, setEmailService] = React.useState("mailgun");
  const [smtpHost, setSmtpHost] = React.useState("");
  const [smtpPort, setSmtpPort] = React.useState("");
  const [encryption, setEncryption] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [webhookKey, setWebhookKey] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [zone, setZone] = React.useState("eu");
  const [accessKey, setAccessKey] = React.useState("");
  const [secretAccessKey, setSecretAccessKey] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [configSetName, setConfigSetName] = React.useState("");

  const isNameInvalid = React.useMemo(() => {
    if (name === "") return false;
    return false;
  }, [name]);

  // const isUserNameInvalid = React.useMemo(() => {
  //   if (!userName) return false;
  //   return validateEmail(userName) ? false : true;
  // }, [userName]);

  const enableSubmit = React.useMemo(() => {
    if (emailService === "smtp") {
      if (name && smtpHost && smtpPort && encryption && userName && password) {
        return true;
      }
    } else if (emailService === "mailgun") {
      if (name && apiKey && webhookKey && domain && zone) {
        return true;
      }
    } else if (emailService === "sendgrid") {
      if (name && apiKey) {
        return true;
      }
    } else if (emailService === "ses") {
      if (name && accessKey && secretAccessKey && region && configSetName) {
        return true;
      }
    }
    return false;
  }, [
    name,
    accessKey,
    secretAccessKey,
    region,
    configSetName,
    apiKey,
    webhookKey,
    domain,
    zone,
    smtpHost,
    smtpPort,
    encryption,
    userName,
    password,
    emailService,
  ]);

  const submitModal = () => {
    console.log("submitModal");
    setName("");
    setAccessKey("");
    setSecretAccessKey("");
    setRegion("");
    setConfigSetName("");
    setApiKey("");
    setWebhookKey("");
    setDomain("");
    setZone("");
    setSmtpHost("");
    setSmtpPort("");
    setEncryption("");
    setUserName("");
    setPassword("");
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="outside"
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Add Email Service
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
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={isNameInvalid}
                  errorMessage={isNameInvalid ? "Please enter name" : ""}
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
                  Email Service
                </label>
                <Select
                  size="sm"
                  aria-label="Select Email Service"
                  variant={"bordered"}
                  selectedKeys={[emailService]}
                  onChange={(e) => {
                    setAccessKey("");
                    setSecretAccessKey("");
                    setRegion("");
                    setConfigSetName("");
                    setApiKey("");
                    setWebhookKey("");
                    setDomain("");
                    setSmtpHost("");
                    setSmtpPort("");
                    setEncryption("");
                    setUserName("");
                    setPassword("");
                    setEmailService(e.target.value);
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              {emailService === "smtp" && (
                <>
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
                      SMTP Host <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={smtpHost}
                      onChange={(e) => {
                        setSmtpHost(e.target.value);
                      }}
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
                      SMTP Port <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
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
                      Encryption <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={encryption}
                      onChange={(e) => setEncryption(e.target.value)}
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
                      Username <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
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
                      Password <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {emailService === "ses" && (
                <>
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
                      AWS Access Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
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
                      AWS Secret Access Key <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={secretAccessKey}
                      onChange={(e) => setSecretAccessKey(e.target.value)}
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
                      AWS Region <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
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
                      Configuration Set Name
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={configSetName}
                      onChange={(e) => setConfigSetName(e.target.value)}
                    />
                  </div>
                </>
              )}
              {emailService === "mailgun" && (
                <>
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
                      API Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
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
                      Webhook Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={webhookKey}
                      onChange={(e) => setWebhookKey(e.target.value)}
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
                      Domain
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
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
                      Zone
                    </label>
                    <Select
                      size="sm"
                      aria-label="Select Email Service"
                      variant={"bordered"}
                      selectedKeys={[zone]}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      {zones.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </>
              )}
              {emailService === "sendgrid" && (
                <>
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
                      API Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setName("");
                  setAccessKey("");
                  setSecretAccessKey("");
                  setRegion("");
                  setConfigSetName("");
                  setApiKey("");
                  setWebhookKey("");
                  setDomain("");
                  setSmtpHost("");
                  setSmtpPort("");
                  setEncryption("");
                  setUserName("");
                  setPassword("");
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitModal()}
                isDisabled={!enableSubmit}
              >
                Add
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

 function EditModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [name, setName] = React.useState("");
  const [emailService, setEmailService] = React.useState("mailgun");
  const [smtpHost, setSmtpHost] = React.useState("");
  const [smtpPort, setSmtpPort] = React.useState("");
  const [encryption, setEncryption] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [webhookKey, setWebhookKey] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [zone, setZone] = React.useState("eu");
  const [accessKey, setAccessKey] = React.useState("");
  const [secretAccessKey, setSecretAccessKey] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [configSetName, setConfigSetName] = React.useState("");

  const isNameInvalid = React.useMemo(() => {
    if (name === "") return false;
    return false;
  }, [name]);

  // const isUserNameInvalid = React.useMemo(() => {
  //   if (!userName) return false;
  //   return validateEmail(userName) ? false : true;
  // }, [userName]);

  const enableSubmit = React.useMemo(() => {
    if (emailService === "smtp") {
      if (name && smtpHost && smtpPort && encryption && userName && password) {
        return true;
      }
    } else if (emailService === "mailgun") {
      if (name && apiKey && webhookKey && domain && zone) {
        return true;
      }
    } else if (emailService === "sendgrid") {
      if (name && apiKey) {
        return true;
      }
    } else if (emailService === "ses") {
      if (name && accessKey && secretAccessKey && region && configSetName) {
        return true;
      }
    }
    return false;
  }, [
    name,
    accessKey,
    secretAccessKey,
    region,
    configSetName,
    apiKey,
    webhookKey,
    domain,
    zone,
    smtpHost,
    smtpPort,
    encryption,
    userName,
    password,
    emailService,
  ]);

  const submitModal = () => {
    console.log("submitModal");
    setName("");
    setAccessKey("");
    setSecretAccessKey("");
    setRegion("");
    setConfigSetName("");
    setApiKey("");
    setWebhookKey("");
    setDomain("");
    setZone("");
    setSmtpHost("");
    setSmtpPort("");
    setEncryption("");
    setUserName("");
    setPassword("");
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="outside"
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Add Email Service
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
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={isNameInvalid}
                  errorMessage={isNameInvalid ? "Please enter name" : ""}
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
                  Email Service
                </label>
                <Select
                  size="sm"
                  aria-label="Select Email Service"
                  variant={"bordered"}
                  selectedKeys={[emailService]}
                  onChange={(e) => {
                    setAccessKey("");
                    setSecretAccessKey("");
                    setRegion("");
                    setConfigSetName("");
                    setApiKey("");
                    setWebhookKey("");
                    setDomain("");
                    setSmtpHost("");
                    setSmtpPort("");
                    setEncryption("");
                    setUserName("");
                    setPassword("");
                    setEmailService(e.target.value);
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              {emailService === "smtp" && (
                <>
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
                      SMTP Host <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={smtpHost}
                      onChange={(e) => {
                        setSmtpHost(e.target.value);
                      }}
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
                      SMTP Port <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
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
                      Encryption <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={encryption}
                      onChange={(e) => setEncryption(e.target.value)}
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
                      Username <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
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
                      Password <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {emailService === "ses" && (
                <>
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
                      AWS Access Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
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
                      AWS Secret Access Key <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={secretAccessKey}
                      onChange={(e) => setSecretAccessKey(e.target.value)}
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
                      AWS Region <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
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
                      Configuration Set Name
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={configSetName}
                      onChange={(e) => setConfigSetName(e.target.value)}
                    />
                  </div>
                </>
              )}
              {emailService === "mailgun" && (
                <>
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
                      API Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
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
                      Webhook Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={webhookKey}
                      onChange={(e) => setWebhookKey(e.target.value)}
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
                      Domain
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
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
                      Zone
                    </label>
                    <Select
                      size="sm"
                      aria-label="Select Email Service"
                      variant={"bordered"}
                      selectedKeys={[zone]}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      {zones.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </>
              )}
              {emailService === "sendgrid" && (
                <>
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
                      API Key
                      <p style={{ color: "red" }}>*</p>
                    </label>
                    <Input
                      radius={"sm"}
                      isRequired
                      labelPlacement="outside"
                      variant="bordered"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setName("");
                  setAccessKey("");
                  setSecretAccessKey("");
                  setRegion("");
                  setConfigSetName("");
                  setApiKey("");
                  setWebhookKey("");
                  setDomain("");
                  setSmtpHost("");
                  setSmtpPort("");
                  setEncryption("");
                  setUserName("");
                  setPassword("");
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitModal()}
                isDisabled={!enableSubmit}
              >
                Add
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

 function TestServiceModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [toEmail, setToEmail] = React.useState("");
  const [fromEmail, setFromEmail] = React.useState("");
  const [subject, setSubject] = React.useState("Test Email");
  const [emailBody, setEmailBody] = React.useState(
    "This is a test for the email service test service"
  );

  const isToEmailInvalid = React.useMemo(() => {
    if (!toEmail) return false;
    return validateEmail(toEmail) ? false : true;
  }, [toEmail]);

  const isFromEmailInvalid = React.useMemo(() => {
    if (!fromEmail) return false;
    return validateEmail(fromEmail) ? false : true;
  }, [fromEmail]);

  // const isUserNameInvalid = React.useMemo(() => {
  //   if (!userName) return false;
  //   return validateEmail(userName) ? false : true;
  // }, [userName]);

  const enableSubmit = React.useMemo(() => {
    if (
      toEmail &&
      fromEmail &&
      subject &&
      emailBody &&
      !isToEmailInvalid &&
      !isFromEmailInvalid
    ) {
      return true;
    }
    return false;
  }, [
    toEmail,
    fromEmail,
    subject,
    emailBody,
    isToEmailInvalid,
    isFromEmailInvalid,
  ]);

  const submitModal = () => {
    console.log("submitModal");
    setEmailBody("");
    setSubject("");
    setToEmail("");
    setFromEmail("");
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="outside"
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Test Email Service
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
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  To Email <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  isInvalid={isToEmailInvalid}
                  errorMessage={
                    isToEmailInvalid ? "Please enter a valid email address" : ""
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
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  From Email <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  isInvalid={isFromEmailInvalid}
                  errorMessage={
                    isFromEmailInvalid
                      ? "Please enter a valid email address"
                      : ""
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
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  Subject <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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
                  From Email <p style={{ color: "red" }}>*</p>
                </label>
                <Textarea
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setEmailBody("");
                  setSubject("");
                  setToEmail("");
                  setFromEmail("");
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => submitModal()}
                isDisabled={!enableSubmit}
              >
                Add
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

 function DeleteModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [toEmail, setToEmail] = React.useState("");
  // const [isToEmailInvalid, setIsToEmailInvalid] = React.useState(false);

  const [fromEmail, setFromEmail] = React.useState("");
  // const [isFromEmailInvalid, setIsFromEmailInvalid] = React.useState(false);

  const [subject, setSubject] = React.useState("");
  // const [isSubjectInvalid, setIsSubjectInvalid] = React.useState(false);

  const [description, setDescription] = React.useState("");
  // const [isDescriptionInvalid, setIsDescriptionInvalid] = React.useState("");

  const isToEmailInvalid = React.useMemo(() => {
    if (toEmail === "") return false;

    return validateEmail(toEmail) ? false : true;
  }, [toEmail]);

  const isFromEmailInvalid = React.useMemo(() => {
    if (fromEmail === "") return false;

    return validateEmail(fromEmail) ? false : true;
  }, [fromEmail]);

  const isSubjectInvalid = React.useMemo(() => {
    console.log(subject);
    if (!subject) return false;
    return false;
  }, [subject]);

  const isDescriptionInvalid = React.useMemo(() => {
    if (description === "") return false;
    return false;
  }, [description]);

  const enableSubmit = React.useMemo(() => {
    if (
      description &&
      subject &&
      fromEmail &&
      toEmail &&
      !isToEmailInvalid &&
      !isFromEmailInvalid
    )
      return true;
    return false;
  }, [description, subject, fromEmail, toEmail]);

  const submitModal = () => {
    console.log("submitModal");
    console.log(enableSubmit);
  };
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
              Confirm Delete: Test
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
                  Are you sure that you want to delete the
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#555",
                    }}
                  >
                    {" "}
                    Folakunmi Aremu{" "}
                  </span>
                  campaign?
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
              <Button color="danger" onPress={() => setIsOpen(false)}>
                Delete
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

 const animals = [
  {
    label: "Mailgun",
    value: "mailgun",
    description: "The second most popular pet in the world",
  },
  {
    label: "SMTP",
    value: "smtp",
    description: "The most popular pet in the world",
  },
  {
    label: "SES",
    value: "ses",
    description: "The largest land animal",
  },
  {
    label: "Sendgrid",
    value: "sendgrid",
    description: "The king of the jungle",
  },
];

const zones = [
  {
    label: "EU",
    value: "eu",
    description: "The second most popular pet in the world",
  },
  {
    label: "US",
    value: "us",
    description: "The most popular pet in the world",
  },
];
