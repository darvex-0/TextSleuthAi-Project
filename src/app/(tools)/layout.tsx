import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline-block">Home</span>
            </Link>
          </Button>
          <div className="flex flex-1 items-center justify-end">
            <Link href="/" className="text-xl font-headline font-bold text-primary">
              TextSleuth AI
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
