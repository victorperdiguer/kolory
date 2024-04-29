'use client'

import { Button } from "./button"
import { useSession } from "next-auth/react"
import { Gluten } from "next/font/google";
import SignInComponent from "./authentication-ui/signed-in";
import SignOutComponent from "./authentication-ui/signed-out";


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
        <SignOutComponent/>
      ) : (
        <SignInComponent/>
      )}
    </nav>
  )
}

export default Navbar