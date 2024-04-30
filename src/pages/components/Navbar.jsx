import React from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const AuthError = () => {
    toast.error("This is Beta Version. Please be kind 🙂");
  }; 
  return (
    <div className="text-white py-5 px-10 flex justify-between items-center">
      <Toaster />
      <div className="text-xl font-semibold">
        <Link href="/" className="cursor-pointer">
          {" "}
          Link Bit{" "}
        </Link>
      </div>

      <div className="md:flex hidden gap-6">
        <div onClick={AuthError} className="bg-black text-white border border-gray-600 px-4 py-2 rounded-full text-sm cursor-pointer hover:text-gray-400">
          Create Account
        </div>
        <div  onClick={AuthError} className="cursor-pointer px-2 py-1 hover:text-gray-400">
          Login
        </div>
      </div>
    </div>
  );
};

export default Navbar;
