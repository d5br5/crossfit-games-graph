import "@/src/config/globals.css";

import Header from "@/src/layouts/header";
import Footer from "@/src/layouts/footer";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/src/components/ui/toaster";
import { ThemeProvider } from "@/src/layouts/theme/Provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WOD PARK",
  description: "국내 유일의 크로스핏 커뮤니티",
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
            <div className="flex-1 w-full grid place-items-center py-6">
              {children}
            </div>
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
