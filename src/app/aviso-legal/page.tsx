'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs';
import { Building, Users, Copyright, Shield, Link2, Ban, Scale, AlertTriangle, FileWarning, MessageSquare, Database } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.avisoLegal} />

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cabecera del documento */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Aviso Legal</h1>
                <p className="text-slate-300 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Sección 1 - Datos identificativos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Datos identificativos (LSSI)
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Titular:</strong> Uniclima Solutions S.L.</li>
                  <li><strong>CIF:</strong> B21651393</li>
                  <li><strong>Domicilio social:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España</li>
                  <li><strong>Correo electrónico:</strong> info@uniclima.es</li>
                  <li><strong>Teléfono:</strong> 912 345 678</li>
                  <li><strong>Datos registrales:</strong> Inscrita en el Registro Mercantil de Madrid</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Objeto y aceptación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Objeto y aceptación
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El presente Aviso Legal regula el uso del sitio web uniclima.es. El acceso y uso del sitio web implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, así como en las Condiciones de Venta y la Política de Privacidad.
              </p>
            </section>

            {/* Sección 3 - Propiedad intelectual */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Propiedad intelectual e industrial
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Copyright className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-gray-900">Contenido de Uniclima</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Todos los derechos de propiedad intelectual e industrial del sitio web y sus contenidos (textos, imágenes, software, marcas, logotipos, etc.) son titularidad de Uniclima Solutions S.L. o de sus licenciantes. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Contenido generado por el usuario</h3>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        Al enviar cualquier contenido al sitio web (por ejemplo, vídeos para la promoción "Pieza Gratis"), el usuario cede a Uniclima Solutions S.L. una licencia no exclusiva, mundial, perpetua, irrevocable y transferible para usar, reproducir, distribuir, modificar y explotar dicho contenido por cualquier medio y para cualquier fin, tal y como se detalla en los <Link href="/terminos-cesion-video" className="font-semibold hover:underline">Términos y Condiciones de Cesión de Derechos de Vídeo</Link>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4 - Exclusión de responsabilidad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Exclusión de garantías y responsabilidad
              </h2>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FileWarning className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-amber-800 mb-1">Carácter orientativo de la información técnica</h3>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        La información técnica (compatibilidades, referencias, especificaciones) se proporciona con carácter meramente orientativo. <strong>Uniclima no garantiza su exactitud y no se hace responsable de las decisiones tomadas en base a ella.</strong> Es responsabilidad exclusiva del cliente verificar la compatibilidad del producto con su equipo, preferiblemente con la ayuda de un profesional cualificado, antes de la compra e instalación.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-gray-900">Limitación general de responsabilidad</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Uniclima no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal, o la transmisión de virus. La responsabilidad de Uniclima en relación con cualquier producto adquirido en el sitio web estará limitada estrictamente al precio de compra de dicho producto.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 5 - Derecho de exclusión */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Derecho de exclusión
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Ban className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Reserva de derechos</span>
                </div>
                <p className="text-red-700 text-sm leading-relaxed">
                  Uniclima Solutions S.L. se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de preaviso a aquellos usuarios que incumplan las presentes condiciones o realicen un uso fraudulento o abusivo del sitio web.
                </p>
              </div>
            </section>

            {/* Sección 6 - Ley aplicable y jurisdicción */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Ley aplicable y jurisdicción
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La relación entre Uniclima y el usuario se regirá por la normativa española vigente.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Si eres un consumidor
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Conforme al artículo 90.2 del TRLGDCU, cualquier controversia se someterá a los <strong>Juzgados y Tribunales del domicilio del consumidor</strong>.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Si eres una empresa
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Para cualquier controversia, ambas partes se someten, con renuncia expresa a cualquier otro fuero, a los <strong>Juzgados y Tribunales de la ciudad de Madrid</strong>.
                  </p>
                </div>
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
