import Header from "./Header"
import Loader from "./Loader"
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

//parent route
//css: max height(h) can be 96, h-[500px] = we are defining our own value


//gap-x-4 = gap vertically, grid-cols-2 = two columns, grid-rows-3 = 3 rows
function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'Loading';
    return (
        <div className="grid-rows-[auto_1fr_auto] grid h-screen">
            {isLoading && <Loader />}
            <Header />

            <div className="overflow-auto">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    )
}

export default AppLayout
