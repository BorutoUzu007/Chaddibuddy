'use client'

import { editTask } from "@/actions/task-actions"
import { Switch } from "@/components/ui/switch"
import React, { useTransition } from "react"
import { toast } from "sonner"

interface TaskDeleteToggleProps {
    taskDeleteStatus: boolean,
    task_id: string
}

export const TaskDeleteToggle = ({taskDeleteStatus, task_id}: TaskDeleteToggleProps) => {

    const [isPending, startTransition] = useTransition()
    const [currentStatus, setCurrentStatus] = React.useState<boolean>(taskDeleteStatus)

    const taskDeleteToggleOnChange = (value: boolean) => {
        
        if (taskDeleteStatus != value) {
            const data = {'isDeleted': value}
            startTransition(() => {
                editTask(data, task_id).then((data) => {
                    if (data?.error) {
                        toast.error(`Error occured whole updating the task: ${data.error}`)
                    }
                    else if (data.success) {
                        setCurrentStatus(value)
                        toast.success(data.success)
                    }
                })
            })

        } else {
            console.log('equal')
        }
    }

    return (
        <div className="flex w-full h-full mt-6 pl-16 ">
            <div className="text-white font-bold text-xl px-2 py-5">
                <h1>Task Deleted?</h1>
            </div>
            <div className="flex py-4 justify-center px-2 py-7">
                    <Switch 
                        className="border-[#323232] bg-[#252525] data-[state=checked]:bg-destructive"
                        checked={currentStatus}
                        onCheckedChange={(value: boolean) => taskDeleteToggleOnChange(value)}
                    />
            </div>  
        </div>
    )
}