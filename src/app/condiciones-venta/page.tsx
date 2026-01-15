'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck, Truck, CreditCard, AlertTriangle, Scale, Ban, Clock, Wrench, Package, CheckCircle, XCircle } from 'lucide-react';

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
                  <li><strong>Registro Mercantil:</strong> Inscrita en el Registro Mercantil de Madrid</li>
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
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Productos especializados</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Los productos comercializados por Uniclima son <strong>repuestos y componentes técnicos especializados</strong> para sistemas de climatización (calderas, aire acondicionado, etc.). Estos productos requieren conocimientos técnicos específicos para su correcta identificación, instalación y puesta en marcha.
                  </p>
                </div>

                {/* Tipos de productos */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Productos Nuevos
                    </h3>
                    <p className="text-green-700 text-sm">
                      Productos originales de fábrica con todas sus garantías. Garantía legal de <strong>3 años</strong> conforme al TRLGDCU.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Wrench className="w-5 h-5" />
                      Productos Reacondicionados
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Productos revisados y reparados por técnicos cualificados. Garantía de <strong>1 año</strong> (pacto expreso conforme al art. 120.2 TRLGDCU).
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800 mb-1">Responsabilidad del cliente</h3>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        <strong>Es responsabilidad del cliente verificar la compatibilidad del producto con su equipo antes de realizar el pedido.</strong> Uniclima proporciona información técnica orientativa, pero el cliente debe confirmar la compatibilidad consultando con un profesional cualificado si tiene dudas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4 - Proceso de compra */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Proceso de compra y verificación previa
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                El cliente deberá seguir el proceso de compra establecido en el sitio web. <strong>Antes de confirmar el pedido</strong>, el cliente debe:
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
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Plazos de entrega</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Los plazos de entrega habituales son de 24-48 horas laborables en la península para productos en stock. Los plazos indicados son orientativos.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Responsabilidad durante el transporte</h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Conforme al artículo 66 bis del TRLGDCU, <strong>Uniclima asume la responsabilidad por pérdida o deterioro de los productos durante el transporte</strong> hasta que el cliente o un tercero por él designado adquiera la posesión material de los bienes.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Recepción del paquete</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    El cliente deberá verificar el estado del paquete en el momento de la entrega. Si el embalaje presenta daños visibles, el cliente debe:
                  </p>
                  <ul className="mt-2 space-y-1 text-amber-700 text-sm">
                    <li>• Indicar las reservas por escrito al transportista</li>
                    <li>• Fotografiar los daños antes de abrir el paquete</li>
                    <li>• Comunicar la incidencia a Uniclima en un plazo de 24 horas</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sección 8 - GARANTÍA */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Garantía legal
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Productos Nuevos</span>
                    </div>
                    <p className="text-green-700 text-sm leading-relaxed">
                      <strong>3 años de garantía legal</strong> conforme al artículo 120 del TRLGDCU. Durante los primeros 2 años, se presume que la falta de conformidad ya existía en el momento de la entrega.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Productos Reacondicionados</span>
                    </div>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      <strong>1 año de garantía</strong> (pacto expreso conforme al art. 120.2 TRLGDCU). El cliente acepta expresamente esta reducción al adquirir un producto reacondicionado.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">La garantía cubre:</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Defectos de fabricación
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Falta de conformidad con la descripción del producto
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Funcionamiento incorrecto no imputable al cliente
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h3 className="font-semibold text-red-800 mb-2">La garantía NO cubre:</h3>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Daños causados por instalación incorrecta o no profesional
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Daños por uso indebido, negligencia o manipulación inadecuada
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Daños por sobretensiones o instalaciones eléctricas defectuosas
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Desgaste normal por uso
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Productos modificados o reparados por terceros no autorizados
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sección 9 - DERECHO DE DESISTIMIENTO */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Derecho de desistimiento
              </h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Plazo de 14 días naturales
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Conforme al artículo 102 del TRLGDCU, el cliente tiene derecho a desistir del contrato en un plazo de <strong>14 días naturales</strong> desde la recepción del producto, sin necesidad de justificación.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Condiciones para ejercer el desistimiento</h3>
                  <p className="text-amber-700 text-sm leading-relaxed mb-2">
                    Para que la devolución sea aceptada, el producto debe cumplir las siguientes condiciones:
                  </p>
                  <ul className="space-y-1 text-amber-700 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      Estar en su embalaje original completo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      No haber sido instalado ni conectado a ningún equipo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      No presentar signos de uso más allá de lo necesario para verificar su naturaleza y características
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      Incluir todos los accesorios, manuales y documentación original
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-800 mb-2">Depreciación por manipulación</h3>
                      <p className="text-red-700 text-sm leading-relaxed">
                        Conforme al artículo 108.2 del TRLGDCU, <strong>el cliente será responsable de la disminución del valor de los bienes resultante de una manipulación de los mismos distinta a la necesaria para establecer su naturaleza, sus características o su funcionamiento</strong>.
                      </p>
                      <p className="text-red-700 text-sm leading-relaxed mt-2">
                        En caso de que el producto haya sido manipulado, probado o instalado más allá de lo estrictamente necesario para verificar su conformidad, Uniclima podrá descontar del reembolso el importe correspondiente a la depreciación del producto.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Productos instalados</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>Los productos que hayan sido instalados o conectados a un equipo no podrán ser devueltos</strong>, ya que la instalación implica una manipulación que va más allá de lo necesario para verificar la naturaleza y características del producto, y puede causar una depreciación significativa del mismo.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Gastos de devolución</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Conforme al artículo 108.1 del TRLGDCU, <strong>los gastos de devolución del producto correrán a cargo del cliente</strong>. El cliente deberá enviar el producto a nuestras instalaciones por su cuenta y riesgo.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Proceso de devolución</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Para ejercer el derecho de desistimiento, el cliente deberá:
                  </p>
                  <ol className="mt-2 space-y-1 text-gray-600 text-sm list-decimal list-inside">
                    <li>Comunicar su decisión a través de info@uniclima.es indicando el número de pedido</li>
                    <li>Enviar el producto en su embalaje original a nuestra dirección</li>
                    <li>Esperar la verificación del estado del producto por parte de Uniclima</li>
                    <li>Recibir el reembolso en un plazo máximo de 14 días desde la recepción del producto</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Sección 10 - Reclamaciones */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Reclamaciones y resolución de conflictos
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Para cualquier reclamación, el cliente puede contactar con nuestro servicio de atención al cliente a través de:
                </p>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li><strong>Email:</strong> info@uniclima.es</li>
                    <li><strong>Teléfono:</strong> 912 345 678</li>
                    <li><strong>Dirección:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Conforme al Reglamento (UE) 524/2013, informamos de la existencia de una plataforma europea de resolución de litigios en línea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
                </p>
              </div>
            </section>

            {/* Sección 11 - Legislación aplicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Legislación aplicable y jurisdicción
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Las presentes Condiciones Generales de Venta se rigen por la legislación española, en particular por el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU). Para cualquier controversia que pudiera derivarse, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor.
              </p>
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
