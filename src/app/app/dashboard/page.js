"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { users } from "@/components/data";
import CustomTable from "../../../components/table";
import { ArrowSwapHorizontal, MessageTick, MouseSquare, Send2 } from "iconsax-react";
import React, { useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { loggedinUser } = useAuth();

  Chart.register(CategoryScale);

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        fill: "origin",
        height: "90%",
      },
    ],
  });

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    { name: "EMAIL", uid: "email" },
    { name: "NAME", uid: "name" },
    { name: "CREATED", uid: "created_at" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
  ];
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const completedCampaignColumns = [
    { name: "NAME", uid: "url" },
    { name: "SENT", uid: "sent" },
    { name: "OPENED", uid: "opens" },
    { name: "CLICKED", uid: "clicks" },
    { name: "CREATED", uid: "created_at" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "20px 15px",
        backgroundColor: "",
        height: '90%',
        gap: '20px',

      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "10px 10px",
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <br />
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: '20px 0px'
          // paddingB
        }}>
          <p style={{ fontSize: '20px' }}>Total Subscribers</p>
        </div>
        <br />
        <br />
        <hr />
        <div style={{
          width: "70%",
        }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Users Gained between 2016-2020",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flex: "1 1 100%",
          gap: "20px",
          width: "79vw",
        }}
        className="row mb-4"
      >
        <div style={{
          paddingTop: '30px',
          flex: 1
        }}>
          <CustomTable
            headers={tableHeaders}
            columns={completedCampaignColumns}
            data={users}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            searchText={searchText}
            setSearchText={setSearchText}
            pages={pages}
            setPages={setPages}
            customBottomContent={<div></div>}
            customTopContent={<div><p style={{ fontSize: '20px' }}>Completed Campaigns  </p></div>}
          // renderActionCell={actionCell}
          />
        </div>
        <div style={{
          paddingTop: '30px',
          flex: 1
        }}>

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
            customBottomContent={<div></div>}
            customTopContent={<div><p style={{ fontSize: '20px' }}>Recent Subscribers </p></div>}
          // renderActionCell={actionCell}
          />
        </div>
      </div>

      <div style={{
        paddingTop: '30px'
      }}>
        <p style={{ fontSize: '20px' }}>Top Clicked Links </p>
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
          customBottomContent={<div></div>}
          customTopContent={<div></div>}
        // renderActionCell={actionCell}
        />
      </div>
    </div>
  );
}

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];
