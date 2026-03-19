"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Eye, EyeOff, ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Por favor completa todos los campos")
      return
    }

    const success = await login(formData.email, formData.password)
    if (success) {
      const isAdmin = formData.email === "admin@noosfera.com"
      router.push(isAdmin ? "/admin" : "/dashboard")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: "demo@noosfera.com",
      password: "demo123",
    })
    toast.success("Credenciales de demo cargadas")
  }

  const fillAdminCredentials = () => {
    setFormData({
      email: "admin@noosfera.com",
      password: "admin123",
    })
    toast.success("Credenciales de admin cargadas")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Alert className="mb-4 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
          <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <AlertDescription className="text-sm text-emerald-800 dark:text-emerald-200">
            <div className="font-semibold mb-2">Credenciales de Prueba:</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs">demo@noosfera.com</div>
                  <div className="font-mono text-xs text-muted-foreground">demo123</div>
                </div>
                <Button size="sm" variant="outline" onClick={fillDemoCredentials}>
                  Usar Demo
                </Button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-200 dark:border-emerald-800">
                <div>
                  <div className="font-mono text-xs">admin@noosfera.com</div>
                  <div className="font-mono text-xs text-muted-foreground">admin123</div>
                </div>
                <Button size="sm" variant="outline" onClick={fillAdminCredentials}>
                  Usar Admin
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-emerald-500/10 p-3 rounded-full">
                <Heart className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu sistema de monitoreo cardíaco</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? "Verificando..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-emerald-600"
                  onClick={() => router.push("/auth/register")}
                >
                  Crear cuenta
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
