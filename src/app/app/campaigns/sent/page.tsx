"use client";
import Image from "next/image";
import { useAuth } from "../../../../context/AuthContext";
import CustomTable from "../../../../components/table";
import React, { useEffect } from "react";

import { columns, users, statusOptions } from "../../../../components/data";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { IoMdAdd } from "react-icons/io";
import { useFetchCampaigns } from "@/services/AuthServices";
import {
  canEditQueuedCampaign,
  useCreateCampaign,
} from "@/services/CampaignServices";
import useSWR from "swr";
import { useAxios } from "@/context/AxiosContext";

export default function Home() {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [campaignData, setcampaignData] = React.useState([]);
  const [createCampaign, setcreateCampaign] = React.useState(false);
  const { publicAxios }: any = useAxios();

  const { user, isLoading, isError } = useFetchCampaigns({
    search: searchText,
    page_size: rowsPerPage,
    page,
    status: "SENT",
  });

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
      // console.log(user);
      // console.log(formattedUser);

      setcampaignData(formattedUser);
      setPages(user?.last_page);
    }
  }, [user]);

  const router = useRouter();

  const pathname = usePathname();

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    {
      name: "NAME",
      uid: "name",
      link: "app/users/{user.name}",
      linkKey: "user.name",
    },
    { name: "SENT", uid: "sent" },
    { name: "OPENED", uid: "opened" },
    { name: "CLICKED", uid: "clicked" },
    { name: "DATE CREATED", uid: "created_at" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
  ];

  const actionCell = (user) => {
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
                if (user?.status != "SENT") {
                  router.push(`/app/campaigns/${user?.uuid}/status`);
                } else {
                  router.push(`/app/campaigns/${user?.uuid}/report`);
                }
              }}
            >
              View Report
            </DropdownItem>
            {canEditQueuedCampaign(user?.scheduled_at) && (
              <DropdownItem
                onClick={() => {
                  router.push(`/app/campaigns/${user?.uuid}/preview`);
                }}
              >
                Back to Drafts
              </DropdownItem>
            )}
            <DropdownItem
              onClick={() => {
                publicAxios
                  .get(`/user/campaign/${user?.uuid}/duplicate`)
                  .then((data) => {
                    console.group(data);
                    router.push(
                      `/app/campaigns/${data?.data?.data?.uuid}/preview`
                    );
                  });
              }}
            >
              Duplicate
            </DropdownItem>
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
          onClick={() => {
            setcreateCampaign(true);
            // router.push("/app/campaigns/create");
          }}
        >
          <IoMdAdd size={15} />
          New Campaign
        </button>
      </div>
      <div>
        <CustomTable
          headers={tableHeaders}
          columns={columns}
          data={campaignData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
          pages={pages}
          setPages={setPages}
          renderActionCell={actionCell}
          // dataIsLink={["name"]}
        />
      </div>
      {createCampaign && <CreateCampaign />}
    </div>
  );
}

function CreateCampaign() {
  const { user } = useCreateCampaign();
  console.log(user);
  if (user) {
    redirect(`/app/campaigns/${user?.uuid}/preview`);
  }
  return <div></div>;
}
