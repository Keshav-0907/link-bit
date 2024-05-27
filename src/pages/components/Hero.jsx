import React from "react";
import SearchBar from "./Searchbar";
import { useState } from "react";
import Output from "./Output";

const Hero = () => {
  const [shortLinkData, setShortLinkData] = useState({});

  return (
    <div className="flex flex-col text-center md:py-8 gap-3">
      <div className="text-[#e2e4e7] uppercase text-sm tracking-wide  ">
        Your new Link Shortner
      </div>
      <div className="md:text-6xl text-4xl font-bold py-3 ">
        <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 ">We make Long links</div>
        <div className="">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          look{" "}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 inline-flex  p-2 ">
            {" "}
            Shorty
          </span>
          <span className="text-[32px]">🔗</span>
        </div>
      </div>

      <div className="">

        <div className="py-5">
          <SearchBar setShortLinkData={setShortLinkData} />
        </div>

        <div>
          {Object.keys(shortLinkData).length > 0 ? (
            <Output shortLinkData={shortLinkData}/>
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default Hero;
