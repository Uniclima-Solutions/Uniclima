/**
 * Componente de Contrato de Mantenimiento de Aire Acondicionado
 * Uniclima Solutions - CIF B21651393
 * 
 * LETRA MÁS GRANDE Y LEGIBLE
 */

import React from 'react';

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

interface ContratoAireAcondicionadoProps {
  datosCliente: DatosCliente;
  datosContrato: DatosContrato;
  firmaCliente?: string;
  mostrarFirmaEmpresa?: boolean;
}

const EMPRESA = {
  nombre: "Uniclima Solutions S.L.",
  cif: "B21651393",
  direccion: "Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid",
  telefono: "912 345 678",
  email: "info@uniclima.es",
  web: "www.uniclima.es",
};

export default function ContratoAireAcondicionado({
  datosCliente,
  datosContrato,
  firmaCliente,
  mostrarFirmaEmpresa = true,
}: ContratoAireAcondicionadoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const direccionCompleta = datosCliente.esChalet
    ? datosCliente.direccion
    : `${datosCliente.direccion}${datosCliente.portal ? `, Portal ${datosCliente.portal}` : ''}${datosCliente.escalera ? `, Esc. ${datosCliente.escalera}` : ''}${datosCliente.piso ? `, ${datosCliente.piso}` : ''}${datosCliente.puerta ? ` ${datosCliente.puerta}` : ''}`;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Cabecera */}
      <div className="text-center border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">CONTRATO DE MANTENIMIENTO</h1>
        <h2 className="text-lg font-semibold text-blue-600 mt-1">AIRE ACONDICIONADO</h2>
        <p className="text-sm text-gray-600 mt-2">Contrato N: <span className="font-mono font-bold">{datosContrato.numeroContrato}</span></p>
      </div>

      {/* Partes */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">PARTES CONTRATANTES</h3>
        
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-blue-600 mb-2">PRESTADOR DEL SERVICIO:</p>
            <p className="font-semibold">{EMPRESA.nombre}</p>
            <p>CIF: {EMPRESA.cif}</p>
            <p>{EMPRESA.direccion}</p>
            <p>Tel: {EMPRESA.telefono}</p>
            <p>Email: {EMPRESA.email}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-bold text-blue-600 mb-2">CLIENTE:</p>
            <p className="font-semibold">{datosCliente.razonSocial}</p>
            <p>NIF/CIF: {datosCliente.nif}</p>
            <p>{direccionCompleta}</p>
            <p>{datosCliente.codigoPostal} {datosCliente.poblacion}</p>
            <p>Tel: {datosCliente.telefono}</p>
            <p>Email: {datosCliente.email}</p>
          </div>
        </div>
      </div>

      {/* Objeto del contrato */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">I. OBJETO DEL CONTRATO</h3>
        <p className="text-sm text-gray-700 mb-3">
          El presente contrato tiene por objeto la prestacion del servicio de mantenimiento preventivo y correctivo 
          de <strong>{datosContrato.cantidad} equipo(s) de aire acondicionado</strong> instalado(s) en el domicilio del cliente, 
          conforme al <strong>Plan {datosContrato.plan}</strong>.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-bold text-blue-800 mb-2">SERVICIOS INCLUIDOS EN PLAN {datosContrato.plan.toUpperCase()}:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-900">
            {datosContrato.plan === 'Esencial' && (
              <>
                <li>1 revision anual completa (limpieza de filtros, comprobacion de gas, etc.)</li>
                <li>Mano de obra incluida en reparaciones</li>
                <li>Certificado de mantenimiento</li>
                <li>Atencion telefonica en horario comercial</li>
              </>
            )}
            {datosContrato.plan === 'Confort' && (
              <>
                <li>2 revisiones anuales (pre-temporada verano e invierno)</li>
                <li>Mano de obra incluida en reparaciones</li>
                <li>Certificado de mantenimiento</li>
                <li>Atencion prioritaria 48h</li>
                <li>Descuento 5% en repuestos</li>
              </>
            )}
            {datosContrato.plan === 'Premium' && (
              <>
                <li>Revisiones ilimitadas</li>
                <li>Mano de obra incluida en reparaciones</li>
                <li>Certificado de mantenimiento</li>
                <li>Atencion 24/7 prioritaria</li>
                <li>Descuento 10% en repuestos</li>
                <li>Recarga de gas incluida (hasta 500g/ano)</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Duracion y precio */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">II. DURACION Y PRECIO</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-gray-700">Vigencia del contrato:</p>
            <p>Desde: <strong>{formatDate(datosContrato.fechaInicio)}</strong></p>
            <p>Hasta: <strong>{formatDate(datosContrato.fechaFin)}</strong></p>
            <p className="text-xs text-gray-500 mt-2">Renovacion automatica anual</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-bold text-gray-700">Importe anual:</p>
            <p className="text-2xl font-bold text-green-700">{datosContrato.precioConIVA} EUR</p>
            <p className="text-xs text-gray-600">(Base: {datosContrato.precioAnual} EUR + IVA 21%)</p>
            <p className="text-xs text-gray-500 mt-1">Por {datosContrato.cantidad} equipo(s)</p>
          </div>
        </div>
      </div>

      {/* Periodo de revisiones */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-base font-bold text-blue-800 mb-2">PERIODO DE REVISIONES</h3>
        <p className="text-sm text-blue-900">
          Las revisiones de aire acondicionado se realizarán <strong>exclusivamente durante los meses de ABRIL y MAYO</strong>. 
          Las fechas concretas serán agendadas por nuestro departamento de atención al cliente, quien contactará 
          con el titular del contrato para coordinar la visita del técnico.
        </p>
        <p className="text-xs text-blue-700 mt-2">
          * No se realizarán revisiones fuera de este periodo salvo averías o urgencias.
        </p>
      </div>

      {/* Obligaciones */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">III. OBLIGACIONES DE LAS PARTES</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <p className="font-semibold">Del prestador:</p>
            <ul className="list-disc list-inside ml-4 text-xs space-y-1">
              <li>Realizar las revisiones programadas en el periodo establecido (Abril-Mayo)</li>
              <li>Limpieza de filtros y unidades interior/exterior</li>
              <li>Comprobacion de niveles de gas refrigerante</li>
              <li>Verificacion del correcto funcionamiento del equipo</li>
              <li>Atender averias en los plazos establecidos</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Del cliente:</p>
            <ul className="list-disc list-inside ml-4 text-xs space-y-1">
              <li>Facilitar el acceso al equipo en las fechas acordadas</li>
              <li>Abonar el importe del contrato en los plazos establecidos</li>
              <li>Comunicar cualquier anomalia detectada en el equipo</li>
              <li>No manipular el equipo ni realizar reparaciones por cuenta propia</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Exclusiones */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">IV. EXCLUSIONES</h3>
        <p className="text-sm text-gray-700 mb-2">Quedan excluidos del presente contrato:</p>
        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 ml-4">
          <li>Repuestos y materiales (salvo Plan Premium para recarga de gas limitada)</li>
          <li>Averias causadas por mal uso, negligencia o manipulacion</li>
          <li>Danos por causas externas (cortes de suministro, sobretensiones, etc.)</li>
          <li>Sustitucion completa del equipo o compresor</li>
          <li>Modificaciones en la instalacion existente</li>
          <li>Fugas de gas refrigerante por defectos de instalacion previa</li>
        </ul>
      </div>

      {/* Cancelacion - DESTACADA */}
      <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
        <h3 className="text-base font-bold text-yellow-800 mb-2">V. CANCELACION Y RENOVACION</h3>
        <p className="text-sm text-yellow-900">
          El contrato se renovara automaticamente por periodos anuales. Para cancelar, el cliente debera 
          comunicarlo con un <strong>minimo de 1 mes de antelacion</strong> a la fecha de renovacion, 
          mediante email a {EMPRESA.email} o llamando al {EMPRESA.telefono}.
        </p>
      </div>

      {/* Proteccion de datos */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">VI. PROTECCION DE DATOS</h3>
        <p className="text-xs text-gray-600">
          Los datos personales seran tratados conforme al RGPD y la LOPDGDD. El responsable es {EMPRESA.nombre}. 
          Finalidad: gestion del contrato y comunicaciones comerciales. Puede ejercer sus derechos de acceso, 
          rectificacion, supresion, limitacion, portabilidad y oposicion en {EMPRESA.email}.
        </p>
      </div>

      {/* Firmas */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300">
        <p className="text-sm text-gray-600 text-center mb-6">
          En {datosCliente.poblacion}, a {formatDate(datosContrato.fechaInicio)}
        </p>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <p className="font-semibold text-sm mb-2">Firma y sello</p>
            <div className="h-20 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
              {mostrarFirmaEmpresa ? (
                <span className="text-xs text-gray-400">Firma empresa</span>
              ) : (
                <span className="text-xs text-gray-400">Pendiente</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">{EMPRESA.nombre}</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold text-sm mb-2">Firma del cliente</p>
            <div className="h-20 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
              {firmaCliente ? (
                <img src={firmaCliente} alt="Firma del cliente" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-xs text-gray-400">Pendiente de firma</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">{datosCliente.razonSocial}</p>
          </div>
        </div>
      </div>

      {/* Pie de pagina */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          {EMPRESA.nombre} - CIF: {EMPRESA.cif} - {EMPRESA.direccion}
        </p>
        <p className="text-xs text-gray-500">
          Tel: {EMPRESA.telefono} - Email: {EMPRESA.email} - Web: {EMPRESA.web}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Contrato n {datosContrato.numeroContrato} - Vigencia: {formatDate(datosContrato.fechaInicio)} - {formatDate(datosContrato.fechaFin)}
        </p>
      </div>
    </div>
  );
}
