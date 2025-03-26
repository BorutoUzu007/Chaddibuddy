'use client'
import { VscGraph } from "react-icons/vsc";
import { FaTasks } from "react-icons/fa";
import { FcPlanner } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { MdManageHistory } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { useRouter } from "next/navigation";
export const NavbarItems = () => {
    const router = useRouter()
    const onClick = (route: string) => {
        router.push(`/${route}`)
    }
    return (
        <div className="mt-20 space-y-10">
            <div>
                <p className="text-muted-foreground text-md">Dashboard</p>
            </div>
            <div className="space-y-8">
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('dashboard')}>
                    <VscGraph className="text-muted-foreground text-md" size={24} color="#63eb87"/>
                    <p className=" text-xl ">Dashboard</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('all-tasks')}>
                    <FaTasks className="text-muted-foreground text-md" size={24} color="#636eeb"/>
                    <p className=" text-xl ">All Tasks</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('planner')}>
                    <FcPlanner className="text-muted-foreground text-md" size={24}/>
                    <p className=" text-xl ">Planner</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('details')}>
                    <FcViewDetails className="text-muted-foreground text-md" size={24}/>
                    <p className=" text-xl ">Details</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('history')}>
                    <MdManageHistory className="text-muted-foreground text-md" size={24} color="#ebe85e"/>
                    <p className=" text-xl">History</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('gym')}>
                    <CgGym className="text-muted-foreground text-md" size={24} color="#eb5e5e"/>
                    <p className=" text-xl">Gym</p>
                </div>
                <div className="flex space-x-2 border-white items-center cursor-pointer" onClick={() => onClick('calories')}>
                    <p className="text-xl">🔥</p>
                    <p className=" text-xl">Calories</p>
                </div>
            </div>
        </div>
    )
}