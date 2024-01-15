"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React from "react";

import { columns, users, statusOptions } from "@/components/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);
export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);

  const router = useRouter();

  const tableHeaders = ["name", "service", "actions"];

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "SERVICE", uid: "service" },
  ];

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignSelf: "center",
          gap: "10px",
          paddingLeft: "10px",
          paddingTop: "20px",
        }}
      >
        <Button
          color="default"
          radius="sm"
          style={{
            borderRadius: "5px",
            borderWidth: "0.5px",
            backgroundColor: "white",
          }}
          onPress={() => {
            router.push("/app/campaigns/2/edit");
          }}
          className="border-2 "
        >
          Edit
        </Button>
        <Button
          color="danger"
          style={{ borderRadius: "5px" }}
          onPress={() => {
            router.push("/app/campaigns/2/status");
          }}
        >
          Cancel
        </Button>
      </div>
      <div className="flex md:flex-row flex-col" style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "30px 10px",
            flex: 3,
            // width: "100%",
            // height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 20px",
              backgroundColor: "white",
              flex: 3,
              // width: "100%",
            }}
            className="shadow rounded"
          >
            <p style={{ fontSize: "20px", fontWeight: "600", color: "#555" }}>
              Content
            </p>
            <br />
            <hr></hr>
            <br />
            <MarkdownEditor
              value={"welcome"}
              // source={sampleTemplate}
              style={{ height: "500px" }}
            />
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
              // renderActionCell={actionCell}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            position: "static",
          }}
          className=""
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "30px 10px",
              padding: "30px 20px",
              backgroundColor: "white",
            }}
            className="shadow rounded"
          >
            <p style={{ fontSize: "20px", fontWeight: "600", color: "#555" }}>
              Test Email
            </p>
            <br />
            <hr></hr>
            <br />

            {/* <div>sampleTemplate</div> */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#555",
                }}
              >
                RECIPIENT
              </label>
              <Input
                radius={"sm"}
                isRequired
                size="sm"
                placeholder="Enter your email"
                variant="bordered"
                // value={toEmail}
                // onChange={(e) => setToEmail(e.target.value)}
                // isInvalid={isToEmailInvalid}
                // errorMessage={isToEmailInvalid ? "Please enter a valid email" : ""}
              />
            </div>
            <br />
            <button
              style={{
                borderRadius: "3px",
                padding: "5px 10px",
                fontSize: "11px",
                color: "#5d63ff",
                backgroundColor: "#d9e2ec",
                width: "120px",
              }}
              onClick={() => {
                alert("Email Sent");
              }}
            >
              Send Test Email
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "30px 10px",
              padding: "30px 20px",
              backgroundColor: "white",
              gap: "10px",
            }}
            className="shadow rounded"
          >
            <p style={{ fontSize: "20px", fontWeight: "600", color: "#555" }}>
              Sending options
            </p>
            <hr></hr>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                RECIPIENTS
              </label>
              <Select
                size="sm"
                aria-label="Select Template"
                variant={"bordered"}
                placeholder="Select Tags"
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                SCHEDULE
              </label>
              <Select
                size="sm"
                aria-label="Select Template"
                variant={"bordered"}
                placeholder=""
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                SENDING BEHAVIOUR
              </label>
              <Select
                size="sm"
                aria-label="Select Template"
                variant={"bordered"}
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              gap: "10px",
            }}
          >
            <Button
              color="default"
              radius="sm"
              style={{
                borderRadius: "5px",
                borderWidth: "0.5px",
                backgroundColor: "white",
              }}
              onPress={() => {
                router.push("/app/campaigns");
              }}
              className="border-2 "
            >
              Back
            </Button>
            <Button
              color="primary"
              style={{ borderRadius: "5px" }}
              onPress={() => {
                router.push("/app/campaigns/2/status");
              }}
            >
              Send Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
