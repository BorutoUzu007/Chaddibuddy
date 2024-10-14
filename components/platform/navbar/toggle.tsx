'use client'

import Hint from "@/components/hint"
import { Button } from "@/components/ui/button"
import { useNavSidebar } from "@/store/nav-sidebar"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Toggle = () => {
    const {collapsed, onCollapse, onExpand} = useNavSidebar((state) => state)

    const label = collapsed ? "Expand": "Collapse"
    return (
        <>
            {collapsed && (
                <div className="w-full lg:flex items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
                            <FaArrowRight className="h-4 w-4" color="white" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary text-white">
                        Chaddibuddy
                    </p>
                    <Hint label={label} side="right" asChild>
                    <Button onClick={onCollapse} variant="ghost" className="h-auto p-2 ml-auto">
                            <FaArrowLeft className="h-4 w-4" color="white" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}