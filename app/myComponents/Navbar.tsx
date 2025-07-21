'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Python Projects', href: '/projects' },
  { name: 'Agentic AI Projects', href: '/agents' },
  { name: 'Playground', href: '/playground' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="w-full px-6 py-4 bg-gray-950 border-b border-gray-800 text-white font-mono relative z-50">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-cyan-400 text-lg font-bold">
          Kasha.Py
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-cyan-300 transition ${
                pathname === item.href ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Sidebar */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          }
        )}
      >
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>

        <div className="mt-10 flex flex-col gap-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`hover:text-cyan-300 transition ${
                pathname === item.href ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
