"use client";

/**
 * PÁGINA PREMIUM: Zona Profesionales
 * Portal exclusivo para instaladores y técnicos de climatización
 * Diseño UI/UX premium con acceso a beneficios especiales
 */

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Wrench,
  Truck,
  Shield,
  BadgePercent,
  ArrowRight,
  Phone,
  CheckCircle,
  Users,
  FileText,
  Clock,
  CreditCard,
  Package,
  Award,
  Headphones,
  BookOpen,
  Download,
  Building2,
  UserCheck,
  Star
} from "lucide-react";

// Beneficios para profesionales
const beneficios = [
  {
    icono: BadgePercent,
    titulo: "Descuentos exclusivos",
    descripcion: "Hasta 30% de descuento en todos los productos según volumen de compra",
    color: "orange"
  },
  {
    icono: CreditCard,
    titulo: "Pago a 30 días",
    descripcion: "Línea de crédito sin intereses para profesionales verificados",
    color: "blue"
  },
  {
    icono: Truck,
    titulo: "Envío prioritario",
    descripcion: "Entregas en 24h sin coste adicional en pedidos +50€",
    color: "green"
  },
  {
    icono: Headphones,
    titulo: "Soporte técnico VIP",
    descripcion: "Línea directa con técnicos especializados sin esperas",
    color: "purple"
  },
  {
    icono: FileText,
    titulo: "Facturación simplificada",
    descripcion: "Facturas automáticas, albaranes y gestión de pedidos online",
    color: "indigo"
  },
  {
    icono: BookOpen,
    titulo: "Formación gratuita",
    descripcion: "Acceso a cursos y webinars sobre nuevas tecnologías",
    color: "pink"
  }
];

// Niveles de descuento
const nivelesDescuento = [
  { nivel: "Bronce", compraMinima: "0€", descuento: "10%", color: "amber-600" },
  { nivel: "Plata", compraMinima: "500€/mes", descuento: "15%", color: "gray-400" },
  { nivel: "Oro", compraMinima: "1.500€/mes", descuento: "20%", color: "yellow-500" },
  { nivel: "Platino", compraMinima: "3.000€/mes", descuento: "30%", color: "gray-300" }
];

// Testimonios de profesionales
const testimonios = [
  {
    nombre: "Carlos Martínez",
    empresa: "Instalaciones CMR",
    texto: "Desde que trabajo con Uniclima, mis clientes reciben los repuestos en 24h. El soporte técnico es excepcional.",
    rating: 5
  },
  {
    nombre: "María García",
    empresa: "Climatización MG",
    texto: "Los descuentos profesionales me permiten ser más competitivo. El pago a 30 días es fundamental para mi negocio.",
    rating: 5
  },
  {
    nombre: "Antonio López",
    empresa: "Servicio Técnico AL",
    texto: "La formación que ofrecen me ha ayudado a especializarme en calderas de condensación. Muy recomendable.",
    rating: 5
  }
];

