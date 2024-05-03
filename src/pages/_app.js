import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react"

import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    <div className="main-container">
        <Navbar />
        <Component {...pageProps} />
        <Analytics />
      </div>
    </SessionProvider>
  )
}