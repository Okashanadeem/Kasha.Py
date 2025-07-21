import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./myComponents/Navbar"
import TransitionOverlay from "./myComponents/TransitionOverlay"
import Footer from "./myComponents/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "KashaPy — Python Portfolio",
  description: "A modern portfolio site for Python projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
                <TransitionOverlay/>
                
        <Navbar/>



        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
