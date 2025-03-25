"use server"

import { updateUserByID } from "@/utils/user"
import { User } from "next-auth"

export const UpdateUserUsername = async (userObject: Partial<User>, userId: string) => {
    try {
        console.log(userObject)
        const result = await updateUserByID(userObject, userId)
        if (result) {
            return {success: "Display name updated successfully"}
        }
        return {error: "Something went wrong"}
    } catch (err) {
        return {error: `Something went wrong: ${err}`}
    }
}