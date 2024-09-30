'use client'

import { editTask } from "@/actions/task-actions"
import { Textarea } from "@/components/ui/textarea"
import { useTransition } from "react"
import { toast } from "sonner"

interface TaskDescriptionProps {
    taskDescription: string
    task_id: string
}

export const TaskDescription = ({taskDescription, task_id}: TaskDescriptionProps) => {

    const [isPending, startTransition] = useTransition()

    const taskDescriptionOnChange = (value: string) => {
        console.log(value)
        if (taskDescription != value) {
            console.log('not equal')
            const data = {'taskDescription': value}
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
                <h1>Task Description:</h1>
            </div>
            <div className="py-4 ml-4 w-full mr-2">
                <Textarea 
                    className="border-[#323232] bg-[#252525] text-white font-bold text-lg px-2 py-5 focus:border-white"
                    defaultValue={taskDescription}
                    onBlur={(event) => taskDescriptionOnChange(event?.target.value)}
                />
            </div>  
        </div>
    )
}