import * as z from "zod"

export const TaskSchema = z.object({
    task_name: z.string({
        required_error: "Task name is required"
    }).min(3, {
        message: "Task name should be atleast 3 characters long"
    }),
    task_description: z.optional(z.string()),
    task_frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"],{
        required_error: "The frequency is required"
    }),
    task_start_date: z.date({
        required_error: "A start date is required"
    }),
    task_time: z.optional(z.string())
})

export const UpdateTaskSchema = z.object({
    task_name: z.optional(z.string({
        required_error: "Task name is required"
    }).min(3, {
        message: "Task name should be atleast 3 characters long"
    })),
    task_description: z.optional(z.string()),
    task_frequency: z.optional(z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"],{
        required_error: "The frequency is required"
    })),
    task_start_date: z.optional(z.date({
        required_error: "A start date is required"
    })),
    task_time: z.optional(z.string())
})