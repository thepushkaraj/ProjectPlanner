import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TokenState from '@/context/tokens/TokenState'
import { ThemeProvider } from '@/context/theme/ThemeContext'
import TopLoadingBar from './TopLoadinggBar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ProjectPlanner - AI-Powered Project Ideas',
  description: 'Discover unique project ideas tailored to your skills and interests with our AI-powered project suggestion tool.',
  keywords: ['project ideas', 'AI', 'development', 'programming', 'coding'],
  authors: [{ name: 'ProjectPlanner Team' }],
  creator: 'ProjectPlanner',
  publisher: 'ProjectPlanner',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://projectplanner.vercel.app',
    title: 'ProjectPlanner - AI-Powered Project Ideas',
    description: 'Discover unique project ideas tailored to your skills and interests',
    siteName: 'ProjectPlanner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectPlanner - AI-Powered Project Ideas',
    description: 'Discover unique project ideas tailored to your skills and interests',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TokenState>
            <Providers>
              <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-800 text-secondary-900 dark:text-secondary-100">
                <Header />
                <TopLoadingBar>
                  <main className="relative">
                    {children}
                  </main>
                </TopLoadingBar>
                <Footer />
              </div>
            </Providers>
          </TokenState>
        </ThemeProvider>
      </body>
    </html>
  )
}
