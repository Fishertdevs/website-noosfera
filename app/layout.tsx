import type React from "react"
import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata = {
  title: "Noösfera - Sistema de Monitoreo Cardíaco",
  description: "Sistema avanzado de monitoreo cardíaco mediante inteligencia artificial",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
