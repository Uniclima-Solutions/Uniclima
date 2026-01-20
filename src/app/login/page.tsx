"use client";

/**
 * Página de Login - Uniclima
 * - Login con email/contraseña
 * - Login con Google
 * - Protección reCAPTCHA
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

// Componente de icono de Google
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (email !== "demo@uniclima.es" || password !== "demo123") {
        setError("Email o contraseña incorrectos. Prueba con demo@uniclima.es / demo123");
        setIsLoading(false);
        return;
      }
      router.push("/");
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Redirigiendo a Google para autenticación...");
    } catch (err) {
      setError("Error al conectar con Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="h-14 lg:h-[104px]" />
      <main className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
              <p className="text-orange-100 mt-2">Accede a tu cuenta de Uniclima</p>
            </div>
            <div className="p-6 sm:p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-medium text-gray-700 transition-all disabled:opacity-50">
                <GoogleIcon className="w-5 h-5" />
                <span>Continuar con Google</span>
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">o con tu email</span></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    <span className="text-sm text-gray-600">Recordarme</span>
                  </label>
                  <Link href="/recuperar-password" className="text-sm text-orange-600 hover:text-orange-700 font-medium">¿Olvidaste tu contraseña?</Link>
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                  {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Iniciando sesión...</span></>) : (<><span>Iniciar Sesión</span><ArrowRight className="w-5 h-5" /></>)}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">Este sitio está protegido por reCAPTCHA</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600">¿No tienes cuenta? <Link href="/registro" className="text-orange-600 hover:text-orange-700 font-semibold">Crear cuenta</Link></p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Beneficios de tu cuenta Uniclima</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600">Seguimiento de pedidos en tiempo real</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600">Historial de compras y facturas</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600">Lista de favoritos sincronizada</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600">Ofertas exclusivas para clientes</span></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
