'use client'

import React from "react"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import { CiSettings } from "react-icons/ci"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { CopyIcon } from "@radix-ui/react-icons"
import { DeleteMultipleTasks, DeleteTask, MarkTaskAsCompleted, MarkTaskAsPending } from "@/actions/task-actions"
import { revalidatePath } from "next/cache"
import { cn } from "@/lib/utils"
import { TaskCard } from "./task_card"
import { useRouter } from "next/navigation"
import { ScrollArea } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { FaPlus, FaFilter } from "react-icons/fa"
import { AddTaskButton } from "./add-task-button"
import { Poppins } from "next/font/google"

type selectedTaskType = {
    task_id: string
}[]

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

type selectedTasks = {
    id: string;
    taskTime: string | null;
    taskHeading: string;
    taskDescription: string | null
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null;
    firstTriggerDate: Date | null;
    completedDates: string[] | null
}[]

interface ScrollAreaTasksProps {
    tasks: {
        id: string;
        taskTime: string | null;
        taskHeading: string;
        taskDescription: string | null
        userId: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null;
        firstTriggerDate: Date | null;
        completedDates: string[] | null
    }[] | null | undefined
    currentDate: string
}


export const ScrollAreaTasks = ({tasks, currentDate}: ScrollAreaTasksProps) => {
    const [selectedTasks, setSelectedTasks] = React.useState<selectedTaskType>([])
    const [selectedFilters, setSelectedFilters] = React.useState<("DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null)[]>([])
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [currentTaskId, setCurrentTaskId] = React.useState<string>("")
    const [isPending, startTransition] = React.useTransition()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [filteredTasks, setFilteredTasks] = React.useState(tasks || [])
    const [searchFilteredTasks, setSearchFilteredTasks] = React.useState(filteredTasks || []);
    const router = useRouter()

    const clickDelete = (task_id: string) => {
        setCurrentTaskId(task_id)
        setIsDialogOpen(true)
        
    }

    const deleteTask = () => {
        startTransition(() => {
            DeleteTask(currentTaskId).then(() => {
                setIsDialogOpen(false)
            })
        })
    }

    const deleteMultipleTasks = () => {
        startTransition(() => {
            DeleteMultipleTasks(selectedTasks as [{ task_id: string }])
        })
    }

    const markCompleted = (task_id: string) => {
        const completed_date = new Date().toISOString().split('T')[0]
        startTransition(() => {
            MarkTaskAsCompleted(task_id, completed_date)
        })
    }

    const markPending = (task_id: string) => {
        const completed_date = new Date().toISOString().split('T')[0]
        startTransition(() => {
            MarkTaskAsPending(task_id, completed_date)
        })
    }

    const checkIfCompletedTodayOrNot = (completedDates: string[]) => {
        return completedDates.includes(currentDate)
    }

    const goToTask = (task_id: string) => {
        router.push(`/details?task=${task_id}`)
    }

    const toggleTaskSelection = (task_id: string) => {
        setSelectedTasks(prevSelected => {
            if (prevSelected.some(task => task.task_id === task_id)) {
                // Remove task if already selected
                return prevSelected.filter(task => task.task_id !== task_id);
            } else {
                // Add task if not selected
                return [...prevSelected, { task_id }];
            }
        });
    }

    const filterTasks = (tasks ?: selectedTasks) => {
        if (searchQuery === "") {
            setSearchFilteredTasks(tasks || filteredTasks || []);
        } else {
            let currentFilteredTasks = tasks || filteredTasks || []
            const regexTasks = currentFilteredTasks?.filter(task => new RegExp(searchQuery.toLowerCase()).test(task.taskHeading.toLowerCase()))
            setSearchFilteredTasks(regexTasks);
        }
        
    }

    const toggleFilterSelection = (filter: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null) => {
        
        setSelectedFilters(prevSelected => {
            if (prevSelected.some(task => task === filter)) {
                return prevSelected.filter(task => task !== filter);
            } else {
                return [...prevSelected, filter] as ("DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null)[]
            } 
        })

        let currectFilters: ("DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | null)[] = selectedFilters
        currectFilters.includes(filter) ? currectFilters = currectFilters.filter(f => f !== filter) : currectFilters = [...currectFilters, filter]

        if (currectFilters.length === 0) {
            setFilteredTasks(tasks || []);
            filterTasks(tasks as selectedTasks || [])
        } else {
            let currentFilteredTasks = tasks || []
            const regexTasks = currentFilteredTasks?.filter(task => currectFilters.includes(task.frequency))
            setFilteredTasks(regexTasks);
            setSearchFilteredTasks(regexTasks);
        }

    }

    return (
        <>
            <div className="flex justify-between pt-4 w-full">
                    <div className="space-x-2">
                        <Button variant="destructive" disabled={isPending || selectedTasks.length === 0} onClick={deleteMultipleTasks}>
                            Delete
                        </Button>
                        <Button variant="secondary" disabled>
                            Mark as Done
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <DropdownMenu>
                            <TooltipProvider>
                                <Tooltip>
                                    <DropdownMenuTrigger asChild>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" className="bg-[#292929] hover:bg-[#303030]">
                                                <FaFilter color="white" />
                                            </Button>
                                        </TooltipTrigger>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-black border-[#323232]">
                                        <div className="flex justify-between items-center px-2">
                                            <Checkbox 
                                                id="DAILY" 
                                                className="bg-white"
                                                checked={selectedFilters.some(selected => selected === "DAILY")} 
                                                onCheckedChange={() => toggleFilterSelection("DAILY")}
                                            />
                                            <DropdownMenuItem disabled>
                                                <span className="font-bold text-white text-muted-foreground">Daily</span> 
                                            </DropdownMenuItem>
                                        </div>
                                        <div className="flex justify-between items-center px-2">
                                            <Checkbox 
                                                id="WEEKLY" 
                                                className="bg-white"
                                                checked={selectedFilters.some(selected => selected === "WEEKLY")} 
                                                onCheckedChange={() => toggleFilterSelection("WEEKLY")}
                                            />
                                            <DropdownMenuItem disabled>
                                                <span className="font-bold text-white text-muted-foreground">Weekly</span> 
                                            </DropdownMenuItem>
                                        </div>
                                        <div className="flex justify-between items-center px-2">
                                            <Checkbox 
                                                id="MONTHLY" 
                                                className="bg-white"
                                                checked={selectedFilters.some(selected => selected === "MONTHLY")} 
                                                onCheckedChange={() => toggleFilterSelection("MONTHLY")}
                                            />
                                            <DropdownMenuItem disabled>
                                                <span className="font-bold text-white text-muted-foreground">Monthly</span> 
                                            </DropdownMenuItem>
                                        </div>
                                        <div className="flex justify-between items-center px-2">
                                            <Checkbox 
                                                id="YEARLY" 
                                                className="bg-white"
                                                checked={selectedFilters.some(selected => selected === "YEARLY")} 
                                                onCheckedChange={() => toggleFilterSelection("YEARLY")}
                                            />
                                            <DropdownMenuItem disabled>
                                                <span className="font-bold text-white text-muted-foreground">Yearly</span> 
                                            </DropdownMenuItem>
                                        </div>
                                        <div className="flex justify-between items-center px-2">
                                            <Checkbox 
                                                id="CUSTOM" 
                                                className="bg-white"
                                                checked={selectedFilters.some(selected => selected === "CUSTOM")} 
                                                onCheckedChange={() => toggleFilterSelection("CUSTOM")}
                                            />
                                            <DropdownMenuItem disabled>
                                                <span className="font-bold text-white text-muted-foreground">Custom</span> 
                                            </DropdownMenuItem>
                                        </div>
                                    </DropdownMenuContent>
                                    <TooltipContent className="bg-black">
                                        <div className="px-1 py-1">
                                            <p className={font.className}>Filter Tasks</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenu>
                        <Dialog> 
                            <TooltipProvider>
                                <Tooltip>
                                    <DialogTrigger asChild>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" className="bg-[#432b8f] hover:bg-[#4e32a8]">
                                                <FaPlus color="white" />
                                            </Button>
                                        </TooltipTrigger>
                                    </DialogTrigger>
                                    
                                    <AddTaskButton />
                                    
                                    <TooltipContent className="bg-black">
                                        <div className="px-1 py-1">
                                            <p className={font.className}>Add Task</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Dialog>
                        <Input className="w-[200px] bg-white rounded-xl" placeholder="Search today's todos" onChange={(e) => setSearchQuery(e.target.value)} onBlur={() => filterTasks()}/>
                    </div>
                </div>
            <ScrollArea>
                {isDialogOpen && ( // Render the dialog conditionally
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">Share</Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col sm:max-w-md bg-[#000000] border-[#323232] shadow">
                            <DialogHeader>
                                <div className="flex flex-col items-center space-y-3">
                                    <DialogTitle className="flex text-white text-2xl font-bold justify-center">Delete Task</DialogTitle>
                                    <DialogDescription className="text-md">
                                        Delete this task? You can undo this from the task's page
                                    </DialogDescription>
                                </div>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-between">
                                <DialogClose>
                                    <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="button" disabled={isPending} variant="destructive" onClick={() => {deleteTask()}}>
                                        Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
                <div className="pt-6 flex flex-col w-full h-full space-y-4 px-2">
                    { searchFilteredTasks ? searchFilteredTasks.map((task) => (
                        <div key={task.id} className="bg-[#303030] shadow-md flex w-full justify-between rounded-xl py-5 px-2 cursor-pointer select-none">
                            <div className="flex items-center">
                                <Checkbox 
                                    id={task.id} 
                                    className="bg-white"
                                    checked={selectedTasks.some(selected => selected.task_id === task.id)} 
                                    onCheckedChange={() => toggleTaskSelection(task.id)} 
                                />
                            </div>
                            <div className=" w-full space-x-2 mx-2" onClick={() => goToTask(task.id)}>
                                <span className="text-white text-lg font-bold px-5">{task.taskTime || "--:--"}</span>
                                <span className="text-white text-lg font-bold px-5">{task.taskHeading}</span>
                            </div>
                            <div className="mr-2">
                                <Badge className={cn(checkIfCompletedTodayOrNot(task.completedDates || []) ? "bg-emerald-500": "bg-gray-400" ,"text-semibold")}>{checkIfCompletedTodayOrNot(task.completedDates || []) ? "Completed": "Pending"}</Badge>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger><CiSettings className="cursor-pointer" color="white" size={24} /></DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black border-[#323232] ">
                                    <DropdownMenuItem className="text-emerald-500 font-semibold cursor-pointer" onClick={() => {checkIfCompletedTodayOrNot(task.completedDates || []) ? markPending(task.id) : markCompleted(task.id)}} 
                                    disabled={(currentDate === new Date().toISOString().split('T')[0]) ? false : true}>
                                        {checkIfCompletedTodayOrNot(task.completedDates || []) ? "Mark Pending" : "Mark Completed"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive font-semibold cursor-pointer" onClick={() => clickDelete(task.id)}>Delete</DropdownMenuItem>
                                    <DropdownMenuItem className="text-muted-foreground font-semibold cursor-pointer">{"Set Inactive"}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )) : (<div className="">No Tasks found!</div>)}
                </div>
            </ScrollArea>
        </>
    )
}