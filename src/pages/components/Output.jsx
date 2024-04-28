import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Output = ({ shortLinkData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#D9D9D9] bg-opacity-10 md:w-1/2 p-4 rounded-lg">
        {/* <div className="text-[#7366FE] text-sm tracking-wide text-center">
          Hey, here is your shortened link
        </div> */}
        <div className="text-2xl font-bold text-white text-center mt-2 flex justify-around w-full gap-4">
          {/* <div className="mb-2">{shortLinkData.originalLink}</div> */}

          <div className="flex items-center justify-center flex-col gap-5">
            <span className="text-sm">{`http://localhost:3000/api/${shortLinkData?.data?.shortLink}`}</span>
            <span className="text-[#7366FE] mx-1"></span>
            {/* eslint-disable-next-line react/prop-types */}
            <CopyToClipboard
              className="bg-[#7366FE] text-white text-sm w-full px-3 py-1 rounded-md text-center"
              text={`http://localhost:3000/api/${shortLinkData?.data?.shortLink}`}
              onCopy={handleCopy}
            >
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none">
                {copied ? "Copied" : "Copy"}
              </button>
            </CopyToClipboard>
          </div>

          <div className="mb-2 flex justify-center items-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=/${shortLinkData?.data?.shortLink}`}
              alt="QR Code"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
