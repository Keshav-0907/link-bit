import React from "react";
import SearchBar from "./Searchbar";
import { useState } from "react";
import Output from "./Output";

const Hero = () => {
  const [shortLinkData, setShortLinkData] = useState({});

  return (
    <div className="flex flex-col text-center md:py-6 gap-3">
      <div className="text-[#8bb8fd] uppercase text-sm tracking-wide">
        Your new Link Shortner
      </div>
      <div className="md:text-7xl text-2xl font-bold text-white">
        <div>We make Long links</div>
        <div className="">
          look{" "}
          <span className="bg-[#b5daf0] inline-flex bg-opacity-25 p-2 rounded-xl">
            {" "}
            Shorty
          </span>
          <span className="text-[32px]">✨</span>
        </div>
      </div>

      <div className="">

        <div className="py-5">
          <SearchBar setShortLinkData={setShortLinkData} />
        </div>

        <div>
          {Object.keys(shortLinkData).length > 0 ? (
            <Output shortLinkData={shortLinkData} />
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default Hero;
