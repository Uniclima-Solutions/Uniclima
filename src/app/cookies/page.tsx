
'use client';

import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, BarChart3, Globe, Target, ShieldCheck, Info } from 'lucide-react';

export default function CookiesPage() {
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
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Política de Cookies</h1>
                <p className="text-amber-100 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Sección 1 - Qué son las cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                ¿Qué son las cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Una cookie es un pequeño fichero de texto que un sitio web coloca en tu dispositivo para almacenar información sobre tu navegación. Son esenciales para el funcionamiento de internet, aportando innumerables ventajas en la prestación de servicios interactivos, facilitando la navegación y usabilidad de nuestra web.
              </p>
            </section>

            {/* Sección 2 - Tipos de cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Tipos de cookies que utilizamos
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><Settings className="w-5 h-5 text-amber-600" />Cookies técnicas (necesarias)</h3>
                  <p className="text-gray-600 text-sm">Permiten la navegación y el uso de las funciones básicas (ej. gestionar el carrito de compra, proceso de pago). No requieren consentimiento.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-amber-600" />Cookies de personalización</h3>
                  <p className="text-gray-600 text-sm">Permiten recordar tus preferencias (idioma, región) para ofrecerte una experiencia personalizada.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-amber-600" />Cookies de análisis</h3>
                  <p className="text-gray-600 text-sm">Nos permiten medir y analizar el uso del sitio web de forma agregada para mejorar nuestros servicios. Utilizamos Google Analytics.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><Target className="w-5 h-5 text-amber-600" />Cookies publicitarias</h3>
                  <p className="text-gray-600 text-sm">Permiten mostrar publicidad relevante basada en tus intereses. Pueden ser instaladas por terceros (Google Ads, Facebook Pixel).</p>
                </div>
              </div>
            </section>

            {/* Sección 3 - Tabla de cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Listado de cookies utilizadas
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-900">Cookie</th>
                      <th className="text-left p-3 font-medium text-gray-900">Proveedor</th>
                      <th className="text-left p-3 font-medium text-gray-900">Finalidad</th>
                      <th className="text-left p-3 font-medium text-gray-900">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-t border-gray-200"><td colSpan={4} className="p-2 bg-gray-100 font-semibold text-gray-800">Técnicas</td></tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3">cookie_consent</td>
                      <td className="p-3">Uniclima</td>
                      <td className="p-3">Almacena el consentimiento de cookies</td>
                      <td className="p-3">1 año</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="p-3">cart_session</td>
                      <td className="p-3">Uniclima</td>
                      <td className="p-3">Mantiene los productos en el carrito</td>
                      <td className="p-3">Sesión</td>
                    </tr>
                    <tr className="border-t border-gray-200"><td colSpan={4} className="p-2 bg-gray-100 font-semibold text-gray-800">Análisis</td></tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3">_ga, _gid, _gat</td>
                      <td className="p-3">Google Analytics</td>
                      <td className="p-3">Análisis del tráfico y uso del sitio web</td>
                      <td className="p-3">Hasta 2 años</td>
                    </tr>
                    <tr className="border-t border-gray-200"><td colSpan={4} className="p-2 bg-gray-100 font-semibold text-gray-800">Publicidad</td></tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3">_fbp</td>
                      <td className="p-3">Facebook</td>
                      <td className="p-3">Remarketing y medición de campañas</td>
                      <td className="p-3">3 meses</td>
                    </tr>
                     <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="p-3">IDE, 1P_JAR</td>
                      <td className="p-3">Google Ads</td>
                      <td className="p-3">Publicidad personalizada y remarketing</td>
                      <td className="p-3">Hasta 1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sección 4 - Transferencias internacionales */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Transferencias internacionales de datos
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      El uso de cookies de terceros (Google, Facebook) puede implicar una transferencia de tus datos a Estados Unidos. Estas transferencias se realizan bajo el marco del <strong>Data Privacy Framework</strong> entre la UE y EE.UU., que proporciona garantías adecuadas. Puedes obtener más información en las políticas de privacidad de cada proveedor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 5 - Desactivar cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                ¿Cómo gestionar o desactivar las cookies?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Puedes aceptar, rechazar o configurar las cookies a través de nuestro <strong>panel de configuración de cookies</strong> (que aparecerá en tu primera visita) o mediante la configuración de tu navegador.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors">
                  <span className="font-medium text-gray-900">Google Chrome</span>
                </a>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors">
                  <span className="font-medium text-gray-900">Mozilla Firefox</span>
                </a>
                <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors">
                  <span className="font-medium text-gray-900">Microsoft Edge</span>
                </a>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors">
                  <span className="font-medium text-gray-900">Safari</span>
                </a>
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
    </div>
  );
}
