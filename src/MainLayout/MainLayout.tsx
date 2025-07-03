import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
 

const MainLayOut = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar/>
            <div  className="flex-1 container mx-auto px-4 py-8">

            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayOut;