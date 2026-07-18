import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// ─── Dhara Brand Colors ──────────────────────────────────────────────────────
const COLORS = {
  arrow:     '#401C0C',   // deep-forest (primary brand brown)
  rings:     '#D9762E',   // saffron-glow-dark (ring strokes)
  clickRing: '#F3A712',   // saffron-glow (click burst)
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 800, damping: 35, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 800, damping: 35, mass: 0.5 })

  const [clicks, setClicks]       = useState([])
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden]   = useState(false)
  const clickIdRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const getZoom = () => {
      const z = window.getComputedStyle(document.body).zoom
      return (z && !isNaN(parseFloat(z))) ? parseFloat(z) : 1
    }

    const onMove = (e) => {
      const z = getZoom()
      cursorX.set(e.clientX / z)
      cursorY.set(e.clientY / z)
    }

    const onClick = (e) => {
      const t = e.target
      const c = window.getComputedStyle(t).cursor
      const isInteractive = c === 'pointer' || t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') !== null || t.closest('a') !== null || t.getAttribute('role') === 'button'
      
      if (isInteractive) {
        const z = getZoom()
        const id = ++clickIdRef.current
        setClicks(prev => [...prev, { id, x: e.clientX / z, y: e.clientY / z }])
        setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 900)
      }
    }

    const onMouseOver = (e) => {
      const t = e.target
      const c = window.getComputedStyle(t).cursor
      setIsPointer(
        c === 'pointer' ||
        t.tagName === 'BUTTON' ||
        t.tagName === 'A' ||
        t.closest('button') !== null ||
        t.closest('a') !== null ||
        t.getAttribute('role') === 'button'
      )
    }

    const onLeave = () => setIsHidden(true)
    const onEnter = () => setIsHidden(false)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('click',      onClick)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('click',      onClick)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* ── Main cursor container ── */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: isHidden ? 0 : 1,
        }}
      >
        {/* Solid filled arrow — rounded corners via stroke */}
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            display: 'block',
            position: 'relative',
            zIndex: 2,
            marginTop: '-2px',
            marginLeft: '-2px',
          }}
          animate={{ scale: isPointer ? 0.9 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <path
            d="M 1 1 L 1 22 L 7 16 L 17 16 Z"
            fill={COLORS.arrow}
          />
        </motion.svg>
      </motion.div>

      {/* ── Click burst rings ── */}
      <AnimatePresence>
        {clicks.map((click) => (
          <ClickRipple key={click.id} x={click.x} y={click.y} />
        ))}
      </AnimatePresence>
    </>
  )
}

/* ─── Ambient sonar ring — always pulsing at cursor tip ──────────────────── */
function SonarRing({ radius, opacity, strokeWidth, delay, isPointer }) {
  const size = radius * 2 + 4
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        left: -(radius) - 2,
        top:  -(radius) - 2,
        zIndex: 1,
      }}
      animate={{
        scale:   isPointer ? [1, 1.3, 1] : [1, 1.1, 1],
        opacity: [opacity, opacity * 0.4, opacity],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={COLORS.rings}
        strokeWidth={strokeWidth}
      />
    </motion.svg>
  )
}

/* ─── Click ripple burst — 3 rings expand outward on click ───────────────── */
function ClickRipple({ x, y }) {
  const rings = [
    { delay: 0,    size: 36, dur: 0.55 },
    { delay: 0.08, size: 56, dur: 0.65 },
    { delay: 0.16, size: 78, dur: 0.75 },
  ]

  return (
    <>
      {rings.map((r, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            left: x,
            top: y,
            zIndex: 99998,
            pointerEvents: 'none',
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            style={{
              width: r.size,
              height: r.size,
              borderRadius: '50%',
              border: `1.8px solid ${COLORS.clickRing}`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0.15, opacity: 0.85 }}
            animate={{ scale: 1,    opacity: 0 }}
            exit={{}}
            transition={{ duration: r.dur, delay: r.delay, ease: 'easeOut' }}
          />
        </motion.div>
      ))}
    </>
  )
}
