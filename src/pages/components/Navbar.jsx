import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="text-white py-5 px-10 flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link href="/" className="cursor-pointer"> Link Bit </Link>
      </div>

      <div className="md:flex hidden gap-8">
        <div className="bg-white text-black px-3 py-1 rounded-xl cursor-pointer">Create Account</div>
        <div className="cursor-pointer">Login</div>
      </div>
    </div>
  );
};

export default Navbar;
