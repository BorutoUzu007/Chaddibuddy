'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useNavSidebar } from "@/store/nav-sidebar"
import Link from "next/link"
import { CgGym } from "react-icons/cg"
import { FaTasks } from "react-icons/fa"
import { FcPlanner, FcViewDetails } from "react-icons/fc"
import { MdManageHistory } from "react-icons/md"
import { VscGraph } from "react-icons/vsc"

export const NavItem = () => {

    const collapsed = useNavSidebar((state) => state.collapsed)

    return (
    <>
        <div>
            <p className="text-muted-foreground text-md"><hr /></p>
        </div>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/dashboard"}>
                <div className="flex items-center gap-x-4">
                    <VscGraph className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )}
                    size={24}
                    color="#63eb87" />
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            Dashboard
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/all-tasks"}>
                <div className="flex items-center gap-x-4">
                    <FaTasks className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )} 
                    size={24}
                    color="#636eeb"/>
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            All Tasks
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/planner"}>
                <div className="flex items-center gap-x-4">
                    <FcPlanner className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )}
                    size={24} />
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            Planner
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/details"}>
                <div className="flex items-center gap-x-4">
                    <FcViewDetails className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )} />
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            Details
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/history"}>
                <div className="flex items-center gap-x-4">
                    <MdManageHistory className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )}
                    size={24}
                    color="#ebe85e" />
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            History
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/gym"}>
                <div className="flex items-center gap-x-4">
                    <CgGym className={cn(
                        "text-muted-foreground text-md",
                        collapsed ? "mr-0": "mr-2"
                    )} 
                    size={24}
                    color="#eb5e5e"/>
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            Gym
                        </span>
                    )}
                </div>
            </Link>
        </Button>
        <Button variant='ghost' asChild className={cn(
            "w-full h-12",
            collapsed ? "justify-center": "justify-start",
        )}>
            <Link href={"/calories"}>
                <div className="flex items-center gap-x-4">
                    <span className={cn(
                        "text-xl",
                        collapsed ? "mr-0": "mr-2"
                    )} > 🔥 </span>
                    {!collapsed && (
                        <span className="text-lg  text-white">
                            Calories
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    </>
    )
}