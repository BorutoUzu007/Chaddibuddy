import { TaskDeleteToggle } from "@/components/platform/task-details/task-delete-toggle"
import { TaskDescription } from "@/components/platform/task-details/task-description"
import { TaskFrequency } from "@/components/platform/task-details/task-frequency"
import { TaskActiveToggle } from "@/components/platform/task-details/task-active-toggle"
import { TaskName } from "@/components/platform/task-details/task-name"
import { TaskTime } from "@/components/platform/task-details/task-time"
import { TrackCalendar } from "@/components/platform/task-details/track-calendar"
import { getTaskById } from "@/utils/tasks"

interface TaskDetailsProps {
    searchParams: {task: string}
}
export default async function TaskDetails ({searchParams}: TaskDetailsProps) {
    console.log(searchParams.task)
    const task = await getTaskById(searchParams.task)
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full mt-16 pl-16 justify-center">
                <h1 className="text-white font-bold text-3xl">
                    Task Details
                </h1>
                
            </div>
            <TaskName taskName={task?.taskHeading || ""} task_id={task?.id || ""} />
            <TaskDescription taskDescription={task?.taskDescription || ""} task_id={task?.id || ""} />
            <div className="flex justify-around">
                <TaskTime taskTime={task?.taskTime || ""} task_id={task?.id || ""} />
                <TaskActiveToggle taskActiveStatus={task?.isActive as boolean} task_id={task?.id || ""} />
            </div>
            
            <div className="flex justify-around">
                <TaskFrequency taskFrequency={task?.frequency || ""} task_id={task?.id || ""} />
                <TaskDeleteToggle taskDeleteStatus={task?.isDeleted as boolean} task_id={task?.id || ""} />
            </div>
            <TrackCalendar completedDates={task?.completedDates} />
            
        </div>
    )
}