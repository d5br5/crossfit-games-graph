import "@/src/config/globals.css";

import Header from "@/src/layouts/Header";
import Footer from "@/src/layouts/Footer";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/src/components/ui/toaster";
import { ThemeProvider } from "@/src/layouts/theme/Provider";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Crossfit Games Graph",
  description: "The leaderboard distribution graph for Crossfit Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.className, "size-full")}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-full">
        <ThemeProvider>
          <main className="min-h-screen flex flex-col h-full items-center max-w-none">
            <Header />
            <div className="flex flex-col flex-1 ">{children}</div>
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