export default function ZonaProfesionales() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    cif: "",
    email: "",
    telefono: "",
    especialidad: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    alert("Solicitud enviada. Te contactaremos en 24-48h.");
  };

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <nav className="flex items-center gap-2 text-gray-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Zona Profesionales</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="lg:max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Exclusivo</span>
                    <h1 className="text-3xl lg:text-4xl font-black">
                      Zona Profesionales
                    </h1>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Únete a la red de más de 2.500 instaladores y técnicos que confían en Uniclima. 
                  Accede a precios exclusivos, soporte prioritario y herramientas para hacer crecer tu negocio.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a href="#registro" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                    Solicitar acceso
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="tel:+34912345678" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl font-black text-orange-400">2.500+</div>
                  <div className="text-gray-400 text-sm">Profesionales activos</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl font-black text-orange-400">30%</div>
                  <div className="text-gray-400 text-sm">Descuento máximo</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl font-black text-orange-400">24h</div>
                  <div className="text-gray-400 text-sm">Entrega garantizada</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl font-black text-orange-400">30 días</div>
                  <div className="text-gray-400 text-sm">Pago aplazado</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Ventajas exclusivas</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Como profesional verificado, accedes a beneficios diseñados para impulsar tu negocio
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icono;
                const colorClasses: Record<string, string> = {
                  orange: "bg-orange-100 text-orange-600",
                  blue: "bg-blue-100 text-blue-600",
                  green: "bg-green-100 text-green-600",
                  purple: "bg-purple-100 text-purple-600",
                  indigo: "bg-indigo-100 text-indigo-600",
                  pink: "bg-pink-100 text-pink-600"
                };
                
                return (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[beneficio.color]} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{beneficio.titulo}</h3>
                    <p className="text-gray-500 text-sm">{beneficio.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Niveles de descuento */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Programa de fidelidad</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Cuanto más compras, más ahorras. Sube de nivel automáticamente según tu volumen mensual.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nivelesDescuento.map((nivel, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                    index === 3 ? 'border-orange-300 ring-2 ring-orange-100' : 'border-gray-100'
                  }`}
                >
                  {index === 3 && (
                    <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-3">
                      Mejor valor
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <Award className={`w-8 h-8 text-${nivel.color}`} />
                    <h3 className="font-bold text-gray-900 text-xl">{nivel.nivel}</h3>
                  </div>
                  <div className="text-4xl font-black text-orange-500 mb-2">{nivel.descuento}</div>
                  <p className="text-sm text-gray-500">de descuento</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Compra mínima mensual</p>
                    <p className="font-semibold text-gray-700">{nivel.compraMinima}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Servicios adicionales */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-white lg:max-w-xl">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    Colabora con nosotros en contratos de mantenimiento
                  </h2>
                  <p className="text-orange-100 mb-6">
                    Ofrece a tus clientes nuestros contratos de mantenimiento y gana una comisión del 15% 
                    por cada contrato cerrado. Nosotros nos encargamos de todo.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-orange-200" />
                      Comisión del 15% por contrato
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-orange-200" />
                      Materiales de venta personalizados
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-orange-200" />
                      Formación comercial incluida
                    </li>
                  </ul>
                  <Link 
                    href="/contrato-mantenimiento"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    Ver contratos disponibles
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonios */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Lo que dicen nuestros profesionales</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonios.map((testimonio, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonio.texto}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonio.nombre}</p>
                      <p className="text-sm text-gray-500">{testimonio.empresa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Formulario de registro */}
        <section id="registro" className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Solicita tu acceso profesional</h2>
              <p className="text-gray-500">
                Completa el formulario y te contactaremos en 24-48h para verificar tu cuenta
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CIF/NIF *</label>
                  <input
                    type="text"
                    required
                    value={formData.cif}
                    onChange={(e) => setFormData({...formData, cif: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="B12345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                  <select
                    value={formData.especialidad}
                    onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                  >
                    <option value="">Selecciona...</option>
                    <option value="calderas">Calderas</option>
                    <option value="aire">Aire Acondicionado</option>
                    <option value="ambos">Calderas y Aire</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="612 345 678"
                  />
                </div>
              </div>
              
              <div className="flex items-start gap-2 mb-6">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm text-gray-500">
                  Acepto la <Link href="/privacidad" className="text-orange-600 hover:underline">política de privacidad</Link> y 
                  los <Link href="/terminos" className="text-orange-600 hover:underline">términos y condiciones</Link>
                </span>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Solicitar acceso profesional
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>
        
        {/* Contacto */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                ¿Tienes dudas? Hablemos
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Nuestro equipo comercial está disponible para resolver todas tus preguntas sobre el programa de profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+34912345678"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  912 345 678
                </a>
                <a 
                  href="mailto:profesionales@uniclima.es"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
                >
                  profesionales@uniclima.es
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
