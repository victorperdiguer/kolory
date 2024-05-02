import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"
import connectMongoDB from "@/lib/mongodb"
import User from "@/models/User"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({user, account, profile}): Promise<string | boolean> {
        if (account?.provider === 'google'){
          const { name, email } = user
          try {
            await connectMongoDB()
            const userExists = await User.findOne({ email })
            if (!userExists) {
              const url = 'http://localhost:3000/api/user'
              const data = { name, email }
              const res = await axios.post(url, data, {
                headers: {
                  "Content-Type": "application/json"
                }
              })
              console.log(res.data)
            }
          } catch (error) {
            console.error(error)
          }
        }
        return true;
    }
}
})

export {handler as GET, handler as POST}
