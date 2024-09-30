'use client'

import { editTask } from "@/actions/task-actions"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { toast } from "sonner"

interface TaskNameProps {
    taskName: string,
    task_id: string
}

export const TaskName = ({taskName, task_id}: TaskNameProps) => {

    const [isPending, startTransition] = useTransition()

    const taskNameOnChange = (value: string) => {
        console.log(value)
        if (taskName != value) {
            console.log('not equal')
            const data = {'taskHeading': value}
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
                <h1>Task Name:</h1>
            </div>
            <div className="py-4">
                <Input 
                    className="border-[#323232] bg-[#252525] text-white font-bold text-xl px-2 py-5 ml-4 focus:border-white"
                    defaultValue={taskName}
                    onBlur={(event) => taskNameOnChange(event?.target.value)}
                />
            </div>  
        </div>
    )
}