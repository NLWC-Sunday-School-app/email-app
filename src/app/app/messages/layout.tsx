import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Sender",
  description: "Messages in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
