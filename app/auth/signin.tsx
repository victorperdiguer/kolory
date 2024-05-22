// app/auth/signin.tsx
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Adjust the import path according to your project structure

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Button onClick={() => signIn('google')}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
