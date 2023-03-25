import NavbarItem from "./NavbarItem";
import { BiChevronDown } from "react-icons/bi";
import { BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useState } from "react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, []);
  return (
    <>
      <nav className="w-full fixed z-40">
        <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900bg-opacity-90">
          <img className="h-7" src="/images/logo.png" alt="logo" />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by Languages" />
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BiChevronDown className="text-white transition" />
            <MobileMenu visible={showMobileMenu}/>
          </div>
          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                <BsSearch />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                <BsBell />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
