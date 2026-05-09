import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: "Luardani — Premium Women's Accessories",
  description:
    "Luardani creates premium no-size accessories for women: leather goods, silk pieces, jewelry, and travel essentials rooted in Fatima's Moroccan family name.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css?v=20260510-next-migration" />
      </head>
      <body>
        {children}
        <Script src="/app.js?v=20260510-next-migration" strategy="afterInteractive" />
      </body>
    </html>
  )
}
