import Link from "next/link"

export const FilterTasks = () => {
    return (
        <div className="flex shadow rounded-2xl bg-[#292929] h-fit mt-16 py-4">
            <div className="flex flex-col px-10 space-y-6">
                <span className="text-white text-2xl font-bold px-5">Tasks</span>
                <Link href={`/details?filter=${"daily"}`}>
                    <span className="text-white text-md font-semibold px-5">Daily</span>
                </Link>
                <Link href={`/details?filter=${"weekly"}`}>
                    <span className="text-white text-md font-semibold px-5">Weekly</span>
                </Link>
                <Link href={`/details?filter=${"monthly"}`}>
                    <span className="text-white text-md font-semibold px-5">Monthly</span>
                </Link>
                <Link href={`/details?filter=${"yearly"}`}>
                    <span className="text-white text-md font-semibold px-5">Yearly</span>
                </Link>
                <Link href={`/details?filter=${"custom"}`}>
                    <span className="text-white text-md font-semibold px-5">Custom</span>
                </Link>
            </div>
            
        </div>
    )
}