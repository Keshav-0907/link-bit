import React from "react";
import { useState } from "react";
import axios from "axios";

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
      alert("Invalid URL");
      return;
    }

    await axios
      .post("http://localhost:3000/api/URL", {
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
      <div className="bg-[#b6aeff] md:w-1/2 w-full rounded-xl flex p-2 gap-2">
        <input
          onChange={(e) => setLink(e.target.value)}
          type="text"
          placeholder="Enter your link here"
          className="bg-white text-black px-3 py-1 rounded-xl w-full focus:outline-none"
        />
        <button
          onClick={handleLinkShorting}
          className="bg-[#7366FE] text-white px-8 py-2 rounded-md text-center"
        >
          Short
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
