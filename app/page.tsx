import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingPalette from "@/components/ui/landingpalette";
import { Gluten } from "next/font/google";

const gluten = Gluten({
  weight: "700",
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-around p-24">
      <div>
        <h1 className="lg:text-7xl text-4xl max-w-[800px] tracking-tight mx-auto font-black text-center mb-[30px]"><span className={gluten.className}>Konnect</span> <span className="font-medium lg:text-4xl text-xl">with</span> <span className={gluten.className}>kolor</span></h1>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">Perfect palettes are just a tap away.</h2>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">Your hub for all things palette, from generation to application.</h2>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/generate">Create a palette!</Link>
          </Button>
        </div>
      </div>
      <div>
        <LandingPalette />
        </div>
    </main>
  );
}
