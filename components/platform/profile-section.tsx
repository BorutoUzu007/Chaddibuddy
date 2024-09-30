'use client'
import { signOut } from "next-auth/react"
import { UserAvatar } from "./user-avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
  


export const ProfileSection = () => {
    const onClick = () => {
        signOut()
    }
    const user = useCurrentUser()
    console.log(user?.image)
    return (
        <div className="absolute bottom-24 bg-[#303030] rounded-xl w-[250px] h-[80px] ml-14 cursor-pointer">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center h-full justify-around">
                        <UserAvatar />
                        <p className="text-xl font-bold text-white">{user?.name}</p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>
    )
}