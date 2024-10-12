import { DetailsSearchbar } from "@/components/platform/task-details/details-searchbar"
import { Input } from "@/components/ui/input"

interface TaskDetailsProps {
    searchParams?: {query: string}
}

export default async function TaskDetails ({searchParams}: TaskDetailsProps) {

    return (
        <DetailsSearchbar query={searchParams?.query} />
    )
}