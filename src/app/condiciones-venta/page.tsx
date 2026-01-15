'use client'

import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck, Truck, CreditCard, AlertTriangle, Scale } from 'lucide-react';

export default function CondicionesVentaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a Uniclima</span>
          </Link>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cabecera del documento */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Condiciones de Venta</h1>
                <p className="text-orange-100 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Sección 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Ámbito de aplicación
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Las presentes Condiciones de Venta regulan la compra de productos a través del sitio web uniclima.es (en adelante, "el Sitio Web"), titularidad de Uniclima Solutions S.L. (en adelante, "Uniclima").
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Proceso de compra
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El cliente podrá realizar un pedido a través del Sitio Web, seleccionando los productos deseados y añadiéndolos al carrito de la compra. Una vez finalizada la selección, el cliente deberá facilitar los datos de envío y facturación y proceder al pago.
              </p>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Precios e impuestos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Todos los precios mostrados en el Sitio Web incluyen el Impuesto sobre el Valor Añadido (IVA) aplicable. Los gastos de envío se indicarán por separado antes de finalizar la compra.
              </p>
            </section>

            {/* Sección 4 - Métodos de pago */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Métodos de pago
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Uniclima acepta los siguientes métodos de pago:</span>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Tarjeta de crédito/débito (Visa, Mastercard)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    PayPal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Bizum
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 5 - Envíos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Envíos y entregas
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Plazos de entrega</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Los plazos de entrega habituales son de 24-48 horas laborables en la península. Uniclima no se hace responsable de los retrasos causados por la empresa de transporte.
                </p>
              </div>
            </section>

            {/* Sección 6 - Garantía */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Garantía
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">1 año de garantía</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Todos nuestros productos tienen una garantía de 1 año desde la fecha de compra. La garantía cubre defectos de fabricación, pero <strong>no los daños causados por una mala instalación o uso indebido</strong>.
                </p>
              </div>
            </section>

            {/* Sección 7 - DEVOLUCIONES (IMPORTANTE) */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Política de devoluciones
              </h2>
              
              {/* Aviso importante */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Importante: Excepciones al derecho de desistimiento</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      De conformidad con el <strong>artículo 103.e) del Real Decreto Legislativo 1/2007</strong>, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios, <strong>no se admitirán devoluciones de productos precintados una vez hayan sido desprecintados</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">7.1. Derecho de desistimiento</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    El cliente dispone de 14 días naturales desde la recepción del pedido para ejercer su derecho de desistimiento, sin necesidad de justificación.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">7.2. Productos excluidos del derecho de desistimiento</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Los siguientes productos <strong>NO admiten devolución una vez desprecintados</strong> por razones de protección y para garantizar la integridad y el correcto funcionamiento de los componentes:
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <strong>Placas electrónicas</strong>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <strong>Módulos de control</strong>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <strong>Cualquier componente electrónico susceptible de ser dañado por incorrecta manipulación o instalación</strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">7.3. Proceso de devolución</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Para solicitar una devolución, el cliente deberá contactar con nuestro servicio de atención al cliente a través del correo electrónico <a href="mailto:info@uniclima.es" className="text-orange-600 hover:underline">info@uniclima.es</a>. <strong>Los gastos de envío de la devolución correrán a cargo del cliente.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 8 - Ley aplicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Ley aplicable y jurisdicción
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Jurisdicción</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Las presentes Condiciones de Venta se regirán por la legislación española. Para cualquier controversia que pudiera derivarse de las mismas, las partes se someten a los Juzgados y Tribunales de Madrid.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
