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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f4f8ff",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}
