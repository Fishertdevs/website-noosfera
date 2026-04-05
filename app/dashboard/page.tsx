"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import UserDashboardNew from "@/components/user-dashboard-new"
import SimpleDemo from "@/components/simple-demo"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, user } = useAuth()
  const [isDemoMode, setIsDemoMode] = useState<boolean | null>(null)

  // Detectar modo demo desde URL
  useEffect(() => {
    const mode = searchParams.get("mode")
    setIsDemoMode(mode === "demo")
  }, [searchParams])

  // Redirigir admin al panel de administracion
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.email === "admin@noosfera.com") {
      router.push("/admin")
    }
  }, [isAuthenticated, isLoading, user, router])

  // Mostrar loading mientras se determina el estado
  if (isLoading || isDemoMode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Cargando...</div>
      </div>
    )
  }

  // Si es admin, no mostrar nada mientras redirige
  if (isAuthenticated && user?.email === "admin@noosfera.com") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Redirigiendo al panel de administracion...</div>
      </div>
    )
  }

  // PRIORIDAD 1: Si es modo demo, mostrar SimpleDemo
  if (isDemoMode) {
    return <SimpleDemo />
  }

  // PRIORIDAD 2: Usuario autenticado sin modo demo - mostrar dashboard
  if (isAuthenticated) {
    return <UserDashboardNew />
  }

  // PRIORIDAD 3: No autenticado y no es demo - redirigir al login
  router.push("/auth/login")
  return null
}
