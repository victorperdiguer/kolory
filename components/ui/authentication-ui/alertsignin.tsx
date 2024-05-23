import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { signIn } from "next-auth/react"

export function AlertSignIn({showAlert, setShowAlert}: {showAlert: boolean, setShowAlert: (showAlert: boolean) => void}){
  return (
    <AlertDialog open={showAlert}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in to use save features</AlertDialogTitle>
          <AlertDialogDescription>
            Saving colors and palettes requires an account.
            <br></br>
            You can sign in with Google for free to try these features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowAlert(!showAlert)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => signIn("google")}>Sign In</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
