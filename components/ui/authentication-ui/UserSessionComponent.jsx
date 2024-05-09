'use client'

import React from "react"
import { Button } from "../button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";


const UserSessionComponent = (props) => {
  const {data: session} = useSession()
  const nameArray = session?.user?.name.split(' ')
  const initials = nameArray ? nameArray.map(name => name.charAt(0)).join('') : ''
  

return (
    <div>
        {session?.user ? 
            <div className="flex justify-center items-center">
              <div>
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback style={{backgroundColor: 'zinc', color: 'black'}}>{initials.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
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