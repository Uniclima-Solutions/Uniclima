"use client";

/**
 * Contrato de Mantenimiento Dinámico
 * Genera un contrato legal blindado con los datos del cliente
 * Incluye todas las cláusulas de protección para la empresa
 */

import { useRef } from 'react';
import { FileText, Download, Printer } from 'lucide-react';

// Datos de la empresa
const EMPRESA = {
  nombre: "Uniclima Solutions S.L.",
  cif: "B21651393",
  domicilio: "Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid, España",
  email: "info@uniclima.es",
  telefono: "912 345 678",
  registro: "Registro Mercantil de Madrid, Tomo XXXXX, Folio XXX, Hoja M-XXXXXX",
};

interface DatosCliente {
  razonSocial: string;
  nif: string;
  direccion: string;
  poblacion: string;
  codigoPostal: string;
  provincia: string;
  escalera?: string;
  piso?: string;
  letra?: string;
  bloque?: string;
  esChalet: boolean;
  telefono: string;
  email: string;
  personaContacto?: string;
}

interface DatosContrato {
  plan: string;
  tipoAparato: string;
  cantidad: number;
  precioAnual: number;
  precioConIVA: number;
  fechaInicio: string;
  fechaFin: string;
  numeroContrato: string;
}

interface ContratoMantenimientoProps {
  datosCliente: DatosCliente;
  datosContrato: DatosContrato;
  firmaCliente?: string; // Base64 de la firma
  onDownload?: () => void;
}

