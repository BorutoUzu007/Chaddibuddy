import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"

export const UserAvatar = () => {
    const user = useCurrentUser()
    console.log(user?.image)
    return (
            <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
    )
}