'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const TransitionOverlay = () => {
  const controls = useAnimation()
  const pathname = usePathname()

  useEffect(() => {
    const sequence = async () => {
      await controls.start('initial')
      await controls.start('expand')
      await controls.start('fadeOut')
    }
    sequence()
  }, [pathname, controls])

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center">
      {/* Black Donut (Outer Ring) */}
      <motion.div
        className="absolute rounded-full border-[24px] border-black bg-transparent"
        variants={{
          initial: { scale: 0, opacity: 0, rotate: 0 },
          expand: {
            scale: 35,
            opacity: 1,
            rotate: 90,
            transition: {
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            },
          },
          fadeOut: {
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
        }}
        initial="initial"
        animate={controls}
        style={{ width: 160, height: 160 }}
      />

      {/* Cyan Donut (Inner Ring) */}
      <motion.div
        className="absolute rounded-full border-[20px] border-cyan-400 bg-transparent mix-blend-difference"
        variants={{
          initial: { scale: 0, opacity: 0, rotate: 0 },
          expand: {
            scale: 37,
            opacity: 1,
            rotate: -90,
            transition: {
              duration: 1.4,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1],
            },
          },
          fadeOut: {
            opacity: 0,
            transition: {
              duration: 0.3,
              delay: 0.1,
              ease: 'easeOut',
            },
          },
        }}
        initial="initial"
        animate={controls}
        style={{ width: 140, height: 140 }}
      />
    </div>
  )
}

export default TransitionOverlay