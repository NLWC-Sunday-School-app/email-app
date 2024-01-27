import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Sender",
  description: "Dashboard in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
