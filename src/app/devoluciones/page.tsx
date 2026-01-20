"use client";

/**
 * Página de DEVOLUCIONES - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  RotateCcw, 
  Package, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Truck,
  Euro,
  X,
  HelpCircle
} from "lucide-react";

const pasos = [
  {
    numero: 1,
    titulo: "Solicita la devolución",
    descripcion: "Contacta con nosotros en los primeros 14 días desde la recepción",
    icono: FileText
  },
  {
    numero: 2,
    titulo: "Prepara el paquete",
    descripcion: "Embala el producto en su embalaje original con todos los accesorios",
    icono: Package
  },
  {
    numero: 3,
    titulo: "Envía el producto",
    descripcion: "Te proporcionamos etiqueta de envío o recogemos en tu domicilio",
    icono: Truck
  },
  {
    numero: 4,
    titulo: "Recibe tu reembolso",
    descripcion: "Procesamos el reembolso en 3-5 días tras recibir el producto",
    icono: Euro
  }
];

const condiciones = [
  {
    permitido: true,
    texto: "Producto sin usar y en perfecto estado"
  },
  {
    permitido: true,
    texto: "Embalaje original completo"
  },
  {
    permitido: true,
    texto: "Todos los accesorios incluidos"
  },
  {
    permitido: true,
    texto: "Etiquetas y precintos intactos"
  },
  {
    permitido: false,
    texto: "Productos instalados o manipulados"
  },
  {
    permitido: false,
    texto: "Productos personalizados o a medida"
  },
  {
    permitido: false,
    texto: "Consumibles abiertos o usados"
  },
  {
    permitido: false,
    texto: "Productos sin embalaje original"
  }
];

const faqs = [
  {
    pregunta: "¿Cuánto tiempo tengo para devolver un producto?",
    respuesta: "Dispones de 14 días naturales desde la recepción del pedido para solicitar la devolución, según la Ley General para la Defensa de los Consumidores y Usuarios."
  },
  {
    pregunta: "¿Quién paga los gastos de devolución?",
    respuesta: "Los gastos de devolución corren por cuenta del cliente, excepto si el producto es defectuoso o no corresponde con lo pedido. En ese caso, Uniclima asume todos los costes."
  },
  {
    pregunta: "¿Cuándo recibiré mi reembolso?",
    respuesta: "Una vez recibido y verificado el producto en nuestro almacén, procesamos el reembolso en un plazo de 3-5 días laborables. El tiempo que tarde en reflejarse depende de tu banco."
  },
  {
    pregunta: "¿Puedo cambiar un producto por otro?",
    respuesta: "Sí, puedes solicitar un cambio por otro producto de igual o mayor valor (abonando la diferencia). Contacta con nosotros para gestionar el cambio."
  },
  {
    pregunta: "¿Qué hago si el producto llega dañado?",
    respuesta: "Si el producto llega dañado, contacta con nosotros inmediatamente (máximo 48h) y envíanos fotos del daño. Gestionaremos la recogida y el reemplazo sin coste."
  }
];

export default function DevolucionesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 py-16 sm:py-20">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                <RotateCcw className="w-5 h-5" />
                <span className="font-semibold">Política de devoluciones</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Devoluciones <span className="text-yellow-300">fáciles</span> y sin complicaciones
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto mb-8">
                Si no estás satisfecho con tu compra, tienes 14 días para devolverla. 
                Te lo ponemos fácil.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span>14 días para devolver</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <Shield className="w-5 h-5 text-green-300" />
                  <span>Reembolso garantizado</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <CheckCircle2 className="w-5 h-5 text-blue-300" />
                  <span>Proceso sencillo</span>
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

        {/* Proceso de devolución */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo devolver un producto?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sigue estos sencillos pasos para realizar tu devolución
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pasos.map((paso, index) => {
                const Icon = paso.icono;
                return (
                  <div 
                    key={index}
                    className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Línea conectora */}
                    {index < pasos.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-purple-200" />
                    )}
                    
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {paso.numero}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{paso.titulo}</h3>
                    <p className="text-gray-500 text-sm">{paso.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Condiciones */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Condiciones de devolución</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Para que podamos procesar tu devolución, el producto debe cumplir estas condiciones
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Permitido */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Se acepta la devolución si...</h3>
                </div>
                <div className="space-y-3">
                  {condiciones.filter(c => c.permitido).map((cond, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{cond.texto}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* No permitido */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No se acepta la devolución si...</h3>
                </div>
                <div className="space-y-3">
                  {condiciones.filter(c => !c.permitido).map((cond, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">{cond.texto}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aviso importante */}
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-800 mb-2">Importante</h4>
                  <p className="text-amber-700 text-sm">
                    Los productos defectuosos o que no correspondan con lo pedido pueden devolverse sin coste, 
                    incluso si han sido instalados. En estos casos, Uniclima asume todos los gastos de recogida 
                    y envío del producto de sustitución.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Información de reembolso */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 mb-4">
                  <Euro className="w-5 h-5" />
                  <span className="font-semibold">Reembolsos</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Reembolso rápido y seguro
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Una vez recibido y verificado el producto en nuestro almacén, procesamos 
                  el reembolso en un plazo de 3-5 días laborables.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pago con tarjeta</h4>
                      <p className="text-gray-600 text-sm">Reembolso a la misma tarjeta en 3-5 días</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">🅿️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PayPal</h4>
                      <p className="text-gray-600 text-sm">Reembolso a tu cuenta PayPal en 24-48h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">🏦</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transferencia</h4>
                      <p className="text-gray-600 text-sm">Reembolso a tu cuenta bancaria en 3-5 días</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">¿Qué incluye el reembolso?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Importe total del producto</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Gastos de envío originales*</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Impuestos aplicados</span>
                  </div>
                </div>
                <p className="mt-6 text-purple-200 text-sm">
                  * Los gastos de envío originales se reembolsan solo si la devolución es por 
                  producto defectuoso o error nuestro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-600 mb-4">
                <HelpCircle className="w-5 h-5" />
                <span className="font-semibold">Preguntas frecuentes</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dudas sobre devoluciones</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <button 
                    onClick={() => setFaqAbierta(faqAbierta === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.pregunta}</span>
                    <ArrowRight className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${faqAbierta === index ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${faqAbierta === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-5 pb-5 text-gray-600">
                      {faq.respuesta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas hacer una devolución?</h2>
            <p className="text-purple-100 text-lg mb-8">
              Contacta con nosotros y te guiaremos en todo el proceso
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
              <a 
                href="mailto:devoluciones@uniclima.es"
                className="flex items-center gap-2 px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <Mail className="w-5 h-5" />
                <span>devoluciones@uniclima.es</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
