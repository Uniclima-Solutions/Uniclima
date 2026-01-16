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
import { Loader2, CreditCard, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

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
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/contrato-mantenimiento/confirmacion`,
        payment_method_data: {
          billing_details: {
            name: clientName,
            email: clientEmail,
          },
        },
      },
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Error en el pago');
      } else {
        setMessage('Ha ocurrido un error inesperado.');
      }
      onPaymentError(error.message || 'Error en el pago');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsSuccess(true);
      setMessage('¡Pago completado con éxito!');
      onPaymentSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información de seguridad */}
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-700">
          Pago seguro procesado por Stripe. Tus datos están protegidos.
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
                name: clientName,
                email: clientEmail,
              }
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
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando pago...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Pago completado
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pagar {amount.toFixed(2)}€
          </>
        )}
      </button>

      {/* Métodos de pago aceptados */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <img src="/images/visa.svg" alt="Visa" className="h-6 opacity-60" />
        <img src="/images/mastercard.svg" alt="Mastercard" className="h-6 opacity-60" />
        <img src="/images/amex.svg" alt="American Express" className="h-6 opacity-60" />
        <span className="text-xs text-gray-500">y más...</span>
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
              clientName,
              clientEmail,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el intent de pago');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error:', err);
        setError('No se pudo inicializar el sistema de pago. Por favor, inténtalo de nuevo.');
        onPaymentError('Error al inicializar el pago');
      } finally {
        setIsLoading(false);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, metadata, clientName, clientEmail, onPaymentError]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-gray-600">Preparando el sistema de pago...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#f97316',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
      },
    },
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
