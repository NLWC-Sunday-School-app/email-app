import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Report | Sender",
  description: "Campaign Report in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
