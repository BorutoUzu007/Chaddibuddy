import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/auth";
import { FaAngleRight } from "react-icons/fa";
import ProfileGeneral from "./profile-general";

interface Profile {
    
}

export const Profile = async () => {
    const user = await currentUser();
    return (
        <div className="flex flex-col w-full items-start pt-2">
            <p className="text-gray-300 font-bold text-xl sm:text-2xl py-3">
                General
            </p>
            <div className="w-full py-3">
                <ProfileGeneral username={user?.name || ""} bio="abcd" userId={user?.id || ""} />
                
            </div>
            
        </div>
    )
}