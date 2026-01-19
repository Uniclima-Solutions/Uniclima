'use client'

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
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
  Upload,
  X,
  ImageIcon,
  Film
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

interface UploadedFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
}

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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const remainingSlots = 5 - uploadedFiles.length
    const filesToAdd = fileArray.slice(0, remainingSlots)

    filesToAdd.forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newFile: UploadedFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            type: file.type.startsWith('image/') ? 'image' : 'video'
          }
          setUploadedFiles(prev => [...prev, newFile].slice(0, 5))
        }
        reader.readAsDataURL(file)
      }
    })
  }, [uploadedFiles.length])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }, [processFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">Respondemos en menos de 24h</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                ¿En qué podemos
                <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  ayudarte?
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                Nuestro equipo de expertos está listo para resolver todas tus dudas sobre climatización y repuestos.
              </p>
              
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a href="tel:+34912345678" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Teléfono</p>
                  <p className="text-white font-semibold">912 345 678</p>
                </a>
                
                <a href="mailto:info@uniclima.es" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white font-semibold">info@uniclima.es</p>
                </a>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Horario</p>
                  <p className="text-white font-semibold">L-V 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Formulario */}
              <div className="order-1">
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Mensaje enviado!</h2>
                      <p className="text-gray-600 mb-8">Te responderemos lo antes posible.</p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ nombre: "", email: "", telefono: "", asunto: "consulta", mensaje: "", acepta: false })
                          setUploadedFiles([])
                        }}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Enviar otro mensaje →
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
                        <p className="text-gray-500">Completa el formulario y te contactaremos pronto.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre y Email */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre completo <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        {/* Teléfono y Motivo */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
                              placeholder="612 345 678"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Motivo <span className="text-orange-500">*</span>
                            </label>
                            <select
                              name="asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 appearance-none cursor-pointer"
                            >
                              <option value="consulta">Consulta sobre productos</option>
                              <option value="presupuesto">Solicitar presupuesto</option>
                              <option value="tecnico">Soporte técnico / Avería</option>
                              <option value="pedido">Información sobre pedido</option>
                              <option value="devolucion">Devolución</option>
                              <option value="otro">Otro motivo</option>
                            </select>
                          </div>
                        </div>

                        {/* Mensaje */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensaje <span className="text-orange-500">*</span>
                          </label>
                          <textarea
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400 resize-none"
                            placeholder="Describe tu consulta con el mayor detalle posible..."
                          />
                        </div>

                        {/* File Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adjuntar archivos <span className="text-gray-400">(máx. 5 imágenes o vídeos)</span>
                          </label>
                          
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                              isDragging 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                            } ${uploadedFiles.length >= 5 ? 'opacity-50 pointer-events-none' : ''}`}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*,video/*"
                              multiple
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            
                            <div className="flex flex-col items-center">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                                isDragging ? 'bg-orange-100' : 'bg-gray-100'
                              }`}>
                                <Upload className={`w-6 h-6 ${isDragging ? 'text-orange-600' : 'text-gray-400'}`} />
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold text-orange-600">Haz clic para seleccionar</span> o arrastra aquí
                              </p>
                              <p className="text-xs text-gray-400">PNG, JPG, MP4 hasta 10MB cada uno</p>
                            </div>
                          </div>

                          {/* Preview de archivos */}
                          {uploadedFiles.length > 0 && (
                            <div className="mt-4 grid grid-cols-5 gap-3">
                              {uploadedFiles.map((file) => (
                                <div key={file.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                                  {file.type === 'image' ? (
                                    <img src={file.preview} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                      <Film className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-3 h-3 text-white" />
                                  </button>
                                  <div className="absolute bottom-1 left-1">
                                    {file.type === 'image' ? (
                                      <ImageIcon className="w-4 h-4 text-white drop-shadow-lg" />
                                    ) : (
                                      <Film className="w-4 h-4 text-white drop-shadow-lg" />
                                    )}
                                  </div>
                                </div>
                              ))}
                              
                              {/* Slots vacíos */}
                              {Array.from({ length: 5 - uploadedFiles.length }).map((_, i) => (
                                <div 
                                  key={`empty-${i}`} 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors"
                                >
                                  <span className="text-2xl text-gray-300">+</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="acepta"
                            id="acepta"
                            checked={formData.acepta}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                          <label htmlFor="acepta" className="text-sm text-gray-600 cursor-pointer">
                            He leído y acepto la{" "}
                            <Link href="/privacidad" className="text-orange-600 hover:underline font-medium">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Enviando mensaje...
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

              {/* FAQs */}
              <div className="order-2">
                <div className="mb-8">
                  <span className="inline-block text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
                    Preguntas Frecuentes
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Resolvemos tus dudas
                  </h2>
                  <p className="text-gray-500">
                    Encuentra respuestas rápidas a las consultas más habituales sobre nuestros servicios.
                  </p>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => {
                    const IconComponent = faq.icon
                    const isOpen = openFaq === faq.id
                    const colors = index % 2 === 0 
                      ? 'from-violet-500 to-violet-600' 
                      : 'from-orange-500 to-orange-600'
                    
                    return (
                      <div 
                        key={faq.id}
                        className={`bg-white rounded-2xl transition-all duration-300 ${
                          isOpen 
                            ? 'shadow-lg shadow-gray-200/50 ring-1 ring-gray-100' 
                            : 'shadow-sm hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center gap-4 p-5 text-left"
                        >
                          <div className={`w-11 h-11 bg-gradient-to-br ${colors} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="flex-1 font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </div>
                        </button>
                        
                        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 pt-0 pl-20">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* CTA adicional */}
                <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 mb-2">¿No encuentras lo que buscas?</p>
                  <a href="tel:+34912345678" className="inline-flex items-center gap-2 text-white font-semibold hover:text-orange-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    Llámanos al 912 345 678
                  </a>
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
