import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mailing List | Epistle",
  description: "Mailing List in Epistle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
