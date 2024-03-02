"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/auth/login`);
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}
