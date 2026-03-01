"use client"

export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="/lux-bg.mp4" type="video/mp4" />
    </video>
  )
}