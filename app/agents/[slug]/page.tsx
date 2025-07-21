'use client'

import { client } from '@/sanity/lib/client'
import CodeBlock from '@/app/myComponents/CodeBlock'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import { X } from 'lucide-react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
}

interface AgentProject {
  title: string
  description: string
  code: string | null
  demoUrl?: string | null
  slug: { current: string }
  files?: FileNode[] | null
}

export default function AgentProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)

  const [project, setProject] = useState<AgentProject | null>(null)
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "agentProject" && slug.current == $slug][0]{
          title,
          description,
          code,
          demoUrl,
          slug,
          files[] {
            name,
            type,
            content,
            children[] {
              name,
              type,
              content,
              children[] {
                name,
                type,
                content,
                children[] { name, type, content }
              }
            }
          }
        }`,
        { slug }
      )
      .then((data) => setProject(data ?? null))
      .catch((error) => {
        console.error('Sanity fetch failed:', error)
        setProject(null)
      })
  }, [slug])

  if (project === null) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        Project not found.
      </div>
    )
  }

  const tree = project.files ?? []
  const codeText = project.code ?? ''

  const findFileByName = (nodes: FileNode[], name: string): { name: string; content: string } | null => {
    for (const node of nodes) {
      if (node.type === 'file' && node.name === name) {
        return { name: node.name, content: node.content ?? '' }
      }
      if (node.type === 'folder' && node.children) {
        const found = findFileByName(node.children, name)
        if (found) return found
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      {/* Floating Folder Icon */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="fixed bottom-10 right-4 z-30 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-2xl opacity-90 backdrop-blur-xl animate-bounce-slow border border-cyan-400/30 md:hidden"
        aria-label="Toggle Folder Structure"
      >
        📁
      </button>

      {/* Overlay (click to close sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar (behind navbar) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 z-40 p-4 transition-transform transform md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4 pt-20">
          <h2 className="text-cyan-300 text-lg">📁 Structure</h2>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close Menu">
            <X className="text-white" size={22} />
          </button>
        </div>
        {tree.length > 0 ? (
          <FolderTree
            nodes={tree}
            onFileClick={(name) => {
              const file = findFileByName(tree, name)
              setSelectedFile(file)
              setSidebarOpen(false)
            }}
          />
        ) : (
          <p className="text-red-400">No file structure found.</p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 sm:px-6 z-20 relative">
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Back to Agents
        </Link>

        <header className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">{project.title}</h1>
          <p className="text-gray-400 mt-2">{project.description}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-4 max-h-[600px] overflow-auto">
            <h2 className="text-cyan-300 text-lg mb-4 flex items-center gap-2">📁 Structure</h2>
            {tree.length > 0 ? (
              <FolderTree
                nodes={tree}
                onFileClick={(name) => {
                  const file = findFileByName(tree, name)
                  setSelectedFile(file)
                }}
              />
            ) : (
              <p className="text-red-400">No file structure found.</p>
            )}
          </aside>

          {/* Code Viewer */}
          <main className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-cyan-300 text-lg flex items-center gap-2">🔧 Agent Code</h2>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-md"
                >
                  🚀 Live Demo
                </a>
              )}
            </div>

            <div className="bg-gray-900 rounded-lg p-4 max-h-[500px] overflow-auto">
              {selectedFile ? (
                <>
                  <div className="mb-2 text-cyan-400 font-semibold">{selectedFile.name}</div>
                  <CodeBlock code={selectedFile.content} />
                </>
              ) : codeText.trim().length > 0 ? (
                <CodeBlock code={codeText} />
              ) : (
                <p className="text-red-400">No code found.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

// Recursive Folder Tree Components
function FolderTree({ nodes, onFileClick }: { nodes: FileNode[]; onFileClick: (name: string) => void }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node, i) => (
        <TreeItem key={`${node.name}-${i}`} node={node} level={0} onFileClick={onFileClick} />
      ))}
    </ul>
  )
}

function TreeItem({
  node,
  level,
  onFileClick,
}: {
  node: FileNode
  level: number
  onFileClick: (name: string) => void
}) {
  const padding = level * 16 + 8
  return (
    <li>
      <div
        style={{ paddingLeft: `${padding}px` }}
        className={`flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition ${
          node.type === 'file' ? 'cursor-pointer' : ''
        }`}
        onClick={() => node.type === 'file' && onFileClick(node.name)}
      >
        <span>{node.type === 'folder' ? '📂' : '📄'}</span>
        <span className="truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && node.children?.length ? (
        <ul className="space-y-1">
          {node.children.map((child, i) => (
            <TreeItem key={`${child.name}-${i}`} node={child} level={level + 1} onFileClick={onFileClick} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
