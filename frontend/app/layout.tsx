import Header from '@/components/Navigation/Header'
import './globals.css'
import { Source_Code_Pro } from 'next/font/google'
import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Shared/Footer'
import Main from '@/components/Shared/Main'

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
    <html lang="pl">
      <body className={source_code_pro.className }>
        <div className="min-h-screen flex flex-col">
          <Header>
            <Navbar />
          </Header>
          <Main>
            {children}
          </Main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
