'use client'

import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck, Truck, CreditCard, AlertTriangle, Scale, Ban, Clock, Wrench, Package } from 'lucide-react';

export default function CondicionesVentaPage() {
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
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 sm:px-10 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Condiciones Generales de Venta</h1>
                <p className="text-orange-100 text-sm">Última actualización: 15 de enero de 2026</p>
              </div>
            </div>
          </div>

          {/* Contenido legal */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            
            {/* Sección 1 - Identificación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Identificación del vendedor
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Razón Social:</strong> Uniclima Solutions S.L.</li>
                  <li><strong>CIF:</strong> B21651393</li>
                  <li><strong>Domicilio Social:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España</li>
                  <li><strong>Correo electrónico:</strong> info@uniclima.es</li>
                  <li><strong>Teléfono:</strong> 912 345 678</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Ámbito */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Ámbito de aplicación y aceptación
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Las presentes Condiciones Generales de Venta regulan la relación comercial entre Uniclima Solutions S.L. y el cliente que realice compras a través del sitio web uniclima.es.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Al realizar un pedido, el cliente declara haber leído, entendido y aceptado íntegramente las presentes Condiciones Generales de Venta.</strong> La aceptación de estas condiciones es requisito indispensable para la formalización de cualquier pedido.
                </p>
              </div>
            </section>

            {/* Sección 3 - Productos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Naturaleza de los productos
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Productos especializados</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Los productos comercializados por Uniclima son <strong>repuestos y componentes técnicos especializados</strong> para sistemas de climatización (calderas, aire acondicionado, etc.). Estos productos requieren conocimientos técnicos específicos para su correcta identificación, instalación y puesta en marcha.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Advertencia importante</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      <strong>Es responsabilidad exclusiva del cliente verificar la compatibilidad del producto con su equipo antes de realizar el pedido.</strong> Uniclima proporciona información técnica orientativa, pero no garantiza la compatibilidad con todos los modelos o versiones de equipos existentes en el mercado.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4 - Proceso de compra */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Proceso de compra y verificación
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                El cliente deberá seguir el proceso de compra establecido en el sitio web. Antes de confirmar el pedido, el cliente debe:
              </p>
              <ul className="space-y-2 text-gray-600 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                  <span>Verificar que el producto seleccionado corresponde exactamente con el repuesto que necesita.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                  <span>Comprobar la referencia, marca y modelo de su equipo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                  <span>Consultar con un profesional cualificado en caso de duda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                  <span>Revisar las especificaciones técnicas detalladas del producto.</span>
                </li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Uniclima no se hace responsable de los errores en la selección del producto por parte del cliente.</strong> Los pedidos erróneos por selección incorrecta del cliente no darán derecho a devolución una vez desprecintado el producto.
                </p>
              </div>
            </section>

            {/* Sección 5 - Precios */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Precios e impuestos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Todos los precios mostrados en el Sitio Web incluyen el Impuesto sobre el Valor Añadido (IVA) aplicable. Los gastos de envío se indicarán por separado antes de finalizar la compra. Uniclima se reserva el derecho de modificar los precios en cualquier momento, si bien los precios aplicables serán los vigentes en el momento de realizar el pedido.
              </p>
            </section>

            {/* Sección 6 - Métodos de pago */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Métodos de pago
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Métodos aceptados:</span>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Tarjeta de crédito/débito (Visa, Mastercard)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    PayPal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Bizum
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Transferencia bancaria
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 7 - Envíos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Envíos y entregas
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Plazos de entrega</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Los plazos de entrega habituales son de 24-48 horas laborables en la península para productos en stock. Los plazos indicados son orientativos y no vinculantes.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Uniclima no se hace responsable de los retrasos causados por la empresa de transporte, aduanas, o causas de fuerza mayor.</strong> El cliente deberá verificar el estado del paquete en el momento de la entrega y comunicar cualquier incidencia en un plazo máximo de 24 horas.
                </p>
              </div>
            </section>

            {/* Sección 8 - RECEPCIÓN Y VERIFICACIÓN */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Recepción y verificación obligatoria
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">OBLIGACIÓN DEL CLIENTE</h3>
                    <p className="text-red-700 text-sm leading-relaxed mb-3">
                      El cliente está obligado a verificar el producto recibido <strong>ANTES de proceder a su instalación o desprecintado</strong>. Esta verificación debe incluir:
                    </p>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Comprobación visual del estado del embalaje y producto</li>
                      <li>• Verificación de que la referencia coincide con el pedido</li>
                      <li>• Confirmación de compatibilidad con el equipo destino</li>
                      <li>• Inspección de posibles daños de transporte</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <strong>Una vez instalado o desprecintado el producto, se entenderá que el cliente ha verificado y aceptado su conformidad.</strong> No se admitirán reclamaciones posteriores por incompatibilidad, error de selección o defectos que debieran haberse detectado en la verificación previa.
                </p>
              </div>
            </section>

            {/* Sección 9 - GARANTÍA */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Garantía
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">1 año de garantía</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Todos nuestros productos tienen una garantía de 1 año desde la fecha de compra. La garantía cubre exclusivamente defectos de fabricación.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-red-800 mb-2">Exclusiones de la garantía</h3>
                <p className="text-red-700 text-sm leading-relaxed mb-2">
                  La garantía NO cubre:
                </p>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• Daños causados por instalación incorrecta o no profesional</li>
                  <li>• Daños por uso indebido, negligencia o manipulación inadecuada</li>
                  <li>• Daños por sobretensiones, cortocircuitos o instalaciones eléctricas defectuosas</li>
                  <li>• Daños por incompatibilidad con el equipo (responsabilidad del cliente)</li>
                  <li>• Desgaste normal por uso</li>
                  <li>• Productos instalados por personal no cualificado</li>
                  <li>• Productos modificados o reparados por terceros</li>
                </ul>
              </div>
            </section>

            {/* Sección 10 - DEVOLUCIONES (MUY IMPORTANTE) */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Política de devoluciones y desistimiento
              </h2>
              
              {/* Aviso MUY importante */}
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Ban className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-800 mb-2 text-lg">EXCEPCIONES AL DERECHO DE DESISTIMIENTO</h3>
                    <p className="text-red-700 text-sm leading-relaxed mb-3">
                      De conformidad con el <strong>artículo 103.e) del Real Decreto Legislativo 1/2007</strong>, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios:
                    </p>
                    <blockquote className="border-l-4 border-red-400 pl-4 italic text-red-800 text-sm mb-3">
                      "El derecho de desistimiento no será aplicable a los contratos que se refieran a: [...] e) El suministro de bienes precintados que no sean aptos para ser devueltos por razones de protección de la salud o de higiene y que hayan sido desprecintados tras la entrega."
                    </blockquote>
                    <p className="text-red-700 text-sm leading-relaxed font-semibold">
                      Los componentes electrónicos y repuestos de climatización son productos técnicos sensibles que, una vez desprecintados o instalados, no pueden ser devueltos por razones de seguridad, higiene y protección del correcto funcionamiento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">10.1. Derecho de desistimiento (productos precintados)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    El cliente dispone de 14 días naturales desde la recepción del pedido para ejercer su derecho de desistimiento <strong>únicamente si el producto permanece precintado, sin abrir y en su embalaje original</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">10.2. Productos que NO admiten devolución una vez desprecintados</h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Placas electrónicas y módulos de control</strong>
                      </li>
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Sensores, sondas y termostatos</strong>
                      </li>
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Válvulas, electroválvulas y actuadores</strong>
                      </li>
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Intercambiadores y quemadores</strong>
                      </li>
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Cualquier componente eléctrico o electrónico</strong>
                      </li>
                      <li className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <strong>Productos que hayan sido instalados, probados o manipulados</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">10.3. Motivos de rechazo de devolución</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm leading-relaxed mb-2">
                      Uniclima se reserva el derecho de rechazar cualquier devolución si:
                    </p>
                    <ul className="space-y-1 text-amber-800 text-sm">
                      <li>• El producto ha sido desprecintado, abierto o manipulado</li>
                      <li>• El producto presenta signos de instalación o uso</li>
                      <li>• El producto no está en su embalaje original completo</li>
                      <li>• Han transcurrido más de 14 días desde la recepción</li>
                      <li>• El producto fue adquirido por error de selección del cliente</li>
                      <li>• El producto es incompatible por no haber verificado previamente</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">10.4. Proceso de devolución</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Para solicitar una devolución, el cliente deberá contactar previamente con nuestro servicio de atención al cliente a través del correo electrónico <a href="mailto:info@uniclima.es" className="text-orange-600 hover:underline">info@uniclima.es</a> indicando el número de pedido y motivo. <strong>Los gastos de envío de la devolución correrán siempre a cargo del cliente.</strong> El reembolso se realizará una vez verificado el estado del producto.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 11 - Limitación de responsabilidad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Limitación de responsabilidad
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <strong>Uniclima Solutions S.L. no será responsable de:</strong>
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></span>
                    <span>Daños directos o indirectos derivados de la instalación incorrecta del producto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></span>
                    <span>Daños a terceros equipos o instalaciones causados por el uso del producto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></span>
                    <span>Lucro cesante, pérdida de beneficios o daños consecuenciales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></span>
                    <span>Incompatibilidad del producto con el equipo del cliente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></span>
                    <span>Errores en la información técnica proporcionada por fabricantes o terceros.</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  En cualquier caso, la responsabilidad máxima de Uniclima se limitará al importe del producto adquirido.
                </p>
              </div>
            </section>

            {/* Sección 12 - Instalación profesional */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">12</span>
                Recomendación de instalación profesional
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-amber-900">Instalación por profesionales</span>
                </div>
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Uniclima recomienda encarecidamente que todos los productos sean instalados por profesionales cualificados y autorizados.</strong> La instalación por personal no cualificado puede provocar daños en el equipo, anular la garantía del fabricante y suponer riesgos para la seguridad. Uniclima no se hace responsable de los daños derivados de instalaciones realizadas por personal no cualificado.
                </p>
              </div>
            </section>

            {/* Sección 13 - Resolución de conflictos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">13</span>
                Resolución de conflictos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                En caso de controversia, las partes intentarán resolver el conflicto de forma amistosa. En caso de no alcanzar un acuerdo, el cliente podrá acudir a la plataforma de resolución de litigios en línea de la Unión Europea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
              </p>
            </section>

            {/* Sección 14 - Ley aplicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">14</span>
                Ley aplicable y jurisdicción
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Jurisdicción</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Las presentes Condiciones Generales de Venta se regirán por la legislación española. Para cualquier controversia que pudiera derivarse de las mismas, las partes se someten a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
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
