"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import CustomTable from "../../../components/table";
import React, { useState } from "react";
import { Add } from "iconsax-react";

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
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";

export default function Home() {
  const raw = 3;
  const router = useRouter();

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  const actionCell = (onOpen, item) => {
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

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "FIRST NAME", uid: "first_name" },
    { name: "LAST NAME", uid: "last_name" },
    { name: "EMAIL", uid: "email" },
    { name: "DATE ADDED", uid: "created_at" },
    { name: "", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "20px",
          justifySelf: "right",
          flex: 1,
          width: "70%",
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
            // alignItems: "center",
            gap: "3px",
            padding: "10px 15px",
          }}
          onClick={() => setIsOpenEdit(true)}
        >
          Edit Profile
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "white",
          padding: "10px 30px",
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
          <label style={{ display: "flex", gap: "5px", fontSize: "20px" }}>
            Profile
          </label>
          <Divider orientation="horizontal" />
        </div>
        <hr />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
              flex: 1,
              fontWeight: "bold",
            }}
          >
            First Name
          </label>
          <label
            style={{ display: "flex", gap: "5px", fontSize: "14px", flex: 2 }}
          >
            Folakunmi
          </label>
        </div>
        <Divider orientation="horizontal" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Last Name
          </label>
          <label
            style={{ display: "flex", gap: "5px", fontSize: "14px", flex: 2 }}
          >
            Aremu
          </label>
        </div>
        <Divider orientation="horizontal" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "14px",
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Email
          </label>
          <label
            style={{ display: "flex", gap: "5px", fontSize: "14px", flex: 2 }}
          >
            fola.aremu@gmail.com
          </label>
        </div>
        <div
          style={{
            paddingTop: "30px",
          }}
        >
          <Button
            color="default"
            radius="sm"
            style={{
              borderRadius: "5px",
              borderWidth: "0.5px",
              backgroundColor: "lightgrey",
              height: "30px",
              // width: "70px",
              textAlign: "left",
            }}
            onPress={() => {
              setIsOpenChangePassword(true);
              // router.push("/app/campaigns/2/edit");
            }}
            className="border-2 "
          >
            Change Password
          </Button>
        </div>
      </div>
      <EditModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <ChangePasswordModal
        isOpen={isOpenChangePassword}
        setIsOpen={setIsOpenChangePassword}
      />
    </div>
  );
}

function ChangePasswordModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

  const isConfirmNewPasswordInvalid = React.useMemo(() => {
    if (!confirmNewPassword) return false;
    return confirmNewPassword == newPassword ? false : true;
  }, [confirmNewPassword]);

  const enableSubmit = React.useMemo(() => {
    if (
      currentPassword &&
      newPassword &&
      confirmNewPassword &&
      newPassword == confirmNewPassword
    )
      return true;
    return false;
  }, [currentPassword, newPassword, confirmNewPassword]);

  const submitModal = () => {
    console.log("submitModal");
    setConfirmNewPassword("");
    setCurrentPassword("");
    setNewPassword("");
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
              Change Password
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
                  Current Password <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  New Password <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
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
                  Confirm New Password <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                  isInvalid={isConfirmNewPasswordInvalid}
                  errorMessage={
                    isConfirmNewPasswordInvalid
                      ? "New password must be equal to Confirmation"
                      : ""
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setConfirmNewPassword("");
                  setCurrentPassword("");
                  setNewPassword("");
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

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (firstName && lastName && email) return true;
    return false;
  }, [firstName, lastName, email]);

  const submitModal = () => {
    console.log("submitModal");
    setEmail("");
    setFirstName("");
    setLastName("");
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
              Edit User Account
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
                  onChange={(e) => {
                    setLastName(e.target.value);
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
                  Email <p style={{ color: "red" }}>*</p>
                </label>
                <Input
                  radius={"sm"}
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  isInvalid={isEmailInvalid}
                  errorMessage="Please enter a valid email"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setEmail("");
                  setFirstName("");
                  setLastName("");
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

function DeleteModal({ isOpen, setIsOpen }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

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
