import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps {
    label: string
}

export const Header = ({label}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold text-white", font.className)}>
                Chaddibuddy
            </h1>
            <span className={cn("text-white text-sm", font.className)}>
                {label}
            </span>
        </div>
    )
}