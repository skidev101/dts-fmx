import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { Home, NotebookTabs, Rocket } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const Navbar = async () => {
  // const user = await getCurrentUser();
  const links = [
    {
      href: "/",
      text: "Home",
      icon: <Home />
    },
    {
      href: "/resources/courses",
      text: "Resoures",
      icon: <Rocket />
    },
    {
      href: "/room",
      text: "Join room",
      icon: <NotebookTabs />
    },
  ];
  return (
    <header className="fixed top-0 z-10 backdrop-blur-md flex justify-between items-center w-full px-4 py-6">
      <div className="flex items-center gap-3">
        
      <Image
        src="/logo.png"
        alt="logo"
        width={20}
        height={20}
        className="dark:invert object-contain"
      />
      <span className="font-semibold text-lg">DTS-FMX</span>
      </div>

      <nav className="hidden md:block">
        <ul className="flex gap-6">
          {links.map((link, i) => (
            <li
              key={i}
              className="text-sm hover:bg-gray-200 hover:text-gray-800 rounded-full px-3 hover:px-4 py-1 duration-300 transition-all"
            >
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block">
        {/* {user ? (
          <Button variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <Button>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        )} */}
        <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
      </div>

      <MobileNav links={links} /* user={user} */ />
    </header>
  );
};

export default Navbar;

