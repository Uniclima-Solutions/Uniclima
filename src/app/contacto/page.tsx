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
  CheckCircle,
  Loader2,
  ChevronDown,
  Recycle,
  Wind,
  FileText,
  Thermometer,
  Shield,
  RotateCcw,
  Wrench,
  Award,
  HelpCircle
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs'

interface FormData {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
  acepta: boolean
}

// FAQs data
const faqs = [
  {
    id: 1,
    icon: Recycle,
    question: '¿Por qué elegir repuestos reacondicionados?',
    answer: 'Los repuestos reacondicionados representan una alternativa económica y sostenible sin comprometer la calidad. Cada componente es sometido a rigurosos controles de calidad y pruebas de funcionamiento. Ofrecemos 1 año de garantía cuando la instalación es realizada por nuestros técnicos.'
  },
  {
    id: 2,
    icon: Wind,
    question: '¿Con qué frecuencia debo limpiar los filtros?',
    answer: 'Recomendamos la limpieza de filtros cada 6 meses como mínimo. Los filtros sucios pueden provocar problemas respiratorios y reducir la eficiencia energética hasta un 15%.'
  },
  {
    id: 3,
    icon: FileText,
    question: '¿Cómo funcionan los presupuestos?',
    answer: 'Los presupuestos son gratuitos y sin compromiso, con validez de 30 días. Para detección de averías aplicamos 60€ que se descuentan si acepta la reparación.'
  },
  {
    id: 4,
    icon: Thermometer,
    question: '¿Qué ventajas tiene la aerotermia?',
    answer: 'La aerotermia extrae hasta el 75% de la energía del aire exterior, logrando ahorros de hasta 70% comparado con sistemas convencionales. Proporciona calefacción, refrigeración y ACS.'
  },
  {
    id: 5,
    icon: Shield,
    question: '¿Qué incluye la garantía de repuestos?',
    answer: 'Garantizamos 1 año en repuestos reacondicionados cuando la instalación es realizada por nuestros técnicos. Cubre defectos de funcionamiento según normativa vigente.'
  },
  {
    id: 6,
    icon: RotateCcw,
    question: '¿Puedo devolver un repuesto electrónico?',
    answer: 'Los componentes electrónicos no admiten devolución por su naturaleza técnica. Para repuestos mecánicos, dispone de 14 días si está sin usar y en embalaje original.'
  },
  {
    id: 7,
    icon: Wrench,
    question: '¿Qué mantenimiento necesita mi caldera?',
    answer: 'Las calderas requieren revisión anual obligatoria según el RITE. Incluye limpieza del quemador, verificación de combustión, comprobación de presión y seguridades.'
  },
  {
    id: 8,
    icon: Award,
    question: '¿Ofrecen garantía en las reparaciones?',
    answer: 'Sí, ofrecemos 6 meses de garantía en mano de obra y 1 año en repuestos instalados por nuestros técnicos certificados.'
  }
]

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
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.contacto} />
      
      <main>
        {/* Hero compacto */}
        <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <nav className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                  <span>/</span>
                  <span className="text-orange-400">Contacto</span>
                </nav>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Contacta con nosotros
                </h1>
                <p className="text-gray-300 text-sm md:text-base max-w-lg">
                  Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
                </p>
              </div>
              
              {/* Quick contact cards en hero */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="tel:+34912345678" 
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/20 transition-all group"
                >
                  <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Llámanos</p>
                    <p className="font-semibold text-sm group-hover:text-orange-400 transition-colors">912 345 678</p>
                  </div>
                </a>
                <a 
                  href="mailto:info@uniclima.es" 
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/20 transition-all group"
                >
                  <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Escríbenos</p>
                    <p className="font-semibold text-sm group-hover:text-violet-400 transition-colors">info@uniclima.es</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-8">
              
              {/* FAQs - Columna izquierda */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="sticky top-4">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-bold text-gray-900">Preguntas Frecuentes</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {faqs.map((faq, index) => {
                      const IconComponent = faq.icon
                      const isOdd = index % 2 === 0
                      const accentColor = isOdd ? 'bg-violet-600' : 'bg-orange-500'
                      const isOpen = openFaq === faq.id
                      
                      return (
                        <div 
                          key={faq.id}
                          className={`bg-white rounded-lg border transition-all duration-300 ${
                            isOpen ? 'border-gray-300 shadow-md' : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full flex items-center gap-3 p-3 text-left"
                          >
                            <div className={`w-8 h-8 ${accentColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <span className="flex-1 font-medium text-gray-800 text-sm leading-tight">
                              {faq.question}
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <div 
                            className={`grid transition-all duration-300 ease-in-out ${
                              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-3 pb-3 pt-0">
                                <p className="text-gray-600 text-xs leading-relaxed pl-11">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Info adicional compacta */}
                  <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Horario de atención</p>
                        <p className="text-xs text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                        <p className="text-xs text-gray-500 mt-1">Madrid, España</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario - Columna derecha */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        ¡Mensaje enviado!
                      </h2>
                      <p className="text-gray-600 text-sm mb-5">
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
                        className="text-orange-600 hover:underline text-sm font-medium"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-5">
                        <MessageSquare className="w-5 h-5 text-orange-500" />
                        <h2 className="text-lg font-bold text-gray-900">
                          ¿Cómo podemos ayudarte?
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Nombre completo *
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                              placeholder="612 345 678"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Motivo de contacto *
                            </label>
                            <select
                              name="asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white"
                            >
                              <option value="consulta">Consulta sobre productos</option>
                              <option value="presupuesto">Solicitar presupuesto</option>
                              <option value="tecnico">Soporte técnico / Avería</option>
                              <option value="pedido">Información sobre pedido</option>
                              <option value="devolucion">Devolución</option>
                              <option value="profesional">Cuenta profesional</option>
                              <option value="otro">Otro motivo</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Mensaje *
                          </label>
                          <textarea
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
                            placeholder="Describe tu consulta con el mayor detalle posible..."
                          />
                        </div>

                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            name="acepta"
                            id="acepta"
                            checked={formData.acepta}
                            onChange={handleChange}
                            className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="acepta" className="text-xs text-gray-600">
                            He leído y acepto la{" "}
                            <Link href="/privacidad" className="text-orange-600 hover:underline">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
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
