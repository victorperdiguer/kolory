'use client'

import { Button } from "./button"
import { signIn, signOut, useSession } from "next-auth/react"
import { Gluten } from "next/font/google";

const gluten = Gluten({
  weight: "900",
  subsets: ['latin']
})


function Navbar() {
  const {data: session} = useSession()
  console.log(session)

  return (
    <nav className="bg-slate-900 flex justify-between text-white gluten-logo">
      <div>
        <h1 className={gluten.className}>
          KOLORY
        </h1>

      </div>
      {session?.user ? (
        <div>
          <h4>Hello, {session.user.name}</h4>
          <div>
            <img src={session.user.image || ''} alt="profile image" className="w-10 h-10 rounded-full cursor-pointer"/>
          </div>
          <Button onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn()}>
          Sign In
        </Button>
      )}
    </nav>
  )
}

export default Navbar