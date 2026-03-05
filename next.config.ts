import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fftxeeljgsumvalcimrq.supabase.co",
      },
    ],
  },
}

export default nextConfig
