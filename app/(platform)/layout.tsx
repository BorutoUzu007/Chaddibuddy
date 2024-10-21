import { Navbar } from "@/components/platform/navbar";
import { NavBar } from "@/components/platform/navbar/navbar";
import { TopNavbar } from "@/components/platform/top-navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Chaddibuddy",
  description: "Chaddibuddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex flex-col bg-[#1b1b1b] rounded-2xl h-full w-full pt-4">
          {/* <ResizablePanelGroup
            direction="horizontal"
          >
            <ResizablePanel defaultSize={14} minSize={14} maxSize={18}>
              <Navbar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup> */}
            {/* <Navbar /> */}
            <div className="flex w-full">
              <NavBar />
              <div className="w-full">
                <TopNavbar />
              </div>
            </div>
            {/* <NavBar /> */}
            {children}
        </div>
  );
}
