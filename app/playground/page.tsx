'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface RunResponse {
  output?: string
  stdout?: string
  stderr?: string
}

export default function PlaygroundPage() {
  const [code, setCode] = useState<string>(`print("Hello, KashaPy!")`)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const runCode = async () => {
    setLoading(true)
    setOutput('')
    setError('')

    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{ content: code }],
        }),
      })

      const data = await res.json()
      const runResult: RunResponse = data?.run || data

      if (runResult.output || runResult.stdout) {
        setOutput(runResult.output || runResult.stdout || '')
      }

      if (runResult.stderr) {
        setError(runResult.stderr)
      }
    } catch (err) {
      console.error(err)
      setError('❌ Failed to execute code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-mono text-white">
      {/* Back Button */}


<div className="mb-10">
  <Link
    href="/"
    className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-white transition"
  >
    <ArrowLeft
      className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform duration-200"
    />
    <span>Back to Projects</span>
  </Link>
</div>


      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-cyan-400 tracking-tight drop-shadow">
          🧪 Kasha.Py Playground
        </h1>
      </div>

      {/* Grid layout: editor + result box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg">
          <label className="block text-sm text-cyan-300 mb-2">Your Python Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full bg-black border border-gray-700 focus:border-cyan-400 p-4 rounded-lg text-sm text-green-200 transition-all duration-200 resize-none"
          />

          <button
            onClick={runCode}
            disabled={loading}
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Running...' : '▶️ Run Code'}
          </button>
        </div>

        {/* Output + Errors */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg h-full flex flex-col">
          <h2 className="text-lg font-semibold text-cyan-300 mb-3">📤 Output</h2>
          <div className="flex-1 overflow-y-auto">
            <pre className="text-sm text-gray-100 whitespace-pre-wrap bg-black p-4 rounded-md border border-gray-800">
              {output || 'No output yet.'}
            </pre>

            {error && (
              <>
                <h3 className="text-red-400 mt-6 mb-2 text-md font-semibold">❗ Error</h3>
                <pre className="text-sm text-red-300 whitespace-pre-wrap bg-black p-4 rounded-md border border-gray-800">
                  {error}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
