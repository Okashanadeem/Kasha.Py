import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

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
        {/* Header */}
        <header className="w-full border-b border-gray-800 bg-gray-950 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo/Title */}
            <Link
              href="/"
              className="text-cyan-400 text-xl font-semibold tracking-tight hover:text-white transition"
            >
              🧠 Kasha.Py
            </Link>

            {/* Playground Button */}
            <Link
              href="/playground"
              className="text-sm font-mono bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md shadow transition-all duration-200"
            >
              ▶️ Playground
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
