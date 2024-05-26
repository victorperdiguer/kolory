import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import LandingPalette from "@/components/ui/landingpalette";
import { Gluten } from "next/font/google";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CalendarDays, Globe } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const gluten = Gluten({
  weight: "700",
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-around p-24">
      <div>
        <h1 className="lg:text-7xl text-4xl max-w-[800px] tracking-tight mx-auto font-black text-center mb-[30px]">
          <span className={gluten.className}>Konnect</span>{" "}
          <span className="font-medium lg:text-4xl text-xl">with</span>{" "}
          <span className={gluten.className}>kolor</span>
        </h1>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">
          Perfect palettes are just a tap away.
        </h2>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">
          Your hub for all things palette, from generation to application.
        </h2>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/generate">Create a palette!</Link>
          </Button>
        </div>
      </div>
      <div>
        <LandingPalette />
      </div>
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="default">Made with<span className="text-red-400">&nbsp;{" "}&hearts;{" "}&nbsp;</span>by @vicpec</Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-center space-x-4">
              <Avatar>
                <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocIR6ktg3eMfNBJgZerwCcG5TkYOn5ZpwqhaaYhpuCFCVO05DerW1w=s96-c" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <a href="https://victorperdiguer.github.io/my-website/">
                  <div className="flex flex-row flex-start items-center gap-1">
                    <h4 className="text-sm font-semibold">Víctor Perdiguer</h4>
                    <Globe className="mr-2 h-4 w-4 opacity-70" />
                  </div>
                </a>
                <p className="text-sm">
                  Based on Fabrizio's{" "}
                  <a href="coolors.co">
                    <span className="font-bold">coolors.co</span>
                  </a>
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Deployed May 2024
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </main>
  );
}
