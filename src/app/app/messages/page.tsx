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
import { Button, useDisclosure } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { useRouter } from "next/navigation";
import { useFetchMessages } from "@/services/MessagesServices";

export default function Home() {
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
    { name: "DATE", uid: "created_at" },
    { name: "SUBJECT", uid: "subject" },
    {
      name: "CAMPAIGN",
      uid: "campaign.name",
      link: "campaigns/{campaign.uuid}/report",
      // link: "app/users/{user.name}",
      linkKey: "campaign.uuid",
    },
    {
      name: "SUBSCRIBER",
      uid: "recipient_email",
      link: "app/users/{user.name}",
      linkKey: "user.name",
    },
    { name: "STATUS", uid: "status" },
    // { name: "", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [tableData, setTableData] = useState([]);

  const { user, isLoading, error, mutate } = useFetchMessages({
    search: searchText,
    page_size: rowsPerPage,
    page: page,
  });
  console.log(user, "data");

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
      setPages(user?.meta?.last_page);
    }
  }, [user]);

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
        {/* <button
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
          <Add />
          Send New Message
        </button> */}
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
          dataIsLink={["campaign.name"]}
        />
      </div>
    </div>
  );
}
