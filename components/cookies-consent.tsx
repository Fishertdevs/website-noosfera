"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CookiesConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    const cookieConsent = localStorage.getItem("cookies-consent")
    if (!cookieConsent) {
      // pequeño delay para evitar flash
      setTimeout(() => setIsOpen(true), 500)
    }
  }, [])

  if (!isMounted) return null

  const handleAccept = () => {
    localStorage.setItem("cookies-consent", "accepted")
    setIsOpen(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookies-consent", "declined")
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4 pb-4">
            <div className="bg-background/95 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex-shrink-0"
                >
                  <Cookie className="h-6 w-6 text-amber-500" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Política de Cookies</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Utilizamos cookies esenciales para mejorar tu experiencia en Noösfera. Algunas cookies son
                    obligatorias para el funcionamiento del sitio, mientras que otras nos ayudan a personalizar tu
                    experiencia y analizar el uso de la plataforma. Al hacer clic en "Aceptar", aceptas nuestra{" "}
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        router.push("/company")
                      }}
                      className="underline hover:text-foreground font-medium"
                    >
                      política de cookies completa
                    </button>
                    .
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleAccept}>
                        Aceptar Cookies
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" onClick={handleDecline}>
                        Solo Esenciales
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsOpen(false)
                          router.push("/company")
                        }}
                      >
                        Ver Política Completa
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
