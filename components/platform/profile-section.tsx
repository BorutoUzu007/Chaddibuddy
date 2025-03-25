'use client'
import { signOut } from "next-auth/react"
import { UserAvatar } from "./user-avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useRouter } from "next/navigation"
  


export const ProfileSection = () => {
    const onClick = () => {
        signOut()
    }
    const router = useRouter()
    const user = useCurrentUser()

    const onProfileClick = () => {
        router.push(`/user/profile/${user?.id}`)
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center h-full justify-around">
                        <UserAvatar  />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#2A2A2A] text-white border-[#292929]">
                    <DropdownMenuLabel className="flex justify-center">{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onProfileClick}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex flex-row justify-end">
                            <span>Light</span>
                            <span>Dark</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>
    )
}