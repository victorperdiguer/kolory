import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <h1 className="lg:text-7xl text-4xl max-w-[800px] tracking-tight mx-auto font-black text-center mb-[30px]">Connect with color</h1>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">Perfect palettes are just a tap away.</h2>
        <h2 className="text-lg max-w-[500px] mb-[35px] mx-auto font-medium text-[#464853] text-center">Your hub for all things palette, from generation to application.</h2>
        <Button asChild>
          <Link href="/generate">Generate colors</Link>
        </Button>
      </div>
    </main>
  );
}
