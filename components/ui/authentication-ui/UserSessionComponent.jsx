'use client'

import React from "react"
import { Button } from "../button";
import { signIn, signOut, useSession } from "next-auth/react";


const UserSessionComponent = (props) => {
  const {data: session} = useSession()
  console.log(session)

return (
    <div>
        {session?.user ? 
            <div className="flex justify-center items-center">
              <div>
                  <img src={session.user.image || ''} alt="profile image" className="w-10 h-10 rounded-full cursor-pointer"/>
              </div>
              <Button onClick={() => signOut()}>
                  Sign Out
              </Button>
            </div>
            :
            <Button onClick={() => signIn()}>
                Sign In
            </Button>}
    </div>
)
};

export default UserSessionComponent;