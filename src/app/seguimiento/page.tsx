'use client';

/**
 * PÁGINA DE BÚSQUEDA DE SEGUIMIENTO
 * Permite al cliente introducir su código de seguimiento para ver el estado de su reparación.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs';
import {
  Search,
  Package,
  ArrowRight,
  Wrench,
  Clock,
  Shield,
  CheckCircle2,
  Truck,
  FileText,
  HelpCircle
} from 'lucide-react';

export default function SeguimientoBusquedaPage() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    
    setIsSearching(true);
    
    // Pequeña demora para feedback visual
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navegar a la página de seguimiento
    router.push(`/seguimiento/${trackingCode.trim().toUpperCase()}`);
  };
  
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.seguimiento} />
      
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Seguimiento de Reparación
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Consulta el estado de tu{' '}
              <span className="text-orange-400">reparación</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Introduce el código de seguimiento que recibiste por email para ver el progreso de tu reparación de placa electrónica.
            </p>
            
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="Ej: REP-2024-001234"
                  className="w-full px-6 py-5 pr-32 text-lg font-mono bg-white text-gray-900 rounded-2xl border-2 border-transparent focus:border-orange-500 outline-none shadow-xl"
                />
                <button
                  type="submit"
                  disabled={!trackingCode.trim() || isSearching}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors ${
                    trackingCode.trim() && !isSearching
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Buscando
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Buscar
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Demo link */}
            <p className="mt-4 text-sm text-gray-400">
              ¿Quieres ver un ejemplo?{' '}
              <Link href="/seguimiento/demo" className="text-orange-400 hover:underline">
                Ver demo
              </Link>
            </p>
          </div>
        </section>
        
        {/* Proceso visual */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Así funciona el proceso
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { icon: <FileText className="w-6 h-6" />, title: 'Solicitud', desc: 'Rellenas el formulario y pagas el diagnóstico' },
                { icon: <Truck className="w-6 h-6" />, title: 'Envío', desc: 'Nos envías la placa a nuestro taller' },
                { icon: <Search className="w-6 h-6" />, title: 'Diagnóstico', desc: 'Analizamos la placa y te enviamos presupuesto' },
                { icon: <Wrench className="w-6 h-6" />, title: 'Reparación', desc: 'Si aceptas, reparamos tu placa' },
                { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Entrega', desc: 'Te devolvemos la placa reparada' },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-7 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-300 -ml-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Estados posibles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Estados de la reparación
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Tu reparación pasará por diferentes estados. Recibirás un email cada vez que cambie el estado.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { color: 'yellow', label: 'Pendiente de pago', desc: 'Esperando confirmación del pago del diagnóstico' },
                { color: 'blue', label: 'Pendiente de envío', desc: 'Pago confirmado, esperando recibir la placa' },
                { color: 'purple', label: 'Recibida', desc: 'Hemos recibido tu placa en el taller' },
                { color: 'orange', label: 'En diagnóstico', desc: 'Nuestros técnicos están analizando la placa' },
                { color: 'cyan', label: 'Presupuesto enviado', desc: 'Te hemos enviado el presupuesto por email' },
                { color: 'green', label: 'En reparación', desc: 'Estamos reparando tu placa' },
                { color: 'indigo', label: 'En testeo', desc: 'Verificando que todo funciona correctamente' },
                { color: 'teal', label: 'Lista para envío', desc: 'Preparando el envío de vuelta' },
                { color: 'emerald', label: 'Completada', desc: 'Reparación finalizada y entregada' },
              ].map((status, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 bg-${status.color}-50 border-${status.color}-200`}
                  style={{
                    backgroundColor: `var(--${status.color}-50, #fefce8)`,
                    borderColor: `var(--${status.color}-200, #fef08a)`
                  }}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{status.label}</h3>
                  <p className="text-sm text-gray-600">{status.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Preguntas frecuentes
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: '¿Dónde encuentro mi código de seguimiento?',
                  a: 'El código de seguimiento se envía por email cuando realizas el pago del diagnóstico. Tiene el formato REP-YYYY-XXXXXX. Revisa tu bandeja de entrada y la carpeta de spam.'
                },
                {
                  q: '¿Cada cuánto se actualiza el estado?',
                  a: 'El estado se actualiza en tiempo real cada vez que hay un cambio en el proceso. Recibirás un email de notificación con cada actualización.'
                },
                {
                  q: '¿Qué hago si no recibo actualizaciones?',
                  a: 'Si no recibes actualizaciones en más de 48 horas laborables, contacta con nosotros por teléfono (912 345 678) o email (reparaciones@uniclima.es) indicando tu código de seguimiento.'
                },
                {
                  q: '¿Puedo modificar mi pedido una vez enviado?',
                  a: 'Una vez enviada la placa, no es posible modificar el pedido. Si necesitas hacer algún cambio, contacta con nosotros lo antes posible.'
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-orange-500" />
                      {faq.q}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 ml-8">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Aún no has solicitado el diagnóstico?
            </h2>
            <p className="text-gray-600 mb-8">
              Rellena el formulario y te ayudamos a reparar tu placa electrónica
            </p>
            <Link
              href="/diagnostico-placas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
            >
              <Wrench className="w-5 h-5" />
              Solicitar diagnóstico
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
