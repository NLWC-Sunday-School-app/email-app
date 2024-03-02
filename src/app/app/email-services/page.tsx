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
import { IoMdAdd } from "react-icons/io";
import {
  useFetchSingleService,
  useListEmailServices,
} from "@/services/EmailServiceServices";
import { useAxios } from "@/context/AxiosContext";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  // console.log(loggedinUser);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  const actionCell = (service) => {
    return (
      <div className="relative flex justify-start items-center gap-2">
        <Dropdown className="bg-background border-1 border-default-200">
          <DropdownTrigger>
            <Button isIconOnly={false} radius="full" size="sm" variant="light">
              <VerticalDotsIcon className="text-default-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              onClick={() => {
                setTestService(service);
                setIsOpenTest(true);
              }}
            >
              Test
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setEditService(service);
                setIsOpenEdit(true);
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setDeleteService(service);
                setIsOpenDelete(true);
              }}
            >
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
    { name: "SERVICE", uid: "service_type.name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableDate, setTableDate] = React.useState([]);

  const [editService, setEditService] = useState({});
  const [deleteService, setDeleteService] = useState({});
  const [testService, setTestService] = useState({});
  const [refreshData, setrefreshData] = useState(false);

  const { user, mutate } = useListEmailServices({
    search: searchText,
    page_size: rowsPerPage,
    page: page,
  });

  useEffect(() => {
    if (user) {
      const formattedUser = user?.data?.map((data) => ({
        ...data,
        created_at: new Date(data.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }));

      setTableDate(formattedUser);
      setPages(user?.last_page);
    }
  }, [user]);

  useEffect(() => {
    mutate();
  }, [refreshData]);

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
          <IoMdAdd size={15} />
          Add Email Service
        </button>
      </div>
      <div>
        <CustomTable
          headers={tableHeaders}
          columns={columns}
          data={tableDate}
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
      {isOpenDelete && (
        <DeleteModal
          isOpen={isOpenDelete}
          setIsOpen={setIsOpenDelete}
          service={deleteService}
          setrefreshData={setrefreshData}
        />
      )}

      {isOpenAdd && (
        <AddNewModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          setrefreshData={setrefreshData}
        />
      )}

      {isOpenEdit && (
        <EditModal
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          service={editService}
          setrefreshData={setrefreshData}
        />
      )}
      {isOpenTest && (
        <TestServiceModal
          isOpen={isOpenTest}
          setIsOpen={setIsOpenTest}
          service={testService}
          setrefreshData={setrefreshData}
        />
      )}
    </div>
  );
}

function AddNewModal({ isOpen, setIsOpen, setrefreshData }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  setrefreshData(false);
  const [name, setName] = React.useState("");
  const [emailService, setEmailService] = React.useState("1");
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
  const { publicAxios }: any = useAxios();

  const isNameInvalid = React.useMemo(() => {
    if (name === "") return false;
    return false;
  }, [name]);

  // const isUserNameInvalid = React.useMemo(() => {
  //   if (!userName) return false;
  //   return validateEmail(userName) ? false : true;
  // }, [userName]);

  const enableSubmit = React.useMemo(() => {
    if (emailService === "4") {
      if (name && smtpHost && smtpPort && encryption && userName && password) {
        return true;
      }
    } else if (emailService === "1") {
      if (name && apiKey && webhookKey && domain && zone) {
        return true;
      }
    } else if (emailService === "3") {
      if (name && apiKey) {
        return true;
      }
    } else if (emailService === "2") {
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

  const submitModal = async () => {
    const data = await publicAxios.post(`/user/services/create`, {
      name,
      emailService,
      accessKey,
      secretAccessKey,
      region,
      configSetName,
      apiKey,
      webhookKey,
      domain,
      zone: zone ?? null,
      smtpHost,
      smtpPort,
      encryption,
      userName,
      password,
    });
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
    setrefreshData(true);
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
              {emailService === "4" && (
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
              {emailService === "2" && (
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
              {emailService === "1" && (
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
              {emailService === "3" && (
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

function EditModal({ isOpen, setIsOpen, service, setrefreshData }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  setrefreshData(false);
  const [name, setName] = React.useState("");
  const [emailService, setEmailService] = React.useState("1");
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

  const { data } = useFetchSingleService({ uuid: service?.uuid });
  const { publicAxios }: any = useAxios();

  useEffect(() => {
    if (data) {
      const settingsData = data?.settings;
      setAccessKey(settingsData.accessKey);
      setName(data?.name);
      setSmtpHost(settingsData?.smtpHost);
      setSmtpPort(settingsData?.smtpPort);
      setEncryption(settingsData?.encryption);
      setUserName(settingsData?.userName);
      setPassword(settingsData?.password);
      setApiKey(settingsData?.apiKey);
      setWebhookKey(settingsData?.webhookKey);
      setDomain(settingsData?.domain);
      setZone(settingsData?.zone);
      setConfigSetName(settingsData?.configSetName);
      setEmailService(settingsData?.emailService);
      setRegion(settingsData?.region);
      setSecretAccessKey(settingsData?.secretAccessKey);
    }
  }, [data]);

  const isNameInvalid = React.useMemo(() => {
    if (name === "") return false;
    return false;
  }, [name]);

  // const isUserNameInvalid = React.useMemo(() => {
  //   if (!userName) return false;
  //   return validateEmail(userName) ? false : true;
  // }, [userName]);

  const enableSubmit = React.useMemo(() => {
    if (emailService === "4") {
      if (name && smtpHost && smtpPort && encryption && userName && password) {
        return true;
      }
    } else if (emailService === "1") {
      if (name && apiKey && webhookKey && domain && zone) {
        return true;
      }
    } else if (emailService === "3") {
      if (name && apiKey) {
        return true;
      }
    } else if (emailService === "2") {
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

  const submitModal = async () => {
    const data = await publicAxios.post(
      `/user/services/${service?.uuid}/edit`,
      {
        name,
        emailService,
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
      }
    );
    console.log(data);
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
    setrefreshData(true);
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
              Edit Email Service: {name}
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
                    setEmailService(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              {emailService === "4" && (
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
              {emailService === "2" && (
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
              {emailService === "1" && (
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
              {emailService === "3" && (
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
                Edit
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

function TestServiceModal({ isOpen, setIsOpen, service, setrefreshData }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const { data } = useFetchSingleService({ uuid: service?.uuid });

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

function DeleteModal({ isOpen, setIsOpen, service, setrefreshData }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const { publicAxios }: any = useAxios();

  setrefreshData(false);

  const submitModal = () => {
    console.log("submitModal");
    setrefreshData(true);
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
              Confirm Delete: {service?.name}
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
                  Are you sure that you want to delete this service?
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
                    .delete(`/user/services/${service?.uuid}/delete`)
                    .then(() => {
                      setrefreshData(true);
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

const animals = [
  {
    label: "Mailgun",
    value: "1",
    description: "The second most popular pet in the world",
  },
  {
    label: "SMTP",
    value: "4",
    description: "The most popular pet in the world",
  },
  {
    label: "SES",
    value: "2",
    description: "The largest land animal",
  },
  {
    label: "Sendgrid",
    value: "3",
    description: "The king of the jungle",
  },
];

const zones = [
  {
    label: "EU",
    value: "EU",
    description: "The second most popular pet in the world",
  },
  {
    label: "US",
    value: "US",
    description: "The most popular pet in the world",
  },
];
