import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { CirclePlus, Trash2 } from 'lucide-react';
import URLTable from './components/URLTable';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [usersURL, setUsersURL] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [domain, setDomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

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

          let clicks = 0;
          response.data.data.forEach(url => {
            clicks += url.clicks;
          });
          setTotalClicks(clicks);
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    if (status === 'authenticated') {
      fetchUserURLs();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const deleteURL = async (id) => {
    try {
      const response = await axios.post('/api/deleteurl', {
        id,
        useremail: session.user?.email
      });
      if (response.data.success) {
        toast.success('Link deleted successfully');
        setUsersURL(usersURL.filter(url => url._id !== id));
        setIsModalOpen(false); 
      } else {
        toast.error('Error deleting link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const openDeleteModal = (url) => {
    setUrlToDelete(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUrlToDelete(null);
  };

  return (
    <div className='md:px-20 px-5 flex flex-col gap-5 h-[calc(100vh-100px)]'>
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
      <URLTable urls={usersURL} domain={domain} deleteURL={deleteURL} openDeleteModal={openDeleteModal} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this link?</h2>
            <p className="mb-4">{urlToDelete?.originalLink}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => deleteURL(urlToDelete._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes, delete
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
