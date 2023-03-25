import { BiChevronDown } from "react-icons/bi";
import { BsSearch, BsBell } from "react-icons/bs";
import { useCallback, useState } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
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
          <div
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          >
            <p className="text-white text-sm">Browse</p>
            <BiChevronDown className="text-white transition" />
            <MobileMenu visible={showMobileMenu} />
          </div>
          <div className="flex flex-row ml-auto gap-5 lg:gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
              <BsSearch />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
              <BsBell />
            </div>
            <div onClick={toggleAccountMenu}className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt="Profile" />
              </div>
              <BiChevronDown className="text-white transition" />
              <AccountMenu visible={showAccountMenu}/>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
