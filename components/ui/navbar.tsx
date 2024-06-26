import { Button } from "./button"
import { useSession } from "next-auth/react"
import { Gluten } from "next/font/google";
import Image from "next/image";
import UserSessionComponent from "./authentication-ui/UserSessionComponent"

const gluten = Gluten({
    weight: "700",
    subsets: ['latin']
})


function Navbar() {

return (
    <nav className="pl-5 pr-5 pb-2 pt-2 border-b-2 w-full h-[4rem] bg-white z-10">
        <div className="flex justify-between text-white items-center">
          <a href="/">
          <div className="flex justify-center items-center">
            <div>
                    <Image
                        src="/kolorylogo.svg"
                        alt="logo"
                        width={50}
                        height={50}
                    />
            </div>
            <h1 className={gluten.className + " " + "relative top-1 text-4xl text-slate-900"}>
                KOLORY
            </h1>
          </div>
          </a>
            <UserSessionComponent/>
        </div>
    </nav>
)
}

export default Navbar