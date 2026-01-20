"use client";

/**
 * Página de MIS PEDIDOS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  MapPin,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  Box,
  ArrowLeft
} from "lucide-react";

const pedidos = [
  {
    id: "UC-2024-001234",
    fecha: "15 Enero 2024",
    estado: "entregado",
    estadoTexto: "Entregado",
    total: 1299.99,
    productos: [
      { nombre: "Caldera Vaillant ecoTEC plus", cantidad: 1, precio: 1199.99, imagen: null },
      { nombre: "Kit de instalación básico", cantidad: 1, precio: 100.00, imagen: null }
    ],
    direccion: "Calle Mayor 15, 28001 Madrid",
    fechaEntrega: "18 Enero 2024"
  },
  {
    id: "UC-2024-001198",
    fecha: "10 Enero 2024",
    estado: "en-camino",
    estadoTexto: "En camino",
    total: 89.50,
    productos: [
      { nombre: "Válvula de 3 vías Honeywell", cantidad: 2, precio: 44.75, imagen: null }
    ],
    direccion: "Calle Mayor 15, 28001 Madrid",
    fechaEstimada: "22 Enero 2024"
  },
  {
    id: "UC-2024-001156",
    fecha: "5 Enero 2024",
    estado: "procesando",
    estadoTexto: "Procesando",
    total: 459.99,
    productos: [
      { nombre: "Split Daikin TXF35C Sensira", cantidad: 1, precio: 459.99, imagen: null }
    ],
    direccion: "Av. de la Constitución 42, 28028 Madrid",
    fechaEstimada: "25 Enero 2024"
  },
  {
    id: "UC-2023-009876",
    fecha: "20 Diciembre 2023",
    estado: "entregado",
    estadoTexto: "Entregado",
    total: 234.50,
    productos: [
      { nombre: "Termostato Nest Learning", cantidad: 1, precio: 199.00, imagen: null },
      { nombre: "Cable de conexión 5m", cantidad: 1, precio: 35.50, imagen: null }
    ],
    direccion: "Calle Mayor 15, 28001 Madrid",
    fechaEntrega: "23 Diciembre 2023"
  }
];

const filtros = [
  { id: "todos", nombre: "Todos", icono: Package },
  { id: "procesando", nombre: "Procesando", icono: Clock },
  { id: "en-camino", nombre: "En camino", icono: Truck },
  { id: "entregado", nombre: "Entregados", icono: CheckCircle2 }
];

function getEstadoConfig(estado: string) {
  switch (estado) {
    case "entregado":
      return { 
        color: "bg-green-100 text-green-700 border-green-200", 
        icono: CheckCircle2,
        iconoColor: "text-green-500",
        progreso: 100
      };
    case "en-camino":
      return { 
        color: "bg-blue-100 text-blue-700 border-blue-200", 
        icono: Truck,
        iconoColor: "text-blue-500",
        progreso: 66
      };
    case "procesando":
      return { 
        color: "bg-amber-100 text-amber-700 border-amber-200", 
        icono: Clock,
        iconoColor: "text-amber-500",
        progreso: 33
      };
    default:
      return { 
        color: "bg-gray-100 text-gray-700 border-gray-200", 
        icono: Package,
        iconoColor: "text-gray-500",
        progreso: 0
      };
  }
}

export default function MisPedidosPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const pedidosFiltrados = pedidos.filter(pedido => {
    const coincideFiltro = filtroActivo === "todos" || pedido.estado === filtroActivo;
    const coincideBusqueda = pedido.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.productos.some(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    return coincideFiltro && coincideBusqueda;
  });

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-100 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Link href="/perfil" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al perfil</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="w-8 h-8 text-orange-500" />
                  Mis Pedidos
                </h1>
                <p className="text-gray-500 mt-1">{pedidos.length} pedidos en total</p>
              </div>

              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Buscar por nº pedido o producto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full sm:w-80 pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="bg-white border-b border-gray-100 py-4 sticky top-14 sm:top-16 lg:top-[104px] z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {filtros.map((filtro) => {
                const Icon = filtro.icono;
                const count = filtro.id === "todos" 
                  ? pedidos.length 
                  : pedidos.filter(p => p.estado === filtro.id).length;
                return (
                  <button
                    key={filtro.id}
                    onClick={() => setFiltroActivo(filtro.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      filtroActivo === filtro.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{filtro.nombre}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      filtroActivo === filtro.id ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lista de pedidos */}
        <section className="py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {pedidosFiltrados.length === 0 ? (
              <div className="text-center py-16">
                <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay pedidos</h3>
                <p className="text-gray-500 mb-6">No se encontraron pedidos con los filtros seleccionados</p>
                <Link 
                  href="/tienda"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>Ir a la tienda</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {pedidosFiltrados.map((pedido, index) => {
                  const estadoConfig = getEstadoConfig(pedido.estado);
                  const EstadoIcono = estadoConfig.icono;
                  
                  return (
                    <div 
                      key={pedido.id}
                      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Header del pedido */}
                      <div className="p-5 sm:p-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${
                              pedido.estado === 'entregado' ? 'from-green-500 to-green-600' :
                              pedido.estado === 'en-camino' ? 'from-blue-500 to-blue-600' :
                              'from-amber-500 to-amber-600'
                            }`}>
                              <EstadoIcono className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 font-mono">{pedido.id}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {pedido.fecha}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${estadoConfig.color}`}>
                              {pedido.estadoTexto}
                            </span>
                            <span className="text-xl font-bold text-gray-900">{pedido.total.toFixed(2)}€</span>
                          </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="mt-4">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                pedido.estado === 'entregado' ? 'bg-green-500' :
                                pedido.estado === 'en-camino' ? 'bg-blue-500' :
                                'bg-amber-500'
                              }`}
                              style={{ width: `${estadoConfig.progreso}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Confirmado</span>
                            <span>En preparación</span>
                            <span>En camino</span>
                            <span>Entregado</span>
                          </div>
                        </div>
                      </div>

                      {/* Productos */}
                      <div className="p-5 sm:p-6">
                        <div className="space-y-3 mb-4">
                          {pedido.productos.map((producto, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Package className="w-8 h-8 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{producto.nombre}</h4>
                                <p className="text-sm text-gray-500">Cantidad: {producto.cantidad}</p>
                              </div>
                              <span className="font-semibold text-gray-900">{producto.precio.toFixed(2)}€</span>
                            </div>
                          ))}
                        </div>

                        {/* Dirección y fecha */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{pedido.direccion}</span>
                          </div>
                          {pedido.fechaEntrega ? (
                            <span className="text-sm text-green-600 font-medium">
                              Entregado el {pedido.fechaEntrega}
                            </span>
                          ) : (
                            <span className="text-sm text-blue-600 font-medium">
                              Entrega estimada: {pedido.fechaEstimada}
                            </span>
                          )}
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                          <Link 
                            href={`/seguimiento/${pedido.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Ver detalles</span>
                          </Link>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Factura</span>
                          </button>
                          {pedido.estado === 'entregado' && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                              <RefreshCw className="w-4 h-4" />
                              <span>Repetir pedido</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Ayuda */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¿Tienes algún problema con tu pedido?</h3>
                  <p className="text-gray-600">Nuestro equipo de atención al cliente está disponible para ayudarte</p>
                </div>
                <Link 
                  href="/contacto"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>Contactar soporte</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
