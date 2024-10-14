import { Navbar } from "@/components/platform/navbar";
import { NavBar } from "@/components/platform/navbar/navbar";
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
        <div className="flex bg-[#1b1b1b] h-full rounded-2xl w-full ">
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
            <NavBar />
            {children}
        </div>
  );
}
