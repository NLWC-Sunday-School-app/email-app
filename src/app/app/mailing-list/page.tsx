"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import CustomTable from "../../../components/table";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
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
import { redirect, useRouter } from "next/navigation";
import {
  useCreateMailingList,
  useListMailingList,
} from "@/services/MailingListServices";
import { useAxios } from "@/context/AxiosContext";

export default function Home() {
  const router = useRouter();

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
                router.push(`/app/mailing-list/${list?.uuid}/view`);
              }}
            >
              View
            </DropdownItem>
            <DropdownItem onClick={() => {}}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    {
      name: "NAME",
      uid: "name",
      link: "/app/mailing-list/{uuid}/view",
      linkKey: "uuid",
    },
    { name: "NUMBER OF SUBSCRIBERS", uid: "number_of_subscribers" },
    { name: "DATE CREATED", uid: "created_at" },
    // { name: "", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [tableData, setTableData] = useState([]);

  const { data, isLoading, error, mutate } = useListMailingList({
    search: searchText,
    page_size: rowsPerPage,
    page: page,
  });

  useEffect(() => {
    if (data) {
      const formattedUser = data?.data?.map((data) => ({
        ...data,
        created_at: new Date(data.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }));
      setTableData(formattedUser);
      setPages(data?.meta?.last_page);
    }
  }, [data]);

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
          <FaPlus />
          Create New List
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
          dataIsLink={["name"]}
        />
      </div>
      <AddNewModal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
    </div>
  );
}

function AddNewModal({ isOpen, setIsOpen }) {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const [name, setName] = React.useState("");
  const { publicAxios }: any = useAxios();

  const [createMailingList, setcreateMailingList] = useState(false);
  const router = useRouter();

  const enableSubmit = React.useMemo(() => {
    if (name) return true;
    return false;
  }, [name]);

  const submitModal = async () => {
    const newList = await publicAxios.post(`/user/mailing-list/create`, {
      name: name,
    });
    router.push(`/app/mailing-list/${newList.data.data.uuid}/view`);
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
              Create New Mailing List
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
                />
                {createMailingList && <CreateMailingList name={name} />}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setName("");
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  submitModal();
                }}
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

const CreateMailingList = ({ name }) => {
  const { user } = useCreateMailingList({ name });
  if (user) {
    redirect(`/app/mailing-list/${user?.uuid}/view`);
  }
  return <div></div>;
};
