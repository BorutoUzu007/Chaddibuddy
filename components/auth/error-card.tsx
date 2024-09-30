import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "./header"
import { BackButton } from "./back-button"
import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const ErrorCard = () => {
    return (
        <CardWrapper 
        headerLabel="Oops! Something went wrong!"
        >  
        </CardWrapper>
    )
}