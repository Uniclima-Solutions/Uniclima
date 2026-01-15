'use client'

import Link from 'next/link';
import { ArrowLeft, Shield, Database, Clock, Users, Lock, FileText, Mail, AlertTriangle, Scale } from 'lucide-react';

export default function PrivacidadPage() {
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Política de Privacidad</h1>
                <p className="text-blue-200 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Introducción */}
            <section>
              <p className="text-gray-600 leading-relaxed">
                En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos sobre el tratamiento de sus datos personales.
              </p>
            </section>

            {/* Sección 1 - Responsable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Responsable del tratamiento
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Responsable:</strong> Uniclima Solutions S.L.</li>
                  <li><strong>CIF:</strong> B21651393</li>
                  <li><strong>Dirección:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España</li>
                  <li><strong>Correo electrónico:</strong> info@uniclima.es</li>
                  <li><strong>Teléfono:</strong> 912 345 678</li>
                  <li><strong>Delegado de Protección de Datos:</strong> dpd@uniclima.es</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Datos recogidos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Datos personales que recogemos
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Categorías de datos</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos identificativos:</strong> nombre, apellidos, DNI/NIF/NIE, dirección postal, teléfono, correo electrónico.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos de facturación:</strong> datos bancarios, información fiscal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, cookies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos de compra:</strong> historial de pedidos, productos adquiridos, incidencias.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Contenido multimedia:</strong> vídeos y fotografías enviados en promociones (ej: Pieza Gratis).</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 3 - Finalidades */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Finalidades del tratamiento
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">3.1. Gestión de la relación comercial</h3>
                  <p className="text-gray-600 text-sm">Gestionar pedidos, envíos, facturación, atención al cliente, garantías y devoluciones.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Ejecución de contrato</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">3.2. Comunicaciones comerciales</h3>
                  <p className="text-gray-600 text-sm">Envío de ofertas, promociones y novedades relacionadas con nuestros productos.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Consentimiento del interesado</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">3.3. Gestión de incidencias y reclamaciones</h3>
                  <p className="text-gray-600 text-sm">Atender y resolver incidencias, reclamaciones y solicitudes de los clientes.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Interés legítimo / Ejecución de contrato</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-medium text-amber-900 mb-2">3.4. Defensa legal y gestión de cobros</h3>
                  <p className="text-amber-800 text-sm">
                    <strong>Conservación de datos para la defensa de nuestros intereses legítimos</strong>, incluyendo la gestión de impagos, reclamaciones judiciales y extrajudiciales, y la comunicación a empresas de gestión de cobros y abogados.
                  </p>
                  <p className="text-amber-700 text-xs mt-1"><strong>Base legal:</strong> Interés legítimo del responsable</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">3.5. Cumplimiento de obligaciones legales</h3>
                  <p className="text-gray-600 text-sm">Cumplir con las obligaciones fiscales, contables y de prevención de fraude.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Obligación legal</p>
                </div>
              </div>
            </section>

            {/* Sección 4 - Comunicación a terceros */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Comunicación de datos a terceros
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Destinatarios de los datos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Sus datos podrán ser comunicados a:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Empresas de transporte:</strong> para la entrega de pedidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Entidades bancarias:</strong> para la gestión de pagos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Administraciones públicas:</strong> en cumplimiento de obligaciones legales.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Comunicación para gestión de cobros</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      <strong>En caso de impago o deuda pendiente</strong>, sus datos podrán ser comunicados a:
                    </p>
                    <ul className="space-y-1 text-red-700 text-sm mt-2">
                      <li>• Empresas de gestión de cobros y recobro</li>
                      <li>• Ficheros de solvencia patrimonial y crédito (ASNEF, Equifax, etc.)</li>
                      <li>• Abogados y procuradores para acciones judiciales</li>
                      <li>• Juzgados y tribunales competentes</li>
                    </ul>
                    <p className="text-red-700 text-xs mt-2"><strong>Base legal:</strong> Interés legítimo del responsable en la recuperación de deudas</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 5 - Conservación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Plazos de conservación
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Períodos de retención</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos de clientes:</strong> Durante la relación comercial y 6 años adicionales (obligaciones fiscales y contables).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos de facturación:</strong> 6 años (Código de Comercio).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Datos para defensa legal:</strong> Hasta la prescripción de las acciones legales (hasta 15 años según el tipo de acción).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Vídeos de promociones:</strong> Indefinidamente según los términos de cesión aceptados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Comunicaciones comerciales:</strong> Hasta que retire su consentimiento.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 6 - Derechos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Derechos del interesado
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Puede ejercer los siguientes derechos enviando una solicitud a <a href="mailto:dpd@uniclima.es" className="text-blue-600 hover:underline">dpd@uniclima.es</a> junto con copia de su DNI:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Acceso</span>
                    <p className="text-gray-500 text-xs">Conocer qué datos tratamos</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Rectificación</span>
                    <p className="text-gray-500 text-xs">Corregir datos inexactos</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Supresión</span>
                    <p className="text-gray-500 text-xs">Eliminar sus datos</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Oposición</span>
                    <p className="text-gray-500 text-xs">Oponerse al tratamiento</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Limitación</span>
                    <p className="text-gray-500 text-xs">Limitar el tratamiento</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">Portabilidad</span>
                    <p className="text-gray-500 text-xs">Recibir sus datos en formato estructurado</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Nota importante:</strong> El ejercicio del derecho de supresión u oposición no afectará a los datos que debamos conservar por obligación legal o para la defensa de nuestros intereses legítimos (ej: datos de facturación, historial de incidencias, deudas pendientes).
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                También puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aepd.es</a>).
              </p>
            </section>

            {/* Sección 7 - Seguridad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Medidas de seguridad
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Protección de datos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima Solutions S.L. ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado. Utilizamos cifrado SSL/TLS para todas las comunicaciones y almacenamos los datos en servidores seguros.
                </p>
              </div>
            </section>

            {/* Sección 8 - Modificaciones */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Modificaciones de la política
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Uniclima Solutions S.L. se reserva el derecho de modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales. En caso de cambios significativos, se lo comunicaremos a través de nuestro sitio web o por correo electrónico.
              </p>
            </section>

            {/* Datos de contacto finales */}
            <section className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 text-sm text-center">
                <strong>Uniclima Solutions S.L.</strong> · CIF: B21651393<br />
                Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid<br />
                info@uniclima.es · dpd@uniclima.es · 912 345 678
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
