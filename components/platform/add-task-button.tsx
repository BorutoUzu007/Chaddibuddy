import React, { useTransition } from "react"
import { TaskCard } from "./task_card"

export const AddTaskButton = () => {

    return (
        <TaskCard mode="CREATE" />
    )
}