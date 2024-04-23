import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Trying nextJS auth</h1>
      <Button asChild>
        <Link href="/generate">Generate colors</Link>
      </Button>
    </div>
  );
}
