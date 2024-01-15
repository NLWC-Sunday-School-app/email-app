import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Campaign | Sender",
  description: "Create Campaign in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
