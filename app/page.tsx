import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})
export default function Home() {
  return (
    <main className="h-auto flex w-full flex-col items-center justify-center bg-black">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
          Chaddibuddy
        </h1>
        <p className="text-lg text-white">
          Store your Todos and progress all together
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className={font.className}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
