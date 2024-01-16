"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  redirect(`/app/dashboard`);
  return ( 
    <div>
      <p>Hello World</p>
    </div>
  );
}
