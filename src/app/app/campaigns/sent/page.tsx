"use client";
import Image from "next/image";
import { useAuth } from "../../../../context/AuthContext";
import CustomTable from "../../../../components/table";
import React from "react";

import { columns, users, statusOptions } from "../../../../components/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);

  const router = useRouter();

  const pathname = usePathname();

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "SENT", uid: "sent" },
    { name: "OPENED", uid: "opened" },
    { name: "CLICKED", uid: "clicked" },
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
                router.push("/app/campaigns/1/report");
              }}
            >
              View Report
            </DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
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
          <p>he</p>
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
    </div>
  );
}
