'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface ProfileSectionAvatarProps {
    profileImage: string
}

export const ProfileSectionAvatar = ({profileImage}: ProfileSectionAvatarProps) => {
    
    const [success, setSuccess] = useState<boolean | undefined>(false)
    const [error, setError] = useState <boolean | undefined>(false)
    const [errorMessage, setErrorMessage] = useState <string | undefined>()
    const [file, setFile] = useState<File>()
    const form = useForm()

    const onSubmit = async (data: any) => {
        console.log(data);
        const formData = new FormData();
        // const file = data['picture']; // Assuming 'picture' is the name of the input field
        if (file) {
            formData.set('profile', file); // Append the first file from the FileList
        }
        console.log(file)
        console.log(formData)
        const response = await fetch('/api/user/uploadProfileImage', {
            method: "POST",
            body: formData,
        });
        if (response.status === 200) {
            setSuccess(true)
            setError(false)
            window.location.reload()

        }
        else {
            const errorData = await response.json();
            setError(true)
            setErrorMessage(errorData.error)
            setSuccess(false)
        }
        
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="w-40 h-40 cursor-pointer">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> <span className="font-bold text-lg">Edit profile picture </span></DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-5">
                    <Avatar className="w-80 h-80" >
                        <AvatarImage src={profileImage} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                        <form className="flex flex-col items-center space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex w-full items-center gap-1.5">    
                                <Input id="picture" type="file" className="cursor-pointer"
                                    onChange={(e) => {
                                        setFile(e.target.files?.[0])
                                    }} 
                                    required                                     
                                />           
                            </div>
                            {success ? (
                                <span className="text-emerald-500 font-semibold">Profile picture updated successfully</span>
                            ): ""}
                            {error ? (
                                <span className="text-red-500 font-semibold">{errorMessage}</span>
                            ): ""}
                            <Button type="submit">Save</Button>
                        </form>
                </div>
            </DialogContent>
           
        </Dialog>
    )
}