'use client'

import { useState } from "react"
import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Building2,
  CheckCircle,
  Loader2
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
  acepta: boolean
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "consulta",
    mensaje: "",
    acepta: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.acepta) {
      alert("Debes aceptar la política de privacidad")
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span>/</span>
              <span className="text-white">Contacto</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Contacta con nosotros
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Estamos aquí para ayudarte. Contáctanos por teléfono, email o rellena el formulario 
              y te responderemos lo antes posible.
            </p>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Información de contacto */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <a href="tel:+34912345678" className="text-orange-600 hover:underline">
                        912 345 678
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lunes a Viernes de 9:00 a 18:00
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a href="mailto:info@uniclima.es" className="text-orange-600 hover:underline">
                        info@uniclima.es
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Respondemos en menos de 24 horas
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Madrid, España</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horario</h3>
                      <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Mensaje enviado!
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Gracias por contactarnos. Te responderemos lo antes posible.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({
                            nombre: "",
                            email: "",
                            telefono: "",
                            asunto: "consulta",
                            mensaje: "",
                            acepta: false,
                          })
                        }}
                        className="text-orange-600 hover:underline"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="w-6 h-6 text-orange-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Envíanos un mensaje
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre completo *
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                              placeholder="612 345 678"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Asunto *
                            </label>
                            <select
                              name="asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            >
                              <option value="consulta">Consulta general</option>
                              <option value="pedido">Información sobre pedido</option>
                              <option value="devolucion">Devolución</option>
                              <option value="tecnico">Soporte técnico</option>
                              <option value="profesional">Cuenta profesional</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensaje *
                          </label>
                          <textarea
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                            placeholder="Escribe tu mensaje aquí..."
                          />
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="acepta"
                            id="acepta"
                            checked={formData.acepta}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="acepta" className="text-sm text-gray-600">
                            He leído y acepto la{" "}
                            <Link href="/privacidad" className="text-orange-600 hover:underline">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Enviar mensaje
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
