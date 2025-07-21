export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          Built by{' '}
          <a
            href="https://okashadev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            OKasha Nadeem
          </a>
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://okashadev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-300"
          >
            Portfolio
          </a>
          {/* Optional social links */}
          <a
            href="https://github.com/Okashanadeem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/okasha-nadeem/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
