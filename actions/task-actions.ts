'use server'

import { editTaskById, markTaskCompletedById, markTaskPendingById, searchTaskByQuery, setDeleteTaskById, setMultipleDeleteTasksById } from "@/utils/tasks"

export const DeleteTask = async (task_id: string) => {
    if (!task_id) {
        return {error: "No task id!"}
    }

    try {
        if (await setDeleteTaskById(task_id)) {
            return {success: "Task deleted!"}
        }
        else {
            return {error: "Something went wrong"}
        }
    } catch {
        return {error: "Internal server error"}
    }
}

export const DeleteMultipleTasks = async (tasks: [{task_id: string}]) => {
    if (!tasks) {
        return {error: "No task id!"}
    }

    try {
        if (await setMultipleDeleteTasksById(tasks)) {
            return {success: "Task deleted!"}
        }
        else {
            return {error: "Something went wrong"}
        }
    } catch {
        return {error: "Internal server error"}
    }
}

export const MarkTaskAsCompleted = async (task_id: string, completed_date: string) => {
    if (!task_id) {
        return {error: "No task id!"}
    }

    try {
        console.log("Here")
        if (await markTaskCompletedById(task_id, completed_date)) {
            return {success: "Task completed!"}
        }
        else {
            return {error: "Something went wrong"}
        }
    } catch {
        return {error: "Internal server error"}
    }
}

export const MarkTaskAsPending = async (task_id: string, completed_date: string) => {
    if (!task_id) {
        return {error: "No task id!"}
    }

    try {
        console.log("Here")
        if (await markTaskPendingById(task_id, completed_date)) {
            return {success: "Task completed!"}
        }
        else {
            return {error: "Something went wrong"}
        }
    } catch {
        return {error: "Internal server error"}
    }
}

export const editTask = async (data: {}, task_id: string) => {
    try {
        await editTaskById(data,task_id)
        return {success: "Task updated successfully!"}
    } catch {
        return {error: "Something went wrong"}
    }
}

export const searchTaskBySearchQuery = async (query: string) => {
    try {
        const searchResults = await searchTaskByQuery(query)
        if (searchResults?.length === 0) {
            return {data: []}
        } 
        else {
            return {data: searchResults}
        }
    } catch {
        return {error: "Something went wrong"}
    }
}
