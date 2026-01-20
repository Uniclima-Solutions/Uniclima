"use client";

/**
 * Página de PERFIL DE USUARIO - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  User, 
  Settings, 
  Package, 
  MapPin, 
  Heart, 
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit3,
  Camera,
  Mail,
  Phone,
  Calendar,
  Award,
  Star,
  Gift,
  Percent,
  Clock,
  CheckCircle2,
  Truck
} from "lucide-react";

const menuItems = [
  { 
    id: "pedidos", 
    nombre: "Mis Pedidos", 
    descripcion: "Historial y seguimiento", 
    icono: Package, 
    href: "/mis-pedidos",
    color: "from-blue-500 to-blue-600",
    badge: 2
  },
  { 
    id: "direcciones", 
    nombre: "Mis Direcciones", 
    descripcion: "Gestiona tus direcciones", 
    icono: MapPin, 
    href: "/mis-direcciones",
    color: "from-green-500 to-green-600"
  },
  { 
    id: "favoritos", 
    nombre: "Favoritos", 
    descripcion: "Productos guardados", 
    icono: Heart, 
    href: "/favoritos",
    color: "from-red-500 to-red-600",
    badge: 5
  },
  { 
    id: "pagos", 
    nombre: "Métodos de Pago", 
    descripcion: "Tarjetas y cuentas", 
    icono: CreditCard, 
    href: "/metodos-pago",
    color: "from-purple-500 to-purple-600"
  },
  { 
    id: "notificaciones", 
    nombre: "Notificaciones", 
    descripcion: "Preferencias de alertas", 
    icono: Bell, 
    href: "/notificaciones",
    color: "from-amber-500 to-amber-600"
  },
  { 
    id: "seguridad", 
    nombre: "Seguridad", 
    descripcion: "Contraseña y acceso", 
    icono: Shield, 
    href: "/seguridad",
    color: "from-slate-500 to-slate-600"
  }
];

const pedidosRecientes = [
  {
    id: "UC-2024-001234",
    fecha: "15 Ene 2024",
    estado: "Entregado",
    total: 1299.99,
    productos: 2,
    color: "green"
  },
  {
    id: "UC-2024-001198",
    fecha: "10 Ene 2024",
    estado: "En camino",
    total: 89.50,
    productos: 1,
    color: "blue"
  }
];

const beneficiosCliente = [
  { icono: Percent, texto: "5% descuento en próxima compra", activo: true },
  { icono: Truck, texto: "Envío gratis en pedidos +100€", activo: true },
  { icono: Gift, texto: "Regalo de bienvenida", activo: false },
  { icono: Star, texto: "Acceso a ofertas exclusivas", activo: true }
];

export default function PerfilPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [editando, setEditando] = useState(false);

  // Datos de ejemplo del usuario
  const [usuario, setUsuario] = useState({
    nombre: "Carlos",
    apellidos: "García López",
    email: "carlos.garcia@email.com",
    telefono: "+34 612 345 678",
    fechaRegistro: "Enero 2023",
    nivel: "Cliente Premium",
    puntos: 1250
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-12 sm:py-16">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {usuario.nombre.charAt(0)}{usuario.apellidos.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
                {/* Badge Premium */}
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full text-xs font-bold text-white shadow-lg">
                  PREMIUM
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {usuario.nombre} {usuario.apellidos}
                </h1>
                <p className="text-gray-400 mb-3">{usuario.email}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Cliente desde {usuario.fechaRegistro}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Award className="w-4 h-4" />
                    <span>{usuario.puntos} puntos</span>
                  </div>
                </div>
              </div>

              {/* Botón editar */}
              <button 
                onClick={() => setEditando(!editando)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar perfil</span>
              </button>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Menú */}
              <div className="lg:col-span-2 space-y-6">
                {/* Datos personales */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      Datos personales
                    </h2>
                  </div>
                  <div className="p-6 grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Nombre</label>
                      <p className="font-semibold text-gray-900">{usuario.nombre}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Apellidos</label>
                      <p className="font-semibold text-gray-900">{usuario.apellidos}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Email</label>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {usuario.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Teléfono</label>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {usuario.telefono}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menú de opciones */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-orange-500" />
                      Mi cuenta
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {menuItems.map((item) => {
                      const Icon = item.icono;
                      return (
                        <Link 
                          key={item.id}
                          href={item.href}
                          className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              {item.nombre}
                            </h3>
                            <p className="text-sm text-gray-500">{item.descripcion}</p>
                          </div>
                          {item.badge && (
                            <span className="px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Cerrar sesión */}
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>

              {/* Columna derecha - Resumen */}
              <div className="space-y-6">
                {/* Pedidos recientes */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Pedidos recientes</h3>
                    <Link href="/mis-pedidos" className="text-sm text-orange-600 font-medium hover:underline">
                      Ver todos
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {pedidosRecientes.map((pedido) => (
                      <Link 
                        key={pedido.id}
                        href={`/seguimiento/${pedido.id}`}
                        className="block p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm text-gray-600">{pedido.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            pedido.color === 'green' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {pedido.estado}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{pedido.fecha}</span>
                          <span className="font-bold text-gray-900">{pedido.total.toFixed(2)}€</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Beneficios */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8" />
                    <div>
                      <h3 className="font-bold text-lg">Cliente Premium</h3>
                      <p className="text-orange-100 text-sm">{usuario.puntos} puntos acumulados</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {beneficiosCliente.map((beneficio, index) => {
                      const Icon = beneficio.icono;
                      return (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 ${beneficio.activo ? 'opacity-100' : 'opacity-50'}`}
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm">{beneficio.texto}</span>
                          {beneficio.activo && (
                            <CheckCircle2 className="w-4 h-4 ml-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ayuda */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
                  <div className="space-y-3">
                    <Link 
                      href="/faq"
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Clock className="w-5 h-5" />
                      <span>Preguntas frecuentes</span>
                    </Link>
                    <Link 
                      href="/contacto"
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Contactar soporte</span>
                    </Link>
                    <a 
                      href="tel:912345678"
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>912 345 678</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
