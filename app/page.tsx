'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">

      {/* Intro Section */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
          👋 Welcome to Kasha.Py
        </h1>
        <p className="text-gray-300 text-md md:text-lg mb-10 leading-relaxed">
          Kasha.Py is a curated showcase of Python projects — from clean scripts to cutting-edge Agentic AI, with live demos, structured code, and an interactive playground.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link
            href="/projects"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow"
          >
            🧠 View Python Projects
          </Link>

          <Link
            href="/agents"
            className="bg-gray-800 hover:bg-gray-700 text-cyan-300 font-semibold px-6 py-3 rounded-lg transition border border-gray-600"
          >
            🤖 View Agentic AI Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
