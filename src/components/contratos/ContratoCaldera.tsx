'use client';

/**
 * CONTRATO DE MANTENIMIENTO PARA CALDERA DE GAS
 * Uniclima Solutions S.L. - CIF B21651393
 * 
 * DISEÑO MEJORADO:
 * - Texto pequeño (text-xs / 10pt) pero legible
 * - Títulos capitalizados (uppercase)
 * - Diseño compacto y profesional
 * - Bien mimetizado para visualización en scroll
 */

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
      <div ref={ref} className="bg-white p-6 max-w-4xl mx-auto text-gray-800" style={{ fontSize: '10pt', lineHeight: '1.4' }}>
        {/* Cabecera */}
        <div className="text-center mb-5 border-b-2 border-gray-300 pb-4">
          <h1 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-1">
            Contrato de Mantenimiento
          </h1>
          <h2 className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
            Para Caldera de Gas
          </h2>
          <div className="flex justify-between text-[9pt] text-gray-600">
            <span><strong>Nº Contrato:</strong> {datosContrato.numeroContrato}</span>
            <span><strong>Fecha:</strong> {formatDate(datosContrato.fechaInicio)}</span>
          </div>
        </div>

        {/* Partes */}
        <div className="mb-4">
          <h3 className="text-[10pt] font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Partes Contratantes
          </h3>
          
          <div className="mb-2">
            <p className="mb-1"><strong className="uppercase text-[9pt]">El Proveedor:</strong></p>
            <p className="ml-3 text-[9pt]">
              <strong>Uniclima Solutions S.L.</strong>, CIF B21651393, Calle Grafito 12, Nave 14 A, 
              28850 Torrejón de Ardoz, Madrid, en adelante "EL PROVEEDOR".
            </p>
          </div>

          <div>
            <p className="mb-1"><strong className="uppercase text-[9pt]">El Cliente:</strong></p>
            <p className="ml-3 text-[9pt]">
              <strong>{datosCliente.razonSocial}</strong>, NIF/CIF {datosCliente.nif}, domicilio en {direccionCompleta()}, 
              teléfono {datosCliente.telefono}, email {datosCliente.email}, en adelante "EL CLIENTE".
            </p>
          </div>
        </div>

        {/* Cláusulas */}
        <div className="mb-4">
          <h3 className="text-[10pt] font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Cláusulas del Contrato
          </h3>

          {/* Cláusula I */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">I. Objeto del Contrato</h4>
            <p className="text-justify text-[9pt] mb-1">
              El Proveedor prestará servicios de mantenimiento para {datosContrato.cantidad} caldera(s) de gas 
              en el domicilio indicado. Vigencia: <strong>un (1) año</strong> desde la fecha de inicio.
              <strong> No se cobrarán gastos por mano de obra ni desplazamientos</strong> en averías cubiertas. 
              Los repuestos, componentes o gas serán abonados por el Cliente según tarifa vigente.
            </p>
          </div>

          {/* Cláusula II */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">II. Precio y Forma de Pago</h4>
            <p className="text-justify text-[9pt] mb-1">
              Importe anual: <strong>{formatCurrency(datosContrato.precioAnual)}</strong> (sin IVA) / 
              <strong> {formatCurrency(datosContrato.precioConIVA)}</strong> (IVA incluido) - Plan <strong>{datosContrato.plan}</strong>.
              Pago mediante domiciliación bancaria o tarjeta. Cobro automático en fecha de renovación.
              Incluye {getPlanDescription()}.
            </p>
          </div>

          {/* Cláusula III */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">III. Servicios Incluidos</h4>
            <ul className="list-disc ml-4 text-[9pt] space-y-0.5">
              <li>Comprobación del quemador y sistema de encendido</li>
              <li>Verificación de estanqueidad del circuito de gas</li>
              <li>Análisis de combustión y ajuste de parámetros</li>
              <li>Limpieza del intercambiador y cámara de combustión</li>
              <li>Verificación del sistema de evacuación de gases</li>
              <li>Comprobación de presión y purgado de radiadores</li>
              <li>Revisión del vaso de expansión y válvula de seguridad</li>
              <li>Emisión del certificado de mantenimiento (RITE)</li>
            </ul>
          </div>

          {/* Cláusula IV */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">IV. Beneficios del Mantenimiento</h4>
            <p className="text-[9pt]">
              <strong>Seguridad:</strong> Prevención de fugas y fallos. <strong>Cumplimiento legal:</strong> Obligatorio según RITE. 
              <strong> Eficiencia:</strong> Reducción del consumo. <strong>Prevención:</strong> Detección temprana de problemas. 
              <strong> Durabilidad:</strong> Prolonga la vida útil del equipo.
            </p>
          </div>

          {/* Cláusula V */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">V. Exclusiones</h4>
            <ul className="list-disc ml-4 text-[9pt] space-y-0.5">
              <li>Coste de repuestos, piezas, componentes o materiales</li>
              <li>Coste del gas refrigerante o cualquier otro fluido</li>
              <li>Averías por mal uso, negligencia o manipulación indebida</li>
              <li>Daños por fenómenos atmosféricos o fuerza mayor</li>
              <li>Reparaciones de instalaciones defectuosas no realizadas por el Proveedor</li>
              <li>Servicios fuera del horario laboral (L-V 9:00-18:00)</li>
              <li>Calderas con más de 15 años o que no cumplan normativa</li>
              <li>Equipos modificados o reparados por terceros no autorizados</li>
            </ul>
          </div>

          {/* Cláusula VI */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">VI. Obligaciones del Cliente</h4>
            <p className="text-[9pt]">
              Facilitar acceso al domicilio para revisiones. Comunicar anomalías detectadas. 
              No manipular ni permitir que terceros manipulen el equipo. Mantener datos de contacto actualizados. 
              Abonar puntualmente el contrato y repuestos necesarios.
            </p>
          </div>

          {/* Cláusula VII - IMPORTANTE */}
          <div className="mb-3 bg-yellow-50 p-2 rounded border-l-3 border-yellow-500">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">VII. Duración, Renovación y Cancelación</h4>
            <p className="text-[9pt] mb-1">
              Duración: <strong>un (1) año</strong>, renovación automática por períodos sucesivos.
            </p>
            <p className="text-[9pt] font-semibold text-yellow-800">
              IMPORTANTE: Para cancelar, comunicar con <strong>un (1) mes de antelación</strong> antes de la renovación 
              a info@uniclima.es o al 912 345 678. Sin comunicación en plazo, se renovará y cobrará automáticamente.
            </p>
          </div>

          {/* Cláusula VIII */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">VIII. Garantía del Servicio</h4>
            <p className="text-[9pt]">
              Garantía de <strong>seis (6) meses</strong> desde cada intervención. Cubre exclusivamente mano de obra. 
              Repuestos y materiales tienen la garantía del fabricante.
            </p>
          </div>

          {/* Cláusula IX */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">IX. Responsabilidades y Limitaciones</h4>
            <p className="text-[9pt]">
              El Proveedor no responde de: daños por mal estado previo no comunicado, averías ajenas a su intervención, 
              interrupciones por fuerza mayor, daños consecuenciales o lucro cesante. 
              Responsabilidad máxima limitada al importe anual del contrato.
            </p>
          </div>

          {/* Cláusula X */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">X. Protección de Datos</h4>
            <p className="text-[9pt]">
              Conforme al RGPD y LOPDGDD, el Cliente consiente el tratamiento de sus datos para gestionar la relación contractual. 
              Derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición en info@uniclima.es.
            </p>
          </div>

          {/* Cláusula XI */}
          <div className="mb-3">
            <h4 className="font-bold text-gray-900 uppercase text-[9pt] mb-1">XI. Legislación y Jurisdicción</h4>
            <p className="text-[9pt]">
              Contrato regido por legislación española. Las partes se someten a los Juzgados y Tribunales de Madrid.
            </p>
          </div>
        </div>

        {/* Firmas */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          <p className="text-center mb-4 text-[8pt] text-gray-600">
            En prueba de conformidad, ambas partes firman el presente contrato en la fecha indicada.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="font-bold text-[9pt] uppercase mb-1">El Proveedor</p>
              <p className="text-[8pt] text-gray-600 mb-2">Uniclima Solutions S.L.</p>
              {mostrarFirmaEmpresa ? (
                <div className="h-14 border-b border-gray-400 mb-1 flex items-end justify-center">
                  <span className="text-[8pt] text-gray-500 italic">Firma digital autorizada</span>
                </div>
              ) : (
                <div className="h-14 border-b border-gray-400 mb-1"></div>
              )}
              <p className="text-[7pt] text-gray-500">Firma y sello</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-[9pt] uppercase mb-1">El Cliente</p>
              <p className="text-[8pt] text-gray-600 mb-2">{datosCliente.razonSocial}</p>
              {firmaCliente ? (
                <div className="h-14 border-b border-gray-400 mb-1 flex items-end justify-center">
                  <img src={firmaCliente} alt="Firma del cliente" className="max-h-12 max-w-full" />
                </div>
              ) : (
                <div className="h-14 border-b border-gray-400 mb-1"></div>
              )}
              <p className="text-[7pt] text-gray-500">Firma del cliente</p>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-4 pt-2 border-t border-gray-200 text-[7pt] text-gray-500 text-center">
          <p>Uniclima Solutions S.L. · CIF: B21651393 · Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid</p>
          <p>Tel: 912 345 678 · Email: info@uniclima.es · Web: www.uniclima.es</p>
          <p className="mt-1">Contrato nº {datosContrato.numeroContrato} · Vigencia: {formatDate(datosContrato.fechaInicio)} - {formatDate(datosContrato.fechaFin)}</p>
        </div>
      </div>
    );
  }
);

ContratoCaldera.displayName = 'ContratoCaldera';

export default ContratoCaldera;
