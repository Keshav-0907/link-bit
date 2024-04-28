import { Inter } from "next/font/google";
import Img from '../../public/main-bg.png';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Image } from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
    className="main-container"
  >
    <Navbar />

    <div className="px-10">
      <Hero />
    </div>
  </div>
  );
}
