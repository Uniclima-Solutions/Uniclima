"use client";

/**
 * Página de INSTALACIÓN PROFESIONAL - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Wrench, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  Award,
  Users,
  MapPin,
  Thermometer,
  Wind,
  Flame,
  Sun,
  BadgeCheck,
  FileCheck,
  Sparkles,
  Calendar,
  Euro
} from "lucide-react";

const serviciosInstalacion = [
  {
    icono: Flame,
    titulo: "Calderas",
    descripcion: "Instalación de calderas de gas, condensación y biomasa con certificación oficial",
    precio: "Desde 250€",
    color: "from-orange-500 to-red-500"
  },
  {
    icono: Wind,
    titulo: "Aire Acondicionado",
    descripcion: "Instalación de splits, multisplits y sistemas de climatización centralizada",
    precio: "Desde 180€",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icono: Thermometer,
    titulo: "Aerotermia",
    descripcion: "Sistemas de aerotermia para calefacción, refrigeración y ACS",
    precio: "Desde 500€",
    color: "from-green-500 to-emerald-500"
  },
  {
    icono: Sun,
    titulo: "Placas Solares",
    descripcion: "Instalación de sistemas fotovoltaicos para autoconsumo",
    precio: "Desde 800€",
    color: "from-yellow-500 to-orange-500"
  }
];

const garantias = [
  {
    icono: BadgeCheck,
    titulo: "Técnicos certificados",
    descripcion: "Todos nuestros instaladores tienen certificación oficial y más de 10 años de experiencia"
  },
  {
    icono: FileCheck,
    titulo: "Documentación completa",
    descripcion: "Te entregamos toda la documentación: certificados, garantías y manuales"
  },
  {
    icono: Shield,
    titulo: "Garantía de 2 años",
    descripcion: "Todas nuestras instalaciones incluyen 2 años de garantía en mano de obra"
  },
  {
    icono: Clock,
    titulo: "Servicio post-venta",
    descripcion: "Atención prioritaria y descuentos en mantenimiento para nuestros clientes"
  }
];

const zonas = [
  "Madrid Centro", "Salamanca", "Chamberí", "Retiro", "Chamartín", "Moncloa",
  "Pozuelo", "Las Rozas", "Majadahonda", "Torrejón", "Alcalá", "Coslada"
];

const procesoInstalacion = [
  {
    paso: 1,
    titulo: "Solicita presupuesto",
    descripcion: "Cuéntanos qué necesitas y te enviamos presupuesto sin compromiso"
  },
  {
    paso: 2,
    titulo: "Visita técnica",
    descripcion: "Un técnico visitará tu domicilio para evaluar la instalación"
  },
  {
    paso: 3,
    titulo: "Instalación profesional",
    descripcion: "Realizamos la instalación con los más altos estándares de calidad"
  },
  {
    paso: 4,
    titulo: "Puesta en marcha",
    descripcion: "Verificamos el correcto funcionamiento y te explicamos el uso"
  }
];

export default function InstalacionPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [servicioActivo, setServicioActivo] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 lg:py-28">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Efectos de luz */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                  <Wrench className="w-5 h-5" />
                  <span className="font-semibold">Instaladores Certificados</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Instalación <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Profesional</span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  Instalamos calderas, aire acondicionado, aerotermia y placas solares con <span className="text-orange-400 font-semibold">garantía de 2 años</span> y certificación oficial.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">+3.000</div>
                    <div className="text-blue-200 text-sm">Instalaciones</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
                    <div className="text-blue-200 text-sm">Años experiencia</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">4.9</div>
                    <div className="text-blue-200 text-sm">Valoración</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contacto"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Solicitar presupuesto</span>
                  </Link>
                  <a 
                    href="tel:912345678"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm"
                  >
                    <Phone className="w-5 h-5" />
                    <span>912 345 678</span>
                  </a>
                </div>
              </div>

              {/* Tarjetas de servicios */}
              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="grid grid-cols-2 gap-4">
                  {serviciosInstalacion.map((servicio, index) => {
                    const Icon = servicio.icono;
                    return (
                      <div 
                        key={index}
                        onClick={() => setServicioActivo(index)}
                        className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                          servicioActivo === index 
                            ? 'bg-white shadow-xl scale-105' 
                            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-r ${servicio.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`font-bold mb-1 ${servicioActivo === index ? 'text-gray-900' : 'text-white'}`}>
                          {servicio.titulo}
                        </h3>
                        <p className={`text-sm ${servicioActivo === index ? 'text-orange-600 font-semibold' : 'text-blue-200'}`}>
                          {servicio.precio}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </section>

        {/* Servicios detallados */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Nuestros servicios</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Qué instalamos?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ofrecemos instalación profesional de todos los sistemas de climatización y energía
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviciosInstalacion.map((servicio, index) => {
                const Icon = servicio.icono;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${servicio.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">{servicio.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-4">{servicio.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold">{servicio.precio}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Proceso de instalación */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Proceso de instalación</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Un proceso sencillo y transparente de principio a fin
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {procesoInstalacion.map((item, index) => (
                <div key={index} className="relative">
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      {item.paso}
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.titulo}</h3>
                    <p className="text-gray-400 text-sm">{item.descripcion}</p>
                  </div>
                  {index < procesoInstalacion.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-orange-500/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Garantías */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestras garantías</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trabajamos con los más altos estándares de calidad y profesionalidad
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {garantias.map((garantia, index) => {
                const Icon = garantia.icono;
                return (
                  <div 
                    key={index}
                    className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{garantia.titulo}</h3>
                    <p className="text-gray-600 text-sm">{garantia.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Zonas de cobertura */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Cobertura</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Zonas de servicio</h2>
              <p className="text-gray-600">Cubrimos Madrid y toda la Comunidad de Madrid</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {zonas.map((zona, index) => (
                <div 
                  key={zona}
                  className="px-5 py-2.5 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
                >
                  <span className="font-medium text-gray-700">{zona}</span>
                </div>
              ))}
              <div className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md text-white font-medium">
                + Toda la Comunidad
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Necesitas una instalación?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Solicita presupuesto sin compromiso. Te respondemos en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Solicitar presupuesto gratis</span>
              </Link>
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar ahora</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
