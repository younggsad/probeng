import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/global.css'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PROBENG - Теория вероятностей',
  description: 'Интерактивно-образовательный сайт помогающий изучению теории вероятностей',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}