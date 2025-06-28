import { client } from '@/sanity/lib/client'
import CodeBlock from '@/app/myComponents/CodeBlock'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  code: string
  demoUrl?: string
  slug: {
    current: string
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project: Project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  )

  if (!project) {
    return (
      <div className="p-10 text-center text-red-400 text-lg font-semibold">
        ❌ Project not found.
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 text-white font-mono">
      {/* Back Button */}
      <Link
        href="/"
        className="text-cyan-400 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Projects
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-cyan-400 leading-tight">
          {project.title}
        </h1>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
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
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-md shadow hover:shadow-cyan-500/30 transition"
            >
              🚀 Live Demo
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
