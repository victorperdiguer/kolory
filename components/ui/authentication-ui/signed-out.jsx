import React from "react"
import { Button } from "../button";
import { signOut, useSession } from "next-auth/react";



const SignOutComponent = (props) => {
  const {data: session} = useSession()
  console.log(session)
  
  return (
    <div>
      <h4>Hello, {session.user.name}</h4>
      <div>
        <img src={session.user.image || ''} alt="profile image" className="w-10 h-10 rounded-full cursor-pointer"/>
      </div>
      <Button onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  )
};

export default SignOutComponent;

