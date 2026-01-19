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
  ChevronRight,
  Recycle,
  Wind,
  Thermometer,
  Shield,
  RotateCcw,
  Wrench,
  Award,
  Upload,
  X,
  Film,
  Package,
  Snowflake,
  Flame,
  Clock,
  BadgeCheck
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  nombre: string
  email: string
  telefono: string
  tipoConsulta: string
  mensaje: string
  acepta: boolean
}

interface UploadedFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
}

// FAQs organizadas por categorías según el mockup
const faqCategories = [
  {
    id: 'repuestos',
    title: 'Repuestos',
    icon: Package,
    color: 'orange',
    questions: [
      {
        id: 'r1',
        question: '¿Por qué elegir repuestos reacondicionados?',
        answer: 'Los repuestos reacondicionados ofrecen una alternativa económica y sostenible con plenas garantías de funcionamiento. Cada componente pasa por un exhaustivo proceso de verificación y pruebas técnicas antes de su venta. Ofrecemos hasta 1 año de garantía en repuestos reacondicionados, siempre que la instalación sea realizada por nuestro equipo técnico autorizado, lo que asegura un montaje correcto y preserva la integridad del producto.'
      },
      {
        id: 'r2',
        question: '¿Qué incluye la garantía?',
        answer: 'Nuestra garantía cubre defectos de funcionamiento o reparación durante 1 año en repuestos reacondicionados, conforme a la normativa vigente. Esta garantía es válida exclusivamente cuando la instalación ha sido efectuada por nuestros técnicos autorizados. Quedan expresamente excluidos de cobertura: daños derivados de uso inadecuado, instalación realizada por terceros no autorizados, falta de mantenimiento preventivo, sobretensiones eléctricas, manipulación incorrecta o factores externos. La garantía se aplica únicamente al componente específico suministrado, no al sistema completo del equipo.'
      },
      {
        id: 'r3',
        question: '¿Puedo devolver un repuesto electrónico?',
        answer: 'Los componentes electrónicos (placas base, módulos de control, inversores, sensores electrónicos, etc.) NO admiten devolución una vez entregados, conforme al artículo 103.i) del Real Decreto Legislativo 1/2007 que excluye del derecho de desistimiento los productos que puedan verse afectados por su manipulación. Los componentes electrónicos son extremadamente sensibles a descargas electrostáticas (ESD) y manipulación incorrecta, siendo imposible verificar su estado original tras la entrega. Para repuestos mecánicos no instalados, dispone de 14 días naturales para ejercer el derecho de desistimiento, siempre que el producto permanezca sin usar, sin instalar, en su embalaje original con todos los precintos intactos y documentación completa.'
      }
    ]
  },
  {
    id: 'aire',
    title: 'Aire acondicionado',
    icon: Snowflake,
    color: 'blue',
    questions: [
      {
        id: 'a1',
        question: '¿Cada cuánto debo limpiar los filtros?',
        answer: 'Recomendamos la limpieza de filtros cada 4-6 meses como mínimo, o con mayor frecuencia en entornos con alta concentración de polvo o alérgenos. Los filtros obstruidos acumulan polvo, ácaros, bacterias y otros microorganismos que se dispersan por el aire interior, pudiendo provocar problemas respiratorios, alergias e infecciones. Esta situación es especialmente crítica en hogares con niños pequeños, personas mayores o individuos con patologías respiratorias. Además, unos filtros limpios mejoran la eficiencia energética del equipo hasta un 15% y prolongan significativamente su vida útil.'
      },
      {
        id: 'a2',
        question: '¿Qué mantenimiento necesita?',
        answer: 'Los equipos de aire acondicionado requieren un mantenimiento preventivo anual que incluye: limpieza profunda de filtros y unidades interior/exterior, verificación de niveles de refrigerante, comprobación del correcto funcionamiento del compresor, revisión de conexiones eléctricas, limpieza del sistema de drenaje y calibración del termostato. Un mantenimiento adecuado previene averías costosas, asegura un rendimiento óptimo con menor consumo energético y garantiza la calidad del aire interior. La falta de mantenimiento puede reducir la vida útil del equipo hasta un 40%.'
      }
    ]
  },
  {
    id: 'calderas',
    title: 'Calderas y aerotermia',
    icon: Flame,
    color: 'violet',
    questions: [
      {
        id: 'c1',
        question: '¿Qué ventajas tiene la aerotermia?',
        answer: 'La aerotermia es una tecnología renovable de alta eficiencia que extrae hasta el 75% de la energía necesaria del aire exterior, consumiendo únicamente un 25% de electricidad. Esto se traduce en ahorros energéticos de hasta el 70% comparado con sistemas convencionales de gas o gasóleo. Una única instalación proporciona calefacción, refrigeración y agua caliente sanitaria, reduciendo significativamente las emisiones de CO₂ y contribuyendo a la sostenibilidad medioambiental. Es compatible con suelo radiante, radiadores de baja temperatura y fancoils.'
      },
      {
        id: 'c2',
        question: '¿Qué garantía ofrecen en las reparaciones?',
        answer: 'Ofrecemos 6 meses de garantía en mano de obra para todas las reparaciones y 1 año de garantía en los repuestos instalados por nuestros técnicos certificados. La garantía cubre exclusivamente el elemento reparado o sustituido, sin extenderse al resto de componentes del equipo. Quedan excluidos de garantía los daños ocasionados por: uso inadecuado del equipo, instalaciones eléctricas deficientes, falta de mantenimiento preventivo, sobretensiones, inundaciones u otros factores externos no imputables a nuestra intervención. Todos los trabajos se realizan conforme a la normativa técnica vigente y el RITE.'
      }
    ]
  }
]

