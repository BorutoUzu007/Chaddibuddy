'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ProfileSectionAvatarProps {
    profileImage: string
}

export const ProfileSectionAvatar = ({profileImage}: ProfileSectionAvatarProps) => {

    const onClick = () => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="w-40 h-40 cursor-pointer" onClick={onClick}>
                    <AvatarImage src={profileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <p>Hiii</p>
            </DialogContent>
        </Dialog>
    )
}