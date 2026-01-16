'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FileText, Wrench, Calendar, Shield, AlertTriangle, Phone, CreditCard, Clock, CheckCircle, XCircle, Scale } from 'lucide-react';

export default function TerminosMantenimientoPage() {
  const breadcrumbItems = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Términos del Servicio de Mantenimiento' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cabecera del documento */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Términos y Condiciones</h1>
                <p className="text-orange-100">Servicio de Mantenimiento</p>
              </div>
            </div>
            <p className="text-sm text-orange-100">Última actualización: 15 de enero de 2026</p>
          </div>

          {/* Contenido del documento */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Introducción */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-1">Objeto del Contrato</h3>
                  <p className="text-sm text-orange-700">
                    El presente documento establece los términos y condiciones que regulan la prestación del 
                    servicio de mantenimiento de equipos de climatización (calderas, aires acondicionados y 
                    aerotermia) por parte de <strong>Uniclima Solutions S.L.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">1</span>
                <h2 className="text-xl font-bold text-gray-900">Identificación de las partes</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
                <p><strong>Prestador del servicio:</strong> Uniclima Solutions S.L.</p>
                <p><strong>CIF:</strong> B21651393</p>
                <p><strong>Domicilio:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España</p>
                <p><strong>Email:</strong> info@uniclima.es</p>
                <p><strong>Teléfono:</strong> 912 345 678</p>
              </div>
            </section>

            {/* Sección 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">2</span>
                <h2 className="text-xl font-bold text-gray-900">Descripción del servicio</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>El contrato de mantenimiento incluye, según el plan contratado:</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Plan Esencial
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 1 revisión anual preventiva</li>
                      <li>• Limpieza básica del equipo</li>
                      <li>• Comprobación de funcionamiento</li>
                      <li>• Informe técnico</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Plan Avanzado
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 2 revisiones anuales</li>
                      <li>• Limpieza completa</li>
                      <li>• Análisis de combustión</li>
                      <li>• 10% dto. en reparaciones</li>
                      <li>• Atención prioritaria</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                      Plan Premium
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Revisiones ilimitadas</li>
                      <li>• Mano de obra incluida en reparaciones</li>
                      <li>• 20% dto. en repuestos</li>
                      <li>• Atención 24/7</li>
                      <li>• Equipo de sustitución temporal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">3</span>
                <h2 className="text-xl font-bold text-gray-900">Duración y renovación</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p>El contrato tiene una duración de <strong>12 meses</strong> desde la fecha de activación.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p>El contrato se renovará automáticamente por períodos iguales, salvo que alguna de las partes comunique su voluntad de no renovarlo con al menos <strong>30 días de antelación</strong> a la fecha de vencimiento.</p>
                </div>
              </div>
            </section>

            {/* Sección 4 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">4</span>
                <h2 className="text-xl font-bold text-gray-900">Precio y forma de pago</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>El precio del servicio será el indicado en el momento de la contratación y se abonará:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• <strong>Pago anual:</strong> En un único pago al inicio del contrato</li>
                      <li>• <strong>Pago mensual:</strong> Mediante domiciliación bancaria los primeros 5 días de cada mes</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm">Los precios incluyen IVA. Uniclima se reserva el derecho de modificar los precios para las renovaciones, comunicándolo con 30 días de antelación.</p>
              </div>
            </section>

            {/* Sección 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">5</span>
                <h2 className="text-xl font-bold text-gray-900">Obligaciones del cliente</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>El cliente se compromete a:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Facilitar el acceso al equipo en las fechas acordadas para las revisiones
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Comunicar cualquier anomalía detectada en el funcionamiento del equipo
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    No manipular ni modificar el equipo sin autorización de Uniclima
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Mantener al día los pagos del contrato
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 6 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">6</span>
                <h2 className="text-xl font-bold text-gray-900">Exclusiones del servicio</h2>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <p className="text-gray-700 mb-3">El contrato de mantenimiento <strong>NO cubre</strong>:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Averías causadas por mal uso, negligencia o manipulación indebida
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Daños causados por agentes externos (sobretensiones, inundaciones, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Reparaciones realizadas por terceros no autorizados
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Piezas de desgaste natural (filtros, juntas, etc.) salvo en Plan Premium
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Equipos con más de 15 años de antigüedad sin inspección previa
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 7 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">7</span>
                <h2 className="text-xl font-bold text-gray-900">Cancelación y desistimiento</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>El cliente puede cancelar el contrato en cualquier momento comunicándolo por escrito a info@uniclima.es.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800">Condiciones de cancelación:</p>
                      <ul className="mt-2 space-y-1 text-yellow-700">
                        <li>• Cancelación antes de los primeros 14 días: Reembolso completo</li>
                        <li>• Cancelación después de 14 días: Se facturará la parte proporcional del servicio prestado</li>
                        <li>• Si se ha realizado alguna revisión, no habrá reembolso de la misma</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 8 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">8</span>
                <h2 className="text-xl font-bold text-gray-900">Garantía del servicio</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p>Todas las intervenciones realizadas por nuestros técnicos tienen una garantía de <strong>6 meses</strong> sobre la mano de obra.</p>
                </div>
                <p className="text-sm">Los repuestos instalados tienen la garantía propia del fabricante o de Uniclima (1 año en repuestos reacondicionados).</p>
              </div>
            </section>

            {/* Sección 9 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">9</span>
                <h2 className="text-xl font-bold text-gray-900">Protección de datos</h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>Los datos personales facilitados serán tratados conforme a nuestra <a href="/privacidad" className="text-orange-500 hover:underline">Política de Privacidad</a>.</p>
                <p>El cliente puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un email a info@uniclima.es.</p>
              </div>
            </section>

            {/* Sección 10 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">10</span>
                <h2 className="text-xl font-bold text-gray-900">Legislación aplicable</h2>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <Scale className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p>Este contrato se rige por la legislación española. Para cualquier controversia, serán competentes los juzgados y tribunales del domicilio del consumidor.</p>
              </div>
            </section>

            {/* Contacto */}
            <div className="bg-gray-900 text-white rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold">¿Tienes dudas?</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Si tienes cualquier pregunta sobre estos términos, contacta con nosotros:
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="mailto:info@uniclima.es" className="text-orange-400 hover:text-orange-300">info@uniclima.es</a>
                <a href="tel:+34912345678" className="text-orange-400 hover:text-orange-300">912 345 678</a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
