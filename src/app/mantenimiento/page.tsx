"use client";

/**
 * PÁGINA DE CONTRATOS DE MANTENIMIENTO
 * Diseño premium con UI/UX cuidado
 * Planes para calderas y aire acondicionado
 */

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Star, 
  Crown, 
  Check, 
  Phone, 
  Clock, 
  Wrench,
  Flame,
  Snowflake,
  ChevronRight,
  Calendar,
  BadgePercent,
  Headphones,
  Truck,
  Award,
  Users,
  ThumbsUp,
  ArrowRight
} from "lucide-react";

// Planes de mantenimiento de calderas
const planesCaldera = [
  {
    id: "esencial",
    nombre: "Esencial",
    precio: 90,
    periodo: "año",
    destacado: false,
    color: "emerald",
    icono: Shield,
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      "1 intervención preventiva (oct-nov)",
      "Revisión completa de seguridad",
      "Control de presión y estanqueidad",
      "Limpieza de quemador",
      "Certificado de mantenimiento",
    ],
    noIncluye: [
      "Reparaciones de emergencia",
      "Descuento en repuestos",
      "Prioridad en asistencia"
    ]
  },
  {
    id: "confort",
    nombre: "Confort",
    precio: 120,
    periodo: "año",
    destacado: true,
    color: "orange",
    icono: Star,
    descripcion: "Preventivo + reparaciones prioritarias",
    caracteristicas: [
      "1 intervención preventiva (oct-nov)",
      "Reparaciones en 48-72 horas",
      "10% dto. en repuestos",
      "Atención telefónica prioritaria",
      "Sin costes de desplazamiento",
    ],
    noIncluye: [
      "Mano de obra incluida",
      "Segunda revisión anual"
    ]
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: 140,
    periodo: "año",
    destacado: false,
    color: "purple",
    icono: Crown,
    descripcion: "Cobertura completa + verano",
    caracteristicas: [
      "2 intervenciones anuales",
      "Reparaciones en 24-72 horas",
      "20% dto. en repuestos",
      "Mano de obra incluida",
      "Línea directa 24/7",
    ],
    noIncluye: []
  }
];

// Planes de mantenimiento de aire acondicionado
const planesAire = [
  {
    id: "basico",
    nombre: "Básico",
    precio: 70,
    periodo: "año",
    destacado: false,
    color: "sky",
    icono: Shield,
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      "1 intervención preventiva (primavera)",
      "Limpieza de filtros y unidades",
      "Revisión de gas refrigerante",
      "Comprobación eléctrica",
      "Certificado de mantenimiento",
    ],
    noIncluye: [
      "Reparaciones de emergencia",
      "Descuento en repuestos"
    ]
  },
  {
    id: "optimo",
    nombre: "Óptimo",
    precio: 100,
    periodo: "año",
    destacado: true,
    color: "blue",
    icono: Star,
    descripcion: "Preventivo + asistencia prioritaria",
    caracteristicas: [
      "2 intervenciones anuales",
      "Reparaciones en 48-72 horas",
      "10% dto. en repuestos",
      "Atención telefónica prioritaria",
      "Sin costes de desplazamiento",
    ],
    noIncluye: [
      "Mano de obra incluida"
    ]
  },
  {
    id: "total",
    nombre: "Total",
    precio: 130,
    periodo: "año",
    destacado: false,
    color: "indigo",
    icono: Crown,
    descripcion: "Cobertura completa todo el año",
    caracteristicas: [
      "2 intervenciones anuales",
      "Reparaciones en 24-48 horas",
      "20% dto. en repuestos",
      "Mano de obra incluida",
      "Línea directa 24/7",
    ],
    noIncluye: []
  }
];

// Componente de tarjeta de plan
function PlanCard({ plan, tipo }: { plan: typeof planesCaldera[0]; tipo: "caldera" | "aire" }) {
  const IconComponent = plan.icono;
  const isCaldera = tipo === "caldera";
  
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600 border-emerald-200",
    orange: "from-orange-500 to-orange-600 border-orange-200",
    purple: "from-purple-500 to-purple-600 border-purple-200",
    sky: "from-sky-500 to-sky-600 border-sky-200",
    blue: "from-blue-500 to-blue-600 border-blue-200",
    indigo: "from-indigo-500 to-indigo-600 border-indigo-200"
  };
  
  const bgColor = colorClasses[plan.color as keyof typeof colorClasses] || colorClasses.orange;
  
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.destacado ? 'border-orange-400 scale-105 z-10' : 'border-gray-100'} overflow-hidden transition-all hover:shadow-xl`}>
      {plan.destacado && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wide">
          ★ Más Popular
        </div>
      )}
      
      <div className={`p-6 ${plan.destacado ? 'pt-10' : ''}`}>
        {/* Header del plan */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgColor.split(' ')[0]} ${bgColor.split(' ')[1]} flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{plan.nombre}</h3>
            <p className="text-sm text-gray-500">{plan.descripcion}</p>
          </div>
        </div>
        
        {/* Precio */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-gray-900">€{plan.precio}</span>
            <span className="text-gray-500">/{plan.periodo}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">IVA incluido</p>
        </div>
        
        {/* Características */}
        <ul className="space-y-3 mb-6">
          {plan.caracteristicas.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
        
        {/* Lo que no incluye */}
        {plan.noIncluye.length > 0 && (
          <div className="border-t border-gray-100 pt-4 mb-6">
            <p className="text-xs text-gray-400 mb-2">No incluido:</p>
            <ul className="space-y-1">
              {plan.noIncluye.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Botón contratar */}
        <Link 
          href={`/contrato-mantenimiento?tipo=${tipo}&plan=${plan.id}`}
          className={`w-full py-3 rounded-xl font-semibold transition-all text-center block ${
            plan.destacado 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Contratar ahora
        </Link>
      </div>
    </div>
  );
}

