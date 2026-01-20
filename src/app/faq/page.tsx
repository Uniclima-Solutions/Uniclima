"use client";

/**
 * Página de PREGUNTAS FRECUENTES (FAQ) - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  HelpCircle, 
  ChevronDown,
  Search,
  Package,
  Truck,
  CreditCard,
  Wrench,
  Shield,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight
} from "lucide-react";

const categorias = [
  { id: "todas", nombre: "Todas", icono: HelpCircle },
  { id: "pedidos", nombre: "Pedidos", icono: Package },
  { id: "envios", nombre: "Envíos", icono: Truck },
  { id: "pagos", nombre: "Pagos", icono: CreditCard },
  { id: "servicios", nombre: "Servicios", icono: Wrench },
  { id: "garantias", nombre: "Garantías", icono: Shield }
];

const faqs = [
  {
    categoria: "pedidos",
    pregunta: "¿Cómo puedo hacer un pedido?",
    respuesta: "Puedes realizar tu pedido directamente en nuestra web añadiendo los productos al carrito y completando el proceso de checkout. También puedes llamarnos al 912 345 678 o visitarnos en nuestra tienda física en Madrid."
  },
  {
    categoria: "pedidos",
    pregunta: "¿Puedo modificar o cancelar mi pedido?",
    respuesta: "Sí, puedes modificar o cancelar tu pedido siempre que no haya sido enviado. Contacta con nosotros lo antes posible a través del teléfono 912 345 678 o por email a info@uniclima.es."
  },
  {
    categoria: "pedidos",
    pregunta: "¿Cómo puedo seguir el estado de mi pedido?",
    respuesta: "Una vez realizado el pedido, recibirás un email con el número de seguimiento. También puedes consultar el estado en la sección 'Mis Pedidos' de tu cuenta o en la página de seguimiento introduciendo tu número de pedido."
  },
  {
    categoria: "envios",
    pregunta: "¿Cuánto tarda en llegar mi pedido?",
    respuesta: "Los pedidos en stock se envían en 24-48 horas laborables. El tiempo de entrega depende de la zona: Madrid capital 24h, resto de España 48-72h. Para productos bajo pedido, el plazo puede variar entre 5-15 días."
  },
  {
    categoria: "envios",
    pregunta: "¿Cuánto cuesta el envío?",
    respuesta: "El envío es GRATIS para pedidos superiores a 100€. Para pedidos inferiores, el coste es de 5,95€ para península y 9,95€ para Baleares. No realizamos envíos a Canarias, Ceuta ni Melilla."
  },
  {
    categoria: "envios",
    pregunta: "¿Puedo recoger mi pedido en tienda?",
    respuesta: "¡Por supuesto! Puedes seleccionar la opción 'Recogida en tienda' durante el checkout. Te avisaremos por email cuando tu pedido esté listo para recoger. El horario de recogida es de L-V 9:00-18:00."
  },
  {
    categoria: "pagos",
    pregunta: "¿Qué métodos de pago aceptáis?",
    respuesta: "Aceptamos tarjeta de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencia bancaria y pago contra reembolso (con un cargo adicional de 3€). Para compras superiores a 300€ ofrecemos financiación sin intereses."
  },
  {
    categoria: "pagos",
    pregunta: "¿Es seguro pagar en vuestra web?",
    respuesta: "Absolutamente. Nuestra web cuenta con certificado SSL y cumple con los estándares PCI DSS. Todos los pagos se procesan a través de pasarelas seguras (Stripe/PayPal) y nunca almacenamos los datos de tu tarjeta."
  },
  {
    categoria: "pagos",
    pregunta: "¿Ofrecéis financiación?",
    respuesta: "Sí, para compras superiores a 300€ ofrecemos financiación hasta en 12 meses sin intereses. Durante el checkout podrás seleccionar esta opción y completar la solicitud en pocos minutos."
  },
  {
    categoria: "servicios",
    pregunta: "¿Ofrecéis servicio de instalación?",
    respuesta: "Sí, contamos con un equipo de técnicos certificados que realizan instalaciones profesionales de calderas, aires acondicionados, aerotermia y placas solares. El precio de instalación se indica en cada producto o puedes solicitar presupuesto personalizado."
  },
  {
    categoria: "servicios",
    pregunta: "¿Tenéis servicio de urgencias?",
    respuesta: "Sí, disponemos de servicio de urgencias 24 horas para averías de calderas y sistemas de climatización. Llama al 912 345 678 y un técnico acudirá a tu domicilio en menos de 2 horas (zonas de cobertura)."
  },
  {
    categoria: "servicios",
    pregunta: "¿Qué incluye el contrato de mantenimiento?",
    respuesta: "Nuestros contratos de mantenimiento incluyen revisión anual preventiva, limpieza de componentes, verificación de seguridad, ajuste de parámetros y descuentos en reparaciones. Disponemos de varios planes según tus necesidades."
  },
  {
    categoria: "garantias",
    pregunta: "¿Qué garantía tienen los productos?",
    respuesta: "Todos nuestros productos tienen garantía mínima de 2 años según la ley. Muchos fabricantes ofrecen garantías extendidas de hasta 5 años. Las instalaciones realizadas por nuestros técnicos tienen 2 años de garantía adicional en mano de obra."
  },
  {
    categoria: "garantias",
    pregunta: "¿Cómo puedo hacer una reclamación de garantía?",
    respuesta: "Para reclamaciones de garantía, contacta con nosotros indicando tu número de pedido y descripción del problema. Evaluaremos el caso y te indicaremos los pasos a seguir. Normalmente enviamos un técnico para diagnóstico sin coste."
  },
  {
    categoria: "garantias",
    pregunta: "¿Puedo devolver un producto?",
    respuesta: "Sí, tienes 14 días desde la recepción para devolver cualquier producto sin usar y en su embalaje original. Los gastos de devolución corren por cuenta del cliente salvo que el producto sea defectuoso. Consulta nuestra política de devoluciones para más detalles."
  }
];

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.pregunta}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 pb-5 text-gray-600">
          {faq.respuesta}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [preguntaAbierta, setPreguntaAbierta] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const faqsFiltradas = faqs.filter(faq => {
    const coincideCategoria = categoriaActiva === "todas" || faq.categoria === categoriaActiva;
    const coincideBusqueda = faq.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 py-16 sm:py-20">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                <HelpCircle className="w-5 h-5" />
                <span className="font-semibold">Centro de ayuda</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Preguntas Frecuentes
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100 mb-8">
                Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios
              </p>

              {/* Buscador */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Buscar en las preguntas frecuentes..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-900"
                />
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

        {/* Categorías */}
        <section className="py-6 border-b border-gray-100 sticky top-14 sm:top-16 lg:top-[104px] bg-white/95 backdrop-blur-md z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categorias.map((cat) => {
                const Icon = cat.icono;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaActiva(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      categoriaActiva === cat.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lista de FAQs */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqsFiltradas.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-500 mb-6">Prueba con otros términos de búsqueda o categoría</p>
                <button 
                  onClick={() => { setBusqueda(""); setCategoriaActiva("todas"); }}
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Ver todas las preguntas
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {faqsFiltradas.map((faq, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <FAQItem 
                      faq={faq} 
                      isOpen={preguntaAbierta === index}
                      onClick={() => setPreguntaAbierta(preguntaAbierta === index ? null : index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contacto */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h2>
              <p className="text-gray-600">Nuestro equipo está aquí para ayudarte</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <a 
                href="tel:912345678"
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Llámanos</h3>
                <p className="text-gray-500 text-sm mb-2">L-V 9:00-18:00</p>
                <span className="text-green-600 font-semibold">912 345 678</span>
              </a>

              <a 
                href="mailto:info@uniclima.es"
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Escríbenos</h3>
                <p className="text-gray-500 text-sm mb-2">Respondemos en 24h</p>
                <span className="text-blue-600 font-semibold">info@uniclima.es</span>
              </a>

              <Link 
                href="/contacto"
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Formulario</h3>
                <p className="text-gray-500 text-sm mb-2">Consulta personalizada</p>
                <span className="text-orange-600 font-semibold flex items-center gap-1">
                  Contactar <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
