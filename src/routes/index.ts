import MainLayOut from "@/MainLayout/MainLayout";
import AllBooks from "@/components/pages/AllBooks/AllBooks";
import CreateBook from "@/components/pages/CreateBook/CreateBook";
import Home from "@/components/pages/Home/Home";
 
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
    {
        path:"/",
        Component: MainLayOut,
        children:[
            {
                path:"/",
                Component: Home
            },
            {
                path : "/books",
                Component : AllBooks
            },
            {
                path : "/create-book",
                Component : CreateBook

            }
   
        ]
    }
])

export default routes;