import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../utils/mongoClient";



export const authOptions = {
  adapter : MongoDBAdapter(clientPromise),  
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_SECRET
    })
  ],
  secret:process.env.NEXT_PUBLIC_API_SECRET
}

const handler = NextAuth(authOptions)


export default NextAuth(authOptions)