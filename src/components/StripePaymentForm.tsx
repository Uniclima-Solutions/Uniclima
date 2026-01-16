"use client";

/**
 * Componente de pago con Stripe Elements
 * Soporta tarjetas de crédito/débito y Stripe Link
 */

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Loader2, CreditCard, Shield, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

// Cargar Stripe con la clave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  metadata?: Record<string, string>;
  clientName?: string;
  clientEmail?: string;
}

// Componente interno del formulario de pago
function CheckoutForm({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError,
  clientName,
  clientEmail 
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage('El sistema de pago no está listo. Por favor, espera unos segundos.');
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/contrato-mantenimiento?pago=completado`,
          payment_method_data: {
            billing_details: {
              name: clientName || '',
              email: clientEmail || '',
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        // Traducir errores comunes al español
        let errorMessage = error.message || 'Error en el pago';
        
        if (error.code === 'card_declined') {
          errorMessage = 'La tarjeta ha sido rechazada. Por favor, usa otra tarjeta.';
        } else if (error.code === 'expired_card') {
          errorMessage = 'La tarjeta ha expirado.';
        } else if (error.code === 'incorrect_cvc') {
          errorMessage = 'El código de seguridad (CVC) es incorrecto.';
        } else if (error.code === 'insufficient_funds') {
          errorMessage = 'Fondos insuficientes en la tarjeta.';
        } else if (error.code === 'processing_error') {
          errorMessage = 'Error al procesar el pago. Por favor, inténtalo de nuevo.';
        }
        
        setMessage(errorMessage);
        onPaymentError(errorMessage);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setIsSuccess(true);
        setMessage('¡Pago completado con éxito!');
        onPaymentSuccess(paymentIntent.id);
      } else if (paymentIntent && paymentIntent.status === 'processing') {
        setMessage('El pago está siendo procesado...');
      }
    } catch (err: any) {
      console.error('Error en confirmPayment:', err);
      setMessage('Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.');
      onPaymentError('Error inesperado');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información de seguridad */}
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-700">
          <strong>Pago 100% seguro</strong> - Procesado por Stripe. Tus datos están encriptados.
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'link'],
            defaultValues: {
              billingDetails: {
                name: clientName || '',
                email: clientEmail || '',
              }
            },
            business: {
              name: 'Uniclima Solutions S.L.'
            }
          }}
        />
      </div>

      {/* Mensaje de estado */}
      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          isSuccess 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <p className={`text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        </div>
      )}

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || isSuccess}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando pago...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            ¡Pago completado!
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pagar {amount.toFixed(2)}€
          </>
        )}
      </button>

      {/* Métodos de pago aceptados */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Aceptamos:</span>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">VISA</div>
            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">MC</div>
            <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">AMEX</div>
            <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Link</div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400">
          Pago procesado de forma segura por Stripe
        </p>
      </div>
    </form>
  );
}

// Componente principal que envuelve con Stripe Elements
export default function StripePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  metadata,
  clientName,
  clientEmail,
}: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Crear el PaymentIntent al montar el componente
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'eur',
            metadata: {
              ...metadata,
              clientName: clientName || '',
              clientEmail: clientEmail || '',
            },
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al crear el intent de pago');
        }

        if (!data.clientSecret) {
          throw new Error('No se recibió el clientSecret');
        }

        setClientSecret(data.clientSecret);
      } catch (err: any) {
        console.error('Error creando PaymentIntent:', err);
        setError(err.message || 'No se pudo inicializar el sistema de pago. Por favor, inténtalo de nuevo.');
        onPaymentError(err.message || 'Error al inicializar el pago');
      } finally {
        setIsLoading(false);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    } else {
      setError('El monto del pago no es válido');
      setIsLoading(false);
    }
  }, [amount]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Preparando el sistema de pago...</p>
        <p className="text-xs text-gray-400">Esto puede tardar unos segundos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-700">Error al cargar el sistema de pago</p>
            <p className="text-xs text-red-600 mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <p className="text-sm text-yellow-700">Esperando configuración del pago...</p>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    // Habilitar Link como método de pago
    loader: 'auto',
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#f97316',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '8px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        '.Input:focus': {
          border: '2px solid #f97316',
          boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)',
        },
        '.Label': {
          fontWeight: '500',
          color: '#374151',
        },
        '.Tab': {
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        },
        '.Tab--selected': {
          border: '2px solid #f97316',
          backgroundColor: '#fff7ed',
        },
      },
    },
    locale: 'es',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        clientName={clientName}
        clientEmail={clientEmail}
      />
    </Elements>
  );
}
