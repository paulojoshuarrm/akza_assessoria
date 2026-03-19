import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const curRef = useRef(null)
  const cufRef = useRef(null)

  useEffect(() => {
    const cur = curRef.current
    const cuf = cufRef.current
    let mx = 0, my = 0, fx = 0, fy = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      gsap.to(cur, { x: mx, y: my, duration: 0.06 })
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      fx += (mx - fx) * 0.11
      fy += (my - fy) * 0.11
      gsap.set(cuf, { x: fx, y: fy })
      requestAnimationFrame(tick)
    }
    tick()

    const addHover = (el) => {
      el.addEventListener('mouseenter', () => cuf.classList.add('h'))
      el.addEventListener('mouseleave', () => cuf.classList.remove('h'))
    }
    // Hover on interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a,button,.scard,.pi,.tc').forEach(addHover)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    document.querySelectorAll('a,button,.scard,.pi,.tc').forEach(addHover)

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={curRef} id="cur" />
      <div ref={cufRef} id="cuf" />
    </>
  )
}
