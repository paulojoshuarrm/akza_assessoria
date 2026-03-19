import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.to('#llogo', { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.to(ref.current, {
      opacity: 0, duration: 0.5, delay: 1.6,
      onComplete: () => { ref.current.style.display = 'none'; onDone?.() }
    })
  }, [onDone])

  return (
    <div ref={ref} id="loader">
      <img src="/logo-dark.webp" alt="AKZA" id="llogo" />
      <div className="lbar" />
    </div>
  )
}
