import { AiOutlineMenuUnfold } from "react-icons/ai"
import { MdLogout } from "react-icons/md"
import { TokenContext } from "../../context/TokenContext";
import { useContext } from "react";

export const Navbar = () => {

    const { setSideNav } = useContext(TokenContext);

    return (
        <div className="flex justify-center w-full text-primary text-3xl h-[5vh]">
            <div className="m-1 rounded-xl flex flex-row justify-between items-center md:justify-end w-full px-8">
                <span className="block md:hidden" onClick={() => setSideNav(true)}><AiOutlineMenuUnfold /></span>
                <span><MdLogout /></span>
            </div>
        </div>
    )
}