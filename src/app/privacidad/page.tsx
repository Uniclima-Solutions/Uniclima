
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs';

import Link from 'next/link';
import { ArrowLeft, Shield, Database, Clock, Users, Lock, FileText, Mail, AlertTriangle, Scale } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.privacidad} />

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
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
                En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos sobre cómo tratamos sus datos personales.
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
                  <li><strong>Delegado de Protección de Datos (DPD):</strong> <a href="mailto:dpd@uniclima.es" className="text-blue-600 hover:underline">dpd@uniclima.es</a></li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Finalidades y Bases Legales */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Finalidades y Bases Legales del Tratamiento
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">2.1. Gestión de la relación contractual</h3>
                  <p className="text-gray-600 text-sm">Gestionar pedidos, envíos, facturación, atención al cliente, garantías y devoluciones.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Ejecución de un contrato (Art. 6.1.b RGPD)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">2.2. Comunicaciones comerciales</h3>
                  <p className="text-gray-600 text-sm">Envío de ofertas, promociones y novedades sobre nuestros productos.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Consentimiento del interesado (Art. 6.1.a RGPD)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">2.3. Cumplimiento de obligaciones legales</h3>
                  <p className="text-gray-600 text-sm">Cumplir con las obligaciones fiscales, contables y de prevención de fraude.</p>
                  <p className="text-blue-600 text-xs mt-1"><strong>Base legal:</strong> Obligación legal (Art. 6.1.c RGPD)</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-2">2.4. Defensa de nuestros intereses legítimos</h3>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        Tratamos sus datos para la prevención del fraude, la gestión de impagos, la defensa ante reclamaciones y la protección de nuestros derechos.
                      </p>
                      <p className="text-amber-700 text-xs mt-2"><strong>Base legal:</strong> Interés legítimo del responsable (Art. 6.1.f RGPD)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 3 - Comunicación a terceros */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Comunicación de datos a terceros
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sus datos podrán ser comunicados a empresas de transporte, entidades bancarias y Administraciones Públicas para cumplir con nuestras obligaciones contractuales y legales.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-800 mb-2">Comunicación por impago</h3>
                      <p className="text-red-700 text-sm leading-relaxed">
                        <strong>En caso de impago de una deuda cierta, vencida y exigible</strong>, y tras haberle requerido el pago sin éxito, sus datos podrán ser comunicados a <strong>ficheros de solvencia patrimonial y crédito (ej. ASNEF, Equifax)</strong>, así como a empresas de gestión de cobros y asesores legales para la reclamación de la deuda.
                      </p>
                      <p className="text-red-700 text-xs mt-2"><strong>Base legal:</strong> Interés legítimo del responsable (Art. 6.1.f RGPD y Art. 20 LOPDGDD)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4 - Conservación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Plazos de conservación
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Períodos de retención</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Datos contractuales:</strong> Mientras dure la relación comercial y, posteriormente, durante los plazos legales para la formulación, ejercicio o defensa de reclamaciones (hasta 15 años).</li>
                  <li><strong>Datos de facturación:</strong> 6 años (Código de Comercio).</li>
                  <li><strong>Datos para marketing:</strong> Hasta que retire su consentimiento.</li>
                  <li><strong>Vídeos de promociones:</strong> Indefinidamente según los términos de cesión aceptados.</li>
                </ul>
              </div>
            </section>

            {/* Sección 5 - Derechos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Derechos del interesado
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando una solicitud a <a href="mailto:dpd@uniclima.es" className="text-blue-600 hover:underline">dpd@uniclima.es</a> junto con copia de su DNI.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="font-bold text-amber-900 mb-2">Limitaciones al derecho de supresión</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  El ejercicio del derecho de supresión ("derecho al olvido") no afectará a los datos que debamos conservar bloqueados para el cumplimiento de obligaciones legales (ej. facturas) o para la formulación, ejercicio o defensa de reclamaciones durante los plazos de prescripción.
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                También puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aepd.es</a>).
              </p>
            </section>

            {/* Sección 6 - Seguridad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Medidas de seguridad
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado.
                </p>
              </div>
            </section>

            {/* Pie del documento */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-gray-500 text-sm text-center">
                Uniclima Solutions S.L. · CIF: B21651393 · Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