export default function ContratoMantenimiento({
  datosCliente,
  datosContrato,
  firmaCliente,
  onDownload,
}: ContratoMantenimientoProps) {
  const contratoRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDireccionCompleta = () => {
    let direccion = datosCliente.direccion;
    if (!datosCliente.esChalet) {
      if (datosCliente.bloque) direccion += `, Bloque ${datosCliente.bloque}`;
      if (datosCliente.escalera) direccion += `, Escalera ${datosCliente.escalera}`;
      if (datosCliente.piso) direccion += `, ${datosCliente.piso}º`;
      if (datosCliente.letra) direccion += ` ${datosCliente.letra}`;
    }
    direccion += `, ${datosCliente.codigoPostal} ${datosCliente.poblacion}`;
    if (datosCliente.provincia) direccion += ` (${datosCliente.provincia})`;
    return direccion;
  };

  const getServiciosIncluidos = () => {
    const serviciosBase = [
      "Revisión anual preventiva del equipo",
      "Limpieza de componentes principales",
      "Verificación de funcionamiento y seguridad",
      "Comprobación de estanqueidad del circuito",
      "Análisis de combustión (calderas de gas)",
      "Limpieza de filtros",
      "Informe técnico tras cada intervención",
    ];

    const serviciosConfort = [
      ...serviciosBase,
      "Prioridad en la atención de averías (24-48h)",
      "Descuento del 15% en mano de obra de reparaciones",
    ];

    const serviciosPremium = [
      ...serviciosConfort,
      "Mano de obra incluida en reparaciones (excepto repuestos)",
      "Atención prioritaria en menos de 24h",
      "Descuento del 20% en repuestos",
      "Asistencia telefónica ilimitada",
    ];

    switch (datosContrato.plan) {
      case 'Premium':
        return serviciosPremium;
      case 'Confort':
        return serviciosConfort;
      default:
        return serviciosBase;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white">
      {/* Botones de acción */}
      <div className="flex justify-end gap-2 mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </button>
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        )}
      </div>

      {/* Contrato */}
      <div 
        ref={contratoRef}
        className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Cabecera */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            CONTRATO DE MANTENIMIENTO DE EQUIPOS DE CLIMATIZACIÓN
          </h1>
          <p className="text-sm text-gray-600">
            Contrato Nº: <span className="font-semibold">{datosContrato.numeroContrato}</span>
          </p>
        </div>

        {/* Partes del contrato */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            REUNIDOS
          </h2>
          
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <strong>De una parte,</strong> {EMPRESA.nombre}, con CIF {EMPRESA.cif}, 
              y domicilio social en {EMPRESA.domicilio}, inscrita en el {EMPRESA.registro}, 
              representada en este acto por su administrador (en adelante, <strong>"LA EMPRESA"</strong>).
            </p>
            
            <p>
              <strong>De otra parte,</strong> {datosCliente.razonSocial || "[NOMBRE DEL CLIENTE]"}, 
              con NIF/CIF {datosCliente.nif || "[NIF/CIF]"}, y domicilio en {getDireccionCompleta()}, 
              con teléfono de contacto {datosCliente.telefono || "[TELÉFONO]"} y correo electrónico {datosCliente.email || "[EMAIL]"}
              {datosCliente.personaContacto && `, siendo la persona de contacto ${datosCliente.personaContacto}`}
              (en adelante, <strong>"EL CLIENTE"</strong>).
            </p>

            <p>
              Ambas partes se reconocen mutuamente capacidad legal suficiente para la celebración 
              del presente contrato y, a tal efecto,
            </p>
          </div>
        </section>

        {/* Exponen */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            EXPONEN
          </h2>
          
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <strong>I.</strong> Que LA EMPRESA es una entidad dedicada a la venta de repuestos 
              y prestación de servicios de mantenimiento de equipos de climatización (calderas, 
              aires acondicionados, aerotermia y equipos relacionados).
            </p>
            
            <p>
              <strong>II.</strong> Que EL CLIENTE es propietario o usuario legítimo del/de los 
              equipo/s de climatización ubicado/s en la dirección indicada y desea contratar 
              los servicios de mantenimiento ofrecidos por LA EMPRESA.
            </p>
            
            <p>
              <strong>III.</strong> Que ambas partes han acordado celebrar el presente contrato 
              de mantenimiento con arreglo a las siguientes:
            </p>
          </div>
        </section>

        {/* Cláusulas */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            CLÁUSULAS
          </h2>
          
          <div className="space-y-6 text-sm leading-relaxed">
            {/* Primera: Objeto */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">PRIMERA.- OBJETO DEL CONTRATO</h3>
              <p>
                El presente contrato tiene por objeto la prestación por parte de LA EMPRESA de los 
                servicios de mantenimiento preventivo para <strong>{datosContrato.cantidad} equipo/s 
                de {datosContrato.tipoAparato}</strong> ubicado/s en el domicilio de EL CLIENTE, 
                bajo la modalidad de <strong>Plan {datosContrato.plan}</strong>.
              </p>
            </div>

            {/* Segunda: Servicios incluidos */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">SEGUNDA.- SERVICIOS INCLUIDOS</h3>
              <p className="mb-2">El Plan {datosContrato.plan} incluye los siguientes servicios:</p>
              <ul className="list-disc pl-6 space-y-1">
                {getServiciosIncluidos().map((servicio, index) => (
                  <li key={index}>{servicio}</li>
                ))}
              </ul>
            </div>

            {/* Tercera: Exclusiones */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">TERCERA.- EXCLUSIONES</h3>
              <p className="mb-2">
                <strong>Quedan expresamente excluidos del presente contrato:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Repuestos y piezas de recambio:</strong> El coste de cualquier repuesto 
                o pieza necesaria para la reparación del equipo será facturado aparte y deberá ser 
                abonado por EL CLIENTE.</li>
                <li><strong>Gas refrigerante:</strong> Las recargas de gas refrigerante no están 
                incluidas y se facturarán según tarifa vigente.</li>
                <li><strong>Averías por mal uso:</strong> Daños causados por negligencia, mal uso, 
                manipulación indebida o incumplimiento de las instrucciones del fabricante.</li>
                <li><strong>Daños por causas externas:</strong> Averías provocadas por sobretensiones, 
                cortes de suministro eléctrico, inundaciones, incendios u otras causas de fuerza mayor.</li>
                <li><strong>Modificaciones no autorizadas:</strong> Daños derivados de modificaciones 
                o reparaciones realizadas por terceros no autorizados.</li>
                <li><strong>Desgaste natural:</strong> Sustitución de componentes por desgaste normal 
                de uso.</li>
                <li><strong>Instalaciones defectuosas:</strong> Problemas derivados de instalaciones 
                que no cumplan la normativa vigente.</li>
              </ul>
            </div>

            {/* Cuarta: Duración */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">CUARTA.- DURACIÓN Y RENOVACIÓN</h3>
              <p>
                El presente contrato tendrá una duración de <strong>UN (1) AÑO</strong>, comenzando 
                su vigencia el día <strong>{formatDate(datosContrato.fechaInicio)}</strong> y 
                finalizando el día <strong>{formatDate(datosContrato.fechaFin)}</strong>.
              </p>
              <p className="mt-2">
                El contrato se renovará automáticamente por períodos anuales sucesivos, salvo que 
                cualquiera de las partes comunique a la otra su voluntad de no renovarlo con una 
                antelación mínima de <strong>TREINTA (30) DÍAS NATURALES</strong> a la fecha de 
                vencimiento del período en curso.
              </p>
              <p className="mt-2 font-semibold text-red-700">
                La falta de comunicación con la antelación indicada supondrá la renovación automática 
                del contrato y el cobro de la anualidad correspondiente.
              </p>
            </div>

            {/* Quinta: Precio */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">QUINTA.- PRECIO Y FORMA DE PAGO</h3>
              <p>
                El precio del presente contrato asciende a <strong>{datosContrato.precioAnual.toFixed(2)}€ 
                (IVA no incluido)</strong>, lo que supone un total de <strong>{datosContrato.precioConIVA.toFixed(2)}€ 
                (IVA incluido)</strong> anuales.
              </p>
              <p className="mt-2">
                El pago se realizará mediante <strong>domiciliación bancaria</strong> con cargo 
                automático anual. EL CLIENTE autoriza expresamente a LA EMPRESA a realizar el 
                cobro correspondiente en la fecha de renovación del contrato.
              </p>
              <p className="mt-2">
                LA EMPRESA se reserva el derecho de actualizar los precios anualmente, comunicando 
                cualquier modificación con al menos 30 días de antelación a la fecha de renovación.
              </p>
            </div>

            {/* Sexta: Obligaciones del cliente */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">SEXTA.- OBLIGACIONES DE EL CLIENTE</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Facilitar el acceso al equipo en las fechas acordadas para las revisiones.</li>
                <li>Comunicar cualquier anomalía detectada en el funcionamiento del equipo.</li>
                <li>Mantener el equipo en condiciones normales de uso.</li>
                <li>No manipular ni permitir que terceros no autorizados manipulen el equipo.</li>
                <li>Abonar puntualmente las cantidades estipuladas.</li>
                <li>Comunicar cualquier cambio de domicilio o datos de contacto.</li>
                <li>Disponer de los permisos necesarios para el acceso al inmueble.</li>
              </ul>
            </div>

            {/* Séptima: Obligaciones de la empresa */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">SÉPTIMA.- OBLIGACIONES DE LA EMPRESA</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Realizar las revisiones preventivas incluidas en el plan contratado.</li>
                <li>Emitir informe técnico tras cada intervención.</li>
                <li>Atender las solicitudes de servicio en los plazos establecidos según el plan.</li>
                <li>Utilizar personal cualificado y debidamente acreditado.</li>
                <li>Disponer de seguro de responsabilidad civil.</li>
                <li>Cumplir con la normativa vigente en materia de instalaciones térmicas.</li>
              </ul>
            </div>

            {/* Octava: Limitación de responsabilidad */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">OCTAVA.- LIMITACIÓN DE RESPONSABILIDAD</h3>
              <p>
                LA EMPRESA no será responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Daños indirectos, lucro cesante o pérdidas de producción derivadas de averías.</li>
                <li>Averías producidas por causas ajenas al mantenimiento (instalación defectuosa, 
                calidad del suministro, etc.).</li>
                <li>Retrasos en la prestación del servicio por causas de fuerza mayor.</li>
                <li>Daños causados por el uso de repuestos no originales instalados por terceros.</li>
              </ul>
              <p className="mt-2">
                En cualquier caso, la responsabilidad máxima de LA EMPRESA quedará limitada al 
                importe anual del presente contrato.
              </p>
            </div>

            {/* Novena: Resolución */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">NOVENA.- RESOLUCIÓN DEL CONTRATO</h3>
              <p>
                El contrato podrá resolverse por las siguientes causas:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Por mutuo acuerdo de las partes.</li>
                <li>Por incumplimiento de las obligaciones contractuales.</li>
                <li>Por impago de las cantidades debidas.</li>
                <li>Por desistimiento de EL CLIENTE, comunicado con 30 días de antelación.</li>
              </ul>
              <p className="mt-2 font-semibold">
                En caso de resolución anticipada por parte de EL CLIENTE sin respetar el preaviso 
                de 30 días, LA EMPRESA podrá reclamar el importe correspondiente al período no 
                cumplido del preaviso.
              </p>
            </div>

            {/* Décima: Protección de datos */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">DÉCIMA.- PROTECCIÓN DE DATOS</h3>
              <p>
                En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), 
                se informa a EL CLIENTE de que sus datos personales serán tratados por {EMPRESA.nombre} 
                con la finalidad de gestionar la relación contractual. La base legal del tratamiento 
                es la ejecución del contrato.
              </p>
              <p className="mt-2">
                Los datos se conservarán durante la vigencia del contrato y posteriormente durante 
                los plazos legales de prescripción. EL CLIENTE puede ejercer sus derechos de acceso, 
                rectificación, supresión, oposición, limitación y portabilidad dirigiéndose a {EMPRESA.email}.
              </p>
            </div>

            {/* Undécima: Jurisdicción */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">UNDÉCIMA.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h3>
              <p>
                El presente contrato se regirá e interpretará de conformidad con la legislación 
                española. Para la resolución de cualquier controversia derivada del presente contrato, 
                las partes se someten expresamente a los Juzgados y Tribunales de Madrid, con renuncia 
                expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>

            {/* Duodécima: Comunicaciones */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">DUODÉCIMA.- COMUNICACIONES</h3>
              <p>
                Todas las comunicaciones entre las partes se realizarán preferentemente por correo 
                electrónico a las direcciones indicadas en este contrato. Las comunicaciones relativas 
                a la resolución o no renovación del contrato deberán realizarse por escrito mediante 
                correo electrónico con acuse de recibo o burofax.
              </p>
            </div>
          </div>
        </section>

        {/* Firma */}
        <section className="mt-12 pt-8 border-t-2 border-gray-800">
          <p className="text-sm text-center mb-8">
            Y en prueba de conformidad con cuanto antecede, las partes firman el presente contrato 
            por duplicado ejemplar y a un solo efecto, en la fecha indicada a continuación.
          </p>
          
          <p className="text-sm text-center mb-8">
            En Madrid, a {formatDate(datosContrato.fechaInicio)}
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="font-bold mb-4">Por LA EMPRESA</p>
              <div className="h-24 border-b border-gray-400 mb-2"></div>
              <p className="text-sm">{EMPRESA.nombre}</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold mb-4">Por EL CLIENTE</p>
              {firmaCliente ? (
                <div className="h-24 flex items-center justify-center mb-2">
                  <img 
                    src={firmaCliente} 
                    alt="Firma del cliente" 
                    className="max-h-20 max-w-full"
                  />
                </div>
              ) : (
                <div className="h-24 border-b border-gray-400 mb-2"></div>
              )}
              <p className="text-sm">{datosCliente.razonSocial}</p>
              <p className="text-xs text-gray-500">NIF/CIF: {datosCliente.nif}</p>
            </div>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="mt-12 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
          <p>{EMPRESA.nombre} | CIF: {EMPRESA.cif}</p>
          <p>{EMPRESA.domicilio}</p>
          <p>Tel: {EMPRESA.telefono} | Email: {EMPRESA.email}</p>
        </footer>
      </div>
    </div>
  );
}
