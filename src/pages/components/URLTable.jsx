import React, { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const URLTable = ({ urls, domain, deleteURL, openDeleteModal }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const copyToClipboard = (text) => {
    copy(text);
    toast.success("Link copied to clipboard");
  };

  // Sorting logic
  const sortData = (data, key, direction) => {
    return data.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedURLs = sortConfig.key
    ? sortData([...urls], sortConfig.key, sortConfig.direction)
    : urls;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("originalLink")}>
              Original Link
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("shortLink")}>
              Shortened Link
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("clicks")}>
              Total Clicks
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("createdAt")}>
              Shortened On
            </th>
            <th scope="col" className="px-6 py-3">
              Delete Link
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedURLs?.map((url, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                <Link target="_blank" href={url.originalLink}>
                  {url.originalLink.length > 40 ? `${url.originalLink.slice(0, 40)}...` : url.originalLink}
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link target="_blank" href={`/api/${url.shortLink}`}>
                  /{url.shortLink}
                </Link>
                <button onClick={() => copyToClipboard(`${domain}/api/${url.shortLink}`)} className="ml-2 text-xs text-blue-500 hover:text-white">
                  Copy
                </button>
              </td>
              <td className="px-6 py-4">{url.clicks}</td>
              <td className="px-6 py-4">
                {new Date(url.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <Trash2 size={20} onClick={() => deleteURL(url._id)} className="cursor-pointer hover:text-red-600" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLTable;
