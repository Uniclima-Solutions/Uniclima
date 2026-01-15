'use client'

import Link from 'next/link';
import { ArrowLeft, Building, Users, Copyright, Shield, Link2, Ban, Scale } from 'lucide-react';

export default function AvisoLegalPage() {
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
                Datos identificativos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Información de la empresa</span>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Titular:</strong> Uniclima Solutions S.L.</li>
                  <li><strong>NIF:</strong> B12345678</li>
                  <li><strong>Domicilio social:</strong> Calle Falsa 123, 28080 Madrid, España</li>
                  <li><strong>Correo electrónico:</strong> info@uniclima.es</li>
                  <li><strong>Datos registrales:</strong> Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Hoja M-891011</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Usuarios */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Usuarios
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Condición de usuario</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  El acceso y/o uso de este portal de Uniclima atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
                </p>
              </div>
            </section>

            {/* Sección 3 - Uso del portal */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Uso del portal
              </h2>
              <p className="text-gray-600 leading-relaxed">
                uniclima.es proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Uniclima o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
              </p>
            </section>

            {/* Sección 4 - Propiedad intelectual */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Propiedad intelectual e industrial
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Copyright className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Derechos reservados</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Uniclima o bien de sus licenciantes.
                </p>
              </div>
            </section>

            {/* Sección 5 - Exclusión de garantías */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Exclusión de garantías y responsabilidad
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Limitación de responsabilidad</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                </p>
              </div>
            </section>

            {/* Sección 6 - Modificaciones */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Modificaciones
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Uniclima se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
              </p>
            </section>

            {/* Sección 7 - Enlaces */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Enlaces
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Link2 className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Enlaces externos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  En el caso de que en uniclima.es se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, Uniclima no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
                </p>
              </div>
            </section>

            {/* Sección 8 - Derecho de exclusión */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Derecho de exclusión
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Ban className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-gray-900">Reserva de derechos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
                </p>
              </div>
            </section>

            {/* Sección 9 - Generalidades */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Generalidades
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Uniclima perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
              </p>
            </section>

            {/* Sección 10 - Ley aplicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Ley aplicable y jurisdicción
              </h2>
              <p className="text-gray-600 leading-relaxed">
                La relación entre Uniclima y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
