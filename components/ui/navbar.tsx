import { Button } from "./button"
import { useSession } from "next-auth/react"
import { Gluten } from "next/font/google";
import Image from "next/image";
import UserSessionComponent from "./authentication-ui/UserSessionComponent"

const gluten = Gluten({
    weight: "900",
    subsets: ['latin']
})


function Navbar() {

  return (
    <nav className="p-4 border-b-2 lg:absolute w-full h-[4.1rem] bg-white z-10">
      <div  className="flex justify-between text-white items-center">
        <h1 className={gluten.className}>
          KOLORY
        </h1>
        <div>
          <Image
            src="/kolorylogo.svg"
            alt="logo"
            width={50}
            height={50}
          />
        </div>
        <UserSessionComponent/>
      </div>
    </nav>
  )
}

export default Navbar