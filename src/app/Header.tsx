import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Next.js + Clerk
          </Link>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
