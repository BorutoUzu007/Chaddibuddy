'use client'
import * as z from "zod"
import React, { useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"
import { TaskSchema, UpdateTaskSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTask } from "@/actions/create-task"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue 
    } from "../ui/select"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { MdDelete } from "react-icons/md"
import { Calendar } from "../ui/calendar"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/dialog"

export interface TaskCardProps {
    tasks?: {
        id: string;
        taskTime: string | null;
        taskDescription: string | null;
        taskHeading: string;
        userId: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null;
        firstTriggerDate: Date | null;
        completedDates: string[] | null
     } | null | undefined
}

export const TaskCard = ({tasks}: TaskCardProps) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = React.useState<string | undefined>("")
    const [success, setSuccess] = React.useState<string | undefined>("")
    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            task_name: ""
        },
    })
    

    const clearDate = () => {
        form.resetField("task_start_date")
        console.log(form.getValues().task_start_date)
    }

    const onCreateSubmit = (data: z.infer<typeof TaskSchema>) => {
        setError("")
        setSuccess("")
        console.log("HIII")
        startTransition(() => {
            createTask(data).then((data) => {
                if(data.error) {
                    form.reset()
                    setError(data.error)
                }
                if (data?.success) {
                    setSuccess(data?.success)
                }
            }).catch((error) => {
                setError("Something went wrong")
            })
        })
        console.log({data: data})
    }

    return (
        <DialogContent className="flex flex-col sm:max-w-[500px] bg-[#000000] border-[#323232] shadow">
            <DialogTitle className="flex text-white justify-center"><p className="text-bold text-2xl">{"Add Task" }</p></DialogTitle>
            <DialogDescription className="text-white text-muted-foreground flex justify-center">
                {"Add a task to your routine"}
            </DialogDescription>                
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateSubmit)}>
                    <div className="grid gap-4 py-4">
                        <FormField control={form.control} name="task_name" 
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-5">
                                        <FormLabel  className="text-right text-white font-semibold text-md">
                                            Task Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            id="task_name"
                                            placeholder="Enter task name"
                                            className="col-span-3 bg-black text-white border-[#323232] focus:border-white"
                                            defaultValue={tasks?.taskHeading || ""}
                                            {...field}
                                            />
                                        </FormControl>
                                    </div>
                                </FormItem>
                                
                            )}
                        />
                        <FormField control={form.control} name="task_description" 
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-5">
                                        <FormLabel  className="text-right text-white font-semibold text-md">
                                            Task Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                            id="task_description"
                                            placeholder="Enter task description"
                                            className="col-span-3 bg-black text-white border-[#323232] focus:border-white"
                                            defaultValue={tasks?.taskDescription || ""}
                                            {...field}
                                            />
                                        </FormControl>
                                    </div>
                                </FormItem>
                                
                            )}
                        />
                        <FormField control={form.control} name="task_frequency" 
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-5">
                                        <FormLabel  className="text-right text-white font-semibold text-md">
                                            Frequency
                                        </FormLabel>
                                        <FormControl>
                                        <div className="col-span-3">
                                            <Select onValueChange={field.onChange} defaultValue={tasks?.frequency || field.value}>
                                                <SelectTrigger className="w-[180px] text-white border-[#323232] focus:border-white ">
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
                                        </FormControl>
                                    </div>
                                </FormItem>
                                
                            )}
                        />
                        <FormField control={form.control} name="task_time" 
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-5">
                                        <FormLabel  className="text-right text-white font-semibold text-md">
                                            Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            id="task_time"
                                            placeholder="Enter task time (in 24 Hr format HH:MM)"
                                            className="col-span-3 bg-black text-white border-[#323232] focus:border-white"
                                            defaultValue={tasks?.taskTime || ""}
                                            {...field}
                                            />
                                        </FormControl>
                                    </div>
                                </FormItem>
                                
                            )}
                        />
                        <FormField control={form.control} name="task_start_date" 
                                render={({ field }) => {
                                    // Set field value if firstTriggerDate exists and field is empty
                                    if (tasks?.firstTriggerDate && !field.value) {
                                        field.onChange(tasks.firstTriggerDate);
                                    }
                                    return (
                                        <FormItem>
                                            <div className="grid grid-cols-4 items-center gap-5">
                                                <FormLabel  className="text-right text-white font-semibold text-md">
                                                    Start Date
                                                </FormLabel>
                                                <FormControl>
                                                    {field.value ? (
                                                        <div className="flex col-span-3 justify-between border border-[#323232] rounded px-3">
                                                            <p className="text-white pt-1">
                                                                {format(field.value, "PPP")}
                                                            </p>
                                                            <Button onClick={clearDate} className="hover:border-white bg-black hover:bg-[#0a0a0a]">
                                                                <MdDelete className="h-4 w-4" color="white" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                            className="text-white border-[#323232]"
                                                        />
                                                    )}
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    );
                                }}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <DialogFooter>
                        <Button type="submit" variant="secondary" className="font-semibold" disabled={isPending}>{"Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}