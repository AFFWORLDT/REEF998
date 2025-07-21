import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'REEF 998 | Luxury Cooling Residences',
  description: 'Experience the world’s 3rd building with patented outdoor-cooling balconies. Redefining luxury living in Dubai with innovation, wellness, and unparalleled comfort.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
