"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Heart, Code2, Shield, BarChart3, LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { TheoreticalFramework } from "@/components/docs/theoretical-framework"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function DocsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("technical")

  const categories = [
    {
      id: "technical",
      title: "Documentación Técnica",
      icon: Code2,
      sections: [
        {
          title: "API de Integración",
          content:
            "La API de Noösfera permite integrar nuestras funcionalidades en aplicaciones de terceros. Endpoint base: https://api.noosfera.com/v1/. Autenticación mediante API Key. Consulta la documentación completa en https://api.noosfera.com/docs.",
        },
        {
          title: "Webhooks",
          content:
            "Los webhooks permiten recibir notificaciones en tiempo real sobre eventos importantes. Eventos disponibles: nft.created, nft.sold, payment.processed. Configura tus webhooks desde la sección de integraciones en tu panel de control.",
        },
        {
          title: "SDKs Disponibles",
          content:
            "Ofrecemos SDKs para JavaScript, Python y Go. Instala con: npm install @noosfera/sdk (JavaScript), pip install noosfera-sdk (Python), o go get github.com/noosfera/sdk (Go).",
        },
      ],
    },
    {
      id: "features",
      title: "Características Principales",
      icon: BarChart3,
      sections: [
        {
          title: "Captura Cardíaca en Tiempo Real",
          content:
            "La plataforma captura datos de ritmo cardíaco con una latencia de 10ms. Soporte para múltiples dispositivos wearables y sensores. Almacenamiento seguro con encriptación AES-256. Sincronización automática con tu cuenta.",
        },
        {
          title: "Generación de NFTs",
          content:
            "Transforma automáticamente tus capturas en NFTs. Elige entre múltiples estilos de generación. Personaliza metadatos, nombres y descripciones. Publica directamente en Ethereum, Polygon, Solana y BSC.",
        },
        {
          title: "Marketplace Integrado",
          content:
            "Accede a los principales marketplaces desde nuestra plataforma. Listado automático de tus NFTs. Gestión centralizada de ventas. Seguimiento de royalties en tiempo real.",
        },
      ],
    },
    {
      id: "security",
      title: "Seguridad y Privacidad",
      icon: Shield,
      sections: [
        {
          title: "Protección de Datos",
          content:
            "Todos los datos se almacenan con encriptación AES-256 end-to-end. Cumplimiento con GDPR, CCPA y regulaciones locales. Backups automáticos diarios. Auditorías de seguridad regulares.",
        },
        {
          title: "Autenticación Segura",
          content:
            "Implementamos autenticación de dos factores (2FA) opcional. Contraseñas hasheadas con bcrypt. Sesiones seguras con cookies httpOnly. Protección contra CSRF, XSS y otros ataques.",
        },
        {
          title: "Privacidad del Usuario",
          content:
            "Tu información personal nunca se comparte con terceros. Control total sobre tus datos de ritmo cardíaco. Opción de eliminar toda tu información en cualquier momento. Transparencia total en nuestra política de privacidad.",
        },
      ],
    },
  ]

  const currentCategory = categories.find((cat) => cat.id === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 isolate">
      <header className="w-full px-4 py-6 z-50 bg-white border-b border-gray-100 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-500/10 p-2 rounded-full backdrop-blur-sm border border-emerald-500/20">
              <Heart className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Noosfera
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/company" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Quienes Somos
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Planes
            </Link>
            <Link href="/docs" className="text-emerald-600 font-medium">
              Documentacion
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/auth/login")}
              className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 hover:border-emerald-500/40"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesion
            </Button>
          </div>
        </div>
      </header>

      {/* Theoretical Framework */}
      <section className="py-20 overflow-hidden">
        <TheoreticalFramework />
      </section>

      <Footer />
    </div>
  )
}
