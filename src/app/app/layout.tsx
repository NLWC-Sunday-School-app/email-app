import type { Metadata } from "next";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/topnav";

export const metadata: Metadata = {
  title: "Epistle | Premium Email Marketing",
  description: "Advanced campaign management and analytics platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-5">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
