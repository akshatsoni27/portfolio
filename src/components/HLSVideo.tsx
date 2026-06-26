import { useEffect, useRef } from 'react'

interface HLSVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

export { HLS_SRC }

export default function HLSVideo({ src, className = '', style }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: import('hls.js').default | null = null

    const init = async () => {
      const Hls = (await import('hls.js')).default
      if (Hls.isSupported()) {
        hls = new Hls({ lowLatencyMode: true })
        hls.loadSource(src)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
      }
    }

    init()
    return () => { hls?.destroy() }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={className}
      style={style}
    />
  )
}
