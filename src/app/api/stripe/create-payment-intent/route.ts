import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Inicializar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // @ts-ignore - Usar la versión más reciente disponible
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'eur', metadata } = body;

    // Validar el monto
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      );
    }

    // Verificar que la clave de Stripe esté configurada
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY no está configurada');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Crear el PaymentIntent sin statement_descriptor para evitar errores
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a céntimos
      currency,
      metadata: metadata || {},
      // Habilitar métodos de pago automáticos (incluye tarjeta, Link, Google Pay, Apple Pay)
      automatic_payment_methods: {
        enabled: true,
      },
      // Descripción para referencia interna (no aparece en extracto)
      description: `Contrato Mantenimiento Uniclima - ${metadata?.numeroContrato || 'N/A'}`,
    });

    console.log('PaymentIntent creado:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Error de Stripe:', error);
    
    // Manejar errores específicos de Stripe
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Solicitud inválida: ' + error.message },
        { status: 400 }
      );
    }
    
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Error de autenticación con Stripe' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Error al procesar el pago. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
