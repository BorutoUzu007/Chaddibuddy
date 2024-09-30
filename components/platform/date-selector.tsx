'use client'

import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import React from "react"

interface DateSelectorProps {
    date: Date
} 

export const DateSelector = ({date}: DateSelectorProps) => {

    const router = useRouter()
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

    const leftArrow = () => {
        date.setDate(date.getDate() - 1)
        router.push(`/all-tasks?date=${date.toISOString()}`)
        router.refresh()
    }

    const rightArrow = () => {
        date.setDate(date.getDate() + 1)
        router.push(`/all-tasks?date=${date.toISOString()}`)
        router.refresh()
    }


    const selectDate = (newDate: Date) => {
        router.push(`/all-tasks?date=${newDate.toISOString()}`)
        router.refresh()
    }

    return (
        <Popover>
            <div className="flex justify-center items-center w-full pt-10">
                <FaArrowLeft className="mr-10 cursor-pointer" size={24} color="white" onClick={leftArrow}/>
                <PopoverTrigger>
                    <span className="text-white text-xl cursor-pointer">{format(date, "PPP")}</span>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar 
                        mode="single"
                        selected={selectedDate}
                        onSelect={(newDate) => {selectDate(newDate || new Date)}}
                        initialFocus
                        className="border"
                    />
                </PopoverContent>
                <FaArrowRight className="ml-10 cursor-pointer" size={24} color="white" onClick={rightArrow}/>
            </div>
        </Popover>
    )
}