// Badges informativos
const infoBadges = [
  { icon: Shield, text: 'Hasta 1 año de garantía', color: 'violet' },
  { icon: Clock, text: 'Envíos rápidos 48/72h', color: 'orange' },
  { icon: BadgeCheck, text: 'Repuestos reacondicionados certificados', color: 'violet' }
]

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "repuesto",
    mensaje: "",
    acepta: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('repuestos')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
    setExpandedQuestion(null)
  }

  const toggleQuestion = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
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

  const getCategoryColors = (color: string) => {
    switch (color) {
      case 'orange':
        return {
          bg: 'bg-orange-500',
          bgLight: 'bg-orange-50',
          text: 'text-orange-600',
          border: 'border-orange-200',
          hover: 'hover:bg-orange-100'
        }
      case 'blue':
        return {
          bg: 'bg-sky-500',
          bgLight: 'bg-sky-50',
          text: 'text-sky-600',
          border: 'border-sky-200',
          hover: 'hover:bg-sky-100'
        }
      case 'violet':
        return {
          bg: 'bg-violet-500',
          bgLight: 'bg-violet-50',
          text: 'text-violet-600',
          border: 'border-violet-200',
          hover: 'hover:bg-violet-100'
        }
      default:
        return {
          bg: 'bg-gray-500',
          bgLight: 'bg-gray-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
          hover: 'hover:bg-gray-100'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Main Content Section con fondo degradado */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          {/* Fondo degradado estilo mockup */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-violet-50/50 to-blue-50/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Columna izquierda - FAQs por categorías */}
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Preguntas frecuentes
                </p>

                {/* Categorías de FAQs */}
                <div className="space-y-4">
                  {faqCategories.map((category) => {
                    const IconComponent = category.icon
                    const colors = getCategoryColors(category.color)
                    const isExpanded = expandedCategory === category.id
                    
                    return (
                      <div 
                        key={category.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        {/* Header de categoría */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-gray-50/50 transition-colors"
                        >
                          <div className={`w-11 h-11 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-gray-900 text-base md:text-lg">
                              {category.title}
                            </span>
                          </div>
                          
                          <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Preguntas de la categoría */}
                        <div className={`transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                          <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2">
                            {category.questions.map((q) => {
                              const isQuestionExpanded = expandedQuestion === q.id
                              
                              return (
                                <div 
                                  key={q.id}
                                  className={`rounded-xl border ${colors.border} overflow-hidden transition-all ${
                                    isQuestionExpanded ? colors.bgLight : 'bg-white'
                                  }`}
                                >
                                  <button
                                    onClick={(e) => toggleQuestion(q.id, e)}
                                    className={`w-full flex items-start gap-3 p-3 md:p-4 text-left ${colors.hover} transition-colors`}
                                  >
                                    <ChevronRight className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                                      isQuestionExpanded ? 'rotate-90' : ''
                                    }`} />
                                    <span className="text-sm md:text-base text-gray-700 leading-snug">
                                      ¿{q.question}
                                    </span>
                                  </button>
                                  
                                  <div className={`transition-all duration-300 ease-in-out ${
                                    isQuestionExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                  }`}>
                                    <div className="px-4 md:px-5 pb-4 md:pb-5 pl-10 md:pl-11">
                                      <p className="text-sm text-gray-600 leading-relaxed">
                                        {q.answer}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Badges informativos */}
                <div className="mt-8 space-y-3">
                  {infoBadges.map((badge, index) => {
                    const IconComponent = badge.icon
                    const isViolet = badge.color === 'violet'
                    
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isViolet ? 'bg-violet-100' : 'bg-orange-100'
                        }`}>
                          <IconComponent className={`w-3.5 h-3.5 ${
                            isViolet ? 'text-violet-600' : 'text-orange-600'
                          }`} />
                        </div>
                        <span className="text-sm font-medium">{badge.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Columna derecha - Formulario */}
              <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</p>
                      <p className="text-gray-600 mb-6">Te responderemos en menos de 24h laborables.</p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ nombre: "", email: "", telefono: "", tipoConsulta: "repuesto", mensaje: "", acepta: false })
                          setUploadedFiles([])
                        }}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Header del formulario */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">Escríbenos y te respondemos lo antes posible</p>
                          <p className="text-sm text-gray-500">Normalmente respondemos en menos de 24h laborables.</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre */}
                        <div>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="Nombre:"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="Email:"
                          />
                        </div>

                        {/* Teléfono */}
                        <div>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                            placeholder="Teléfono (opcional, para una respuesta más rápida):"
                          />
                        </div>

                        {/* Tipo de consulta - Dropdowns */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <select
                              name="tipoConsulta"
                              value={formData.tipoConsulta}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-700 appearance-none cursor-pointer pr-10 text-sm"
                            >
                              <option value="repuesto">Repuesto / compatibilidad</option>
                              <option value="reparacion">Reparación</option>
                              <option value="pedido">Pedido / envío</option>
                              <option value="zonaPro">Zona PRO</option>
                              <option value="otro">Otro</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-700 appearance-none cursor-pointer pr-10 text-sm"
                            >
                              <option value="">Otro</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* File Upload */}
                        <div>
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
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
                            
                            <Upload className={`w-7 h-7 mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
                            <p className="text-sm text-gray-600">
                              Adjunta tu archivos y peticiones para <span className="font-medium text-orange-600">busqueda reparemos</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">.jpg, .png, .JPG, PNG, MP4</p>
                          </div>

                          {/* Preview de archivos */}
                          {uploadedFiles.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {uploadedFiles.map((file) => (
                                <div key={file.id} className="relative group w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                                  {file.type === 'image' ? (
                                    <img src={file.preview} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-700">
                                      <Film className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-2.5 h-2.5 text-white" />
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
                            Al enviar aceptas la{" "}
                            <Link href="/privacidad" className="text-orange-600 hover:underline">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/25"
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
                  <a href="tel:+34912345678" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex-1">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="font-semibold text-gray-900">912 345 678</p>
                    </div>
                  </a>
                  
                  <a href="mailto:info@uniclima.es" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all flex-1">
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
