import { FaBell } from "react-icons/fa"
import { SearchAllTasks } from "./search-all-tasks"
import { ProfileSection } from "./profile-section"

export const TopNavbar = () => {
    return (
        <div className="sm:pl-16 flex justify-around">
            <p className='text-white text-2xl font-bold'>
            Todo List
            </p>
            <div className='w-fit'>
            <SearchAllTasks />
            </div>
        
            <div className='flex space-x-5'>
                <div className='flex cursor-pointer rounded space-x-5 justify-end items-center'>
                    <FaBell className='' size={24} color='white'/>
                </div>
                <div>
                    <ProfileSection />
                </div>
            </div>
        </div>
    )
}