import React from "react";
import { AllTasksProps } from "@/app/(platform)/all-tasks/page";
import { DateSelector } from "./date-selector";
import { getTasksByUserId } from "@/utils/tasks";
import { currentUser } from "@/lib/auth";
import { ScrollAreaTasks } from "./scroll-area-tasks";

export const CurrentTodos = async ({searchParams}: AllTasksProps) => {
    const user = await currentUser()
    var date: string
    var tasks
    
    if (!searchParams || !searchParams?.date) {
        date = new Date().toISOString()
    }
    else {
        date = searchParams.date
    }
    
    if (user && user.id) {
        tasks = await getTasksByUserId(user.id)
        tasks = tasks?.filter(task => task.firstTriggerDate != null && task.firstTriggerDate <= new Date(date))
    }

    
    return (
            <div className="flex flex-col w-full h-full space-y-2">
                <DateSelector date={new Date(date)} />
                
                <ScrollAreaTasks tasks={tasks} currentDate={date.split('T')[0]} />
            </div>
    )
}