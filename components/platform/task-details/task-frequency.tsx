'use client'

import { editTask } from "@/actions/task-actions"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransition } from "react"
import { toast } from "sonner"

interface TaskFrequencyProps {
    taskFrequency: string,
    task_id: string
}

export const TaskFrequency = ({taskFrequency, task_id}: TaskFrequencyProps) => {

    const [isPending, startTransition] = useTransition()

    const taskFrequencyOnChange = (value: string) => {
        console.log(value)
        if (taskFrequency != value) {
            console.log('not equal')
            const data = {'frequency': value}
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
                <h1>Task Frequency:</h1>
            </div>
            <div className="py-4">
                <Select onValueChange={(value) => taskFrequencyOnChange(value)} defaultValue={taskFrequency}>
                    <SelectTrigger className="w-[180px] text-white border-[#323232] focus:border-white bg-[#252525] text-xl font-bold px-2 py-5 ml-4">
                        <SelectValue placeholder="Select a frequency" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectGroup className="bg-black border-none text-white">
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value="DAILY">Daily</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                        <SelectItem value="YEARLY">Yearly</SelectItem>
                        <SelectItem value="CUSTOM">Custom</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>  
        </div>
    )
}