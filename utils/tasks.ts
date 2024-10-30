import { db } from '@/lib/db';
import { todos } from '@/src/schema/todos-schema';
import { accounts, users } from '@/src/schema/user-schema';
import { and, eq, inArray, ilike, or } from 'drizzle-orm';
import 'server-only'
import { getISOWeekNumber } from './date-utils';

type User = typeof users.$inferSelect;
type Account = typeof accounts.$inferInsert;
type todo = typeof todos.$inferInsert

interface createTask {
    task_name : string 
    task_description? : string
    task_frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM"
    task_time?: string
    task_start_date: Date
}

export const createNewTask = async (data: createTask, user_id: string) => {
    try {
        const task = await db.insert(todos).values({
            userId: user_id,
            firstTriggerDate: data.task_start_date,
            frequency: data.task_frequency,
            taskHeading: data.task_name,
            taskDescription: data.task_description,
            taskTime: data.task_time,
            createdAt: new Date(),
            updatedAt: new Date()

        }).returning()

        return task[0]
    } catch (error) {
        return null
    }
}

export const editTaskById = async (data: {}, task_id: string) => {
    try {
        switch (data) {
            case ('taskHeading' in data): {
                const updated_task = await db.update(todos).set({
                    taskHeading: (data as { taskHeading?: string })["taskHeading"] || ""
                }).where(eq(todos.id, task_id)).execute()
                return updated_task[0]
            }
            case ('taskDescription' in data): {
                const updated_task = await db.update(todos).set({
                    taskDescription: (data as { taskDescription?: string })["taskDescription"] || ""
                }).where(eq(todos.id, task_id)).execute()
                return updated_task[0]
            }
            case ('taskTime' in data): {
                const updated_task = await db.update(todos).set({
                    taskTime: (data as { taskTime?: string })["taskTime"] || null
                }).where(eq(todos.id, task_id)).execute()
                return updated_task[0]
            }
            case ('frequency' in data): {
                const updated_task = await db.update(todos).set({
                    frequency: (data as { frequency?: string })["frequency"] as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" || "DAILY"
                }).where(eq(todos.id, task_id)).execute()
                return updated_task[0]
            }
            case ('isActive' in data): {
                const updated_task = await db.update(todos).set({
                    isActive:  (data as { isActive?: boolean })["isActive"] as boolean
                }).where(eq(todos.id, task_id)).execute()
                return updated_task
            }
            case ('isDeleted' in data): {
                const updated_task = await db.update(todos).set({
                    isDeleted:  (data as { isDeleted?: boolean })["isDeleted"] as boolean
                }).where(eq(todos.id, task_id)).execute()
                return updated_task
            }
        }
        const updated_task = await db.update(todos).set(data).where(eq(todos.id, task_id)).execute()
        return updated_task[0]
    } catch (error) {
        return null
    }
}

export const getTasksByUserId = async (user_id: string) => {
    try {
        const tasks = await db.select().from(todos).where(
            and(
                eq(todos.userId, user_id),
                eq(todos.isActive, true), 
                eq(todos.isDeleted, false)
            )
        ).orderBy(todos.taskTime, todos.frequency, todos.taskHeading).execute()
        if (!tasks.length) return null
        return tasks
        
    } catch {
        return null
    }
}

export const setDeleteTaskById = async (task_id: string) => {
    try {
        console.log("yo")
        await db.update(todos).set({
            isDeleted: true
        }).where(eq(todos.id,task_id))
        return true
    } catch {
        return false
    }
}

export const setMultipleDeleteTasksById = async (tasks: [{task_id: string}]) => {
    try {
        console.log("yo")
        const taskIds = tasks.map(task => task.task_id);
        await db.update(todos).set({
            isDeleted: true
        }).where(inArray (todos.id, taskIds)).execute();
        return true
    } catch {
        return false
    }
}

export const markTaskCompletedById = async (task_id: string, completed_date: string) => {
    try {
        const task_dates_frequency = await db.select({
            task_frequency: todos.frequency,
            already_completed_dates: todos.completedDates,
            already_completed_weeks: todos.completedWeek,
            already_completed_months: todos.completedMonth,
            already_completed_years: todos.completedYear,
        }).from(todos).where(eq(todos.id, task_id))

        if (task_dates_frequency.length) {
            const date = new Date(completed_date)

            if (task_dates_frequency[0].task_frequency === 'DAILY') {
                task_dates_frequency[0].already_completed_dates?.push(completed_date)
                await db.update(todos).set({
                    completedDates: task_dates_frequency[0].already_completed_dates
                }).where(eq(todos.id,task_id))
            }

            else if (task_dates_frequency[0].task_frequency === 'WEEKLY') {
                task_dates_frequency[0].already_completed_weeks?.push(getISOWeekNumber(date).toString())
                task_dates_frequency[0].already_completed_dates?.push(completed_date)
                await db.update(todos).set({
                    completedWeek: task_dates_frequency[0].already_completed_weeks,
                    completedDates: task_dates_frequency[0].already_completed_dates
                }).where(eq(todos.id,task_id))
            }

            else if (task_dates_frequency[0].task_frequency === 'MONTHLY') {
                task_dates_frequency[0].already_completed_months?.push(date.getMonth().toString())
                task_dates_frequency[0].already_completed_dates?.push(completed_date)
                await db.update(todos).set({
                    completedMonth: task_dates_frequency[0].already_completed_months,
                    completedDates: task_dates_frequency[0].already_completed_dates
                }).where(eq(todos.id,task_id))
            }

            else if (task_dates_frequency[0].task_frequency === 'YEARLY') {
                task_dates_frequency[0].already_completed_years?.push(date.getFullYear().toString())
                task_dates_frequency[0].already_completed_dates?.push(completed_date)
                await db.update(todos).set({
                    completedYear: task_dates_frequency[0].already_completed_years,
                    completedDates: task_dates_frequency[0].already_completed_dates
                }).where(eq(todos.id,task_id))
            }
            
        }
        return true
    } catch {
        return false
    }
}

export const markTaskPendingById = async (task_id: string, completed_date: string) => {
    try {
        const task_date = await db.select({
            already_completed_date: todos.completedDates
        }).from(todos).where(eq(todos.id, task_id))

        if (task_date.length) {
            const updated_task_date_array = task_date[0].already_completed_date?.filter(item => item !== completed_date)
            await db.update(todos).set({
                completedDates: updated_task_date_array
            }).where(eq(todos.id,task_id))
        }
        return true
    } catch {
        return false
    }
}

export const getTaskById = async (task_id: string) => {
    try {
        const task = await db.select().from(todos).where(eq(todos.id, task_id)).execute()
        if (!task.length) return null 
        return task[0]
    } catch {
        return null
    }
}

export const searchTaskByQuery = async (query: string) => {
    try {
        console.log(query)
        let searchResults = await db.select().from(todos).where(
            or(
                ilike(todos.taskHeading, `%${query}%`),
                ilike(todos.taskDescription, `%${query}%`)
            )
        )
        console.log(searchResults)

        return searchResults
    } catch {
        return null
    }
}