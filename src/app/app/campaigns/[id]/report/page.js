"use client";
import Image from "next/image";
import { useAuth } from "../../../../../context/AuthContext";
import CustomTable from "../../../../../components/table";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { users } from "../../../../../components/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import {
  ArrowSwapHorizontal,
  MessageTick,
  MouseSquare,
  Send2,
} from "iconsax-react";
import { PiHandTap } from "react-icons/pi";
import { LuMailOpen } from "react-icons/lu";
import { HiMailOpen } from "react-icons/hi";
import { PiHandTapFill } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { useAxios } from "@/context/AxiosContext";
import { useGetCampaignReport, useViewOneCampaign } from "@/services/CampaignServices";

export default function Home({ params }) {

  const [selected, setSelected] = React.useState("overview");

  const pathname = usePathname();



  return (
    <div className="flex flex-wrap gap-4" style={{}}>
      <Tabs
        // key={"underlined"}
        variant={"underlined"}
        aria-label="Tabs variants"
        selectedKey={selected}
        onSelectionChange={setSelected}

      >

        <Tab key="overview" title="Overview" style={{ height: '90%' }}>
          <Overview setSelected={setSelected} params={params} />
        </Tab>
        <Tab key="body" title="Body" style={{ height: '90%' }}>
          <Body params={params} />
        </Tab>
        <Tab key="recipients" title="Recipients" style={{ width: '100%' }} >
          <Recipients setSelected={setSelected} params={params} />
        </Tab>
        <Tab key="opens" title="Opens" >
          <Opens setSelected={setSelected} params={params} />
        </Tab>
        <Tab key="clicks" title="Clicks" >
          <Clicks setSelected={setSelected} params={params} />
        </Tab>
        <Tab key="bounces" title="Bounces" >
          <Bounces setSelected={setSelected} params={params} />
        </Tab>
        <Tab key="unsubscribes" title="Unsubscribes" >
          <Unsubscribes setSelected={setSelected} params={params} />
        </Tab>
      </Tabs>
    </div>
  );
}

function customTopContent() {
  return (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">Total {users.length} users</span>
    </div>
  )
}

const Body = ({ params }) => {
  const { data, isError } = useViewOneCampaign({ uuid: params.id });
  return (
    <div>
      <div className="bg-white">
        <iframe
          id="123532"
          name="123532render"
          style={{ width: "80vw", height: "80vh" }}
          sandbox="allow-scripts allow-same-origin"
          srcDoc={data.content}
        />
      </div>
    </div>
  )
}

const Overview = ({ setSelected, params }) => {
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
        height: "90%"
      },
    ],
  });


  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "URL", uid: "link" },
    { name: "CLICK COUNT", uid: "click_count" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'overview'
  });
  // console.log(data?.campaignStats)

  useEffect(() => {
    if (data) {
      setTableData(data?.campaignUrls);
    }
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "1px 15px",
        backgroundColor: "",
        height: '90%'
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
            <p style={{ fontSize: "35px" }}>{data?.campaignStats ? data?.campaignStats?.counts['sent'] : "N/A"}</p>
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
            <p style={{ fontSize: "35px" }}>{data?.campaignStats?.ratios ? (data?.campaignStats?.ratios['open']) + '%' : "N/A"}</p>
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
          onClick={() => setSelected("clicks")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>{data?.campaignStats?.ratios ? (data?.campaignStats?.ratios['click']) + '%' : "N/A"}</p>
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
            <p style={{ fontSize: "35px" }}>{data?.campaignStats?.ratios ? (data?.campaignStats?.ratios['bounce']) + '%' : "N/A"}</p>
            <p style={{ fontSize: "13px" }}>BOUNCE RATE</p>
          </div>
          <ArrowSwapHorizontal size="32" color="#adb5bd" />
        </div>
      </div>

      <div style={{
        paddingTop: '30px'
      }}>
        <p style={{ fontSize: '20px' }}>Top Clicked Links </p>
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
          customBottomContent={<div></div>}
          CustomTopContent={customTopContent}
        // renderActionCell={actionCell}
        />
      </div>
    </div>
  );
}

const Recipients = ({ setSelected, params }) => {
  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "SUBSCRIBER", uid: "recipient_email" },
    { name: "SUBJECT", uid: "subject" },
    { name: "DELIVERED", uid: "delivered_at" },
    { name: "OPENED", uid: "opened_at" },
    { name: "CLICKED", uid: "clicked_at" },
    { name: "BOUNCED", uid: "bounced_at" },
    { name: "COMPLAINED", uid: "complained_at" },
    { name: "", uid: "status" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'recipients',
    search: searchText,
    page_size: rowsPerPage,
    page,
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
      setPages(data?.meta?.last_page);
    }
  }, [data]);

  return (
    <div style={{
      // paddingTop: '30px',
      width: '80vw'
    }}>
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
      // customBottomContent={<div></div>}
      // customTopContent={customTopContent}
      // renderActionCell={actionCell}
      />
    </div>
  );
}

