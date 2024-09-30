'use client'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {

    const onClick = (provider: "google") => {
        console.log("Im here")
        try {
            signIn(provider, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full bg-[#303030] border-none" variant="outline" onClick={() => onClick("google")}>
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    )
}