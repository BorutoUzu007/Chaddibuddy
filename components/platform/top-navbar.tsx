import { FaBell } from "react-icons/fa"
import { SearchAllTasks } from "./search-all-tasks"
import { ProfileSection } from "./profile-section"
import ModeThemes from "./mode-themes"

export const TopNavbar = () => {
    return (
        <div className="flex flex-col ">
            <div className="sm:pl-16 flex justify-around space-x-2">
                <div className='block w-fit'>
                    <SearchAllTasks />
                </div>
            
                <div className='flex space-x-5'>
                    <div className='flex cursor-pointer rounded space-x-5 justify-end items-center'>
                        <FaBell className='' size={24} color='white'/>
                    </div>
                    <div>
                        <ProfileSection />
                    </div>
                    <div>
                        <ModeThemes />
                    </div>
                </div> 
            </div> 
        </div>
    )
}