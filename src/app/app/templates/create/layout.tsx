import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Template | Sender",
  description: "Create Template in Sender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
