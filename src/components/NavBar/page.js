"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchIconSvg from "./SearchIconSvg";
import HamburgerIconSvg from "./HamburgerIconSvg";
import CloseIconSvg from "../Icons/CloseIconSvg";

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [nav, setNav] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  const links = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "TV Series",
      link: "#",
    },
    {
      id: 3,
      title: "Movies",
      link: "#",
    },
    {
      id: 4,
      title: "New & Popular",
      link: "#",
    },
    {
      id: 5,
      title: "My List",
      link: "#",
    },
  ];

  return (
    <nav className="p-4 flex justify-between items-center w-full px-6 md:px-14">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-red-600 text-2xl font-bold">Myflix</span>
        </Link>
        <ul className="space-x-4 text-white ml-10 text-sm hidden lg:flex">
          {links.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.link}
                className="text-gray-300 hover:text-white font-semibold"
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center w-fit">
        <form onSubmit={handleSearch} className="w-fit">
          <div className="relative w-3/5 sm:w-4/5 md:w-full">
            <input
              type="text"
              placeholder="Search for titles"
              className="px-3 py-1 w-full border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-white"
            >
              <SearchIconSvg />
            </button>
          </div>
        </form>
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-[11] text-gray-500 lg:hidden"
      >
        {nav ? <CloseIconSvg /> : <HamburgerIconSvg />}
      </div>

      {nav && (
        <ul className="flex lg:hidden flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-gray-800 text-gray-500 z-10">
          {links.map((menu, index) => (
            <li
              key={index}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link
                href={menu.link}
                className="text-gray-300 hover:text-white font-semibold"
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
