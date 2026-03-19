"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import UserDashboardNew from "@/components/user-dashboard-new"
import SimpleDemo from "@/components/simple-demo"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()
  const [isDemoMode, setIsDemoMode] = useState<boolean | null>(null)

  // Detectar modo demo desde URL - esto siempre tiene prioridad
  useEffect(() => {
    const mode = searchParams.get("mode")
    setIsDemoMode(mode === "demo")
  }, [searchParams])

  // Obtener la pestaña activa de los parámetros de búsqueda
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      const element = document.getElementById(tab === "dashboard" ? "dashboard" : `${tab}-section`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  // Mostrar loading mientras se determina el estado
  if (isLoading || isDemoMode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-200"></div>
          <div className="text-gray-500">Cargando...</div>
        </div>
      </div>
    )
  }

  // PRIORIDAD 1: Si es modo demo, SIEMPRE mostrar SimpleDemo (sin importar si esta autenticado)
  if (isDemoMode) {
    return <SimpleDemo />
  }

  // PRIORIDAD 2: Usuario autenticado sin modo demo - mostrar dashboard simplificado
  if (isAuthenticated) {
    return <UserDashboardNew />
  }

  // PRIORIDAD 3: No autenticado y no es demo - redirigir al login
  router.push("/auth/login")
  return null
}
