
import { ProfileSection } from "@/components/platform/profile-section";
import { NavbarItems } from "@/components/platform/navbar-items";



export const Navbar = () => {
    return (
        <>
            <div className="flex flex-col  border-r border-[#323232] h-full px-28 pt-10">
                <div>
                    <p className=" text-2xl font-bold">Chaddibuddy</p>
                </div>
                <NavbarItems />
            </div>
        </>
    )
}