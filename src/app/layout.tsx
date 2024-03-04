import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Footer from "@/src/layouts/Footer";
import Header from "@/src/layouts/header";
import { ThemeProvider } from "@/src/layouts/theme/Provider";
import { Toaster } from "@/src/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <main className="min-h-screen flex flex-col items-center prose dark:prose-invert max-w-none">
            <Header />
            <div className="flex-1 w-full flex flex-col">{children}</div>
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
