'use client'

import React from "react"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"

export const SearchAllTasks = () => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const router = useRouter()

    const searchTasks = () => {
        router.push(`/details?query=${searchQuery}`)
    }

    return (
        <Input 
            className='rounded-xl bg-white' 
            placeholder='Search all tasks 🔎'
            onChange={(query) => setSearchQuery(query.target.value)} 
                onKeyDown={(key) => {
                    if (key.key === 'Enter') {
                        searchTasks()
                    }
                }}
            />
    )
}