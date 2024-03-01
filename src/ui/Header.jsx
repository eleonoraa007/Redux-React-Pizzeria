import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"

//or tracking-widest
function Header() {
    return (
        <header className="flex items-center justify-between bg-yellow-400 uppercase px-4 py-3 border-b border-stone-500 sm:px-6">
            <Link to="/" className="tracking-[5px]">Fast React Pizza Co.</Link>

            <SearchOrder />
            <Username />
        </header>
    )
}

export default Header