export const sampleTemplate = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title></title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    
      <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
      <!--<![endif]-->

    
    
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
.mj-column-per-40 { width:40% !important; max-width: 40%; }
.mj-column-per-60 { width:60% !important; max-width: 60%; }
.mj-column-per-33-33333333333333 { width:33.33333333333333% !important; max-width: 33.33333333333333%; }
.mj-column-per-50 { width:50% !important; max-width: 50%; }
.mj-column-per-33-333333 { width:33.333333% !important; max-width: 33.333333%; }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
.moz-text-html .mj-column-per-40 { width:40% !important; max-width: 40%; }
.moz-text-html .mj-column-per-60 { width:60% !important; max-width: 60%; }
.moz-text-html .mj-column-per-33-33333333333333 { width:33.33333333333333% !important; max-width: 33.33333333333333%; }
.moz-text-html .mj-column-per-50 { width:50% !important; max-width: 50%; }
.moz-text-html .mj-column-per-33-333333 { width:33.333333% !important; max-width: 33.333333%; }
    </style>
    
  
    <style type="text/css">
    
    

    @media only screen and (max-width:479px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }
  
    </style>
    <style type="text/css">
    .hide_on_mobile { display: none !important;} 
        @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
        .hide_section_on_mobile { display: none !important;} 
        @media only screen and (min-width: 480px) { 
            .hide_section_on_mobile { 
                display: table !important;
            } 

            div.hide_section_on_mobile { 
                display: block !important;
            }
        }
        .hide_on_desktop { display: block !important;} 
        @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
        .hide_section_on_desktop { 
            display: table !important;
            width: 100%;
        } 
        @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
        
          p, h1, h2, h3 {
              margin: 0px;
          }

          ul, li, ol {
            font-size: 11px;
            font-family: Ubuntu, Helvetica, Arial;
          }

          a {
              text-decoration: none;
              color: inherit;
          }

        @media only screen and (max-width:480px) {
            .mj-column-per-100 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-100 { width:100%!important; max-width:100%!important; }.mj-column-per-40 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }.mj-column-per-60 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }.mj-column-per-33 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-33 { width:33.33333333333333%!important; max-width:33.33333333333333%!important; }.mj-column-per-50 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }.mj-column-per-33 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
        }
    </style>
    
  </head>
  <body style="word-spacing:normal;background-color:#F4DDDF;">
    
    
      <div style="background-color:#F4DDDF;">
        
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:5px 0px 5px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:11px 15px 5px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: right;"><span style="color: rgb(0, 0, 0); font-size: 12px; font-family: Montserrat, sans-serif;"><a style="color: #000000;" href="*|WEBVERSION|*" target="_blank" rel="noopener">View the on-line version</a></span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:5px 0px 5px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:15px 0px 15px 0px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46); font-size: 24px;"><strong>LOGO</strong></span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:475px;">
              
      <img src="https://storage.googleapis.com/monikapestova50713/Mothers%20day.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="475" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px 0px 9px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:20px 25px 20px 25px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46); font-size: 14px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh.<strong> Praesent </strong>dapibus. Aenean placerat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus.<strong> Aenean placerat:</strong></span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#f2a7ad" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#f2a7ad;background-color:#f2a7ad;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2a7ad;background-color:#f2a7ad;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:264px;" ><![endif]-->
            
      <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:NaNpx;vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:197px;">
              
      <img src="https://storage.googleapis.com/topol-io-plugin-6f3a6a1a-1247-4d57-a96f-7c9763f80764/plugin-assets/1/monikapestova/%20edited_d06c9e81-0bc9-4e23-83b0-098f4c201f9c.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="197" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:396px;" ><![endif]-->
            
      <div class="mj-column-per-60 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td style="font-size:0px;word-break:break-word;">
                  
      <div style="height:22px;line-height:22px;">&#8202;</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: Ubuntu, Helvetica, Arial; font-size: 22px; text-align: center;"><span style="color: rgb(255, 255, 255); font-size: 30px;">SPECIAL OFFER</span></h1></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 18px;">A FLOWER RIGHT IN YOUR ARMS</span></strong></span></p>
