import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Campaign | Sender",
  description: "Preview Campaign in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
