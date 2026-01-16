'use client';

import React, { forwardRef } from 'react';

interface DatosCliente {
  razonSocial: string;
  nif: string;
  direccion: string;
  poblacion: string;
  codigoPostal: string;
  provincia: string;
  telefono: string;
  email: string;
  esChalet?: boolean;
  portal?: string;
  escalera?: string;
  piso?: string;
  puerta?: string;
}

interface DatosContrato {
  numeroContrato: string;
  plan: string;
  cantidad: number;
  precioAnual: number;
  precioConIVA: number;
  fechaInicio: string;
  fechaFin: string;
}

interface ContratoCalderaProps {
  datosCliente: DatosCliente;
  datosContrato: DatosContrato;
  firmaCliente?: string;
  mostrarFirmaEmpresa?: boolean;
}

const ContratoCaldera = forwardRef<HTMLDivElement, ContratoCalderaProps>(
  ({ datosCliente, datosContrato, firmaCliente, mostrarFirmaEmpresa = false }, ref) => {
    
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount);
    };

    const direccionCompleta = () => {
      let dir = datosCliente.direccion;
      if (!datosCliente.esChalet) {
        if (datosCliente.portal) dir += `, Portal ${datosCliente.portal}`;
        if (datosCliente.escalera) dir += `, Esc. ${datosCliente.escalera}`;
        if (datosCliente.piso) dir += `, ${datosCliente.piso}º`;
        if (datosCliente.puerta) dir += ` ${datosCliente.puerta}`;
      }
      dir += `, ${datosCliente.codigoPostal} ${datosCliente.poblacion}`;
      if (datosCliente.provincia) dir += ` (${datosCliente.provincia})`;
      return dir;
    };

    const getPlanDescription = () => {
      switch (datosContrato.plan) {
        case 'Esencial':
          return 'una (1) revisión anual de la caldera';
        case 'Confort':
          return 'dos (2) revisiones anuales de la caldera (una en temporada de calefacción y otra de preparación)';
        case 'Premium':
          return 'revisiones ilimitadas de la caldera durante todo el año, con prioridad en la atención';
        default:
          return 'una (1) revisión anual de la caldera';
      }
    };

    return (
      <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto font-serif text-gray-800 leading-relaxed" style={{ fontSize: '11pt' }}>
        {/* Cabecera */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CONTRATO DE MANTENIMIENTO</h1>
          <h2 className="text-xl font-semibold text-orange-600 mb-4">PARA CALDERA DE GAS</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span><strong>Nº Contrato:</strong> {datosContrato.numeroContrato}</span>
            <span><strong>Fecha:</strong> {formatDate(datosContrato.fechaInicio)}</span>
          </div>
        </div>

        {/* Partes */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">PARTES CONTRATANTES</h3>
          
          <div className="mb-4">
            <p className="mb-2"><strong>De una parte, EL PROVEEDOR:</strong></p>
            <p className="ml-4">
              <strong>Uniclima Solutions S.L.</strong>, con CIF B21651393, domiciliada en Calle Grafito 12, Nave 14 A, 
              28850 Torrejón de Ardoz, Madrid, España, representada a los efectos del presente contrato, 
              en adelante denominada "EL PROVEEDOR".
            </p>
          </div>

          <div>
            <p className="mb-2"><strong>De otra parte, EL CLIENTE:</strong></p>
            <p className="ml-4">
              <strong>{datosCliente.razonSocial}</strong>, con NIF/CIF {datosCliente.nif}, con domicilio en {direccionCompleta()}, 
              teléfono de contacto {datosCliente.telefono}, correo electrónico {datosCliente.email}, 
              en adelante denominado "EL CLIENTE".
            </p>
          </div>
        </div>

        {/* Cláusulas */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">CLÁUSULAS</h3>

          {/* Cláusula I */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA I. OBJETO DEL CONTRATO</h4>
            <p className="text-justify mb-2">
              El Proveedor prestará al Cliente servicios de mantenimiento y conservación para {datosContrato.cantidad} caldera(s) de gas 
              instalada(s) en el domicilio indicado. Este contrato garantiza la revisión, mantenimiento y conservación 
              de la(s) caldera(s) del Cliente, asegurando su óptimo funcionamiento y cumplimiento de la normativa vigente.
            </p>
            <p className="text-justify">
              Durante la vigencia del contrato, que será de <strong>un (1) año</strong> a partir de la fecha de inicio, 
              <strong> no se cobrarán gastos por mano de obra ni desplazamientos</strong> en caso de averías cubiertas. 
              Sin embargo, los costos de piezas de repuesto, componentes o gas necesarios para reparar averías o 
              desgaste deberán ser abonados por el Cliente según tarifa vigente.
            </p>
          </div>

          {/* Cláusula II */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA II. PRECIO Y FORMA DE PAGO</h4>
            <p className="text-justify mb-2">
              El Cliente abonará al Proveedor la cantidad de <strong>{formatCurrency(datosContrato.precioAnual)}</strong> (sin IVA), 
              equivalente a <strong>{formatCurrency(datosContrato.precioConIVA)}</strong> (IVA incluido), por el período anual 
              del contrato correspondiente al plan <strong>{datosContrato.plan}</strong>.
            </p>
            <p className="text-justify mb-2">
              El pago se realizará mediante domiciliación bancaria o tarjeta de crédito/débito a través de la 
              plataforma de pago seguro del Proveedor. El cobro se efectuará de forma automática en la fecha 
              de renovación del contrato.
            </p>
            <p className="text-justify">
              Este precio incluye {getPlanDescription()}, preferentemente durante los meses de septiembre a noviembre 
              (temporada de preparación para calefacción).
            </p>
          </div>

          {/* Cláusula III */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA III. SERVICIOS INCLUIDOS EN LA REVISIÓN</h4>
            <p className="text-justify mb-2">Los servicios incluidos en cada revisión anual de la caldera son:</p>
            <ul className="list-disc ml-8 mb-2 space-y-1">
              <li>Comprobación del correcto funcionamiento del quemador y sistema de encendido.</li>
              <li>Verificación de la estanqueidad del circuito de gas.</li>
              <li>Análisis de la combustión y ajuste de parámetros si fuera necesario.</li>
              <li>Limpieza del intercambiador de calor y cámara de combustión.</li>
              <li>Verificación del sistema de evacuación de gases.</li>
              <li>Comprobación de la presión del circuito de agua y purgado de radiadores si procede.</li>
              <li>Revisión del vaso de expansión y válvula de seguridad.</li>
              <li>Verificación del correcto funcionamiento del termostato y programador.</li>
              <li>Emisión del certificado de mantenimiento obligatorio según normativa RITE.</li>
            </ul>
          </div>

          {/* Cláusula IV */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA IV. BENEFICIOS DEL MANTENIMIENTO</h4>
            <ul className="list-disc ml-8 space-y-1">
              <li><strong>Seguridad:</strong> Las revisiones periódicas previenen fugas de gas y fallos eléctricos, garantizando un uso seguro del equipo.</li>
              <li><strong>Cumplimiento legal:</strong> El mantenimiento anual es obligatorio según el RITE (Reglamento de Instalaciones Térmicas en Edificios).</li>
              <li><strong>Eficiencia energética:</strong> Un mantenimiento adecuado permite un funcionamiento eficiente, reduciendo el consumo de gas y las facturas.</li>
              <li><strong>Prevención de averías:</strong> La detección temprana de problemas menores evita reparaciones más costosas en el futuro.</li>
              <li><strong>Durabilidad:</strong> El mantenimiento prolonga la vida útil de la caldera.</li>
            </ul>
          </div>

          {/* Cláusula V */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA V. EXCLUSIONES DEL CONTRATO</h4>
            <p className="text-justify mb-2">Quedan expresamente excluidos del presente contrato:</p>
            <ul className="list-disc ml-8 space-y-1">
              <li>El coste de repuestos, piezas, componentes o materiales necesarios para la reparación.</li>
              <li>El coste del gas refrigerante o cualquier otro fluido.</li>
              <li>Averías causadas por mal uso, negligencia o manipulación indebida del equipo.</li>
              <li>Daños causados por fenómenos atmosféricos, subidas de tensión o causas de fuerza mayor.</li>
              <li>Reparaciones derivadas de instalaciones defectuosas no realizadas por el Proveedor.</li>
              <li>Servicios de emergencia o intervenciones fuera del horario laboral (Lunes a Viernes de 9:00 a 18:00).</li>
              <li>Calderas con más de 15 años de antigüedad o que no cumplan la normativa vigente.</li>
              <li>Equipos que hayan sido modificados o reparados por terceros no autorizados.</li>
            </ul>
          </div>

          {/* Cláusula VI */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA VI. OBLIGACIONES DEL CLIENTE</h4>
            <p className="text-justify mb-2">El Cliente se compromete a:</p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Facilitar el acceso al domicilio para la realización de las revisiones en las fechas acordadas.</li>
              <li>Comunicar cualquier anomalía o avería detectada en el funcionamiento de la caldera.</li>
              <li>No manipular ni permitir que terceros no autorizados manipulen el equipo.</li>
              <li>Mantener actualizados sus datos de contacto para la coordinación de las visitas.</li>
              <li>Abonar puntualmente el importe del contrato y de los repuestos que pudieran ser necesarios.</li>
            </ul>
          </div>

          {/* Cláusula VII */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA VII. DURACIÓN, RENOVACIÓN Y CANCELACIÓN</h4>
            <p className="text-justify mb-2">
              El presente contrato tendrá una duración de <strong>un (1) año</strong> desde la fecha de inicio indicada, 
              renovándose automáticamente por períodos sucesivos de igual duración salvo notificación en contrario.
            </p>
            <p className="text-justify mb-2 bg-yellow-50 p-3 border-l-4 border-yellow-500">
              <strong>IMPORTANTE:</strong> Para la cancelación del contrato, el Cliente deberá comunicarlo con una 
              antelación mínima de <strong>un (1) mes</strong> antes de la fecha de renovación, mediante comunicación 
              escrita al correo electrónico info@uniclima.es o llamada telefónica al 912 345 678. 
              En caso de no recibir dicha comunicación en el plazo indicado, el contrato se renovará automáticamente 
              y se procederá al cobro del nuevo período.
            </p>
            <p className="text-justify">
              El Proveedor se reserva el derecho de no renovar el contrato comunicándolo al Cliente con al menos 
              15 días de antelación a la fecha de vencimiento.
            </p>
          </div>

          {/* Cláusula VIII */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA VIII. GARANTÍA DEL SERVICIO</h4>
            <p className="text-justify">
              El Proveedor garantiza la correcta ejecución de los trabajos de mantenimiento realizados durante un 
              período de <strong>seis (6) meses</strong> desde la fecha de cada intervención. Esta garantía cubre 
              exclusivamente la mano de obra empleada en los trabajos realizados, quedando excluidos los repuestos 
              y materiales, que tendrán la garantía ofrecida por el fabricante.
            </p>
          </div>

          {/* Cláusula IX */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA IX. RESPONSABILIDADES Y LIMITACIONES</h4>
            <p className="text-justify mb-2">
              El Proveedor no se hará responsable de:
            </p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Daños o perjuicios derivados del mal estado previo de la instalación no comunicado al Proveedor.</li>
              <li>Averías producidas por causas ajenas a su intervención directa.</li>
              <li>Interrupciones del servicio por causas de fuerza mayor o situaciones excepcionales.</li>
              <li>Daños consecuenciales o lucro cesante derivados de averías en el equipo.</li>
            </ul>
            <p className="text-justify mt-2">
              La responsabilidad máxima del Proveedor en cualquier caso quedará limitada al importe anual del contrato.
            </p>
          </div>

          {/* Cláusula X */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA X. PROTECCIÓN DE DATOS</h4>
            <p className="text-justify">
              En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, 
              de Protección de Datos Personales, el Cliente consiente el tratamiento de sus datos personales 
              por parte del Proveedor con la finalidad de gestionar la relación contractual. Los datos serán 
              conservados durante la vigencia del contrato y los plazos legales aplicables. El Cliente podrá 
              ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición 
              dirigiéndose a info@uniclima.es.
            </p>
          </div>

          {/* Cláusula XI */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-2">CLÁUSULA XI. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h4>
            <p className="text-justify">
              El presente contrato se regirá e interpretará conforme a la legislación española. Para cualquier 
              controversia que pudiera derivarse del presente contrato, las partes se someten expresamente a 
              los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </div>
        </div>

        {/* Firmas */}
        <div className="mt-10 pt-6 border-t-2 border-gray-300">
          <p className="text-center mb-6 text-sm text-gray-600">
            Y en prueba de conformidad con todo lo expuesto, ambas partes firman el presente contrato por duplicado 
            y a un solo efecto, en la fecha indicada en el encabezamiento.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="font-bold mb-2">EL PROVEEDOR</p>
              <p className="text-sm text-gray-600 mb-4">Uniclima Solutions S.L.</p>
              {mostrarFirmaEmpresa && (
                <div className="h-20 border-b border-gray-400 mb-2 flex items-end justify-center">
                  <span className="text-sm text-gray-500 italic">Firma digital autorizada</span>
                </div>
              )}
              {!mostrarFirmaEmpresa && (
                <div className="h-20 border-b border-gray-400 mb-2"></div>
              )}
              <p className="text-xs text-gray-500">Firma y sello</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold mb-2">EL CLIENTE</p>
              <p className="text-sm text-gray-600 mb-4">{datosCliente.razonSocial}</p>
              {firmaCliente ? (
                <div className="h-20 border-b border-gray-400 mb-2 flex items-end justify-center">
                  <img src={firmaCliente} alt="Firma del cliente" className="max-h-16 max-w-full" />
                </div>
              ) : (
                <div className="h-20 border-b border-gray-400 mb-2"></div>
              )}
              <p className="text-xs text-gray-500">Firma del cliente</p>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
          <p>Uniclima Solutions S.L. · CIF: B21651393 · Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid</p>
          <p>Tel: 912 345 678 · Email: info@uniclima.es · Web: www.uniclima.es</p>
          <p className="mt-2">Contrato nº {datosContrato.numeroContrato} · Vigencia: {formatDate(datosContrato.fechaInicio)} - {formatDate(datosContrato.fechaFin)}</p>
        </div>
      </div>
    );
  }
);

ContratoCaldera.displayName = 'ContratoCaldera';

export default ContratoCaldera;
