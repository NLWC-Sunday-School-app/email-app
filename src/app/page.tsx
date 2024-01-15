"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { loggedinUser }: any = useAuth();
  console.log(loggedinUser);
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}
