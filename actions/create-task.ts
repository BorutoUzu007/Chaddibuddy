'use server'
import { currentUser } from "@/lib/auth"
import { TaskSchema } from "@/schemas"
import { createNewTask } from "@/utils/tasks"
import * as z from "zod"

export const createTask = async (data: z.infer<typeof TaskSchema>) => {
    const validatedFields = TaskSchema.safeParse(data)
    if (!validatedFields) {
        return { error: "Invalid fields! "}
    }
    const task_data = validatedFields.data

    try {
        const user = await currentUser()
        console.log(user)

        if (!user || !user.id) {
            return {error: "User doesnt exist!"}
        }
        if (task_data) {
            await createNewTask(task_data, user.id)
            return {success: "Task created successfully"}
        }
        return {error: "Internal server error"}

    } catch (error) {
        return { error: `Something went wrong: ${error}`}
    }
} 