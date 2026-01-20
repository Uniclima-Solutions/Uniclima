"use client";

/**
 * Página de RECUPERAR CONTRASEÑA - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  ArrowLeft, 
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Shield,
  Lock,
  Send
} from "lucide-react";

export default function RecuperarPasswordPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Por favor, introduce tu email");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, introduce un email válido");
      return;
    }

    setCargando(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCargando(false);
    setEnviado(true);
  };

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
        <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {!enviado ? (
            /* Formulario de recuperación */
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <KeyRound className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">¿Olvidaste tu contraseña?</h1>
                <p className="text-gray-400">No te preocupes, te ayudamos a recuperarla</p>
              </div>

              {/* Formulario */}
              <div className="p-8">
                <p className="text-gray-600 text-center mb-6">
                  Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de tu cuenta
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                          error ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Botón enviar */}
                  <button 
                    type="submit"
                    disabled={cargando}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 disabled:shadow-none"
                  >
                    {cargando ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar enlace de recuperación</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Volver al login */}
                <div className="mt-6 text-center">
                  <Link 
                    href="/login"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver al inicio de sesión</span>
                  </Link>
                </div>

                {/* Seguridad */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Tu información está protegida con encriptación SSL</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mensaje de éxito */
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header éxito */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">¡Email enviado!</h1>
                <p className="text-green-100">Revisa tu bandeja de entrada</p>
              </div>

              {/* Contenido */}
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                
                <p className="text-gray-600 mb-4">
                  Hemos enviado un enlace de recuperación a:
                </p>
                <p className="font-semibold text-gray-900 text-lg mb-6">{email}</p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-amber-800 text-sm">
                    <strong>Nota:</strong> El enlace expirará en 24 horas. Si no recibes el email, revisa tu carpeta de spam.
                  </p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setEnviado(false)}
                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Enviar de nuevo
                  </button>
                  <Link 
                    href="/login"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all text-center"
                  >
                    Volver al login
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Ayuda adicional */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              ¿Problemas para acceder? {" "}
              <Link href="/contacto" className="text-orange-600 font-medium hover:underline">
                Contacta con soporte
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
