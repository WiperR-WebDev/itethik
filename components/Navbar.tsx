import React from "react";
import { MailOpenIcon, MapPinnedIcon } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <header>
      <TopNav />
      <MainNav />
    </header>
  );
}

function TopNav() {
  return (
    <div className="text-gray-300 text-xs flex justify-between items-center bg-primary px-2 py-4 border-b border-secondary">
      <div className="flex gap-4">
        <span className="flex items-center gap-1">
          <MapPinnedIcon className="text-ascent" />
          Lorem ipsum dolor sit amet.
        </span>
        <span className="flex items-center gap-1">
          <MailOpenIcon className="text-ascent" />
          randomemail@gmail.com
        </span>
      </div>
      <nav className="flex gap-2">
        {/* TODO: Add navlinks */}
        <Link href="" className="hover:text-ascent transition">
          About
        </Link>
        <span>/</span>
        <Link href="" className="hover:text-ascent transition">
          Leadership
        </Link>
        <span>/</span>
        <Link href="" className="hover:text-ascent transition">
          Contact
        </Link>
      </nav>

      {/* TODO: Maybe add dropdown */}
    </div>
  );
}

const MainNavLinks = ["Lorem", "Lorem2", "Lorem3", "Lorem4", "Lorem5"];

function MainNav() {
  return (
    <div className="flex  bg-primary px-4 py-6">
      <img src="" alt="" />
      <nav className="flex gap-2 text-gray-300">
        {MainNavLinks.map((c) => (
          <Link
            key={c}
            href={""}
            className="font-medium capitalize hover:text-ascent after:opacity-0 after:translate-y-2 hover:after:translate-y-0 hover:after:opacity-100  after:transition-all after:duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-ascent after:bottom-0 after:left-0"
          >
            {c}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
