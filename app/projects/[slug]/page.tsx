// app/projects/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import CodeBlock from '@/app/myComponents/CodeBlock'
import Link from 'next/link'
import type { Metadata } from 'next'

// Optional SEO metadata
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `KashaPy – ${slug}`,
    description: `Explore the ${slug} project.`,
  }
}

// Sanity project type
interface Project {
  title: string
  description: string
  code: string
  demoUrl?: string
  slug: {
    current: string
  }
}

// ✅ Entry component — params is now a Promise in Next.js 15
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const project: Project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  )

  if (!project) {
    return (
      <div className="p-10 text-center text-red-400 text-lg font-semibold">
        ❌ Project not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white font-mono">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
        >
          <span className="text-lg">←</span> Back to Projects
        </Link>
      </div>

      {/* Project Card */}
      <div className="bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-cyan-400 tracking-tight">
          {project.title}
        </h1>

        <p className="text-gray-300 leading-relaxed text-sm">
          {project.description}
        </p>

        <div>
          <h2 className="text-cyan-300 text-lg mb-2">🧠 Code</h2>
          <div className="rounded-lg overflow-hidden border border-gray-800 bg-black">
            <CodeBlock code={project.code} />
          </div>
        </div>

        {project.demoUrl && (
          <div className="pt-4">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
            >
              🚀 Live Demo
            </a>
          </div>
        )}
      </div>
    </div>
  )
}