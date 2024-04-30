import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Output = ({ shortLinkData }) => {
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#D9D9D9] bg-opacity-10 md:w-1/2 p-4 rounded-lg">
        <div className="text-sm uppercase text-[#7366FE] text-center mt-2">
          Your Short Link is Ready
        </div>
        <div className="text-2xl font-bold text-white text-center mt-2 flex justify-around w-full gap-4">
          <div className="flex items-center justify-center flex-col gap-5">
            {/* <span className="text-sm">{`${domain}/api/${shortLinkData?.data?.shortLink}`}</span> */}
            <Link
              className="bg-black py-1 px-2 rounded-md"
              target="_blank"
              href={`/api/${shortLinkData?.data?.shortLink}`}
            >{`${domain}/api/${shortLinkData?.data?.shortLink}`}</Link>
            
            <CopyToClipboard
              className="bg-[#7366FE] text-white text-sm w-full px-3 py-2 rounded-md text-center"
              text={`${domain}/api/${shortLinkData?.data?.shortLink}`}
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
