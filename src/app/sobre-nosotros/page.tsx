"use client";

/**
 * Página de SOBRE NOSOTROS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, 
  Award, 
  Target, 
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Wrench,
  Zap,
  CheckCircle2,
  ArrowRight,
  Building2,
  Flame,
  Wind,
  ThermometerSun
} from "lucide-react";

const valores = [
  {
    icono: Shield,
    titulo: "Confianza",
    descripcion: "Más de 15 años generando confianza con nuestros clientes a través de un servicio honesto y transparente"
  },
  {
    icono: Award,
    titulo: "Calidad",
    descripcion: "Trabajamos solo con las mejores marcas y materiales para garantizar resultados duraderos"
  },
  {
    icono: Users,
    titulo: "Cercanía",
    descripcion: "Tratamos a cada cliente como si fuera único, porque para nosotros lo es"
  },
  {
    icono: Zap,
    titulo: "Eficiencia",
    descripcion: "Optimizamos cada proceso para ofrecer el mejor servicio en el menor tiempo posible"
  }
];

const hitos = [
  { año: "2008", titulo: "Fundación", descripcion: "Uniclima nace en Madrid con un pequeño taller de reparaciones" },
  { año: "2012", titulo: "Expansión", descripcion: "Abrimos nuestra primera tienda física y ampliamos servicios" },
  { año: "2016", titulo: "E-commerce", descripcion: "Lanzamos nuestra tienda online para llegar a toda España" },
  { año: "2020", titulo: "Innovación", descripcion: "Incorporamos aerotermia y energías renovables a nuestro catálogo" },
  { año: "2024", titulo: "Liderazgo", descripcion: "Nos consolidamos como referentes en climatización en Madrid" }
];

const equipo = [
  { nombre: "Carlos Martínez", cargo: "Director General", experiencia: "20 años" },
  { nombre: "Ana García", cargo: "Directora Comercial", experiencia: "15 años" },
  { nombre: "Miguel López", cargo: "Jefe Técnico", experiencia: "18 años" },
  { nombre: "Laura Sánchez", cargo: "Atención al Cliente", experiencia: "10 años" }
];

const cifras = [
  { numero: "15+", texto: "Años de experiencia" },
  { numero: "10.000+", texto: "Clientes satisfechos" },
  { numero: "25.000+", texto: "Instalaciones realizadas" },
  { numero: "98%", texto: "Clientes nos recomiendan" }
];

const servicios = [
  { icono: Flame, nombre: "Calderas", color: "from-orange-500 to-red-500" },
  { icono: Wind, nombre: "Aire Acondicionado", color: "from-blue-500 to-cyan-500" },
  { icono: ThermometerSun, nombre: "Aerotermia", color: "from-green-500 to-emerald-500" },
  { icono: Wrench, nombre: "Reparaciones", color: "from-purple-500 to-purple-600" }
];

export default function SobreNosotrosPage() {
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
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-16 sm:py-20 lg:py-28">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Efectos de luz */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-400 mb-6">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">Nuestra historia</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">15 años</span> cuidando tu confort
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                Somos una empresa familiar madrileña especializada en climatización. 
                Desde 2008, ayudamos a miles de hogares y negocios a conseguir el ambiente perfecto.
              </p>

              {/* Cifras */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {cifras.map((cifra, index) => (
                  <div 
                    key={index}
                    className="p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-orange-400 mb-1">{cifra.numero}</div>
                    <div className="text-gray-400 text-sm">{cifra.texto}</div>
                  </div>
                ))}
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

        {/* Nuestra misión */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 mb-4">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">Nuestra misión</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Hacer que cada hogar tenga el clima perfecto
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  En Uniclima creemos que el confort no es un lujo, es una necesidad. Por eso trabajamos 
                  cada día para ofrecer soluciones de climatización accesibles, eficientes y sostenibles.
                </p>
                <p className="text-gray-600 text-lg mb-8">
                  Nuestro compromiso va más allá de la venta: ofrecemos asesoramiento personalizado, 
                  instalación profesional y un servicio post-venta que nos ha convertido en la empresa 
                  de referencia en Madrid.
                </p>
                <div className="flex flex-wrap gap-3">
                  {servicios.map((servicio, index) => {
                    const Icon = servicio.icono;
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${servicio.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{servicio.nombre}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Nuestros valores</h3>
                  <div className="space-y-4">
                    {valores.map((valor, index) => {
                      const Icon = valor.icono;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">{valor.titulo}</h4>
                            <p className="text-orange-100 text-sm">{valor.descripcion}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nuestra trayectoria</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Un camino de crecimiento constante y compromiso con la excelencia
              </p>
            </div>

            <div className="relative">
              {/* Línea central */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500/30 hidden md:block" />
              
              <div className="space-y-8">
                {hitos.map((hito, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <span className="text-orange-400 font-bold text-lg">{hito.año}</span>
                        <h3 className="text-xl font-bold text-white mt-1 mb-2">{hito.titulo}</h3>
                        <p className="text-gray-400">{hito.descripcion}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Nuestro equipo</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Las personas detrás de Uniclima</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Un equipo de profesionales apasionados por la climatización
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipo.map((miembro, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-white">
                      {miembro.nombre.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{miembro.nombre}</h3>
                  <p className="text-orange-600 font-medium mb-2">{miembro.cargo}</p>
                  <p className="text-gray-500 text-sm">{miembro.experiencia} de experiencia</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Encuéntranos</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Visítanos en Madrid</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Nuestras instalaciones están en el corazón de Madrid, con fácil acceso 
                  y amplio parking para nuestros clientes.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Dirección</p>
                      <p className="text-gray-600">Calle Ejemplo 123, 28001 Madrid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Teléfono</p>
                      <p className="text-gray-600">912 345 678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">info@uniclima.es</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Horario</p>
                      <p className="text-gray-600">L-V: 9:00-18:00 | S: 10:00-14:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Mapa de ubicación</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Listo para mejorar tu confort?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Contacta con nosotros y descubre cómo podemos ayudarte a conseguir 
              el ambiente perfecto para tu hogar o negocio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span>Contactar ahora</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <Phone className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
