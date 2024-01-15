import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sent Campaigns | Sender",
  description: "Sent Campaigns in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