const Opens = ({ setSelected, params }) => {
  console.log('opens');
  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "SUBSCRIBER", uid: "recipient_email" },
    { name: "SUBJECT", uid: "subject" },
    { name: "OPENED", uid: "opened_at" },
    { name: "OPEN COUNT", uid: "open_count" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'opens',
    search: searchText,
    page_size: rowsPerPage,
    page,
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.messages?.data);
      setPages(data?.messages?.meta?.last_page);
    }
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "1px 15px",
        backgroundColor: "",
        width: '80vw'
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>{data?.openStats?.unique_open_count ? data?.openStats?.unique_open_count : "N/A"}</p>
            <p style={{ fontSize: "13px" }}>UNIQUE OPENS</p>
          </div>
          <LuMailOpen size="32" color="#adb5bd" />
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
            <p style={{ fontSize: "35px" }}>{data?.openStats?.total_open_count ? data?.openStats?.total_open_count : "N/A"}</p>
            <p style={{ fontSize: "13px" }}>TOTAL OPENS</p>
          </div>
          <HiMailOpen size="32" color="#adb5bd" />
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

        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>N/A</p>
            <p style={{ fontSize: "13px" }}>AVERAGE TIME TO OPEN</p>
          </div>
          <IoMdTime size="32" color="#adb5bd" />
        </div>
      </div>

      <div style={{
        paddingTop: '30px'
      }}>
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
          // customBottomContent={<div></div>}
          CustomTopContent={customTopContent}
        // renderActionCell={actionCell}
        />
      </div>
    </div>
  );
}
const Clicks = ({ setSelected, params }) => {
  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "SUBSCRIBER", uid: "recipient_email" },
    { name: "SUBJECT", uid: "subject" },
    { name: "CLICKED", uid: "clicked_at" },
    { name: "CLICK COUNT", uid: "click_count" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'clicks',
    search: searchText,
    page_size: rowsPerPage,
    page,
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.messages?.data);
      setPages(data?.messages?.meta?.last_page);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "1px 15px",
        backgroundColor: "",
        width: '80vw'
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>{data?.clickStats?.unique_click_count ? data?.clickStats?.unique_click_count : "N/A"}</p>
            <p style={{ fontSize: "13px" }}>UNIQUE CLICKS</p>
          </div>
          <PiHandTap size="32" color="#adb5bd" />
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>{data?.clickStats?.unique_click_count ? data?.clickStats?.unique_click_count : "N/A"}</p>
            <p style={{ fontSize: "13px" }}>TOTAL CLICKS</p>
          </div>
          <PiHandTapFill size="32" color="#adb5bd" />
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

        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "35px" }}>N/A</p>
            <p style={{ fontSize: "13px" }}>AVERAGE TIME TO CLICK</p>
          </div>
          <IoMdTime size="32" color="#adb5bd" />
        </div>
      </div>

      <div style={{
        paddingTop: '30px'
      }}>
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
          // customBottomContent={<div></div>}
          CustomTopContent={customTopContent}
        // renderActionCell={actionCell}
        />
      </div>
    </div>
  );
}
const Bounces = ({ setSelected, params }) => {
  console.log('bounces');
  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "SUBSCRIBER", uid: "recipient_email" },
    { name: "SUBJECT", uid: "subject" },
    { name: "BOUNCED", uid: "bounced_at" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'bounces',
    search: searchText,
    page_size: rowsPerPage,
    page,
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
      setPages(data?.meta?.last_page);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "1px 15px",
        backgroundColor: "",
        width: '80vw'
      }}
    >

      <div style={{
      }}>
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
          // customBottomContent={<div></div>}
          CustomTopContent={customTopContent}
        // renderActionCell={actionCell}
        />
      </div>
    </div>
  );
}
const Unsubscribes = ({ setSelected, params }) => {
  console.log('unsubscribes');
  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "SUBSCRIBER", uid: "subscriber" },
    { name: "SUBJECT", uid: "clicks" },
    { name: "UNSUBSCRIBED", uid: "clicks" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);

  const { data } = useGetCampaignReport({
    uuid: params.id,
    type: 'unsubscribed',
    search: searchText,
    page_size: rowsPerPage,
    page,
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
      setPages(data?.meta?.last_page);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px",
        padding: "1px 15px",
        backgroundColor: "",
        width: '80vw'
      }}
    >

      <div style={{
      }}>
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
        // customBottomContent={<div></div>}
        // CustomTopContent={customTopContent}
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


// <div
//   style={{
//     width: "100%",
//     backgroundColor: "white",
//     display: "flex",
//     flexDirection: "column",
//     padding: "10px 10px",
//     boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
//   }}
// >
//   <br />
//   <div style={{
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: '20px 0px'
//     // paddingB
//   }}>
//     <p style={{ fontSize: '20px' }}>Unique Opens</p>
//   </div>
//   <br />
//   <br />
//   <hr />
//   <div style={{
//     width: "70%",
//   }}>
//     <Line
//       data={chartData}
//       options={{
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: "Users Gained between 2016-2020",
//           },
//           legend: {
//             display: false,
//           },
//         },
//       }}
//     />
//   </div>
// </div>