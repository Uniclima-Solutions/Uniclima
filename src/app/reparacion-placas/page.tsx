"use client";

/**
 * Página de REPARACIÓN DE PLACAS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Cpu, 
  Wrench, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Euro,
  Phone,
  MessageCircle,
  Star,
  Award,
  Truck,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Play,
  BadgeCheck
} from "lucide-react";

const pasos = [
  {
    numero: 1,
    titulo: "Envía tu placa",
    descripcion: "Envíanos tu placa electrónica averiada. Te proporcionamos etiqueta de envío gratuita.",
    icono: Truck,
    color: "from-blue-500 to-blue-600"
  },
  {
    numero: 2,
    titulo: "Diagnóstico gratuito",
    descripcion: "Nuestros técnicos analizan la avería y te enviamos presupuesto sin compromiso en 24-48h.",
    icono: Cpu,
    color: "from-purple-500 to-purple-600"
  },
  {
    numero: 3,
    titulo: "Reparación profesional",
    descripcion: "Si aceptas, reparamos tu placa con componentes originales y la más alta calidad.",
    icono: Wrench,
    color: "from-orange-500 to-orange-600"
  },
  {
    numero: 4,
    titulo: "Devolución express",
    descripcion: "Te devolvemos tu placa reparada en 24-48h con 1 año de garantía incluida.",
    icono: RefreshCw,
    color: "from-green-500 to-green-600"
  }
];

const ventajas = [
  {
    icono: Euro,
    titulo: "Ahorra hasta 70%",
    descripcion: "Reparar tu placa cuesta una fracción del precio de una nueva"
  },
  {
    icono: Shield,
    titulo: "1 año de garantía",
    descripcion: "Todas nuestras reparaciones incluyen garantía completa"
  },
  {
    icono: Clock,
    titulo: "Entrega en 48h",
    descripcion: "Servicio express para que no te quedes sin calefacción"
  },
  {
    icono: BadgeCheck,
    titulo: "Técnicos certificados",
    descripcion: "Más de 15 años de experiencia en electrónica HVAC"
  }
];

const marcasReparamos = [
  "Vaillant", "Junkers", "Baxi", "Ferroli", "Ariston", "Viessmann",
  "Beretta", "Chaffoteaux", "Cointra", "Bosch", "Saunier Duval", "Wolf"
];

const testimonios = [
  {
    nombre: "Carlos M.",
    texto: "Me ahorraron más de 400€ reparando la placa de mi caldera Vaillant. Servicio impecable.",
    estrellas: 5,
    ahorro: "420€"
  },
  {
    nombre: "María L.",
    texto: "Pensaba que tenía que cambiar la caldera entera. Repararon la placa y funciona perfecta.",
    estrellas: 5,
    ahorro: "350€"
  },
  {
    nombre: "Antonio G.",
    texto: "Rapidísimos. Envié la placa el lunes y el jueves ya la tenía funcionando. Muy recomendable.",
    estrellas: 5,
    ahorro: "280€"
  }
];

export default function ReparacionPlacasPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pasos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 lg:py-28">
          {/* Patrón de circuitos */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23fff' stroke-width='1'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%23fff'/%3E%3Ccircle cx='90' cy='10' r='3' fill='%23fff'/%3E%3Ccircle cx='10' cy='90' r='3' fill='%23fff'/%3E%3Ccircle cx='90' cy='90' r='3' fill='%23fff'/%3E%3Cpath d='M50 10v30M10 50h30M50 90V60M90 50H60' stroke='%23fff' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23fff'/%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Efectos de luz */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 mb-6">
                  <Cpu className="w-5 h-5" />
                  <span className="font-semibold">Servicio Técnico Especializado</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Reparación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Placas Electrónicas</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                  No cambies tu caldera. Reparamos la placa electrónica y <span className="text-orange-400 font-semibold">ahorras hasta un 70%</span> respecto a comprar una nueva.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-orange-400">+5.000</div>
                    <div className="text-gray-400 text-sm">Placas reparadas</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-orange-400">98%</div>
                    <div className="text-gray-400 text-sm">Tasa de éxito</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-black text-orange-400">48h</div>
                    <div className="text-gray-400 text-sm">Tiempo medio</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contacto"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25"
                  >
                    <Wrench className="w-5 h-5" />
                    <span>Solicitar reparación</span>
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

              {/* Ilustración animada */}
              <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Círculo de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full animate-pulse" />
                  
                  {/* Placa central */}
                  <div className="absolute inset-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl shadow-2xl flex items-center justify-center border border-slate-600">
                    <div className="relative">
                      <Cpu className="w-32 h-32 text-orange-500" />
                      {/* Pulsos de energía */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 border-2 border-orange-500/50 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>

                  {/* Iconos orbitando */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Proceso sencillo</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                En solo 4 pasos tendrás tu placa electrónica reparada y funcionando como nueva
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pasos.map((paso, index) => {
                const Icon = paso.icono;
                const isActive = index === activeStep;
                return (
                  <div 
                    key={paso.numero}
                    className={`relative p-6 rounded-2xl transition-all duration-500 ${
                      isActive 
                        ? 'bg-white shadow-xl shadow-orange-500/10 scale-105 border-2 border-orange-500' 
                        : 'bg-white shadow-lg border border-gray-100 hover:shadow-xl'
                    }`}
                  >
                    {/* Número */}
                    <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-r ${paso.color}`}>
                      {paso.numero}
                    </div>

                    {/* Icono */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${paso.color}`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600 text-sm">{paso.descripcion}</p>

                    {/* Línea conectora */}
                    {index < pasos.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿Por qué reparar con nosotros?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Somos especialistas en electrónica de calderas y climatización
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ventajas.map((ventaja, index) => {
                const Icon = ventaja.icono;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{ventaja.titulo}</h3>
                    <p className="text-gray-400 text-sm">{ventaja.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marcas que reparamos */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Marcas que reparamos</h2>
              <p className="text-gray-600">Especialistas en todas las marcas principales del mercado</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {marcasReparamos.map((marca, index) => (
                <div 
                  key={marca}
                  className="px-6 py-3 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="font-semibold text-gray-700">{marca}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {testimonios.map((testimonio, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonio.estrellas)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonio.texto}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{testimonio.nombre}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Ahorró {testimonio.ahorro}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Tu caldera muestra error en la placa?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              No compres una placa nueva. Envíanos la tuya y te la reparamos con garantía.
              Diagnóstico gratuito y sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Solicitar diagnóstico gratis</span>
              </Link>
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
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
