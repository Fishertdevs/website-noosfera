"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookiesConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hasHandled, setHasHandled] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const cookieConsent = localStorage.getItem("cookies-consent")
    if (!cookieConsent) {
      const timer = setTimeout(() => setIsOpen(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = useCallback(() => {
    if (hasHandled) return
    setHasHandled(true)
    localStorage.setItem("cookies-consent", "accepted")
    setIsOpen(false)
  }, [hasHandled])

  const handleDecline = useCallback(() => {
    if (hasHandled) return
    setHasHandled(true)
    localStorage.setItem("cookies-consent", "declined")
    setIsOpen(false)
  }, [hasHandled])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && !hasHandled && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-background/98 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Cookie className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-sm text-foreground font-medium">
                Usamos cookies para mejorar tu experiencia
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-9 text-sm" 
                onClick={handleAccept}
              >
                Aceptar
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-9 text-sm"
                onClick={handleDecline}
              >
                Rechazar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
