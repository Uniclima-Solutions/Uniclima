'use client'

import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, BarChart3, Globe } from 'lucide-react';

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
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Una cookie es un pequeño fichero de texto que un sitio web coloca en tu PC, teléfono o cualquier otro dispositivo, con información sobre tu navegación en dicho sitio. Las cookies son necesarias para facilitar la navegación y hacerla más amigable, y <strong>no dañan tu ordenador</strong>.
                </p>
              </div>
            </section>

            {/* Sección 2 - Tipos de cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                ¿Qué tipos de cookies utiliza este sitio web?
              </h2>
              <div className="space-y-4">
                {/* Cookies técnicas */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-gray-900">Cookies técnicas</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.
                  </p>
                </div>

                {/* Cookies de personalización */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-gray-900">Cookies de personalización</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.
                  </p>
                </div>

                {/* Cookies de análisis */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-gray-900">Cookies de análisis</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Son aquéllas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3 - Desactivar cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                ¿Cómo puedo desactivar las cookies?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. A continuación, te ofrecemos enlaces en los que encontrarás información sobre cómo puedes activar tus preferencias en los principales navegadores:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Google Chrome</span>
                  <p className="text-gray-500 text-xs mt-1">support.google.com</p>
                </a>
                <a 
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Mozilla Firefox</span>
                  <p className="text-gray-500 text-xs mt-1">support.mozilla.org</p>
                </a>
                <a 
                  href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Internet Explorer</span>
                  <p className="text-gray-500 text-xs mt-1">support.microsoft.com</p>
                </a>
                <a 
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Safari</span>
                  <p className="text-gray-500 text-xs mt-1">support.apple.com</p>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
