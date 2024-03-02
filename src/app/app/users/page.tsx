"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import CustomTable from "../../../components/table";
import React, { useEffect, useState } from "react";
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
import {
  useFetchUsers,
  useFetchSingleUser,
  useCreateSingleUser,
} from "@/services/UserManagementServices";
import { useAxios } from "@/context/AxiosContext";

export default function Home() {
  const router = useRouter();

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [deleteUser, setDeleteUser] = useState("");
  const [refreshData, setrefreshData] = useState(false);

  const actionCell = (user) => {
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
                setIsOpenEdit(true);
                setEditUser(user);
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsOpenDelete(true);
                setDeleteUser(user);
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
  const [tableData, setTableData] = React.useState([]);

  const { user, mutate } = useFetchUsers({
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

      setTableData(formattedUser);
      setPages(user?.last_page);
    }
  }, [user, refreshData]);
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
          <Add />
          Add New User
        </button>
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
      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        user={deleteUser}
        setrefreshData={setrefreshData}
      />
      <AddNewModal
        isOpen={isOpenAdd}
        setIsOpen={setIsOpenAdd}
        setrefreshData={setrefreshData}
      />
      <EditModal
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        user={editUser}
        setrefreshData={setrefreshData}
      />
    </div>
  );
}

function AddNewModal({ isOpen, setIsOpen, setrefreshData }) {
  setrefreshData(false);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { publicAxios }: any = useAxios();

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (firstName && lastName && email) return true;
    return false;
  }, [firstName, lastName, email]);

  const submitModal = async () => {
    const { data, error } = await publicAxios.post(`/user/user/add`, {
      first_name: firstName,
      last_name: lastName,
      email,
    });
    // console.log(data);

    console.log("submitModal");
    setEmail("");
    setFirstName("");
    setLastName("");
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
              New User Account
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

function EditModal({ isOpen, setIsOpen, user, setrefreshData }) {
  setrefreshData(false);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { publicAxios }: any = useAxios();

  useEffect(() => {
    if (user) {
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
      setEmail(user?.email);
    }
  }, [user]);

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (firstName && lastName && email) return true;
    return false;
  }, [firstName, lastName, email]);

  const submitModal = async () => {
    const data = await publicAxios.post(`/user/user/${user.uuid}/edit`, {
      first_name: firstName,
      last_name: lastName,
      email,
    });
    if (data) {
    }
    // console.log("submitModal");
    setEmail("");
    setFirstName("");
    setLastName("");
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

function DeleteModal({ isOpen, setIsOpen, user, setrefreshData }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { publicAxios }: any = useAxios();
  setrefreshData(false);

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
              Confirm Delete
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
                    {user.first_name} {user.last_name}{" "}
                  </span>
                  ?
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
                onPress={async () => {
                  const data = await publicAxios.delete(
                    `/user/user/${user.uuid}/delete`
                  );
                  console.log(data);
                  setIsOpen(false);
                  setrefreshData(true);
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