<p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"> </p>
<p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="font-size: 17px; color: rgb(91, 43, 46);">Only on<strong> 14.5.2023 </strong></span></p>
<p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="font-size: 17px; color: rgb(91, 43, 46);"><strong>FREE </strong>courier service</span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="border:0px transparent dotted;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:219.99999999999997px;" ><![endif]-->
            
      <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:119px;">
              
      <img src="https://storage.googleapis.com/topol-io-plugin-6f3a6a1a-1247-4d57-a96f-7c9763f80764/plugin-assets/1/monikapestova/Untitled%20design%20edited_032f26d9-d386-49de-9a51-7fac241d6135%20edited_09c256c1-b067-425c-8b3d-ac69fa5550e6.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="119" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 14px;">PRODUCT  1</span></strong></span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#9da3a3;"><p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="color: rgb(91, 43, 46); font-size: 13px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus. Aenean placerat. </span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 35px 20px 35px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#EE8A92" role="presentation" style="border:none;border-radius:18px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#EE8A92;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #EE8A92; color: #ffffff; font-family: Montserrat, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 18px;" target="_blank">
                <span><span style="font-size: 14px;">Buy</span></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:219.99999999999997px;" ><![endif]-->
            
      <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:119px;">
              
      <img src="https://storage.googleapis.com/topol-io-plugin-6f3a6a1a-1247-4d57-a96f-7c9763f80764/plugin-assets/1/monikapestova/Untitled%20design%20edited_032f26d9-d386-49de-9a51-7fac241d6135%20edited_09c256c1-b067-425c-8b3d-ac69fa5550e6.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="119" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 14px;">PRODUCT  2</span></strong></span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#9da3a3;"><p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="color: rgb(91, 43, 46); font-size: 13px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus. Aenean placerat. </span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 35px 20px 35px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#EE8A92" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#EE8A92;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #EE8A92; color: #ffffff; font-family: Montserrat, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 24px;" target="_blank">
                <span><span style="font-size: 14px;">Buy</span></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:219.99999999999997px;" ><![endif]-->
            
      <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:119px;">
              
      <img src="https://storage.googleapis.com/topol-io-plugin-6f3a6a1a-1247-4d57-a96f-7c9763f80764/plugin-assets/1/monikapestova/Untitled%20design%20edited_032f26d9-d386-49de-9a51-7fac241d6135%20edited_09c256c1-b067-425c-8b3d-ac69fa5550e6.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="119" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 14px;">PRODUCT  3</span></strong></span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#9da3a3;"><p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="color: rgb(91, 43, 46); font-size: 13px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus. Aenean placerat. </span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 35px 20px 35px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#EE8A92" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#EE8A92;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #EE8A92; color: #ffffff; font-family: Montserrat, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 24px;" target="_blank">
                <span><span style="font-size: 14px;">Buy</span></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="border:0px transparent dotted;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:330px;" ><![endif]-->
            
      <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td style="font-size:0px;word-break:break-word;">
                  
      <div style="height:18px;line-height:18px;">&#8202;</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:183px;">
              
      <img src="https://storage.googleapis.com/topol-io-plugin-6f3a6a1a-1247-4d57-a96f-7c9763f80764/plugin-assets/1/monikapestova/Untitled%20design%20edited_032f26d9-d386-49de-9a51-7fac241d6135%20edited_09c256c1-b067-425c-8b3d-ac69fa5550e6.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="183" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:330px;" ><![endif]-->
            
      <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:15px 35px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 14px;">PRODUCT  4</span></strong></span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:10px 35px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#9da3a3;"><p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="color: rgb(91, 43, 46); font-size: 13px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus. Aenean placerat. </span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 54px 10px 35px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#EE8A92" role="presentation" style="border:none;border-radius:18px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#EE8A92;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #EE8A92; color: #ffffff; font-family: Montserrat, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 18px;" target="_blank">
                <span><span style="font-size: 14px;">Buy</span></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:20px 25px 20px 25px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="color: rgb(91, 43, 46); font-size: 14px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh.<strong> Praesent </strong>dapibus. Aenean placerat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Praesent dapibus.<strong> Aenean placerat:</strong></span></p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:0px 20px 0px 20px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#EE8A92" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#EE8A92;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #EE8A92; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 24px;" target="_blank">
                <span><span style="font-size: 14px;">See more products</span></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:transparent;background-color:transparent;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:660px;">
              
      <img src="https://storage.googleapis.com/monikapestova50713/Untitled%20design%20%283%29.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="660" height="auto">
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#EE8A92" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#EE8A92;background-color:#EE8A92;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#EE8A92;background-color:#EE8A92;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:7px 0px 7px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 30px 0px 30px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#f8d5d1;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><span style="font-size: 16px;"><strong><span style="color: rgb(91, 43, 46);">YOU DON'T KNOW WHAT TO DO? CONTACT US.</span></strong></span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#EE8A92" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#EE8A92;background-color:#EE8A92;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#EE8A92;background-color:#EE8A92;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:10px 0px 10px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:219.99999780000002px;" ><![endif]-->
            
      <div class="mj-column-per-33-333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><a href="mailto:shop@xy.cz" style="color: #5B2B2E;"><span style="color: rgb(91, 43, 46);"><strong><span style="font-size: 14px;">shop@company-xy.cz</span></strong></span></a></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:219.99999780000002px;" ><![endif]-->
            
      <div class="mj-column-per-33-333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                  
      
     <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                <tbody>
                  
      <tr>
        <td style="padding:4px;vertical-align:middle;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:31px;">
            <tbody>
              <tr>
                <td style="font-size:0;height:31px;vertical-align:middle;width:31px;">
                  <a href="https://www.facebook.com/PROFILE" target="_blank" style="color: #5B2B2E;">
                    <img alt="facebook" height="31" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/facebook.png" style="border-radius:3px;display:block;" width="31">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            <!--[if mso | IE]></td><td><![endif]-->
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                <tbody>
                  
      <tr>
        <td style="padding:4px;vertical-align:middle;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:31px;">
            <tbody>
              <tr>
                <td style="font-size:0;height:31px;vertical-align:middle;width:31px;">
                  <a href="https://www.instagram.com/PROFILE" target="_blank" style="color: #5B2B2E;">
                    <img alt="instagram" height="31" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/instagram.png" style="border-radius:3px;display:block;" width="31">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            <!--[if mso | IE]></td><td><![endif]-->
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                <tbody>
                  
      <tr>
        <td style="padding:4px;vertical-align:middle;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:31px;">
            <tbody>
              <tr>
                <td style="font-size:0;height:31px;vertical-align:middle;width:31px;">
                  <a href="youtube" target="_blank" style="color: #5B2B2E;">
                    <img height="31" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/youtube.png" style="border-radius:3px;display:block;" width="31">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            <!--[if mso | IE]></td></tr></table><![endif]-->
    
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:219.99999780000002px;" ><![endif]-->
            
      <div class="mj-column-per-33-333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:10px 0px 10px 0px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#9da3a3;"><p style="font-family: Montserrat, sans-serif; font-size: 11px; text-align: center;"><strong><span style="color: rgb(91, 43, 46); font-size: 14px;">www.company-xy.cz</span></strong></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:660px;" width="660" bgcolor="#EE8A92" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="background:#EE8A92;background-color:#EE8A92;margin:0px auto;max-width:660px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#EE8A92;background-color:#EE8A92;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px 0px 20px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:660px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" style="font-size:0px;padding:13px 15px 13px 15px;word-break:break-word;">
                  
      <div style="font-family:Montserrat, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;"><p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="font-size: 13px;">Let the recipient know why they received the email and how it ended up on your mailing list.</span></p>
<p style="font-family: Montserrat, sans-serif; font-size: 11px;"><span style="font-size: 13px;">Don't want to receive our emails?</span> <span style="text-decoration: underline;"><a href="*|UNSUB|*" style="color: #5B2B2E;">Unsubscribe here.</a></span></p></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
    
      </div>
    
  </body>
</html>`;
