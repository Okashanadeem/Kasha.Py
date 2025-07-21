// app/agents/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ArrowRight } from 'lucide-react'

interface AgentProject {
  title: string
  description: string
  slug: {
    current: string
  }
}

export default function AgentsPage() {
  const [projects, setProjects] = useState<AgentProject[]>([])

  useEffect(() => {
    client
      .fetch(`*[_type == "agentProject"]{title, description, slug}`)
      .then((data) => setProjects(data))
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-mono">

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">🤖 Agentic AI Projects</h1>

        <p className="text-gray-400 mb-6">
          Explore AI agent projects built using OpenAI Agents, tools, and automation workflows.
        </p>

        <ul className="space-y-4">
          {projects.map((proj) => (
            <li key={proj.slug.current}>
              <Link
                href={`/agents/${proj.slug.current}`}
                className="block p-4 border border-gray-700 rounded-lg bg-gray-900 hover:border-cyan-400 hover:bg-gray-800 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg text-cyan-300 font-semibold">{proj.title}</h2>
                    <p className="text-sm text-gray-400">{proj.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
