'use client'

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import { Header } from "./header"
import { Social } from "./social"

interface CardWrapperProps {
    headerLabel: string 
    showSocial?: boolean
}

export const CardWrapper = ({
    headerLabel,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md bg-[#1b1b1b] border-none">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
        </Card>
    )
}