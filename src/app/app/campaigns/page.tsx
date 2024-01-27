"use client";
import Image from "next/image";
import CustomTable from "../../../components/table";
import React from "react";

import { columns, users, statusOptions } from "../../../components/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { IoMdAdd } from "react-icons/io";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tableHeaders = ["name", "created_at", "status", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "DATE CREATED", uid: "created_at" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const actionCell = (id) => {
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
                router.push("/app/campaigns/1/preview");
              }}
            >
              View
            </DropdownItem>
            <DropdownItem onClick={() => router.push("/app/campaigns/create")}>
              Duplicate
            </DropdownItem>
            <DropdownItem onClick={onOpen}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "20px",
          gap: "20px",
          fontSize: "15px",
        }}
      >
        <Link href="/app/campaigns/sent">
          <p>Sent</p>
          <div
            style={{
              display: pathname == "/app/campaigns/sent" ? "flex" : "none",
              height: "4px",
              backgroundColor: "red",
              borderBottomLeftRadius: "30px",
              borderBottomRightRadius: "30px",
              // width: "60px",
            }}
          ></div>
        </Link>
        <Link href="/app/campaigns">
          <p>Draft</p>
          <div
            style={{
              display: pathname == "/app/campaigns" ? "flex" : "none",
              height: "4px",
              backgroundColor: "red",
              borderBottomLeftRadius: "30px",
              borderBottomRightRadius: "30px",
              // width: "60px",
            }}
          ></div>
        </Link>
      </div>
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
          onClick={() => router.push("/app/campaigns/create")}
        >
          <IoMdAdd size={15} />
          New Campaign
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
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
      />
    </div>
  );
}

 function DeleteModal({ isOpen, onOpen, onOpenChange }) {
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

  const submitModal = ({ onClose }) => {
    console.log("submitModal");
    console.log(enableSubmit);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
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
              <Button color="danger" onPress={() => alert("Delete")}>
                Test
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
 function CancelModal({ isOpen, onOpen, onOpenChange }) {
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

  const submitModal = ({ onClose }) => {
    console.log("submitModal");
    console.log(enableSubmit);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Cancellation: Test
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
                  Are you sure that you want to cancel the
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
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  All draft messages will be permanently deleted.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Go Back
              </Button>
              <Button color="danger" onPress={() => alert("Delete")}>
                Cancel
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
