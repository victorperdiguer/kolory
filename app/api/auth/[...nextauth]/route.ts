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
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({user, account, profile}): Promise<string | boolean> {
        if (account?.provider === 'google'){
          const { name, email, image } = user
          try {
            await connectMongoDB()
            const userExists = await User.findOne({ email })
            if (!userExists) {
              await User.create({name, email, avatar: image})
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
