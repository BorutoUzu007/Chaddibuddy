'use client'
import { cn } from "@/lib/utils"
import { useNavSidebar } from "@/store/nav-sidebar"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({children}: WrapperProps) => {

    const {collapsed} = useNavSidebar((state) => state)
    return (
        <aside className={cn(
            "fixed flex flex-col w-[70px] lg:w-60 bg-[#1b1b1b] lg:border-r lg:border-[#2D2E35]",
            collapsed && 'lg:w-[70px] static'
        )}>
            {children}
        </aside>
    )
}