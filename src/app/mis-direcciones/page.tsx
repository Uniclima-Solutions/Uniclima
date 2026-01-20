"use client";

/**
 * Página de MIS DIRECCIONES - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  Star,
  Home,
  Building2,
  CheckCircle2,
  X,
  ArrowLeft,
  Phone,
  User
} from "lucide-react";

const direccionesIniciales = [
  {
    id: 1,
    tipo: "casa",
    nombre: "Casa",
    predeterminada: true,
    direccion: "Calle Mayor 15, 3º B",
    codigoPostal: "28001",
    ciudad: "Madrid",
    provincia: "Madrid",
    pais: "España",
    telefono: "+34 612 345 678",
    nombreContacto: "Carlos García"
  },
  {
    id: 2,
    tipo: "trabajo",
    nombre: "Oficina",
    predeterminada: false,
    direccion: "Av. de la Constitución 42, Planta 5",
    codigoPostal: "28028",
    ciudad: "Madrid",
    provincia: "Madrid",
    pais: "España",
    telefono: "+34 612 345 678",
    nombreContacto: "Carlos García"
  }
];

export default function MisDireccionesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [direcciones, setDirecciones] = useState(direccionesIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [direccionEditando, setDireccionEditando] = useState<typeof direccionesIniciales[0] | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEliminar = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      setDirecciones(direcciones.filter(d => d.id !== id));
    }
  };

  const handlePredeterminada = (id: number) => {
    setDirecciones(direcciones.map(d => ({
      ...d,
      predeterminada: d.id === id
    })));
  };

  const abrirModal = (direccion?: typeof direccionesIniciales[0]) => {
    setDireccionEditando(direccion || null);
    setModalAbierto(true);
  };

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-100 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/perfil" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al perfil</span>
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-orange-500" />
                  Mis Direcciones
                </h1>
                <p className="text-gray-500 mt-1">{direcciones.length} direcciones guardadas</p>
              </div>

              <button 
                onClick={() => abrirModal()}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25"
              >
                <Plus className="w-5 h-5" />
                <span>Nueva dirección</span>
              </button>
            </div>
          </div>
        </section>

        {/* Lista de direcciones */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {direcciones.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes direcciones guardadas</h3>
                <p className="text-gray-500 mb-6">Añade una dirección para agilizar tus compras</p>
                <button 
                  onClick={() => abrirModal()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Añadir dirección</span>
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {direcciones.map((direccion, index) => (
                  <div 
                    key={direccion.id}
                    className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-500 hover:shadow-xl ${
                      direccion.predeterminada ? 'border-orange-500' : 'border-gray-100'
                    } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Badge predeterminada */}
                    {direccion.predeterminada && (
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                          <Star className="w-4 h-4 fill-orange-500" />
                          Predeterminada
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Icono */}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          direccion.tipo === 'casa' 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                            : 'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}>
                          {direccion.tipo === 'casa' ? (
                            <Home className="w-7 h-7 text-white" />
                          ) : (
                            <Building2 className="w-7 h-7 text-white" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{direccion.nombre}</h3>
                          <p className="text-gray-600 mb-2">{direccion.direccion}</p>
                          <p className="text-gray-500 text-sm">
                            {direccion.codigoPostal} {direccion.ciudad}, {direccion.provincia}
                          </p>
                          
                          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {direccion.nombreContacto}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {direccion.telefono}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => abrirModal(direccion)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Editar</span>
                        </button>
                        
                        {!direccion.predeterminada && (
                          <>
                            <button 
                              onClick={() => handlePredeterminada(direccion.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium rounded-xl transition-colors"
                            >
                              <Star className="w-4 h-4" />
                              <span>Hacer predeterminada</span>
                            </button>
                            <button 
                              onClick={() => handleEliminar(direccion.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Eliminar</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal de dirección */}
        {modalAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header del modal */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {direccionEditando ? 'Editar dirección' : 'Nueva dirección'}
                </h2>
                <button 
                  onClick={() => setModalAbierto(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Formulario */}
              <form className="p-6 space-y-5">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de dirección</label>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-xl font-medium"
                    >
                      <Home className="w-5 h-5" />
                      <span>Casa</span>
                    </button>
                    <button 
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-gray-200 hover:border-gray-300 text-gray-600 rounded-xl font-medium transition-colors"
                    >
                      <Building2 className="w-5 h-5" />
                      <span>Trabajo</span>
                    </button>
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la dirección</label>
                  <input 
                    type="text"
                    placeholder="Ej: Casa, Oficina, Casa de mis padres..."
                    defaultValue={direccionEditando?.nombre}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <input 
                    type="text"
                    placeholder="Calle, número, piso, puerta..."
                    defaultValue={direccionEditando?.direccion}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* CP y Ciudad */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código postal</label>
                    <input 
                      type="text"
                      placeholder="28001"
                      defaultValue={direccionEditando?.codigoPostal}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input 
                      type="text"
                      placeholder="Madrid"
                      defaultValue={direccionEditando?.ciudad}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Provincia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                  <select 
                    defaultValue={direccionEditando?.provincia || "Madrid"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option>Madrid</option>
                    <option>Barcelona</option>
                    <option>Valencia</option>
                    <option>Sevilla</option>
                  </select>
                </div>

                {/* Contacto */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de contacto</label>
                    <input 
                      type="text"
                      placeholder="Carlos García"
                      defaultValue={direccionEditando?.nombreContacto}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input 
                      type="tel"
                      placeholder="+34 612 345 678"
                      defaultValue={direccionEditando?.telefono}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Predeterminada */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={direccionEditando?.predeterminada}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Establecer como dirección predeterminada</span>
                </label>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setModalAbierto(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Guardar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
