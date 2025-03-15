import { ProfileSectionAvatar } from "@/components/platform/profile-page/profile-section-avatar"
import { getUserById } from "@/utils/user"

export default async function UserProfile ({params}: {params: {userId: string}}) {
    const user = await getUserById(params.userId)
    return (
        <div className="flex justify-center pt-10">
            <div className="w-full sm:w-[850px] mx-2 max-w-[850px] h-auto">
                <div className="flex flex-col items-center pt-10">
                    <ProfileSectionAvatar profileImage={user?.image || ""}  />
                    <p className="text-white"> Hello good morning</p>
                </div>
            </div>
        </div>
        
    )
}