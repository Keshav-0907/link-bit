import { Inter } from "next/font/google";
import Img from '../../public/main-bg.png';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Image } from "next/image";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  console.log({user});

  return (
    <div className="main-container">
      
      <div className="px-10">
        <Hero />
      </div>
    </div>
  );
}
