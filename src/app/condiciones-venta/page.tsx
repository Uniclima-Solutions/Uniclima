'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, ShoppingCart, Truck, RefreshCw, Shield, CreditCard, Scale, AlertTriangle, Info, Package, CheckCircle, XCircle, Wrench } from 'lucide-react';

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
            
            {/* Aviso importante sobre productos reacondicionados */}
            <section>
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Package className="w-7 h-7 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-amber-900 text-lg mb-2">Aviso Importante: Productos Reacondicionados</h2>
                    <p className="text-amber-800 leading-relaxed">
                      <strong>Todos los productos vendidos en uniclima.es son repuestos reacondicionados</strong>, salvo que se indique expresamente lo contrario en la ficha del producto. Esto significa que han sido recuperados de equipos, revisados y probados por nuestros técnicos para garantizar su correcto funcionamiento. Pueden presentar pequeños defectos estéticos (arañazos, marcas de uso) que no afectan a su funcionalidad. Al realizar un pedido, el cliente acepta expresamente esta condición.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 1 - Identificación */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Identificación del vendedor
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Razón social:</strong> Uniclima Solutions S.L.</li>
                  <li><strong>CIF:</strong> B21651393</li>
                  <li><strong>Domicilio:</strong> Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España</li>
                  <li><strong>Email:</strong> info@uniclima.es</li>
                  <li><strong>Teléfono:</strong> 912 345 678</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 - Precios y Pagos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Precios y métodos de pago
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Todos los precios mostrados en la web incluyen el IVA vigente. Los métodos de pago aceptados son: tarjeta de crédito/débito, PayPal, Bizum y transferencia bancaria.
                </p>
              </div>
            </section>

            {/* Sección 3 - Envíos */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Envíos y entregas
              </h2>
              <div className="space-y-4">
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-1">Gastos de envío a cargo del cliente</h3>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        Los gastos de envío se calculan en función del peso y destino del pedido y se muestran antes de finalizar la compra. <strong>Envío gratuito para pedidos superiores a 120€</strong> en Península Ibérica.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Responsabilidad durante el transporte</h3>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        Conforme al Art. 66 bis del TRLGDCU, el riesgo de pérdida o deterioro del producto durante el transporte recae sobre Uniclima hasta que el cliente reciba el producto. Si el paquete llega visiblemente dañado, el cliente debe indicarlo en el albarán de entrega y comunicarlo a Uniclima en un plazo de 24 horas con fotografías del daño.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4 - Garantía */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Garantía de productos reacondicionados
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Garantía de 1 año</span>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Conforme al Art. 120.2 del TRLGDCU, todos nuestros productos reacondicionados tienen una <strong>garantía de 1 año</strong> desde la fecha de entrega. Al adquirir un producto reacondicionado, el cliente acepta expresamente esta reducción de garantía respecto a los productos nuevos.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />La garantía cubre:</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Defectos de funcionamiento que impidan el uso normal del producto</li>
                    <li>• Fallos que se manifiesten durante el período de garantía y que no existieran en el momento de la entrega</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h3 className="font-medium text-red-800 mb-2 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500" />La garantía NO cubre:</h3>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Defectos estéticos menores (arañazos, marcas, decoloración) propios del reacondicionado</li>
                    <li>• Daños causados por una instalación incorrecta o manipulación indebida</li>
                    <li>• Desgaste normal derivado del uso</li>
                    <li>• Daños causados por sobretensiones, cortocircuitos, agua o agentes externos</li>
                    <li>• Productos que hayan sido modificados o reparados por terceros no autorizados</li>
                    <li>• Incompatibilidad del producto con el equipo del cliente</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sección 5 - Derecho de desistimiento */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Derecho de desistimiento (devoluciones)
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Conforme al Art. 102 del TRLGDCU, el cliente tiene derecho a desistir del contrato en un plazo de <strong>14 días naturales</strong> desde la recepción del producto, sin necesidad de justificación.
                  </p>
                </div>
                
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-2">Gastos de devolución a cargo del cliente</h3>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        Conforme al Art. 108.1 del TRLGDCU, <strong>los gastos directos de devolución del producto corren a cargo del cliente</strong>. El cliente deberá enviar el producto a nuestra dirección utilizando el medio de transporte que prefiera, siendo responsable de que llegue en perfectas condiciones.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Condiciones para ejercer el desistimiento:</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                      <span>El producto debe estar <strong>sin usar, sin instalar y en su embalaje original</strong> con todos sus accesorios.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                      <span>El cliente puede manipular el producto únicamente para comprobar su naturaleza y características, de la misma forma que lo haría en una tienda física, <strong>sin conectarlo ni instalarlo</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                      <span>Comunicar la decisión de desistir enviando un email a info@uniclima.es dentro del plazo de 14 días.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-800 mb-2">Depreciación por manipulación (Art. 108.2 TRLGDCU)</h3>
                      <p className="text-red-700 text-sm leading-relaxed">
                        Si el producto devuelto muestra signos de haber sido <strong>conectado, instalado, probado en un equipo o manipulado</strong> más allá de lo necesario para verificar su estado, Uniclima podrá <strong>descontar del reembolso la depreciación</strong> correspondiente. En el caso de productos que ya no puedan venderse como reacondicionados (por ejemplo, placas electrónicas que hayan sido conectadas), la depreciación puede llegar hasta el 100% del valor del producto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 6 - Proceso de reclamación por garantía */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Reclamaciones por garantía
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Si el producto presenta un defecto de funcionamiento cubierto por la garantía, el cliente debe:
                </p>
                <ol className="space-y-2 text-gray-600 text-sm list-decimal list-inside">
                  <li>Contactar con Uniclima (info@uniclima.es o 912 345 678) describiendo el problema con detalle.</li>
                  <li>Enviar el producto defectuoso a nuestra dirección. <strong>Los gastos de envío para reclamaciones por garantía corren a cargo del cliente inicialmente</strong>.</li>
                  <li>Uniclima verificará el defecto. Si está cubierto por la garantía, procederá a la reparación, sustitución o reembolso.</li>
                  <li><strong>Si el defecto está cubierto por la garantía</strong>, Uniclima reembolsará los gastos de envío razonables y asumirá el envío del producto reparado o sustituido.</li>
                  <li><strong>Si el defecto NO está cubierto</strong> (por ejemplo, daño por mala instalación), el cliente asumirá todos los gastos.</li>
                </ol>
              </div>
            </section>

            {/* Sección 7 - Limitación de responsabilidad */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Responsabilidad del cliente y limitaciones
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><Wrench className="w-5 h-5 text-orange-600" />Verificación de compatibilidad</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    La información técnica (compatibilidades, referencias, modelos) se proporciona con carácter orientativo. <strong>Es responsabilidad exclusiva del cliente verificar la compatibilidad del producto con su equipo antes de la compra e instalación</strong>, preferiblemente con la ayuda de un profesional cualificado. Uniclima no se hace responsable de los pedidos erróneos por falta de verificación.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Instalación profesional</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Los productos comercializados son repuestos técnicos que deben ser instalados por profesionales cualificados. Uniclima no se hace responsable de los daños derivados de una instalación incorrecta, manipulación indebida o uso inadecuado del producto.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 8 - Jurisdicción */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Ley aplicable y jurisdicción
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Estas condiciones se rigen por la legislación española, en particular por el Real Decreto Legislativo 1/2007 (TRLGDCU). Para cualquier controversia, el consumidor podrá acudir a los Juzgados y Tribunales de su domicilio o a la plataforma europea de resolución de litigios en línea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://ec.europa.eu/consumers/odr</a>.
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
