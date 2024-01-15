"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "../../../../../components/table";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { columns, users, statusOptions } from "../../../../../components/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import {
  ArrowSwapHorizontal,
  MessageTick,
  MouseSquare,
  Send2,
} from "iconsax-react";

export default function Home() {
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
      },
    ],
  });

  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [selected, setSelected] = React.useState("photos");

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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <div className="flex flex-wrap gap-4" style={{}}>
      <Tabs
        // key={"underlined"}
        variant={"underlined"}
        aria-label="Tabs variants"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="overview" title="Overview" style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 0px",
              padding: "15px 15px",
              flex: 1,
              backgroundColor: "",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                flex: "1 1 100%",
                gap: "20px",
              }}
              className="row mb-4"
            >
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "130px",
                  padding: "0px 20px",
                  flex: 1,
                  minWidth: "300px",
                  borderRadius: "4px",
                  borderBottomWidth: "4px",
                  borderColor: "#b1b9ff",
                  cursor: "pointer",
                }}
                onClick={() => setSelected("recipients")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "35px" }}>22</p>
                  <p style={{ fontSize: "13px" }}>EMAILS SENT</p>
                </div>
                <Send2 size="32" color="#adb5bd" />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "130px",
                  padding: "0px 20px",
                  flex: 1,
                  minWidth: "300px",
                  borderRadius: "4px",
                  borderBottomWidth: "4px",
                  borderColor: "#b1b9ff",
                  cursor: "pointer",
                }}
                onClick={() => setSelected("opens")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "35px" }}>0%</p>
                  <p style={{ fontSize: "13px" }}>UNIQUE OPENS</p>
                </div>
                <MessageTick size="32" color="#adb5bd" />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "130px",
                  padding: "0px 20px",
                  flex: 1,
                  minWidth: "300px",
                  borderRadius: "4px",
                  borderBottomWidth: "4px",
                  borderColor: "#b1b9ff",
                  cursor: "pointer",
                }}
                onClick={() => setSelected("Clicks")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "35px" }}>22%</p>
                  <p style={{ fontSize: "13px" }}>CLICK RATE</p>
                </div>
                <MouseSquare size="32" color="#adb5bd" />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "130px",
                  padding: "0px 20px",
                  flex: 1,
                  minWidth: "300px",
                  borderRadius: "4px",
                  borderBottomWidth: "4px",
                  borderColor: "#b1b9ff",
                  cursor: "pointer",
                }}
                onClick={() => setSelected("bounces")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "35px" }}>22%</p>
                  <p style={{ fontSize: "13px" }}>BOUNCE RATE</p>
                </div>
                <ArrowSwapHorizontal size="32" color="#adb5bd" />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                padding: "10px 10px",
              }}
            >
              <p>Unique Opens</p>
              <br />
              <hr />
              <Line
                data={chartData}
                options={{
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
        </Tab>
        <Tab key="recipients" title="Recipients" />
        <Tab key="opens" title="Opens" />
        <Tab key="clicks" title="Clicks" />
        <Tab key="bounces" title="Bounces" />
        <Tab key="unsubscribes" title="Unsubscribes" />
      </Tabs>
    </div>

    // <div style={{ display: "flex", flexDirection: "column" }}>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       margin: "30px 30px",
    //       padding: "30px 20px",
    //       backgroundColor: "white",
    //     }}
    //   >
    //     <p>Your campaign is queued and will be sent out soon</p>
    //     <br />
    //     <hr></hr>
    //     <br />
    //     <p>Your campaign is queued and will be sent out soon</p>
    //   </div>
    // </div>
  );
}

export const Data = [
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
