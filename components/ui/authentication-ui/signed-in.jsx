import React from "react"
import { Button } from "../button";
import { signIn } from "next-auth/react";


const SignInComponent = (props) => {

  return (
    <div>
      <Button onClick={() => signIn()}>
        Sign In
      </Button>
    </div>
  )
};

export default SignInComponent;

