"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "@/components/table";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { columns, users, statusOptions } from "@/components/data";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import * as XLSX from "xlsx";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { promises as fs } from "fs";
import {
  useFetchSingleMailingList,
  useFetchSingleMailingListSubscribers,
} from "@/services/MailingListServices";
import { useAxios } from "@/context/AxiosContext";

export default function Home({ params }) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);

  const [editUser, setEditUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [refreshData, setrefreshData] = useState(false);

  const { data } = useFetchSingleMailingList({ uuid: params.id });

  const actionCell = (list) => {
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
                setEditUser(list);
                setIsOpenEdit(true);
              }}
            >
              Edit
            </DropdownItem>
            {/* <DropdownItem
              onClick={() => {
                setIsOpenDelete(true);
                setDeleteUser(list);
              }}
            >
              Delete
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const tableHeaders = ["name", "email", "created_at", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "DATE ADDED", uid: "created_at" },
    { name: "", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data: subscribersData, mutate } =
    useFetchSingleMailingListSubscribers({
      uuid: params?.id,
      page: page,
      page_size: rowsPerPage,
      search: searchText,
    });

  useEffect(() => {
    if (subscribersData) {
      const formattedUser = subscribersData?.data?.map((data) => ({
        ...data,
        created_at: new Date(data.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        id: data.uuid,
        name: data.first_name + " " + data.last_name,
      }));
      setTableData(formattedUser);
      setPages(subscribersData?.meta?.last_page);
    }
  }, [subscribersData]);
  useEffect(() => {
    if (refreshData) {
      mutate();
    }
  }, [refreshData]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: "20px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "25px",
              paddingTop: "20px",
            }}
          >
            {data?.name}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            paddingTop: "20px",
            gap: "20px",
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
            <FaPlus />
            Add Recipient
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              borderRadius: "5px",
              borderWidth: "1px",
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              color: "black",
              fontSize: "12px",
              alignItems: "center",
              gap: "3px",
              padding: "10px 15px",
            }}
            onClick={() => setIsOpenUpload(true)}
          >
            <FaFileUpload size={15} />
            Import Recipients
          </button>
        </div>
      </div>
      <div>
        <CustomTable
          headers={tableHeaders}
          columns={columns}
          data={tableData}
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
          user={deleteUser}
          setRefreshData={setrefreshData}
        />
      )}

      <AddNewModal
        isOpen={isOpenAdd}
        setIsOpen={setIsOpenAdd}
        setRefreshData={setrefreshData}
        mailingListUuid={params?.id}
      />
      {isOpenEdit && (
        <EditModal
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          user={editUser}
          setRefreshData={setrefreshData}
          mailingListUuid={params?.id}
        />
      )}

      <UploadExcelModal
        isOpen={isOpenUpload}
        setIsOpen={setIsOpenUpload}
        setRefreshData={setrefreshData}
        mailingListUuid={params?.id}
      />
    </div>
  );
}

function DeleteModal({ isOpen, setIsOpen, user, setRefreshData }) {
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
              Confirm Delete: {user?.first_name + " " + user?.last_name}
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
                  Are you sure that you want to delete this subscriber?
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
function AddNewModal({ isOpen, setIsOpen, setRefreshData, mailingListUuid }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { publicAxios }: any = useAxios();

  const isFirstNameInvalid = React.useMemo(() => {
    if (firstName === "") return false;
    return false;
  }, [firstName]);

  const isLastNameInvalid = React.useMemo(() => {
    if (lastName === "") return false;
    return false;
  }, [lastName]);

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (
      firstName &&
      lastName &&
      email &&
      !isFirstNameInvalid &&
      !isLastNameInvalid &&
      !isEmailInvalid
    )
      return true;
    return false;
  }, [firstName, lastName, email]);

  const submitModal = async () => {
    // mailing-list/:uuid/subscriber/single/add
    const data = await publicAxios.post(
      `/user/mailing-list/${mailingListUuid}/subscriber/single/add`,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        // meta: user?.meta,
        // is_subscribed: user?.is_subscribed,
      }
    );
    setRefreshData(true);
    console.log("submitModal");
    setFirstName("");
    setLastName("");
    setEmail("");
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Add Single Recipient
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
                  First Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={isFirstNameInvalid}
                  errorMessage={
                    isFirstNameInvalid ? "Please enter firstname" : ""
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
                  Last Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={isLastNameInvalid}
                  errorMessage={
                    isLastNameInvalid ? "Please enter last name" : ""
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
                  Email <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={isEmailInvalid}
                  errorMessage={
                    isEmailInvalid ? "Please enter a valid email" : ""
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setFirstName("");
                  setLastName("");
                  setEmail("");
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
                Save
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
function UploadExcelModal({
  isOpen,
  setIsOpen,
  setRefreshData,
  mailingListUuid,
}) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const { publicAxios }: any = useAxios();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(jsonData);
  // }, [jsonData]);

  const enableSubmit = React.useMemo(() => {
    if (file) return true;
    return false;
  }, [file]);

  const submitModal = async () => {
    const data = await publicAxios.post(
      `/user/mailing-list/${mailingListUuid}/subscriber/bulk/add`,
      {
        data: jsonData,
      }
    );
    setRefreshData(true);
    setFile("");
    setJsonData([]);
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="top"
      scrollBehavior="inside"
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Upload File
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
                {/* <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  First Name <p style={{ color: "red" }}>*</p>
                </label> */}
                <input
                  type="file"
                  style={{ backgroundColor: "transparent" }}
                  // value={file}
                  accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                />
              </div>

              {jsonData.length > 0 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontSize: "14px",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {jsonData.length} Recipients {jsonData[0].loanid}
                  </label>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setFile("");
                  setJsonData([]);
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
                Save
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
function EditModal({
  isOpen,
  setIsOpen,
  user,
  setRefreshData,
  mailingListUuid,
}) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  setRefreshData(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(true);
  const [meta, setMeta] = useState(user?.pivot?.meta ?? {});
  const { publicAxios }: any = useAxios();

  const handleChange = (oldKey, newKey, value) => {
    const updatedPairs = { ...meta };
    delete updatedPairs[oldKey];
    updatedPairs[newKey] = value;
    setMeta(updatedPairs);
  };

  const handleRemovePair = (key) => {
    const updatedPairs = { ...meta };
    delete updatedPairs[key];
    setMeta(updatedPairs);
  };

  const handleGenerateRandomPair = () => {
    const key = Math.random().toString(36).substring(7);
    const value = Math.random().toString(36).substring(7);
    setMeta((prevPairs) => ({
      ...prevPairs,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
      setEmail(user?.email);
      setIsSubscribed(user?.pivot.is_subscribed);
    }
  }, [user]);

  const isFirstNameInvalid = React.useMemo(() => {
    if (firstName === "") return false;
    return false;
  }, [firstName]);

  const isLastNameInvalid = React.useMemo(() => {
    if (lastName === "") return false;
    return false;
  }, [lastName]);

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (
      firstName &&
      lastName &&
      email &&
      !isFirstNameInvalid &&
      !isLastNameInvalid &&
      !isEmailInvalid
    )
      return true;
    return false;
  }, [firstName, lastName, email]);

  const submitModal = async () => {
    const data = await publicAxios.post(`/user/subscriber/${user.uuid}/edit`, {
      first_name: firstName,
      last_name: lastName,
      email,
      meta: meta,
      is_subscribed: isSubscribed,
      mailing_list_uud: mailingListUuid,
    });
    setRefreshData(true);
    setFirstName("");
    setLastName("");
    setEmail("");
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
              Edit Single Recipient
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
                  First Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={isFirstNameInvalid}
                  errorMessage={
                    isFirstNameInvalid ? "Please enter firstname" : ""
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
                  Last Name <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={isLastNameInvalid}
                  errorMessage={
                    isLastNameInvalid ? "Please enter last name" : ""
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
                  Email <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={isEmailInvalid}
                  errorMessage={
                    isEmailInvalid ? "Please enter a valid email" : ""
                  }
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  // flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label
                  style={{ display: "flex", gap: "5px", fontSize: "14px" }}
                >
                  Subscribed <p style={{ color: "red" }}>*</p>
                </label>
                <Switch
                  isSelected={isSubscribed}
                  onValueChange={setIsSubscribed}
                  aria-label="Automatic updates"
                />
                {/* <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={isEmailInvalid}
                  errorMessage={
                    isEmailInvalid ? "Please enter a valid email" : ""
                  }
                /> */}
              </div>
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Other Data"
                  title="Other Data"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {Object.entries(meta).map(([key, value]: any, index) => (
                      <div key={key} style={{ display: "flex", gap: "5px" }}>
                        <Input
                          radius={"sm"}
                          isRequired
                          labelPlacement="outside"
                          variant="bordered"
                          value={key}
                          onChange={(e) =>
                            handleChange(key, e.target.value, value)
                          }
                          // isInvalid={isLastNameInvalid}
                          // errorMessage={
                          //   isLastNameInvalid ? "Please enter last name" : ""
                          // }
                        />

                        <Input
                          radius={"sm"}
                          isRequired
                          labelPlacement="outside"
                          variant="bordered"
                          value={value}
                          onChange={(e) =>
                            setMeta({ ...meta, [key]: e.target.value })
                          }
                          // isInvalid={isLastNameInvalid}
                          // errorMessage={
                          //   isLastNameInvalid ? "Please enter last name" : ""
                          // }
                        />
                        <button onClick={() => handleRemovePair(key)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <Button color="primary" onPress={handleGenerateRandomPair}>
                      Add new Data
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setFirstName("");
                  setLastName("");
                  setEmail("");
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
                Save
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
