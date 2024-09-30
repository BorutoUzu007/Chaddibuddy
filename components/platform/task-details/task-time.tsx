'use client'

import { editTask } from "@/actions/task-actions"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { toast } from "sonner"

interface TaskTimeProps {
    taskTime: string,
    task_id: string
}

export const TaskTime = ({taskTime, task_id}: TaskTimeProps) => {

    const [isPending, startTransition] = useTransition()

    const taskTimeOnChange = (value: string) => {
        console.log(value)
        if (taskTime != value) {
            console.log('not equal')
            const data = {'taskTime': value}
            startTransition(() => {
                editTask(data, task_id).then((data) => {
                    if (data?.error) {
                        toast.error(`Error occured whole updating the task: ${data.error}`)
                    }
                    else if (data.success) {
                        toast.success(data.success)
                    }
                })
            })

        } else {
            console.log('equal')
        }
    }

    return (
        <div className="flex w-full mt-6 pl-16">
            <div className="text-white font-bold text-xl px-2 py-5">
                <h1>Task Time:</h1>
            </div>
            <div className="py-4">
                <Input 
                    className="border-[#323232] bg-[#252525] text-white font-bold text-xl px-2 py-5 ml-4 focus:border-white"
                    defaultValue={taskTime}
                    onBlur={(event) => taskTimeOnChange(event?.target.value)}
                />
            </div>  
        </div>
    )
}