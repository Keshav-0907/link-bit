import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import { Menu } from "lucide-react";

const Navbar = () => {
  // Use dynamic import to prevent useSession from running on the server side
  const { data: session } = useSession({ required: false });
  const [user, setUser] = useState(null);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 700px)", // changed to max-width for mobile
  });
  const [isMobileNav, setIsMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNav(!isMobileNav);
  };

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const toggleProfilePopUp = () => {
    setProfilePopUp(!profilePopUp);
  };

  return (
    <div className="text-white  px-10 flex justify-between items-center relative">
      <Toaster />
      <div className="text-xl font-semibold">
        <Link href="/" className="cursor-pointer">
          <Image src={"/Group 22.png"} alt="logo" width={150} height={50} />
        </Link>
      </div>

      {isMobile && (
        <div>
          <Menu onClick={toggleMobileNav} />
          {isMobileNav && (
            <div className="absolute top-16 left-0 w-full bg-white">
              {user ? (
                <div className="flex flex-col gap-5 items-center">
                  <Link
                    href="/dashboard"
                    className="block text-black py-2 px-4 hover:text-gray-400"
                  >
                    Go to Dashboard
                  </Link>
                  <div
                    onClick={() => toggleProfilePopUp()}
                    className="block text-white py-2 px-4 hover:text-gray-400"
                  >
                    Hi, {user.name}
                  </div>
                  {profilePopUp && (
                    <div className="bg-red-500 text-white py-2 px-4">
                      <div
                        className="cursor-pointer hover:text-gray-400"
                        onClick={() => signOut()}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-5 items-center">
                  <div
                    onClick={() => signIn()}
                    className="text-black bg py-2 px-4 cursor-pointer hover:text-gray-400"
                  >
                    Create Account
                  </div>
                  <div
                    onClick={() => signIn()}
                    className="text-white py-2 px-4 cursor-pointer hover:text-gray-400"
                  >
                    Login
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {!isMobile && (
        <div>
          {user ? (
            <div className="flex gap-5 items-center">
              <Link
                href="/dashboard"
                className="bg-[#0d0d0e] text-white px-3 py-2 rounded-md border border-gray-700 text-center hover:text-gray-500"
              >
                Go to Dashboard
              </Link>
              <div
                onClick={() => toggleProfilePopUp()}
                className="bg-[#0d0d0e] cursor-pointer text-white px-3 py-2 rounded-md border border-gray-700 text-center hover:text-gray-500"
              >
                Hi, {user.name}
              </div>
              {profilePopUp && (
                <div className="absolute top-16 right-10 bg-red-500 text-white px-6 py-2 rounded-md border border-gray-700">
                  <div
                    className="cursor-pointer hover:text-gray-400"
                    onClick={() => signOut()}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="md:flex hidden gap-6">
              <div
                onClick={() => signIn()}
                className="bg-white text-black  border border-black-400 px-4 py-2 rounded-full text-sm  cursor-pointer hover:text-gray-600"
              >
                Create Account
              </div>
              <div
                onClick={() => signIn()}
                className="cursor-pointer  px-2 py-1 hover:text-gray-400"
              >
                Login
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
