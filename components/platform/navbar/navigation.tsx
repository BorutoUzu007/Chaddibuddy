'use client'

import { VscGraph } from "react-icons/vsc";
import { usePathname } from "next/navigation"
import { NavItem } from "./navitem"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FaTasks } from "react-icons/fa";
import { FcPlanner, FcViewDetails } from "react-icons/fc";
import { MdManageHistory } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { FaBowlFood } from "react-icons/fa6";
import { useNavSidebar } from "@/store/nav-sidebar";


export const Navigation = () => {

    const collapsed = useNavSidebar((state) => state.collapsed)

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {!collapsed && (<NavItem />)}
        </ul>
    )
}