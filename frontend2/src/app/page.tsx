import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/modetoggle";
import { redirect } from "next/navigation";

export default function Home() {
  //redirect('/login');
  return (
    <main>
      <Button>Click me</Button>
      <ModeToggle></ModeToggle>
    </main>
  );
}
