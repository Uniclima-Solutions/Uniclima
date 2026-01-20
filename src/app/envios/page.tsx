"use client";

/**
 * Página de ENVÍOS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Truck, 
  Package, 
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Gift,
  Shield,
  Phone,
  ArrowRight,
  Zap,
  Calendar,
  Euro,
  Store
} from "lucide-react";

const zonasEnvio = [
  { zona: "Madrid Capital", tiempo: "24 horas", precio: "Gratis +100€", icono: "🏛️" },
  { zona: "Comunidad de Madrid", tiempo: "24-48 horas", precio: "Gratis +100€", icono: "🏘️" },
  { zona: "Península", tiempo: "48-72 horas", precio: "5,95€ / Gratis +100€", icono: "🇪🇸" },
  { zona: "Baleares", tiempo: "4-5 días", precio: "9,95€", icono: "🏝️" }
];

const pasos = [
  {
    numero: 1,
    titulo: "Pedido confirmado",
    descripcion: "Recibes email de confirmación con los detalles de tu pedido",
    icono: CheckCircle2
  },
  {
    numero: 2,
    titulo: "Preparación",
    descripcion: "Preparamos tu pedido con cuidado en nuestro almacén",
    icono: Package
  },
  {
    numero: 3,
    titulo: "En camino",
    descripcion: "El transportista recoge tu pedido y te enviamos el tracking",
    icono: Truck
  },
  {
    numero: 4,
    titulo: "Entrega",
    descripcion: "Recibes tu pedido en la dirección indicada",
    icono: Gift
  }
];

const transportistas = [
  { nombre: "SEUR", logo: "SEUR", descripcion: "Envíos express península" },
  { nombre: "MRW", logo: "MRW", descripcion: "Entregas urgentes Madrid" },
  { nombre: "GLS", logo: "GLS", descripcion: "Envíos estándar" }
];

const faqs = [
  {
    pregunta: "¿Puedo cambiar la dirección de envío?",
    respuesta: "Sí, puedes cambiar la dirección siempre que el pedido no haya sido enviado. Contacta con nosotros lo antes posible."
  },
  {
    pregunta: "¿Qué pasa si no estoy en casa?",
    respuesta: "El transportista intentará la entrega hasta 3 veces. También puedes indicar un punto de recogida o dejar instrucciones especiales."
  },
  {
    pregunta: "¿Hacéis envíos a Canarias?",
    respuesta: "Actualmente no realizamos envíos a Canarias, Ceuta ni Melilla debido a las restricciones aduaneras."
  },
  {
    pregunta: "¿Puedo seguir mi pedido?",
    respuesta: "Sí, recibirás un email con el número de seguimiento cuando tu pedido sea enviado. También puedes consultarlo en tu cuenta."
  }
];

export default function EnviosPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 py-16 sm:py-20">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                <Truck className="w-5 h-5" />
                <span className="font-semibold">Información de envíos</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Envío <span className="text-yellow-300">GRATIS</span> a partir de 100€
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Entregamos tu pedido en toda España con los mejores transportistas y los plazos más rápidos del sector
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span>Envío en 24h Madrid</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <Shield className="w-5 h-5 text-green-300" />
                  <span>Envío asegurado</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <Package className="w-5 h-5 text-orange-300" />
                  <span>Embalaje reforzado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </section>

        {/* Zonas y tarifas */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Zonas de envío y tarifas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Consulta los plazos de entrega y costes según tu ubicación
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {zonasEnvio.map((zona, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{zona.icono}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{zona.zona}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{zona.tiempo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">{zona.precio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Aviso */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Nota:</strong> Actualmente no realizamos envíos a Canarias, Ceuta ni Melilla. 
                Los plazos indicados son para días laborables y pueden variar en periodos de alta demanda.
              </p>
            </div>
          </div>
        </section>

        {/* Proceso de envío */}
        <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">¿Cómo funciona el envío?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Seguimos un proceso sencillo para que recibas tu pedido lo antes posible
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pasos.map((paso, index) => {
                const Icon = paso.icono;
                return (
                  <div key={index} className="relative">
                    {/* Línea conectora */}
                    {index < pasos.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-orange-500/30" />
                    )}
                    
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {paso.numero}
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">{paso.titulo}</h3>
                      <p className="text-gray-400 text-sm">{paso.descripcion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recogida en tienda */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 mb-4">
                  <Store className="w-5 h-5" />
                  <span className="font-semibold">Alternativa gratuita</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Recogida en tienda <span className="text-green-600">GRATIS</span>
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Si prefieres recoger tu pedido en persona, puedes hacerlo en nuestra tienda de Madrid 
                  sin ningún coste adicional. Te avisaremos cuando esté listo.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Sin gastos de envío</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Pedido listo en 2-4 horas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Asesoramiento personalizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Comprueba el producto antes de llevártelo</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Uniclima Madrid</p>
                      <p className="text-gray-600 text-sm">Calle Ejemplo 123, 28001 Madrid</p>
                      <p className="text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4 inline mr-1" />
                        L-V: 9:00-18:00 | S: 10:00-14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ventajas de la recogida en tienda</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Euro className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">100% Gratis</h4>
                      <p className="text-green-100 text-sm">Sin importar el importe de tu pedido</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Más rápido</h4>
                      <p className="text-green-100 text-sm">Recoge tu pedido el mismo día</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Sin riesgos</h4>
                      <p className="text-green-100 text-sm">Revisa el producto antes de pagar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportistas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros transportistas</h2>
              <p className="text-gray-600">Trabajamos con las mejores empresas de mensajería</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {transportistas.map((trans, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-gray-700">{trans.logo}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{trans.nombre}</h3>
                  <p className="text-gray-500 text-sm">{trans.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas frecuentes sobre envíos</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.pregunta}</h3>
                  <p className="text-gray-600">{faq.respuesta}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/faq"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
              >
                Ver todas las preguntas frecuentes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Tienes dudas sobre tu envío?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Nuestro equipo de atención al cliente está disponible para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
              <Link 
                href="/seguimiento"
                className="flex items-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <Package className="w-5 h-5" />
                <span>Seguir mi pedido</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
