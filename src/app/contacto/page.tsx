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
  Award
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
    answer: 'Los repuestos reacondicionados representan una alternativa económica y sostenible sin comprometer la calidad. Cada componente es sometido a rigurosos controles de calidad y pruebas de funcionamiento que verifican su rendimiento óptimo. Ofrecemos 1 año de garantía en todos nuestros repuestos reacondicionados cuando la instalación es realizada por nuestros técnicos cualificados, asegurando así su correcto funcionamiento y durabilidad.'
  },
  {
    id: 2,
    icon: Wind,
    question: '¿Con qué frecuencia debo limpiar los filtros?',
    answer: 'Recomendamos la limpieza de filtros cada 6 meses como mínimo. Los filtros sucios acumulan polvo, ácaros, bacterias y otros microorganismos que se dispersan por el aire, pudiendo provocar problemas respiratorios, alergias e infecciones. Esto es especialmente crítico en hogares con niños pequeños y personas mayores, ya que son los más vulnerables a estas afecciones. Además, unos filtros limpios mejoran la eficiencia energética hasta un 15% y prolongan la vida útil del equipo.'
  },
  {
    id: 3,
    icon: FileText,
    question: '¿Cómo funcionan los presupuestos?',
    answer: 'Los presupuestos son gratuitos y sin compromiso, con validez de 30 días. Para la detección de averías aplicamos un cargo de 60€. Si acepta el presupuesto de reparación, este importe se descontará del total y no se aplicará cargo adicional por diagnóstico. En instalaciones nuevas requerimos un adelanto del 50% a la aceptación del presupuesto para la reserva de la cita y la maquina y el otro 50% restante a la finalización. Aceptamos efectivo, transferencia bancaria y tarjeta de crédito/débito.'
  },
  {
    id: 4,
    icon: Thermometer,
    question: '¿Qué ventajas tiene la aerotermia?',
    answer: 'La aerotermia es una tecnología renovable de alta eficiencia que extrae hasta el 75% de la energía del aire exterior, consumiendo solo un 25% de electricidad. Esto se traduce en ahorros energéticos de hasta el 70% comparado con sistemas convencionales de gas o gasóleo. Proporciona calefacción, refrigeración y agua caliente sanitaria con una única instalación, reduciendo significativamente las emisiones de CO₂ y contribuyendo a la sostenibilidad medioambiental. Compatible con suelo radiante y radiadores de baja temperatura.'
  },
  {
    id: 5,
    icon: Shield,
    question: '¿Qué incluye la garantía de repuestos?',
    answer: 'Garantizamos el correcto funcionamiento de nuestros repuestos reacondicionados durante 1 año, cubriendo defectos de funcionamiento o reparación según la normativa vigente. La garantía es aplicable exclusivamente cuando la instalación ha sido realizada por nuestros técnicos autorizados. No cubre daños derivados de uso inadecuado, instalación por terceros, falta de mantenimiento o factores externos. La garantía se limita al componente específico instalado, no al sistema completo del equipo.'
  },
  {
    id: 6,
    icon: RotateCcw,
    question: '¿Puedo devolver un repuesto electrónico?',
    answer: 'Los componentes electrónicos (placas base, módulos de control, inversores, etc.) no admiten devolución debido a su naturaleza técnica y a la imposibilidad de verificar su correcto uso tras la entrega. Esta política protege tanto al cliente como a nuestra empresa frente a posibles daños por manipulación incorrecta. Para el resto de repuestos mecánicos, dispone de 14 días hábiles para devolución, siempre que el producto esté sin usar, sin instalar y en su embalaje original con todos sus precintos y documentación.'
  },
  {
    id: 7,
    icon: Wrench,
    question: '¿Qué mantenimiento necesita mi caldera?',
    answer: 'Las calderas requieren una revisión anual obligatoria según el RITE (Reglamento de Instalaciones Térmicas en Edificios). Este mantenimiento preventivo incluye limpieza del quemador, verificación de combustión, comprobación de presión y estanqueidad, revisión de seguridades y ajuste de parámetros. El mantenimiento correcto previene averías costosas, asegura un funcionamiento eficiente con menor consumo, garantiza la seguridad de la instalación y evita la emisión de gases nocivos. La falta de mantenimiento puede invalidar la garantía del fabricante.'
  },
  {
    id: 8,
    icon: Award,
    question: '¿Ofrecen garantía en las reparaciones?',
    answer: 'Sí, ofrecemos 6 meses de garantía en mano de obra para reparaciones y 1 año en repuestos instalados por nuestros técnicos certificados. La garantía cubre exclusivamente el elemento reparado o sustituido, no extendiéndose al resto de componentes del equipo. Quedan excluidos de garantía los daños ocasionados por uso inadecuado, instalaciones eléctricas deficientes, falta de mantenimiento o factores externos no imputables a nuestra intervención. Todos los trabajos son realizados conforme a la normativa técnica vigente.'
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

        {/* FAQs Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Preguntas Frecuentes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encuentra respuestas a las dudas más comunes sobre nuestros servicios y productos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon
                const isOdd = index % 2 === 0
                const bgColor = isOdd ? 'bg-violet-600' : 'bg-orange-500'
                
                return (
                  <div 
                    key={faq.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900 text-sm md:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === faq.id ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="pl-14 text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contenido principal - Formulario */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Información de contacto */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
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
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
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
                    <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Madrid, España</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
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
                          ¿Cómo podemos ayudarte?
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
                              Motivo de contacto *
                            </label>
                            <select
                              name="asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
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
                            placeholder="Describe tu consulta con el mayor detalle posible..."
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
