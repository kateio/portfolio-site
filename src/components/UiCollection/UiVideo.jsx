import { useEffect, useRef } from 'react'
import styles from './UiCollection.module.css'

export default function UiVideo({ src, poster, label }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    // Videos load and play only near the screen, so the page stays light.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // The poster stays visible if the browser refuses to play.
          })
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={styles.media}
    />
  )
}
