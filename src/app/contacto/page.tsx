'use client'

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { 
  Phone, 
  Mail, 
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Simple */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Contacta con nosotros
              </h1>
              <p className="text-lg text-orange-100 max-w-2xl mx-auto">
                Estamos aquí para ayudarte con cualquier consulta sobre climatización y repuestos.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* FAQs */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Preguntas Frecuentes
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const IconComponent = faq.icon
                    const isOpen = openFaq === faq.id
                    const isViolet = index % 2 === 0
                    
                    return (
                      <div 
                        key={faq.id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isViolet 
                              ? 'bg-violet-500' 
                              : 'bg-orange-500'
                          }`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          
                          <span className="flex-1 font-medium text-gray-900 text-sm md:text-base leading-tight">
                            {faq.question}
                          </span>
                          
                          <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <div className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}>
                          <div className="overflow-hidden">
                            <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 ml-14">
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Formulario */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h2>
                      <p className="text-gray-600 mb-6">Te responderemos lo antes posible.</p>
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
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nombre */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nombre completo <span className="text-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="Tu nombre"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email <span className="text-orange-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="tu@email.com"
                          />
                        </div>

                        {/* Teléfono */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="612 345 678"
                          />
                        </div>

                        {/* Motivo - Desplegable mejorado */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Motivo de contacto <span className="text-orange-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 appearance-none cursor-pointer pr-10"
                            >
                              <option value="consulta">Consulta sobre productos</option>
                              <option value="presupuesto">Solicitar presupuesto</option>
                              <option value="tecnico">Soporte técnico / Avería</option>
                              <option value="pedido">Información sobre pedido</option>
                              <option value="devolucion">Devolución</option>
                              <option value="otro">Otro motivo</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Mensaje */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Mensaje <span className="text-orange-500">*</span>
                          </label>
                          <textarea
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
                            placeholder="Describe tu consulta..."
                          />
                        </div>

                        {/* File Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Adjuntar archivos <span className="text-gray-400 font-normal">(máx. 5)</span>
                          </label>
                          
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
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
                            
                            <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-orange-600">Seleccionar archivos</span> o arrastrar aquí
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4</p>
                          </div>

                          {/* Preview de archivos */}
                          {uploadedFiles.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {uploadedFiles.map((file) => (
                                <div key={file.id} className="relative group w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                  {file.type === 'image' ? (
                                    <img src={file.preview} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-700">
                                      <Film className="w-5 h-5 text-white" />
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-3 h-3 text-white" />
                                  </button>
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
                            className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                          <label htmlFor="acepta" className="text-sm text-gray-600 cursor-pointer">
                            Acepto la{" "}
                            <Link href="/privacidad" className="text-orange-600 hover:underline">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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

                {/* Info de contacto compacta */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a href="tel:+34912345678" className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors flex-1">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="font-semibold text-gray-900">912 345 678</p>
                    </div>
                  </a>
                  
                  <a href="mailto:info@uniclima.es" className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-violet-200 transition-colors flex-1">
                    <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">info@uniclima.es</p>
                    </div>
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
