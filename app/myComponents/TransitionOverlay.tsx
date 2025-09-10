'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const TransitionOverlay = () => {
  const pathname = usePathname()
  const [key, setKey] = useState(0)

  // trigger animation on route change
  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [pathname])

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center">
      {/* Black Donut */}
      <motion.div
        key={`black-${key}`}
        className="absolute rounded-full border-[24px] border-black bg-transparent"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          scale: [0, 35, 35],
          opacity: [0, 1, 0],
          rotate: [0, 90, 90],
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
        }}
        style={{ width: 160, height: 160 }}
      />

      {/* Cyan Donut */}
      <motion.div
        key={`cyan-${key}`}
        className="absolute rounded-full border-[20px] border-cyan-400 bg-transparent mix-blend-difference"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          scale: [0, 37, 37],
          opacity: [0, 1, 0],
          rotate: [0, -90, -90],
        }}
        transition={{
          duration: 1.8,
          ease: 'easeInOut',
          delay: 0.1,
        }}
        style={{ width: 140, height: 140 }}
      />
    </div>
  )
}

export default TransitionOverlay
