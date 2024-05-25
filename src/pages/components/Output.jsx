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
      <div className="bg-[#030303]  md:w-1/2 p-4 rounded-lg border border-gray-900">
        <div className="text-sm uppercase text-indigo-300 text-center mt-1">
          Your Short Link is Ready
        </div>
        <div className="text-2xl font-medium text-white text-center mt-1 flex justify-around w-full gap-4">
          <div className="flex items-center justify-center flex-col gap-5">
            {/* <span className="text-sm">{`${domain}/api/${shortLinkData?.data?.shortLink}`}</span> */}
            <Link
              className="bg-white/10 border border-gray-900 rounded-lg text-[23px] font-medium px-4 py-2 text-white w-full text-center"
              target="_blank"
              href={`/api/${shortLinkData?.data?.shortLink}`}
            >{`${domain}/api/${shortLinkData?.data?.shortLink}`}</Link>
            
            <CopyToClipboard
              className="bg-indigo-700 text-white text-sm w-full px-3 py-2 rounded-md text-center"
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
              className="w-2/4 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
