"use client"

import { useEffect, useRef } from "react"

const sections = [
  "home",
  "shoes",
  "watches",
  "clothes",
  "perfume",
  "accessories",
]

export default function AutoNavigator() {
  const currentIndex = useRef(0)
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null)
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null)
  const isPaused = useRef(false)

  const scrollToSection = () => {
    const id = sections[currentIndex.current]
    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }

    currentIndex.current =
      (currentIndex.current + 1) % sections.length
  }

  const startAuto = () => {
    autoScrollTimer.current = setInterval(() => {
      if (!isPaused.current) {
        scrollToSection()
      }
    }, 5000) // every 5 sec
  }

  const stopAuto = () => {
    if (autoScrollTimer.current)
      clearInterval(autoScrollTimer.current)
  }

  const handleUserActivity = () => {
    isPaused.current = true
    stopAuto()

    if (inactivityTimer.current)
      clearTimeout(inactivityTimer.current)

    inactivityTimer.current = setTimeout(() => {
      isPaused.current = false
      startAuto()
    }, 60000) // 1 min inactivity
  }

  useEffect(() => {
    startAuto()

    window.addEventListener("scroll", handleUserActivity)
    window.addEventListener("mousemove", handleUserActivity)
    window.addEventListener("click", handleUserActivity)
    window.addEventListener("keydown", handleUserActivity)

    return () => {
      stopAuto()
      window.removeEventListener("scroll", handleUserActivity)
      window.removeEventListener("mousemove", handleUserActivity)
      window.removeEventListener("click", handleUserActivity)
      window.removeEventListener("keydown", handleUserActivity)
    }
  }, [])

  return null
}