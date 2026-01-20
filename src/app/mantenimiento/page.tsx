"use client";

/**
 * Página de MANTENIMIENTO PREVENTIVO - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Settings, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  Calendar,
  AlertTriangle,
  Sparkles,
  Euro,
  Flame,
  Wind,
  Thermometer,
  FileCheck,
  BadgeCheck,
  RefreshCw,
  Zap,
  Heart
} from "lucide-react";

const planesMantenimiento = [
  {
    nombre: "Esencial",
    precio: 90,
    periodo: "año",
    descripcion: "Mantenimiento básico anual",
    color: "from-slate-500 to-slate-600",
    popular: false,
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión", incluido: false },
      { texto: "Asistencia técnica incluida", incluido: false }
    ]
  },
  {
    nombre: "Confort",
    precio: 120,
    periodo: "año",
    descripcion: "Preventivo + reparaciones prioritarias",
    color: "from-orange-500 to-orange-600",
    popular: true,
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "Asistencia técnica incluida", incluido: true }
    ]
  },
  {
    nombre: "Premium",
    precio: 140,
    periodo: "año",
    descripcion: "Cobertura completa + verano",
    color: "from-indigo-500 to-indigo-600",
    popular: false,
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "2 horas asistencia técnica", incluido: true }
    ]
  }
];

const beneficios = [
  {
    icono: Shield,
    titulo: "Evita averías",
    descripcion: "El 80% de las averías se pueden prevenir con un mantenimiento adecuado"
  },
  {
    icono: Euro,
    titulo: "Ahorra dinero",
    descripcion: "Reduce el consumo hasta un 15% y evita costosas reparaciones"
  },
  {
    icono: Clock,
    titulo: "Mayor vida útil",
    descripcion: "Prolonga la vida de tu equipo hasta 5 años más"
  },
  {
    icono: FileCheck,
    titulo: "Cumple normativa",
    descripcion: "Mantén tu instalación conforme a la normativa vigente"
  }
];

const queIncluye = [
  {
    titulo: "Revisión completa",
    items: ["Inspección visual", "Limpieza de componentes", "Verificación de conexiones", "Test de funcionamiento"]
  },
  {
    titulo: "Control de seguridad",
    items: ["Análisis de combustión", "Detección de fugas", "Verificación de presiones", "Test de seguridades"]
  },
  {
    titulo: "Optimización",
    items: ["Ajuste de parámetros", "Calibración de sensores", "Optimización de rendimiento", "Informe técnico"]
  }
];

const equiposMantenimiento = [
  { nombre: "Calderas de gas", icono: Flame, color: "bg-orange-500" },
  { nombre: "Calderas de condensación", icono: Thermometer, color: "bg-red-500" },
  { nombre: "Aires acondicionados", icono: Wind, color: "bg-blue-500" },
  { nombre: "Sistemas de aerotermia", icono: RefreshCw, color: "bg-green-500" }
];

export default function MantenimientoPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 py-16 sm:py-20 lg:py-28">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Efectos de luz */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                  <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="font-semibold">Servicio Preventivo</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Mantenimiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Preventivo</span>
                </h1>

                <p className="text-lg sm:text-xl text-green-100 mb-8">
                  Mantén tu caldera y aire acondicionado en perfecto estado. 
                  <span className="text-yellow-300 font-semibold"> Evita averías y ahorra hasta un 15%</span> en tu factura energética.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">80%</div>
                    <div className="text-green-200 text-sm">Averías evitables</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">15%</div>
                    <div className="text-green-200 text-sm">Ahorro energético</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-white">+5</div>
                    <div className="text-green-200 text-sm">Años vida útil</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    href="/contrato-mantenimiento"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Contratar ahora</span>
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
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 mb-4">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Beneficios</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Por qué hacer mantenimiento?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Un mantenimiento regular es la mejor inversión para tu sistema de climatización
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icono;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{beneficio.titulo}</h3>
                    <p className="text-gray-600 text-sm">{beneficio.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Planes de mantenimiento */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Planes de mantenimiento</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {planesMantenimiento.map((plan, index) => (
                <div 
                  key={index}
                  onClick={() => setPlanSeleccionado(index)}
                  className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    plan.popular 
                      ? 'bg-white shadow-xl scale-105 border-2 border-orange-500' 
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-sm font-bold">
                        ⭐ POPULAR
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${plan.color}`}>
                    <Settings className="w-6 h-6 text-white" />
                  </div>

                  <h3 className={`font-bold text-xl mb-1 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>
                    {plan.nombre}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                    {plan.descripcion}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-black ${plan.popular ? 'text-orange-600' : 'text-white'}`}>
                      €{plan.precio}
                    </span>
                    <span className={plan.popular ? 'text-gray-500' : 'text-gray-400'}>/{plan.periodo}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.caracteristicas.map((caract, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {caract.incluido ? (
                          <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-green-500' : 'text-green-400'}`} />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={`text-sm ${
                          plan.popular 
                            ? caract.incluido ? 'text-gray-700' : 'text-gray-400' 
                            : caract.incluido ? 'text-gray-200' : 'text-gray-500'
                        }`}>
                          {caract.texto}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contrato-mantenimiento"
                    className={`block w-full py-3 rounded-xl font-semibold text-center transition-colors ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Contratar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Qué incluye el mantenimiento?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Una revisión completa y profesional de tu sistema
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {queIncluye.map((seccion, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {seccion.titulo}
                  </h3>
                  <ul className="space-y-2">
                    {seccion.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipos que mantenemos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Equipos que mantenemos</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {equiposMantenimiento.map((equipo, index) => {
                const Icon = equipo.icono;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className={`w-12 h-12 ${equipo.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">{equipo.nombre}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Alerta */}
        <section className="py-12 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">¿Sabías que...?</h3>
                <p className="text-amber-100">
                  La normativa RITE obliga a realizar un mantenimiento anual en instalaciones térmicas. 
                  Evita sanciones y mantén tu instalación en regla.
                </p>
              </div>
              <Link 
                href="/contacto"
                className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Más información
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Protege tu inversión
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Contrata tu plan de mantenimiento y olvídate de preocupaciones. 
              Nosotros nos encargamos de todo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contrato-mantenimiento"
                className="flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Contratar mantenimiento</span>
              </Link>
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
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
