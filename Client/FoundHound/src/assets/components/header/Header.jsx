import { NavLink } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const Header = () => {
    return(
        <div className="flex flex-row justify-between tracking-wider w-full overflow-hidden font-bold font-Outfit p-4 shadow-lg bg-header items-center">
            <NavLink to='/' className="text-xl md:text-2xl">FoundHound</NavLink>
            <Navbar></Navbar>
        </div>
        );
}

export default Header;