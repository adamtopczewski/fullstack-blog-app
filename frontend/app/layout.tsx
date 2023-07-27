import Header from '@/components/Navigation/Header'
import './globals.css'
import { Source_Code_Pro } from 'next/font/google'
import Navbar from '@/components/Navigation/Navbar'

const source_code_pro = Source_Code_Pro({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog app',
  description: 'Personal blog website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={source_code_pro.className}>
        <Header>
          <Navbar />
        </Header>
        <main className="container mx-auto mt-10 px-2">
          {children}
        </main>
      </body>
    </html>
  )
}
