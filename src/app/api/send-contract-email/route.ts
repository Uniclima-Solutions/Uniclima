/**
 * API para enviar el contrato de mantenimiento por email
 * Uniclima Solutions - CIF B21651393
 */

import { NextRequest, NextResponse } from 'next/server';

// Datos de la empresa
const EMPRESA = {
  nombre: "Uniclima Solutions S.L.",
  cif: "B21651393",
  direccion: "Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid",
  telefono: "912 345 678",
  email: "info@uniclima.es",
  web: "www.uniclima.es",
};

interface ContractEmailRequest {
  numeroContrato: string;
  tipo: 'caldera' | 'aire';
  plan: string;
  cliente: {
    razonSocial: string;
    nif: string;
    email: string;
    telefono: string;
    direccion: string;
    poblacion: string;
    codigoPostal: string;
  };
  precioTotal: number;
  fechaCreacion: string;
  paymentIntentId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContractEmailRequest = await request.json();
    
    const {
      numeroContrato,
      tipo,
      plan,
      cliente,
      precioTotal,
      fechaCreacion,
      paymentIntentId,
    } = data;
    
    // Validar datos requeridos
    if (!numeroContrato || !cliente.email || !cliente.razonSocial) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }
    
    // Generar el contenido del email
    const tipoEquipo = tipo === 'caldera' ? 'Caldera' : 'Aire Acondicionado';
    const fechaFormateada = new Date(fechaCreacion).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    
    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contrato de Mantenimiento - ${numeroContrato}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0;
      opacity: 0.9;
    }
    .content {
      padding: 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .contract-number {
      background-color: #fff7ed;
      border: 2px solid #f97316;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      margin: 20px 0;
    }
    .contract-number span {
      display: block;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .contract-number strong {
      display: block;
      font-size: 24px;
      color: #f97316;
      font-family: monospace;
      margin-top: 5px;
    }
    .details {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .details h3 {
      margin: 0 0 15px;
      color: #374151;
      font-size: 16px;
    }
    .details-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .details-row:last-child {
      border-bottom: none;
    }
    .details-row .label {
      color: #6b7280;
    }
    .details-row .value {
      font-weight: 600;
      color: #111827;
    }
    .total-row {
      background-color: #f97316;
      color: white;
      border-radius: 8px;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .total-row .label {
      font-size: 14px;
    }
    .total-row .value {
      font-size: 24px;
      font-weight: 700;
    }
    .info-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .info-box h4 {
      margin: 0 0 10px;
      color: #1e40af;
    }
    .info-box p {
      margin: 0;
      font-size: 14px;
      color: #1e3a8a;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      background-color: #1f2937;
      color: #9ca3af;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #f97316;
      text-decoration: none;
    }
    .footer .company {
      color: white;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 ¡Contrato Confirmado!</h1>
      <p>Tu contrato de mantenimiento ha sido procesado correctamente</p>
    </div>
    
    <div class="content">
      <p class="greeting">Estimado/a <strong>${cliente.razonSocial}</strong>,</p>
      
      <p>Gracias por confiar en Uniclima Solutions para el mantenimiento de tu ${tipoEquipo.toLowerCase()}. Tu contrato ha sido registrado correctamente y está activo desde hoy.</p>
      
      <div class="contract-number">
        <span>Número de Contrato</span>
        <strong>${numeroContrato}</strong>
      </div>
      
      <div class="details">
        <h3>📋 Detalles del Contrato</h3>
        <div class="details-row">
          <span class="label">Tipo de Equipo</span>
          <span class="value">${tipoEquipo}</span>
        </div>
        <div class="details-row">
          <span class="label">Plan Contratado</span>
          <span class="value">${plan}</span>
        </div>
        <div class="details-row">
          <span class="label">Fecha de Inicio</span>
          <span class="value">${fechaFormateada}</span>
        </div>
        <div class="details-row">
          <span class="label">Vigencia</span>
          <span class="value">12 meses (renovación automática)</span>
        </div>
        <div class="details-row">
          <span class="label">Dirección del Servicio</span>
          <span class="value">${cliente.direccion}, ${cliente.codigoPostal} ${cliente.poblacion}</span>
        </div>
      </div>
      
      <div class="total-row">
        <span class="label">Total Anual (IVA incluido)</span>
        <span class="value">${precioTotal}€</span>
      </div>
      
      <div class="info-box">
        <h4>📞 ¿Necesitas asistencia?</h4>
        <p>Puedes contactarnos en cualquier momento llamando al <strong>${EMPRESA.telefono}</strong> o enviando un email a <strong>${EMPRESA.email}</strong>. Nuestro horario de atención es de Lunes a Viernes de 9:00 a 18:00.</p>
      </div>
      
      <div class="info-box" style="background-color: #fef3c7; border-color: #f59e0b;">
        <h4 style="color: #92400e;">⚠️ Importante</h4>
        <p style="color: #78350f;">Recuerda que para cancelar el contrato debes avisar con al menos <strong>1 mes de antelación</strong> a la fecha de renovación. El contrato se renueva automáticamente cada año.</p>
      </div>
      
      <h3>📄 Servicios Incluidos en tu Plan ${plan}</h3>
      <ul>
        ${tipo === 'caldera' ? `
        <li>✅ Revisión anual completa de la caldera</li>
        <li>✅ Análisis de combustión y rendimiento</li>
        <li>✅ Limpieza de quemador y circuito de humos</li>
        <li>✅ Verificación de seguridades</li>
        <li>✅ Mano de obra en averías (sin coste adicional)</li>
        <li>✅ Desplazamiento incluido</li>
        <li>❌ Repuestos y piezas (no incluidos)</li>
        <li>❌ Gas refrigerante (no incluido)</li>
        ` : `
        <li>✅ Revisión anual del aire acondicionado</li>
        <li>✅ Comprobación del nivel de gas refrigerante</li>
        <li>✅ Limpieza y desinfección de filtros</li>
        <li>✅ Verificación del funcionamiento</li>
        <li>✅ Mano de obra en averías (sin coste adicional)</li>
        <li>✅ Desplazamiento incluido</li>
        <li>❌ Repuestos y piezas (no incluidos)</li>
        <li>❌ Gas refrigerante (no incluido)</li>
        `}
      </ul>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="https://uniclima.es/mi-cuenta/contratos" class="cta-button">Ver mi Contrato</a>
      </p>
      
      <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
        Adjunto a este email encontrarás una copia en PDF de tu contrato de mantenimiento con todas las condiciones y cláusulas.
      </p>
    </div>
    
    <div class="footer">
      <p class="company">${EMPRESA.nombre}</p>
      <p>CIF: ${EMPRESA.cif}</p>
      <p>${EMPRESA.direccion}</p>
      <p>Tel: <a href="tel:${EMPRESA.telefono}">${EMPRESA.telefono}</a> | Email: <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></p>
      <p style="margin-top: 20px; font-size: 12px;">
        Este email ha sido enviado automáticamente. Por favor, no respondas a este mensaje.<br>
        Si tienes alguna consulta, contacta con nosotros en <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;
    
    // En producción, aquí enviaríamos el email usando un servicio como:
    // - Resend (resend.com)
    // - SendGrid
    // - AWS SES
    // - Nodemailer con SMTP
    
    // Por ahora, simulamos el envío y devolvemos éxito
    console.log('=== EMAIL DE CONTRATO ===');
    console.log('Para:', cliente.email);
    console.log('Asunto:', `Contrato de Mantenimiento ${numeroContrato} - Uniclima Solutions`);
    console.log('Número de Contrato:', numeroContrato);
    console.log('Tipo:', tipo);
    console.log('Plan:', plan);
    console.log('Cliente:', cliente.razonSocial);
    console.log('Precio Total:', precioTotal, '€');
    console.log('Payment Intent:', paymentIntentId);
    console.log('========================');
    
    // Ejemplo de integración con Resend (descomentar cuando tengas la API key):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Uniclima Solutions <contratos@uniclima.es>',
      to: cliente.email,
      subject: `Contrato de Mantenimiento ${numeroContrato} - Uniclima Solutions`,
      html: emailHtml,
      // attachments: [
      //   {
      //     filename: `Contrato_${numeroContrato}.pdf`,
      //     content: pdfBuffer,
      //   },
      // ],
    });
    */
    
    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      numeroContrato,
      emailTo: cliente.email,
    });
    
  } catch (error) {
    console.error('Error enviando email de contrato:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    );
  }
}
