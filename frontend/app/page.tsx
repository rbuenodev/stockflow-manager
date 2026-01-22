import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            StockFlow Manager
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Professional stock management solution for your business.
            Track inventory, manage orders, and grow your business with ease.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
          >
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} StockFlow Manager. All rights reserved.
      </footer>
    </div>
  );
}
