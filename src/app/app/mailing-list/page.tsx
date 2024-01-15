"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import CustomTable from "../../../components/table";
import React from "react";

import { columns, users, statusOptions } from "../../../components/data";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, useDisclosure } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const raw = 3;
  const router = useRouter();

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
            <DropdownItem
              onClick={() => {
                router.push("/app/mailing-list/1/view");
              }}
            >
              View
            </DropdownItem>
            <DropdownItem onClick={onOpen}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "NUMBER OF SUBSCRIBERS", uid: "subscribers" },
    { name: "DATE CREATED", uid: "created_at" },
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
    </div>
  );
}
