import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/modetoggle";

export default function Home() {
  return (
    <main>
      <Button>Click me</Button>
      <ModeToggle></ModeToggle>
    </main>
  );
}
