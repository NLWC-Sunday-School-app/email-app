"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "@/components/table";
import React, { useEffect, useState } from "react";

import { columns, users, statusOptions } from "@/components/data";
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

  useEffect(() => {
    console.log(isOpenDelete);
  }, [isOpenDelete]);

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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <div></div>

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
            Add Recipient
          </button>
        </div>
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
    </div>
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
              <Button color="default" variant="flat" onPress={onClose}>
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
 function AddNewModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

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

  const submitModal = () => {
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
 function EditModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

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

  const submitModal = () => {
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
