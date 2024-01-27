"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CustomTable from "@/components/table";
import React, { useState } from "react";
import { Add } from "iconsax-react";

import { columns, users, statusOptions } from "@/components/data";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/VerticalDotsIcon";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearContents = () => {
    setEmail("");
    setPassword("");
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = React.useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const enableSubmit = React.useMemo(() => {
    if (!isEmailInvalid && password && email) return true;
    return false;
  }, [isEmailInvalid, password, email]);

  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: "20px 30px",
          gap: "20px",
          margin: "30px 20px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          width: "60%",
          color: "black",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "25px" }}>Login</p>
        <Divider />
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <label style={{ display: "flex", fontSize: "14px", flex: 1 }}>
              Email
            </label>
            <div
              style={{
                flex: 2,
              }}
            >
              <Input
                style={{ flex: 2 }}
                radius={"sm"}
                variant="bordered"
                labelPlacement="outside"
                value={email}
                isInvalid={isEmailInvalid}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <label style={{ display: "flex", fontSize: "14px", flex: 1 }}>
              Password
            </label>
            <div
              style={{
                flex: 2,
                position: "relative",
              }}
            >
              <Input
                radius={"sm"}
                type={"password"}
                labelPlacement="outside"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
            color="primary"
            style={{ borderRadius: "5px" }}
            isDisabled={!enableSubmit}
            onPress={() => {
              router.replace("/app/dashboard");
              clearContents();
            }}
          >
            <p>Login</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
