'use client'

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Target, Scale, Users, Clock, UserCheck } from 'lucide-react';

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
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Política de Privacidad</h1>
                <p className="text-blue-200 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Sección 1 - Responsable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Responsable del tratamiento
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <strong>Uniclima Solutions S.L.</strong> (en adelante, "Uniclima"), con NIF B12345678 y domicilio en Calle Falsa 123, 28080 Madrid, España, es el responsable del tratamiento de los datos de carácter personal recabados a través del sitio web uniclima.es.
                </p>
              </div>
            </section>

            {/* Sección 2 - Finalidad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Finalidad del tratamiento
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Los datos personales que nos facilites serán tratados con las siguientes finalidades:</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Gestionar tu registro como usuario en el Sitio Web.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Gestionar la compra de productos, incluyendo el envío y la facturación.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Enviarte comunicaciones comerciales, en caso de que nos des tu consentimiento.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Atender tus consultas y solicitudes.
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 3 - Legitimación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Legitimación
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Base legal</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  La base legal para el tratamiento de tus datos es la <strong>ejecución de un contrato</strong> en el caso de la compra de productos, y tu <strong>consentimiento</strong> en el caso del envío de comunicaciones comerciales.
                </p>
              </div>
            </section>

            {/* Sección 4 - Destinatarios */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Destinatarios
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Cesión de datos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No cederemos tus datos a terceros, salvo obligación legal. No obstante, podrán tener acceso a tus datos los proveedores de servicios que necesiten acceder a los mismos para la prestación de sus servicios (por ejemplo, empresas de transporte).
                </p>
              </div>
            </section>

            {/* Sección 5 - Derechos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Derechos
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Te informamos de que puedes ejercer los siguientes derechos:</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Acceso:</strong> derecho a obtener confirmación sobre si estamos tratando datos personales que te conciernen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Rectificación:</strong> derecho a solicitar la rectificación de los datos inexactos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Supresión:</strong> derecho a solicitar la supresión de tus datos cuando, entre otros motivos, ya no sean necesarios para los fines que fueron recogidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Limitación del tratamiento:</strong> derecho a solicitar la limitación del tratamiento de tus datos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Oposición:</strong> derecho a oponerte al tratamiento de tus datos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                    <span><strong>Portabilidad:</strong> derecho a recibir los datos personales que nos hayas facilitado en un formato estructurado, de uso común y lectura mecánica.</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  Para ejercer estos derechos, puedes dirigirte por escrito a Uniclima Solutions S.L., Calle Falsa 123, 28080 Madrid, España, o a través del correo electrónico <a href="mailto:info@uniclima.es" className="text-blue-600 hover:underline">info@uniclima.es</a>, adjuntando una copia de tu DNI.
                </p>
              </div>
            </section>

            {/* Sección 6 - Conservación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Conservación de los datos
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Plazo de conservación</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Conservaremos tus datos mientras se mantenga la relación contractual y, posteriormente, durante los plazos legalmente establecidos.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
