import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KiiWii 큐레이터 모집 중',
  description: 'KiiWii 큐레이터 모집 중입니다. 지금 바로 참여하세요!',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
