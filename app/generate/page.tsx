import React from "react";
import { Button } from "@/components/ui/button";
import {useSession, signIn, signOut} from "next-auth/react"

export default function ProtectedPage() {
  const { data: session } = useSession()
  console.log(session)
  
  if (session) {
    return (
      <div>
        <h1>Protected page -- you made it!</h1>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }
  return (
    <div>
      <h1>Sign in please</h1>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  )
}