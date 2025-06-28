'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ChevronDown } from 'lucide-react'

interface Project {
  title: string
  slug: {
    current: string
  }
  description: string
}

export default function HomePage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    client
      .fetch(`*[_type == "project"]{title, slug, description}`)
      .then((data) => setProjects(data))
  }, [])

  const toggleAccordion = (slug: string) => {
    setExpanded(expanded === slug ? null : slug)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-left font-mono text-white">
      {/* Header with title and button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">
          🧠 Kasha.Py Projects
        </h1>
        <Link
          href="/playground"
          className="text-sm bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-cyan-500/30 transition duration-200"
        >
          🧪 Try Playground
        </Link>
      </div>

      {projects.length > 0 ? (
        projects.map((proj, index) => {
          const isOpen = expanded === proj.slug.current
          return (
            <div key={proj.slug.current}>
              <div className="bg-gray-900 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all shadow-md">
                <button
                  onClick={() => toggleAccordion(proj.slug.current)}
                  className="w-full px-6 py-4 flex items-center gap-2 text-left"
                >
                  <ChevronDown
                    className={`transition-transform duration-300 text-cyan-400 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={18}
                  />
                  <span className="text-lg font-semibold text-cyan-300">
                    {proj.title}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                    isOpen ? 'max-h-40 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-sm text-gray-300">{proj.description}</p>
                  <Link
                    href={`/projects/${proj.slug.current}`}
                    className="inline-block mt-2 text-sm text-cyan-400 hover:text-cyan-500 transition duration-200"
                  >
                    🔍 View Project
                  </Link>
                </div>
              </div>

              {/* Divider */}
              {index < projects.length - 1 && (
                <div className="my-6 border-t border-gray-700 opacity-30" />
              )}
            </div>
          )
        })
      ) : (
        <p className="text-gray-400">No projects found.</p>
      )}
    </div>
  )
}
