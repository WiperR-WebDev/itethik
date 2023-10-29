import React from "react";
import {
  MailOpenIcon,
  MapPinnedIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Button from "./Button";
import cs from "@/utils/cs";

function Navbar() {
  return (
    <>
      <TopNav />
      <header className=" sticky top-0 left-0 z-50">
        <MainNav />
      </header>
    </>
  );
}

function TopNav() {
  return (
    <div className="text-xs bg-background border-b text-foreground">
      <MaxWidthWrapper className="flex justify-between items-center px-2 py-4 ">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <MapPinnedIcon className="text-primary" />
            Lorem ipsum dolor sit amet.
          </span>
          <span className="flex items-center gap-1">
            <MailOpenIcon className="text-primary" />
            randomemail@gmail.com
          </span>
        </div>
        <nav className="flex gap-2">
          {/* TODO: Add navlinks */}
          <Link href="" className="hover:text-primary transition">
            About
          </Link>
          <span>/</span>
          <Link href="" className="hover:text-primary transition">
            Leadership
          </Link>
          <span>/</span>
          <Link href="" className="hover:text-primary transition">
            Contact
          </Link>
        </nav>

        {/* TODO: Maybe add dropdown */}
      </MaxWidthWrapper>
    </div>
  );
}

const MainNavLinks = [
  { label: "Home", href: "/home", active: true },
  { label: "About", href: "/about", active: false },
  { label: "Services", href: "/services", active: false },
  { label: "Projects", href: "/projects", active: false },
  { label: "Blog", href: "/blog", active: false },
  { label: "Contact", href: "/contact", active: false },
];

function MainNav() {
  return (
    <div className="bg-background text-foreground">
      <MaxWidthWrapper className="flex items-center px-8 py-6">
        <img src={Logo.src} alt="" className="w-24" />
        <nav className="flex gap-10 ml-20">
          {MainNavLinks.map((c) => (
            <Link
              key={c.href}
              href={""}
              className={cs(
                "font-medium capitalize text-base hover:text-primary after:opacity-0 after:translate-y-2 hover:after:translate-y-0 hover:after:opacity-100  after:transition-all after:duration-500 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:bottom-0 after:left-0",
                {
                  "text-primary": c.active,
                  "after:opacity-100": c.active,
                  "after:translate-y-0": c.active,
                }
              )}
            >
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex gap-6">
          <Button variant="ghost" size="icon">
            <SearchIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-8 h-8" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Navbar;
