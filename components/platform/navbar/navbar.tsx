import { Navigation } from "./navigation"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const NavBar = () => {
    return (
        <div>
            <Wrapper>
                    <Toggle />
                    <Navigation />
            </Wrapper>
        </div>
    )
}