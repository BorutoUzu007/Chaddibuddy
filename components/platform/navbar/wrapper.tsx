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
            "fixed flex flex-col w-[80%] sm:w-[250px] bg-[#1b1b1b] border-r border-[#2D2E35] z-[10] h-full",
            collapsed && 'w-[50px] sm:w-[70px] static h-auto border-none'
        )}>
            {children}
        </aside>
    )
}