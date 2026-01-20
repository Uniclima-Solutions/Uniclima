"use client";

/**
 * Página de ASISTENCIA TÉCNICA - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Headphones, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  Zap,
  MapPin,
  Wrench,
  AlertCircle,
  PhoneCall,
  Calendar,
  Users,
  Award,
  ThumbsUp,
  Timer,
  Truck,
  BadgeCheck
} from "lucide-react";

const serviciosAsistencia = [
  {
    icono: Zap,
    titulo: "Urgencias 24h",
    descripcion: "Servicio de emergencias disponible las 24 horas del día, los 365 días del año",
    tiempo: "Respuesta < 2h",
    color: "from-red-500 to-red-600"
  },
  {
    icono: Wrench,
    titulo: "Reparaciones",
    descripcion: "Reparación de calderas, aires acondicionados y sistemas de climatización",
    tiempo: "Cita en 24-48h",
    color: "from-orange-500 to-orange-600"
  },
  {
    icono: Headphones,
    titulo: "Soporte telefónico",
    descripcion: "Asesoramiento técnico por teléfono para resolver dudas y pequeños problemas",
    tiempo: "Inmediato",
    color: "from-blue-500 to-blue-600"
  },
  {
    icono: Calendar,
    titulo: "Visitas programadas",
    descripcion: "Agenda una visita técnica en el día y hora que mejor te convenga",
    tiempo: "Tú eliges",
    color: "from-green-500 to-green-600"
  }
];

const porQueElegirnos = [
  {
    icono: Timer,
    titulo: "Rapidez",
    descripcion: "Tiempo medio de respuesta de 2 horas en urgencias"
  },
  {
    icono: BadgeCheck,
    titulo: "Profesionalidad",
    descripcion: "Técnicos certificados con más de 10 años de experiencia"
  },
  {
    icono: Shield,
    titulo: "Garantía",
    descripcion: "Todas nuestras reparaciones incluyen garantía de 6 meses"
  },
  {
    icono: ThumbsUp,
    titulo: "Satisfacción",
    descripcion: "98% de clientes satisfechos nos recomiendan"
  }
];

const averiasComunes = [
  { nombre: "Caldera no enciende", tiempo: "1-2h" },
  { nombre: "No sale agua caliente", tiempo: "1-2h" },
  { nombre: "Caldera pierde presión", tiempo: "1h" },
  { nombre: "Error en display", tiempo: "1-3h" },
  { nombre: "Aire no enfría", tiempo: "1-2h" },
  { nombre: "Ruidos extraños", tiempo: "1h" },
  { nombre: "Fugas de agua", tiempo: "1-2h" },
  { nombre: "Problemas de encendido", tiempo: "1-2h" }
];

const zonasCoberturaUrgencias = [
  "Madrid Centro", "Salamanca", "Chamberí", "Retiro", "Chamartín",
  "Pozuelo", "Las Rozas", "Majadahonda", "Torrejón de Ardoz", "Alcalá de Henares"
];

export default function AsistenciaTecnicaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [llamadaActiva, setLlamadaActiva] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 py-16 sm:py-20 lg:py-28">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Efectos de luz */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6 animate-pulse">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Servicio de Urgencias 24h</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Asistencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Técnica</span>
                </h1>

                <p className="text-lg sm:text-xl text-red-100 mb-8">
                  ¿Problemas con tu caldera o aire acondicionado? 
                  <span className="text-yellow-300 font-semibold"> Estamos disponibles 24/7</span> para ayudarte.
                </p>

                {/* Teléfono destacado */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                  <p className="text-red-200 text-sm mb-2">Llámanos ahora:</p>
                  <a 
                    href="tel:912345678"
                    className="flex items-center gap-3 text-3xl sm:text-4xl font-black text-white hover:text-yellow-300 transition-colors"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${llamadaActiva ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}>
                      <PhoneCall className="w-7 h-7 text-white" />
                    </div>
                    <span>912 345 678</span>
                  </a>
                  <p className="text-red-200 text-sm mt-2">Atención 24 horas · 365 días</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-black text-white">&lt;2h</div>
                    <div className="text-red-200 text-xs">Tiempo respuesta</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-black text-white">24/7</div>
                    <div className="text-red-200 text-xs">Disponibilidad</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-black text-white">98%</div>
                    <div className="text-red-200 text-xs">Satisfacción</div>
                  </div>
                </div>
              </div>

              {/* Formulario rápido */}
              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Necesitas ayuda urgente?</h2>
                  <p className="text-gray-600 mb-6">Déjanos tus datos y te llamamos en menos de 5 minutos</p>
                  
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Tu teléfono"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-500">
                        <option>Tipo de avería</option>
                        <option>Caldera no enciende</option>
                        <option>No sale agua caliente</option>
                        <option>Aire no enfría</option>
                        <option>Fugas de agua</option>
                        <option>Otra avería</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/25"
                    >
                      <PhoneCall className="w-5 h-5" />
                      <span>Solicitar llamada urgente</span>
                    </button>
                  </form>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    Sin compromiso · Presupuesto gratuito
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios de asistencia */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestros servicios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ofrecemos diferentes tipos de asistencia según tus necesidades
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviciosAsistencia.map((servicio, index) => {
                const Icon = servicio.icono;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${servicio.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{servicio.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-4">{servicio.descripcion}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 font-semibold">{servicio.tiempo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿Por qué elegirnos?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Más de 15 años ofreciendo el mejor servicio técnico de Madrid
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {porQueElegirnos.map((item, index) => {
                const Icon = item.icono;
                return (
                  <div 
                    key={index}
                    className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.titulo}</h3>
                    <p className="text-gray-400 text-sm">{item.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Averías comunes */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Averías que solucionamos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Estos son algunos de los problemas más comunes que resolvemos a diario
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {averiasComunes.map((averia, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900">{averia.nombre}</span>
                  </div>
                  <span className="text-sm text-red-600 font-semibold">{averia.tiempo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zonas de cobertura urgencias */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Cobertura urgencias</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Zonas con servicio 24h</h2>
              <p className="text-gray-600">Servicio de urgencias disponible en estas zonas</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {zonasCoberturaUrgencias.map((zona, index) => (
                <div 
                  key={zona}
                  className="px-5 py-2.5 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all cursor-pointer"
                >
                  <span className="font-medium text-gray-700">{zona}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 mt-6">
              ¿No ves tu zona? <Link href="/contacto" className="text-red-600 font-semibold hover:underline">Consúltanos</Link>, probablemente también la cubrimos.
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-rose-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white mb-6 animate-pulse">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">¿Tienes una urgencia?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              No te quedes sin calefacción
            </h2>
            <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
              Llámanos ahora y un técnico estará en tu domicilio en menos de 2 horas.
              Servicio disponible 24 horas, 365 días al año.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <PhoneCall className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar mensaje</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
