"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "../../../../../components/table";
import React from "react";

import { columns, users, statusOptions } from "../../../../../components/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewOneCampaign } from "@/services/CampaignServices";

export default function Home({ params }) {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);

  const { data, isError } = useViewOneCampaign({ uuid: params.id });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p style={{ paddingLeft: "15px", fontSize: "25px", paddingTop: "20px" }}>
        {data?.name}
      </p>
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
