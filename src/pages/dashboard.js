import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { CirclePlus, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [usersURL, setUsersURL] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const router = useRouter();
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  useEffect(() => {
    const fetchUserURLs = async () => {
      try {
        if (session) {
          setUser(session.user);
          const response = await axios.post('/api/fetchurls', {
            useremail: session.user?.email
          });
          console.log('User URLs:', response.data.data);
          setUsersURL(response.data.data);

          // Calculate total clicks
          let clicks = 0;
          response.data.data.forEach(url => {
            clicks += url.clicks;
          });
          setTotalClicks(clicks);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUserURLs();
  }, []);

  console.log(usersURL)

  const copyToClipboard = (text) => {
    copy(text);
    toast.success('Link copied to clipboard');
  }

  if (!session) return <div>loading...</div>;

  return (
    <div className='md:px-20 px-5 flex flex-col gap-5'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-800 dark:text-white'>Welcome back, {user?.name}</h1>
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>Here are your recent activities</p>
      </div>
      <div className="flex gap-10 px-4 md:flex-row flex-col">
        <div className="bg-gray-800 border-[1px] text-white py-5 px-3 md:min-w-56 flex flex-col rounded-lg transition duration-300 hover:bg-gray-600">
          <span className="text-sm uppercase font-semibold">Total Shortened Links</span>
          <span className="text-5xl font-bold">{usersURL.length}</span>
        </div>
        <div className="bg-gray-800 border-[1px] text-white py-5 px-3 md:min-w-56 flex flex-col rounded-lg transition duration-300 hover:bg-gray-600">
          <span className="text-sm uppercase font-semibold">Total Clicks</span>
          <span className="text-5xl font-bold">{totalClicks}</span>
        </div>
      </div>
      <div className='flex justify-end'>
        <Link href={'/'} className='flex gap-2 bg-gray-600 p-2 rounded-md'>
          <CirclePlus strokeWidth={1} /> <span> Short a link</span>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ maxHeight: '300px' }}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Original Link
              </th>
              <th scope="col" className="px-6 py-3">
                Shortened Link
              </th>
              <th scope="col" className="px-6 py-3">
                Total Clicks
              </th>
              <th scope="col" className="px-6 py-3">
                Shortened On
              </th>
              <th scope="col" className="px-6 py-3">
                Delete Link
              </th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {usersURL.map((url, index) => (
              <tr key={index} className="bg-white max-h-32 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <td className="px-6 py-4">
                  <Link target='_blank' href={url.originalLink}>{url.originalLink}</Link>
                </td>
                <td className="px-6 py-4">
                  <Link target='_blank' href={`/api/${url.shortLink}`}>/{url.shortLink}</Link>
                  <button onClick={() => copyToClipboard(`${domain}/api/${url.shortLink}`)} className='ml-2 text-xs text-blue-500 hover:text-white'>Copy</button>
                </td>
                <td className="px-6 py-4">
                  {url.clicks}
                </td>
                <td className="px-6 py-4">
                  {new Date(url.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4">
                <Trash2 size={20}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
