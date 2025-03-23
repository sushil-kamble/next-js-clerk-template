import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
  SignInButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";

export async function Header() {
  return (
    <header className="border-b h-16">
      <div className="mx-auto container h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold">
            Next.js + Clerk
          </Link>
          <ClerkLoading>
            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
