"use client"

import { createContext, useContext, useState } from "react"

type CountryContextType = {
  country: string
  currency: string
  rate: number
  setCountry: (c: string) => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

const countryMap: Record<string, { currency: string; rate: number }> = {
  India: { currency: "INR", rate: 1 },
  USA: { currency: "USD", rate: 0.012 },
  Germany: { currency: "EUR", rate: 0.011 },
  UK: { currency: "GBP", rate: 0.0095 },
  Japan: { currency: "JPY", rate: 1.8 },
  Canada: { currency: "CAD", rate: 0.016 },
  Australia: { currency: "AUD", rate: 0.018 },
}

export function CountryProvider({ children }: { children: React.ReactNode }) {

  // 🔥 Initialize directly from localStorage safely
  const getInitialCountry = () => {
    if (typeof window === "undefined") return "India"
    const saved = localStorage.getItem("lux_country")
    return saved && countryMap[saved] ? saved : "India"
  }

  const [country, setCountryState] = useState(getInitialCountry)

  const setCountry = (c: string) => {
    if (!countryMap[c]) return
    setCountryState(c)
    localStorage.setItem("lux_country", c)
  }

  const value = {
    country,
    currency: countryMap[country].currency,
    rate: countryMap[country].rate,
    setCountry,
  }

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error("useCountry must be used inside CountryProvider")
  }
  return context
}
