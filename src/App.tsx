 import Navbar from "./components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="">
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default App;