import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Draft Campaigns | Sender",
  description: "Draft Campaigns in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
