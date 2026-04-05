"use client"

import { Heart, Code2, Shield, Cpu, Zap, Database, Globe, Server, Lock, ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function DocsPage() {
  const router = useRouter()

  const sections = [
    {
      id: "api",
      title: "API de Integracion",
      icon: Code2,
      content: [
        {
          subtitle: "Endpoint Base",
          text: "Todas las peticiones se realizan a https://api.noosfera.com/v1/. La autenticacion se realiza mediante API Key que puedes obtener en tu panel de control."
        },
        {
          subtitle: "Autenticacion",
          text: "Incluye tu API Key en el header Authorization: Bearer YOUR_API_KEY en cada peticion. Las claves tienen permisos configurables segun tu plan."
        },
        {
          subtitle: "Rate Limits",
          text: "Plan Free: 100 requests/hora. Plan Estandar: 1,000 requests/hora. Plan Premium: Sin limites. Los limites se reinician cada hora UTC."
        }
      ]
    },
    {
      id: "captura",
      title: "Captura de Datos Cardiacos",
      icon: Heart,
      content: [
        {
          subtitle: "Dispositivos Compatibles",
          text: "Noosfera es compatible con Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch, y cualquier dispositivo que soporte HealthKit o Google Fit."
        },
        {
          subtitle: "Sincronizacion",
          text: "Los datos se sincronizan automaticamente cada 5 minutos cuando el dispositivo esta conectado. Tambien puedes forzar una sincronizacion manual."
        },
        {
          subtitle: "Precision",
          text: "Latencia menor a 10ms en la captura. Precision del 99.5% en la deteccion de patrones cardiacos unicos."
        }
      ]
    },
    {
      id: "nft",
      title: "Generacion de NFTs",
      icon: Zap,
      content: [
        {
          subtitle: "Proceso de Generacion",
          text: "Los patrones cardiacos se transforman en arte digital unico mediante algoritmos propietarios. Cada NFT es matematicamente unico e irrepetible."
        },
        {
          subtitle: "Blockchains Soportadas",
          text: "Ethereum (Mainnet), Polygon, Solana, y Binance Smart Chain. Selecciona la blockchain segun tus preferencias de costo y velocidad."
        },
        {
          subtitle: "Metadatos",
          text: "Cada NFT incluye: timestamp de captura, hash del patron cardiaco, estilo artistico aplicado, y firma digital del creador."
        }
      ]
    },
    {
      id: "seguridad",
      title: "Seguridad y Privacidad",
      icon: Shield,
      content: [
        {
          subtitle: "Encriptacion",
          text: "Todos los datos se encriptan con AES-256 en reposo y TLS 1.3 en transito. Las claves de encriptacion se rotan automaticamente."
        },
        {
          subtitle: "Cumplimiento",
          text: "Cumplimos con GDPR, CCPA, HIPAA, y regulaciones locales de proteccion de datos. Auditorias de seguridad trimestrales por terceros."
        },
        {
          subtitle: "Control de Datos",
          text: "Tienes control total sobre tus datos. Puedes exportarlos o eliminarlos permanentemente en cualquier momento desde tu panel."
        }
      ]
    },
    {
      id: "arquitectura",
      title: "Arquitectura Tecnica",
      icon: Server,
      content: [
        {
          subtitle: "Frontend",
          text: "Next.js 16 con React 19, Tailwind CSS para estilos, y Framer Motion para animaciones. Desplegado en Vercel con Edge Functions."
        },
        {
          subtitle: "Backend",
          text: "API Routes serverless, Supabase como base de datos PostgreSQL con Row Level Security habilitado para cada usuario."
        },
        {
          subtitle: "Blockchain",
          text: "Integracion con ethers.js y RainbowKit. Smart contracts auditados desplegados en multiples redes EVM y Solana."
        }
      ]
    },
    {
      id: "sdk",
      title: "SDKs y Librerias",
      icon: Cpu,
      content: [
        {
          subtitle: "JavaScript/TypeScript",
          text: "npm install @noosfera/sdk - Soporte completo para Node.js y navegadores. Incluye tipos TypeScript."
        },
        {
          subtitle: "Python",
          text: "pip install noosfera-sdk - Compatible con Python 3.8+. Soporte async/await nativo."
        },
        {
          subtitle: "Go",
          text: "go get github.com/noosfera/sdk - Cliente ligero y eficiente para aplicaciones de alto rendimiento."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-4 py-6 z-50 bg-white border-b border-gray-100 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-500/10 p-2 rounded-full border border-emerald-500/20">
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

          <Button
            variant="outline"
            onClick={() => router.push("/auth/login")}
            className="border-emerald-500/20 hover:border-emerald-500/40"
          >
            Iniciar Sesion
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code2 className="h-4 w-4" />
              Documentacion Tecnica
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Centro de Documentacion
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Guia completa para integrar y utilizar todas las funcionalidades de Noosfera. 
              Encuentra informacion sobre APIs, SDKs, seguridad y mejores practicas.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors text-sm font-medium"
              >
                <section.icon className="h-4 w-4" />
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <section.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <span className="text-sm text-emerald-600 font-medium">Seccion {index + 1}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
              </div>

              <div className="space-y-6 pl-4 border-l-2 border-emerald-100">
                {section.content.map((item, idx) => (
                  <div key={idx} className="pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-emerald-500" />
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {index < sections.length - 1 && (
                <div className="mt-12 pt-8 border-t border-gray-100" />
              )}
            </section>
          ))}

          {/* Additional Resources */}
          <section className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recursos Adicionales</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Database className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Base de Datos</h3>
                <p className="text-sm text-gray-600">Supabase con PostgreSQL y Row Level Security habilitado.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Globe className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">CDN Global</h3>
                <p className="text-sm text-gray-600">Vercel Edge Network con latencia menor a 50ms globalmente.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Lock className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Autenticacion</h3>
                <p className="text-sm text-gray-600">Supabase Auth con soporte para 2FA y OAuth providers.</p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h2>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de soporte esta disponible para resolver tus dudas tecnicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => router.push("/auth/login")}
              >
                Acceder al Soporte
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
