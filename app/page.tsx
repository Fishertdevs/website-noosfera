"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  LogIn,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import NeuralParticles from "@/components/animations/neural-particles"
import { useAuth } from "@/contexts/auth-context"
import { CookiesConsent } from "@/components/cookies-consent"
import { HomepageKPIs } from "@/components/homepage-kpis"
import { HeroCarousel } from "@/components/hero-carousel"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const startDemo = () => {
    router.push("/dashboard?mode=demo")
  }

  const showAuth = () => {
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      <NeuralParticles />

      {/* Header */}
      <motion.header
        className="container mx-auto px-4 py-6 relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-emerald-500/10 p-2 rounded-full backdrop-blur-sm border border-emerald-500/20"
              >
                <Heart className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Noosfera
              </motion.h1>
            </Link>
          </motion.div>

          <nav>
            <ul className="flex items-center gap-2 md:gap-6">
              <li className="hidden md:block">
                <Link
                  href="/"
                  className="text-emerald-600 font-medium"
                >
                  Inicio
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/company"
                  className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  Quienes Somos
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  Planes
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/docs"
                  className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  Documentacion
                </Link>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/login")}
                    className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-sm"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar Sesion
                  </Button>
                </motion.div>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Hero Carousel Section */}
      <HeroCarousel onStartDemo={startDemo} onShowAuth={showAuth} />

      {/* KPIs Section - 3 Circular Charts */}
      <HomepageKPIs />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comienza a Crear tu Arte Digital
            </h2>
            <p className="text-gray-600 mb-8">
              Unete a miles de creadores que ya estan monetizando sus patrones cardiacos unicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => router.push("/auth/login")}
              >
                Comenzar Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/pricing")}
              >
                Ver Planes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <CookiesConsent />
    </div>
  )
}
