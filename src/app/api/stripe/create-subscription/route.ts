import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-12-15.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { 
      customerEmail, 
      customerName,
      customerPhone,
      customerAddress,
      priceAmount, // Precio anual en euros
      planName,
      tipoAparato,
      cantidad,
      nif,
      contratoData // Datos del contrato para metadata
    } = await request.json()

    if (!customerEmail || !priceAmount || priceAmount <= 0) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const stripe = getStripe();

    // 1. Crear o recuperar el cliente en Stripe
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customer: Stripe.Customer;
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      // Actualizar datos del cliente
      customer = await stripe.customers.update(customer.id, {
        name: customerName,
        phone: customerPhone,
        address: customerAddress ? {
          line1: customerAddress.direccion,
          city: customerAddress.poblacion,
          postal_code: customerAddress.codigoPostal,
          country: 'ES',
        } : undefined,
        metadata: {
          nif: nif,
        },
      });
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        phone: customerPhone,
        address: customerAddress ? {
          line1: customerAddress.direccion,
          city: customerAddress.poblacion,
          postal_code: customerAddress.codigoPostal,
          country: 'ES',
        } : undefined,
        metadata: {
          nif: nif,
        },
      });
    }

    // 2. Crear el precio del producto (suscripción anual)
    const product = await stripe.products.create({
      name: `Contrato Mantenimiento ${planName} - ${tipoAparato}`,
      description: `Contrato de mantenimiento anual para ${cantidad} equipo(s) de ${tipoAparato}. Plan ${planName}.`,
      metadata: {
        tipo: 'contrato_mantenimiento',
        plan: planName,
        tipoAparato: tipoAparato,
        cantidad: cantidad.toString(),
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(priceAmount * 100), // Convertir a céntimos
      currency: 'eur',
      recurring: {
        interval: 'year', // Cobro anual automático
        interval_count: 1,
      },
      metadata: {
        tipo: 'contrato_mantenimiento',
        plan: planName,
      },
    });

    // 3. Crear la suscripción con período de prueba de 0 días (cobro inmediato)
    // y configurar la renovación automática
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card', 'link'],
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        tipo: 'contrato_mantenimiento',
        plan: planName,
        tipoAparato: tipoAparato,
        cantidad: cantidad.toString(),
        nif: nif,
        contratoId: contratoData?.contratoId || '',
        // Cláusula de cancelación con 1 mes de preaviso
        cancelacion_preaviso: '30_dias',
      },
    });

    // Obtener el client_secret del PaymentIntent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      priceId: price.id,
      productId: product.id,
    })
  } catch (error) {
    console.error('Stripe subscription error:', error)
    return NextResponse.json(
      { error: 'Error al crear la suscripción' },
      { status: 500 }
    )
  }
}

// Endpoint para cancelar suscripción (con validación de preaviso de 1 mes)
export async function DELETE(request: NextRequest) {
  try {
    const { subscriptionId, cancelImmediately = false } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'ID de suscripción requerido' },
        { status: 400 }
      )
    }

    const stripe = getStripe();

    if (cancelImmediately) {
      // Cancelación inmediata (solo para casos especiales)
      const subscription = await stripe.subscriptions.cancel(subscriptionId);
      return NextResponse.json({
        status: 'cancelled',
        subscription,
      });
    } else {
      // Cancelación al final del período (respetando el preaviso de 1 mes)
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
        metadata: {
          cancellation_requested_at: new Date().toISOString(),
        },
      });
      return NextResponse.json({
        status: 'scheduled_for_cancellation',
        cancelAt: subscription.cancel_at,
        subscription,
      });
    }
  } catch (error) {
    console.error('Stripe cancellation error:', error)
    return NextResponse.json(
      { error: 'Error al cancelar la suscripción' },
      { status: 500 }
    )
  }
}
