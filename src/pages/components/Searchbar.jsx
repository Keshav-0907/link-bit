import React from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({setShortLinkData}) => {
  const [link, setLink] = useState("");

  const handleLinkShorting = async () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!urlPattern.test(link)) {
      toast.error("Please enter a valid URL");
      return;
    }

   
    await axios
      .post("/api/URL", {
        originalLink: link,
      })
      .then((res) => {
        setShortLinkData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      <Toaster />
      <div className=" md:w-1/2 w-full rounded-full flex p-2 gap-2 md:flex-row flex-col">
        <input
          onChange={(e) => setLink(e.target.value)}
          type="text"
          placeholder="Enter your link here"
          className="bg-black/70 text-white px-6 py-2 rounded-full w-full focus:outline-none"
        />
        <button
          onClick={handleLinkShorting}
          className="bg-[#0d0d0e] text-white px-8 py-2 rounded-full border border-gray-700 text-center hover:text-gray-500"
        >
          Short
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
