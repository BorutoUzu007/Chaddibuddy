'use client'

import { searchTaskBySearchQuery } from "@/actions/task-actions"
import { Input } from "@/components/ui/input"
import React, { useEffect, useTransition } from "react"
import { TaskCardProps } from "../task_card"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { selectedTask } from "../scroll-area-tasks"

interface DetailsSearchbar {
    query?: string
} 

export const DetailsSearchbar = ({query}: DetailsSearchbar) => {

    const [searchQuery, setSearchQuery] = React.useState(query || "")
    const [isPending, startTransition] = useTransition()
    const [tasks, setTasks] = React.useState<selectedTask[] | []>()
    const router = useRouter()

    useEffect(() => {
        if (query) {
            startTransition(() =>{
                searchTaskBySearchQuery(searchQuery).then((result) => {
                    if (result.data) {
                        setTasks(result.data as selectedTask[])
                    } else {
                        setTasks([])
                    }
                }).catch((error) => console.log(error))
        }) 
        }
    }, [query])

    

    const searchTasks = () => {
        router.push(`/details?query=${searchQuery}`)
    }

    const goToTask = (task_id: string) => {
        router.push(`/details/${task_id}`)
    }

    return (
        <div className="py-4 flex flex-col h-full">
            <div className="flex w-full justify-center px-20">
                <Input 
                placeholder="🔍 Search for tasks here" 
                className="bg-white focus:border-[#323232]" 
                onChange={(query) => setSearchQuery(query.target.value)} 
                onKeyDown={(key) => {
                    if (key.key === 'Enter') {
                        searchTasks()
                    }
                }}/>
            </div>
            
            <div className="flex flex-col items-center w-full pt-10">
                <h1 className="text-white font-semibold text-2xl">
                    Search results
                </h1>
            </div>
            <div className="overflow-auto">
                {tasks && tasks.length !== 0 ? tasks.map((task) => (
                    <div className=" flex flex-col py-4 px-5">
                        <div key={task.id} className="bg-[#303030] flex w-full rounded-xl py-10 cursor-pointer select-none hover:border">
                            <div className="flex w-full space-x-2 mx-2" onClick={() => goToTask(task.id as string)}>
                                <div className="flex justify-center">
                                    <span className="text-white text-md sm:text-lg font-bold px-5">{task.taskHeading}</span>
                                </div>
                                <div className="flex justify-center">
                                    <span className="text-white text-md sm:text-lg font-medium px-5">{task.taskDescription}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="flex w-full h-full justify-center items-center">
                        <h1 className="h-full text-muted-foreground font-semibold text-2xl">
                            No results found!
                        </h1>
                    </div>
                )}
            </div>
        </div>
        
    )
}