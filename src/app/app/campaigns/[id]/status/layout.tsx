import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Status | Sender",
  description: "Campaign Status in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
