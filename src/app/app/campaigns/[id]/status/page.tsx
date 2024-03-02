"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "../../../../../components/table";
import React from "react";

import { columns, users, statusOptions } from "../../../../../components/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);

  const pathname = usePathname();

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "SERVICE", uid: "service" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "30px 30px",
          padding: "30px 20px",
          backgroundColor: "white",
        }}
      >
        <p>Your campaign is queued and will be sent out soon</p>
        <br />
        <hr></hr>
        <br />
        <p>Your campaign is queued and will be sent out soon</p>
      </div>
    </div>
  );
}
