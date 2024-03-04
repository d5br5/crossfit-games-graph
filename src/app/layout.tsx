import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/src/layouts/Footer";
import Header from "@/src/layouts/Header";
import { ThemeProvider } from "../layouts/Theme";

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
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