// Componente de beneficio
function Beneficio({ icono: Icon, titulo, descripcion }: { icono: any; titulo: string; descripcion: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-orange-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{titulo}</h4>
        <p className="text-sm text-gray-500">{descripcion}</p>
      </div>
    </div>
  );
}

// Componente de FAQ
function FAQItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [abierto, setAbierto] = useState(false);
  
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setAbierto(!abierto)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900">{pregunta}</span>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${abierto ? 'rotate-90' : ''}`} />
      </button>
      {abierto && (
        <div className="pb-4 text-gray-600 text-sm">
          {respuesta}
        </div>
      )}
    </div>
  );
}

export default function MantenimientoPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<"caldera" | "aire">("caldera");
  
  const planes = tipoSeleccionado === "caldera" ? planesCaldera : planesAire;
  
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Contratos de Mantenimiento</span>
            </nav>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-black mb-6">
                Contratos de Mantenimiento
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Protege tu inversión con nuestros planes de mantenimiento preventivo. 
                Técnicos certificados, respuesta rápida y los mejores precios garantizados.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-black">+2.500</div>
                  <div className="text-orange-200 text-sm">Contratos activos</div>
                </div>
                <div>
                  <div className="text-3xl font-black">98%</div>
                  <div className="text-orange-200 text-sm">Clientes satisfechos</div>
                </div>
                <div>
                  <div className="text-3xl font-black">24h</div>
                  <div className="text-orange-200 text-sm">Tiempo respuesta</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Selector de tipo */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-14 lg:top-[72px] z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setTipoSeleccionado("caldera")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  tipoSeleccionado === "caldera"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Flame className="w-5 h-5" />
                Calderas
              </button>
              <button
                onClick={() => setTipoSeleccionado("aire")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  tipoSeleccionado === "aire"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Snowflake className="w-5 h-5" />
                Aire Acondicionado
              </button>
            </div>
          </div>
        </section>
        
        {/* Planes */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Elige tu plan de mantenimiento
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {tipoSeleccionado === "caldera" 
                  ? "Mantén tu caldera en perfecto estado con nuestros planes de mantenimiento. Intervenciones programadas entre octubre y noviembre."
                  : "Asegura el rendimiento óptimo de tu aire acondicionado todo el año. Intervenciones programadas en primavera y otoño."
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {planes.map((plan) => (
                <PlanCard key={plan.id} plan={plan} tipo={tipoSeleccionado} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué contratar con Uniclima?
              </h2>
              <p className="text-gray-600">
                Más de 15 años de experiencia nos avalan
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Beneficio 
                icono={Users}
                titulo="Técnicos certificados"
                descripcion="Todos nuestros técnicos están certificados y en formación continua"
              />
              <Beneficio 
                icono={Clock}
                titulo="Respuesta rápida"
                descripcion="Atendemos tu avería en un máximo de 24-72 horas según tu plan"
              />
              <Beneficio 
                icono={BadgePercent}
                titulo="Descuentos exclusivos"
                descripcion="Hasta un 20% de descuento en repuestos originales"
              />
              <Beneficio 
                icono={Award}
                titulo="Garantía de servicio"
                descripcion="30 días de garantía en todas las intervenciones realizadas"
              />
              <Beneficio 
                icono={Headphones}
                titulo="Soporte dedicado"
                descripcion="Línea de atención exclusiva para clientes con contrato"
              />
              <Beneficio 
                icono={ThumbsUp}
                titulo="Sin sorpresas"
                descripcion="Precio cerrado anual sin costes ocultos ni letra pequeña"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Repuestos */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  ¿Necesitas repuestos para tu {tipoSeleccionado === "caldera" ? "caldera" : "aire acondicionado"}?
                </h2>
                <p className="text-gray-400">
                  Amplio catálogo de repuestos originales y compatibles con envío en 24-48h
                </p>
              </div>
              <Link 
                href={tipoSeleccionado === "caldera" ? "/c/calderas" : "/c/aire-acondicionado"}
                className="flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Ver repuestos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <FAQItem 
                pregunta="¿Cuándo se realizan las intervenciones preventivas?"
                respuesta="Para calderas, las intervenciones se programan entre octubre y noviembre, antes de la temporada de frío. Para aires acondicionados, se realizan en primavera (abril-mayo) antes del verano."
              />
              <FAQItem 
                pregunta="¿Qué pasa si tengo una avería fuera del horario?"
                respuesta="Los clientes con plan Premium disponen de línea 24/7. Para otros planes, las urgencias se atienden en el siguiente día laborable con prioridad."
              />
              <FAQItem 
                pregunta="¿Los repuestos están incluidos en el contrato?"
                respuesta="Los repuestos no están incluidos en el precio del contrato, pero los clientes con contrato disfrutan de descuentos del 10% al 20% según el plan contratado."
              />
              <FAQItem 
                pregunta="¿Puedo cambiar de plan durante el año?"
                respuesta="Sí, puedes actualizar tu plan en cualquier momento. Solo pagarás la diferencia proporcional hasta la renovación."
              />
              <FAQItem 
                pregunta="¿Cómo puedo cancelar mi contrato?"
                respuesta="Puedes cancelar tu contrato en cualquier momento sin penalización. La cancelación será efectiva a partir del siguiente periodo de facturación."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Final */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Tienes dudas? Te llamamos
            </h2>
            <p className="text-gray-600 mb-8">
              Nuestro equipo comercial te asesorará sin compromiso sobre el plan que mejor se adapta a tus necesidades
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+34912345678"
                className="flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                912 345 678
              </a>
              <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-700 font-semibold rounded-xl transition-colors">
                <Calendar className="w-5 h-5" />
                Solicitar llamada
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
