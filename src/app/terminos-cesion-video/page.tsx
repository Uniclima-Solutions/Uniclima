'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs';

import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Scale, Camera, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function TerminosCesionVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.terminosCesionVideo} />

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Título */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Documento Legal
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Términos y Condiciones de Cesión de Derechos de Vídeo
          </h1>
          <p className="text-gray-600">
            Última actualización: 15 de enero de 2026
          </p>
        </div>

        {/* AVISO IMPORTANTE - NO MOSTRAR ROSTRO */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold text-red-800 mb-2">REQUISITO INDISPENSABLE: NO MOSTRAR EL ROSTRO</h3>
              <p className="text-red-700 mb-3">
                <strong>Es condición obligatoria e indispensable</strong> que en el vídeo NO aparezca el rostro ni se revele 
                la identidad de ninguna persona. Los vídeos que muestren caras serán <strong>automáticamente descartados</strong> 
                o editados sin previo aviso.
              </p>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-red-800 text-sm">
                  <strong>Recomendación:</strong> Graba enfocando únicamente el equipo (caldera o aire acondicionado), 
                  la pieza que instalas y tus manos. Evita grabar espejos, ventanas u otras superficies reflectantes 
                  donde pueda aparecer tu imagen. Esta medida protege tu privacidad y es un requisito para la validación del vídeo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido legal */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8">
          
          {/* Sección 1: Objeto */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">1. OBJETO DEL CONTRATO</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                El presente documento establece los términos y condiciones bajo los cuales el usuario (en adelante, "el Cedente") 
                cede a <strong>UNICLIMA SOLUTIONS, S.L.</strong> (en adelante, "el Cesionario"), con domicilio social en Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid 
                y CIF B21651393, todos los derechos de propiedad intelectual e industrial sobre el contenido audiovisual 
                (en adelante, "el Vídeo") enviado a través de la plataforma web de Uniclima.
              </p>
              <p>
                Esta cesión se realiza en el marco de la promoción "Pieza Reacondicionada Gratis" y constituye un requisito 
                indispensable para la participación en dicha promoción.
              </p>
            </div>
          </section>

          {/* Sección 2: Cesión de derechos */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">2. CESIÓN DE DERECHOS DE PROPIEDAD INTELECTUAL</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                De conformidad con lo establecido en el <strong>Real Decreto Legislativo 1/1996, de 12 de abril</strong>, 
                por el que se aprueba el Texto Refundido de la Ley de Propiedad Intelectual (TRLPI), el Cedente transmite 
                al Cesionario, de forma <strong>exclusiva, irrevocable, perpetua y a título gratuito</strong>, los siguientes derechos:
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Derecho de reproducción (Art. 18 TRLPI)</p>
                    <p className="text-sm text-gray-600">Fijación directa o indirecta, provisional o permanente, por cualquier medio y en cualquier forma.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Derecho de distribución (Art. 19 TRLPI)</p>
                    <p className="text-sm text-gray-600">Puesta a disposición del público del original o copias mediante venta, alquiler, préstamo o cualquier otra forma.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Derecho de comunicación pública (Art. 20 TRLPI)</p>
                    <p className="text-sm text-gray-600">Acto por el cual una pluralidad de personas puede tener acceso a la obra sin previa distribución de ejemplares.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Derecho de transformación (Art. 21 TRLPI)</p>
                    <p className="text-sm text-gray-600">Traducción, adaptación, edición, recorte, modificación y cualquier otra modificación en su forma.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Derecho de puesta a disposición (Art. 20.2.i TRLPI)</p>
                    <p className="text-sm text-gray-600">Puesta a disposición del público de obras, por procedimientos alámbricos o inalámbricos.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 3: Alcance territorial y temporal */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">3. ALCANCE TERRITORIAL Y TEMPORAL</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                La cesión de derechos se realiza con el siguiente alcance:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Ámbito territorial:</strong> Mundial, sin limitación geográfica alguna.</li>
                <li><strong>Ámbito temporal:</strong> Por toda la duración de los derechos de propiedad intelectual según la legislación aplicable (vida del autor más 70 años tras su fallecimiento, conforme al Art. 26 TRLPI).</li>
                <li><strong>Modalidades de explotación:</strong> Todas las conocidas actualmente y las que puedan desarrollarse en el futuro.</li>
                <li><strong>Medios y soportes:</strong> Todos los existentes y los que puedan existir en el futuro, incluyendo pero no limitándose a: internet, redes sociales, televisión, publicidad, material formativo, documentación técnica, ferias y eventos.</li>
              </ul>
            </div>
          </section>

          {/* Sección 4: Usos autorizados */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">4. USOS AUTORIZADOS DEL VÍDEO</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                El Cesionario queda expresamente autorizado para utilizar el Vídeo, total o parcialmente, para los siguientes fines:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Publicación en la web corporativa de Uniclima",
                  "Difusión en redes sociales (YouTube, Instagram, TikTok, Facebook, LinkedIn, X, etc.)",
                  "Creación de material publicitario y promocional",
                  "Elaboración de contenido formativo y educativo",
                  "Documentación técnica y manuales de reparación",
                  "Presentaciones comerciales y ferias del sector",
                  "Campañas de email marketing",
                  "Colaboraciones con terceros y partners",
                  "Licenciamiento a terceros con o sin contraprestación",
                  "Creación de contenido humorístico, satírico o de entretenimiento",
                  "Compilaciones de errores comunes o situaciones didácticas",
                  "Cualquier otro uso comercial o no comercial sin limitación"
                ].map((uso, i) => (
                  <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{uso}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sección 5: Derechos de Imagen y Privacidad - NO MOSTRAR ROSTRO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">5. DERECHOS DE IMAGEN Y PRIVACIDAD</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                <p className="font-bold text-red-800 mb-3">CONDICIÓN INDISPENSABLE PARA LA VALIDEZ DE LA CESIÓN:</p>
                <p className="text-red-700">
                  Es condición <strong>indispensable</strong> para la validez de la cesión que en el Vídeo 
                  <strong> NO aparezca el rostro ni se revele la identidad de ninguna persona</strong>. 
                  El Cedente se compromete a grabar el Vídeo de forma que no se muestren caras ni datos personales 
                  que permitan la identificación de individuos.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Uniclima <strong>no se hace responsable</strong> de la aparición de rostros o datos personales en los Vídeos enviados.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">En caso de que un Vídeo contenga imágenes de personas, Uniclima se reserva el derecho de <strong>descartar el Vídeo</strong> de la Promoción o de <strong>editarlo</strong> para eliminar dichas imágenes sin previo aviso ni compensación.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">El Cedente <strong>exonera expresamente</strong> a Uniclima de cualquier responsabilidad derivada de la aparición de su imagen o la de terceros en el Vídeo.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 6: Declaraciones y garantías */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">6. DECLARACIONES Y GARANTÍAS DEL CEDENTE</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                El Cedente declara y garantiza bajo su exclusiva responsabilidad que:
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Es el <strong>único autor y titular</strong> de todos los derechos de propiedad intelectual sobre el Vídeo.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">El Vídeo es una <strong>obra original</strong> y no infringe derechos de terceros.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Ha realizado <strong>personalmente la reparación</strong> mostrada en el Vídeo.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">El Vídeo <strong>no contiene contenido ilegal</strong>, difamatorio, obsceno o que vulnere derechos de terceros.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Cuenta con el <strong>consentimiento de todas las personas</strong> que aparezcan en el Vídeo.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">No ha cedido ni licenciado previamente los derechos sobre el Vídeo a terceros de forma exclusiva.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 6: Indemnización */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">7. RESPONSABILIDAD E INDEMNIZACIÓN</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="font-medium text-red-800 mb-3">El Cedente se compromete a:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-red-700">
                  <li>Mantener indemne al Cesionario frente a cualquier reclamación de terceros derivada del incumplimiento de las garantías anteriores.</li>
                  <li>Asumir todos los costes, daños, perjuicios, gastos legales y honorarios de abogados que pudieran derivarse.</li>
                  <li>Responder por los daños directos e indirectos, incluyendo el daño reputacional, que pudiera sufrir el Cesionario.</li>
                </ul>
              </div>
              <p>
                En caso de que el Vídeo infrinja derechos de terceros o contenga información falsa, el Cesionario se reserva 
                el derecho de <strong>revocar la recompensa otorgada</strong> y exigir la devolución de la pieza o el importe reembolsado, 
                sin perjuicio de las acciones legales que pudieran corresponder.
              </p>
            </div>
          </section>

          {/* Sección 7: Requisitos técnicos */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">8. REQUISITOS TÉCNICOS DEL VÍDEO</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                Para que el Vídeo sea aceptado y validado, deberá cumplir los siguientes requisitos técnicos mínimos:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Calidad técnica</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Resolución mínima: 720p (HD)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Duración mínima: 7 minutos</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Tamaño máximo: 100 MB</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Formatos: MP4, MOV, AVI, WebM</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Calidad de grabación</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Imagen estable (sin movimientos bruscos)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Iluminación adecuada</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Audio claro y comprensible</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Enfoque correcto de los elementos</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3">Contenido obligatorio</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Mostrar claramente el código de error o síntoma del fallo</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Identificación visible de la marca y modelo del equipo</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Proceso completo de desmontaje y sustitución de la pieza</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Demostración del equipo funcionando correctamente al finalizar</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sección 8: Proceso de validación */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">9. PROCESO DE VALIDACIÓN Y RECOMPENSA</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <ol className="list-decimal list-inside space-y-3">
                <li><strong>Recepción:</strong> El Vídeo será recibido y registrado en nuestro sistema con un identificador único.</li>
                <li><strong>Revisión técnica:</strong> Nuestro equipo verificará que el Vídeo cumple los requisitos técnicos (48-72 horas).</li>
                <li><strong>Validación de contenido:</strong> Se comprobará que la reparación es real, completa y útil.</li>
                <li><strong>Comunicación:</strong> Se notificará al Cedente el resultado de la validación por email.</li>
                <li><strong>Recompensa:</strong> En caso de aprobación, se procederá a la entrega de la pieza reacondicionada o al reembolso del importe.</li>
              </ol>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Uniclima se reserva el derecho de rechazar cualquier Vídeo que no cumpla los requisitos 
                  establecidos, sin que ello genere derecho a reclamación alguna por parte del Cedente.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 9: Protección de datos */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">10. PROTECCIÓN DE DATOS PERSONALES</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                De conformidad con el <strong>Reglamento (UE) 2016/679</strong> (RGPD) y la <strong>Ley Orgánica 3/2018</strong> (LOPDGDD), 
                le informamos que los datos personales facilitados serán tratados por UNICLIMA SOLUTIONS, S.L. con la finalidad 
                de gestionar su participación en la promoción y la cesión de derechos del Vídeo.
              </p>
              <p>
                La base legal del tratamiento es el consentimiento del interesado y la ejecución del presente contrato. 
                Los datos serán conservados mientras dure la relación contractual y durante los plazos legales de prescripción.
              </p>
              <p>
                Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición 
                dirigiéndose a <strong>info@uniclima.es</strong>.
              </p>
            </div>
          </section>

          {/* Sección 10: Legislación aplicable */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">11. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 space-y-4 pl-0 sm:pl-4">
              <p>
                El presente contrato se regirá e interpretará de conformidad con la legislación española, 
                siendo de aplicación, entre otras, las siguientes normas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el Texto Refundido de la Ley de Propiedad Intelectual.</li>
                <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico.</li>
                <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</li>
                <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.</li>
                <li>Código Civil español, en lo no previsto por la normativa especial.</li>
              </ul>
              <p>
                Para cualquier controversia derivada del presente contrato, las partes se someten expresamente 
                a los Juzgados y Tribunales de la ciudad de <strong>Madrid</strong>, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>
          </section>

          {/* Aceptación */}
          <section className="border-t border-gray-200 pt-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-3">Aceptación de los Términos</h3>
              <p className="text-orange-100 mb-4">
                Al enviar el formulario de participación en la promoción "Pieza Reacondicionada Gratis", 
                el usuario declara haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones.
              </p>
              <Link 
                href="/pieza-gratis"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
              >
                Volver al formulario
              </Link>
            </div>
          </section>

        </div>

        {/* Información de contacto */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Para cualquier consulta sobre estos términos, contacte con nosotros en{' '}
            <a href="mailto:legal@uniclima.es" className="text-orange-600 hover:underline">legal@uniclima.es</a>
          </p>
          <p className="mt-2">
            UNICLIMA SOLUTIONS, S.L. · CIF: B21651393 · Madrid, España
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
