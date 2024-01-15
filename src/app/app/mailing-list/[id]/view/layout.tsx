import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Services | Sender",
  description: "Email Services in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
