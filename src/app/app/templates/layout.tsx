import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates | Epistle",
  description: "Templates in Epistle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
