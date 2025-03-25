'use client'
import React, { useState, useTransition } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { UpdateUserUsername } from '@/actions/update-user-profile'


interface ProfileDisplayNameProps {
    username: string,
    userId: string
}

export default function ProfileDisplayName({username, userId}: ProfileDisplayNameProps) {

    const [usernameCharacterCount, setUsernameCharacterCount] = useState(username.length)
    const[changedUsername, setChangedUsername] = useState<String>(username)
    const [isPending, startTransition] = useTransition()

    const onSubmit = () => {
        console.log(changedUsername)
        startTransition(() => {
            UpdateUserUsername({
                name: changedUsername as string
            }, userId)
            .then((response) => {
                console.log(response.success)
                console.log(response.error)
            })
        })
    }
    
    const changeUsername = (event: any) => {
        setUsernameCharacterCount(event.target.value.length)
        setChangedUsername(event.target.value)
    }


  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className="flex flex-col">
                <div className="flex justify-between items-center w-full cursor-pointer">
                    <p className="text-gray-200">
                        Display name
                    </p>
                    <div className="flex items-center flex-row w-fit">
                        <span className="text-gray-200 px-2">
                            {username}
                        </span>
                        <Button className="rounded-full bg-[#1b1b1b] hover:bg-[#2a2a2a]"> 
                            <FaAngleRight size={20} />
                        </Button>
                    </div>
                    
                </div>
                <p className="text-gray-600 text-sm ">
                    Change your display name
                </p>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Display name
                </DialogTitle>
                <DialogDescription>
                    Change your display name
                </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col w-full'>
                <Input 
                    defaultValue={username}
                    onChange={(e) => changeUsername(e)}
                />
                <div className='flex flex-row justify-end pr-3'>
                    {usernameCharacterCount}
                </div>
            </div>
            <DialogFooter>
                <Button onClick={onSubmit} variant="default" disabled={isPending}>Save</Button>
                <DialogClose asChild>
                    <Button variant="secondary" disabled={isPending}>Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
