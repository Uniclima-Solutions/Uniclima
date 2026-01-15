'use client'

import Link from 'next/link';
import { ArrowLeft, Building, Users, Copyright, Shield, Link2, Ban, Scale, AlertTriangle, FileWarning } from 'lucide-react';

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
                En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), a continuación se reflejan los siguientes datos:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Información de la empresa</span>
                </div>
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
                  El acceso y/o uso de este portal de Uniclima atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. <strong>El uso del sitio web implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.</strong>
                </p>
              </div>
            </section>

            {/* Sección 3 - Uso del portal */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Uso del portal
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                uniclima.es proporciona el acceso a informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Uniclima Solutions S.L. o a sus licenciantes. El USUARIO asume la responsabilidad del uso del portal.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios</strong> que Uniclima ofrece y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento legal.
                </p>
              </div>
            </section>

            {/* Sección 4 - Propiedad intelectual */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Propiedad intelectual e industrial
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Copyright className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Derechos reservados</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Uniclima Solutions S.L., por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software, textos, marcas, logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.).
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Prohibiciones</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      Quedan expresamente prohibidas la reproducción, distribución, comunicación pública y transformación de la totalidad o parte de los contenidos de esta web, con fines comerciales, sin la autorización expresa y por escrito de Uniclima Solutions S.L. <strong>La infracción de estos derechos será perseguida conforme a la legislación vigente.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 5 - Contenido técnico */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Información técnica y comercial
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FileWarning className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Exención de responsabilidad</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      La información técnica mostrada en el sitio web (especificaciones, compatibilidades, referencias, etc.) tiene carácter meramente orientativo. <strong>Uniclima no garantiza la exactitud, integridad o actualización de dicha información.</strong> Es responsabilidad del usuario verificar la compatibilidad y adecuación de los productos antes de su compra e instalación.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 6 - Exclusión de garantías */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Exclusión de garantías y responsabilidad
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Limitación de responsabilidad</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Uniclima Solutions S.L. no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo:
                </p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Errores u omisiones en los contenidos</li>
                  <li>• Falta de disponibilidad del portal</li>
                  <li>• Transmisión de virus o programas maliciosos</li>
                  <li>• Uso indebido de los contenidos por parte de los usuarios</li>
                  <li>• Decisiones tomadas en base a la información del sitio web</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm leading-relaxed">
                  <strong>Uniclima no será responsable de los daños directos, indirectos, incidentales, especiales o consecuentes</strong> que resulten del uso o la imposibilidad de uso de este sitio web o de los productos adquiridos a través del mismo, incluyendo pero no limitado a: pérdida de beneficios, interrupción de negocio, pérdida de programas u otros datos.
                </p>
              </div>
            </section>

            {/* Sección 7 - Modificaciones */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Modificaciones
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Uniclima Solutions S.L. se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal. <strong>Asimismo, se reserva el derecho de modificar en cualquier momento los precios, productos y condiciones de venta.</strong>
              </p>
            </section>

            {/* Sección 8 - Enlaces */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Enlaces
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Link2 className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-gray-900">Enlaces externos</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  En el caso de que en uniclima.es se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Uniclima no ejercerá ningún tipo de control sobre dichos sitios y contenidos. <strong>Uniclima no asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno</strong>, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
                </p>
              </div>
            </section>

            {/* Sección 9 - Derecho de exclusión */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Derecho de exclusión
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Ban className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Reserva de derechos</span>
                </div>
                <p className="text-red-700 text-sm leading-relaxed">
                  Uniclima Solutions S.L. se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso. <strong>Asimismo, se reserva el derecho de cancelar pedidos o cuentas de usuarios que considere que están haciendo un uso fraudulento o abusivo de los servicios.</strong>
                </p>
              </div>
            </section>

            {/* Sección 10 - Generalidades */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Generalidades
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Uniclima Solutions S.L. perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
              </p>
            </section>

            {/* Sección 11 - Ley aplicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Ley aplicable y jurisdicción
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  La relación entre Uniclima Solutions S.L. y el USUARIO se regirá por la normativa española vigente. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten expresamente a los Juzgados y Tribunales de Madrid, <strong>con renuncia expresa a cualquier otro fuero que pudiera corresponderles</strong>.
                </p>
              </div>
            </section>

            {/* Datos de contacto finales */}
            <section className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 text-sm text-center">
                <strong>Uniclima Solutions S.L.</strong> · CIF: B21651393<br />
                Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid<br />
                info@uniclima.es · 912 345 678
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
