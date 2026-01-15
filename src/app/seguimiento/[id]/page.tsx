'use client';

/**
 * PÁGINA DE SEGUIMIENTO DE REPARACIÓN
 * Permite al cliente ver el estado de su reparación de placa electrónica
 * mediante un ID único enviado por email.
 */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Package,
  Truck,
  Search,
  Wrench,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Phone,
  Mail,
  Euro,
  Calendar,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  XCircle,
  ArrowRight,
  Shield,
  Info
} from 'lucide-react';

// Tipos de estado de la reparación
type RepairStatus = 
  | 'pending_payment'      // Pendiente de pago
  | 'pending_shipment'     // Pendiente de envío
  | 'received'             // Recibida
  | 'diagnosing'           // En diagnóstico
  | 'quote_sent'           // Presupuesto enviado
  | 'quote_accepted'       // Presupuesto aceptado
  | 'quote_rejected'       // Presupuesto rechazado
  | 'repairing'            // En reparación
  | 'testing'              // En testeo
  | 'ready_to_ship'        // Lista para envío
  | 'shipped'              // Enviada
  | 'completed'            // Completada
  | 'cancelled';           // Cancelada

interface StatusStep {
  status: RepairStatus;
  label: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
  completed: boolean;
  current: boolean;
}

interface RepairOrder {
  id: string;
  status: RepairStatus;
  createdAt: string;
  updatedAt: string;
  equipment: {
    type: string;
    brand: string;
    model: string;
  };
  customer: {
    name: string;
    email: string;
  };
  quote?: {
    amount: number;
    description: string;
    sentAt: string;
    expiresAt: string;
  };
  tracking?: {
    carrier: string;
    number: string;
    url: string;
  };
  history: {
    status: RepairStatus;
    date: string;
    note?: string;
  }[];
}

// Datos de ejemplo para demostración
const mockOrder: RepairOrder = {
  id: 'REP-2024-001234',
  status: 'quote_sent',
  createdAt: '2024-01-10T10:30:00',
  updatedAt: '2024-01-12T14:45:00',
  equipment: {
    type: 'Caldera',
    brand: 'Junkers',
    model: 'Cerapur ZWBC 24-2C'
  },
  customer: {
    name: 'Juan García',
    email: 'juan.garcia@email.com'
  },
  quote: {
    amount: 145.00,
    description: 'Reparación de circuito de encendido y sustitución de condensador quemado',
    sentAt: '2024-01-12T14:45:00',
    expiresAt: '2024-01-19T14:45:00'
  },
  history: [
    { status: 'pending_payment', date: '2024-01-10T10:30:00', note: 'Solicitud recibida' },
    { status: 'pending_shipment', date: '2024-01-10T11:15:00', note: 'Pago confirmado' },
    { status: 'received', date: '2024-01-11T09:20:00', note: 'Placa recibida en taller' },
    { status: 'diagnosing', date: '2024-01-11T10:00:00', note: 'Inicio del diagnóstico' },
    { status: 'quote_sent', date: '2024-01-12T14:45:00', note: 'Presupuesto enviado por email' },
  ]
};

// Configuración de estados
const statusConfig: Record<RepairStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  pending_payment: { 
    label: 'Pendiente de pago', 
    color: 'text-yellow-600', 
    bgColor: 'bg-yellow-100',
    icon: <Euro className="w-5 h-5" />
  },
  pending_shipment: { 
    label: 'Pendiente de envío', 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100',
    icon: <Package className="w-5 h-5" />
  },
  received: { 
    label: 'Recibida', 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-100',
    icon: <CheckCircle2 className="w-5 h-5" />
  },
  diagnosing: { 
    label: 'En diagnóstico', 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100',
    icon: <Search className="w-5 h-5" />
  },
  quote_sent: { 
    label: 'Presupuesto enviado', 
    color: 'text-cyan-600', 
    bgColor: 'bg-cyan-100',
    icon: <FileText className="w-5 h-5" />
  },
  quote_accepted: { 
    label: 'Presupuesto aceptado', 
    color: 'text-green-600', 
    bgColor: 'bg-green-100',
    icon: <Check className="w-5 h-5" />
  },
  quote_rejected: { 
    label: 'Presupuesto rechazado', 
    color: 'text-red-600', 
    bgColor: 'bg-red-100',
    icon: <XCircle className="w-5 h-5" />
  },
  repairing: { 
    label: 'En reparación', 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100',
    icon: <Wrench className="w-5 h-5" />
  },
  testing: { 
    label: 'En testeo', 
    color: 'text-indigo-600', 
    bgColor: 'bg-indigo-100',
    icon: <Shield className="w-5 h-5" />
  },
  ready_to_ship: { 
    label: 'Lista para envío', 
    color: 'text-teal-600', 
    bgColor: 'bg-teal-100',
    icon: <Package className="w-5 h-5" />
  },
  shipped: { 
    label: 'Enviada', 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100',
    icon: <Truck className="w-5 h-5" />
  },
  completed: { 
    label: 'Completada', 
    color: 'text-green-600', 
    bgColor: 'bg-green-100',
    icon: <CheckCircle2 className="w-5 h-5" />
  },
  cancelled: { 
    label: 'Cancelada', 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100',
    icon: <XCircle className="w-5 h-5" />
  },
};

// Orden de los estados para el timeline
const statusOrder: RepairStatus[] = [
  'pending_payment',
  'pending_shipment',
  'received',
  'diagnosing',
  'quote_sent',
  'quote_accepted',
  'repairing',
  'testing',
  'ready_to_ship',
  'shipped',
  'completed'
];

export default function SeguimientoPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<RepairOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Simular carga de datos
    const loadOrder = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En producción, aquí se haría la llamada a la API
      // Por ahora usamos datos de ejemplo
      if (orderId === 'demo' || orderId === 'REP-2024-001234') {
        setOrder(mockOrder);
      } else {
        setError('No se encontró ninguna reparación con ese código');
      }
      setLoading(false);
    };
    
    loadOrder();
  }, [orderId]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusIndex = (status: RepairStatus) => {
    return statusOrder.indexOf(status);
  };
  
  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando información...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Error state
  if (error || !order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Reparación no encontrada
            </h1>
            <p className="text-gray-600 mb-8">
              {error || 'No hemos podido encontrar ninguna reparación con el código proporcionado. Verifica que el código sea correcto.'}
            </p>
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
              <p className="text-sm text-gray-500 mb-2">Código buscado:</p>
              <p className="font-mono text-lg font-semibold text-gray-900">{orderId}</p>
            </div>
            <Link
              href="/diagnostico-placas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Solicitar diagnóstico
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const currentStatusConfig = statusConfig[order.status];
  const currentStatusIndex = getStatusIndex(order.status);
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header con ID y estado */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Código de seguimiento</p>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold font-mono text-gray-900">{order.id}</h1>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Copiar código"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentStatusConfig.bgColor}`}>
                  <span className={currentStatusConfig.color}>{currentStatusConfig.icon}</span>
                  <span className={`font-semibold ${currentStatusConfig.color}`}>
                    {currentStatusConfig.label}
                  </span>
                </div>
              </div>
              
              {/* Info del equipo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tipo de equipo</p>
                  <p className="font-medium text-gray-900">{order.equipment.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Marca</p>
                  <p className="font-medium text-gray-900">{order.equipment.brand}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Modelo</p>
                  <p className="font-medium text-gray-900">{order.equipment.model}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Presupuesto pendiente (si aplica) */}
          {order.status === 'quote_sent' && order.quote && (
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200 p-6 sm:p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Presupuesto de reparación</h2>
                  <p className="text-gray-600">Revisa el presupuesto y decide si deseas continuar</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Coste de reparación</span>
                  <span className="text-3xl font-bold text-gray-900">{order.quote.amount.toFixed(2)}€</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {order.quote.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Válido hasta: {formatDate(order.quote.expiresAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
                  <Check className="w-5 h-5" />
                  Aceptar presupuesto
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                  <XCircle className="w-5 h-5" />
                  Rechazar
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Si aceptas, el diagnóstico (35€ + IVA) se descuenta del precio final.
              </p>
            </div>
          )}
          
          {/* Timeline de progreso */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Progreso de la reparación</h2>
              
              <div className="relative">
                {/* Línea vertical */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Pasos */}
                <div className="space-y-6">
                  {order.history.map((event, index) => {
                    const config = statusConfig[event.status];
                    const isLast = index === order.history.length - 1;
                    
                    return (
                      <div key={index} className="relative flex items-start gap-4">
                        {/* Icono */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isLast ? config.bgColor : 'bg-green-100'
                        }`}>
                          <span className={isLast ? config.color : 'text-green-600'}>
                            {isLast ? config.icon : <CheckCircle2 className="w-5 h-5" />}
                          </span>
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${isLast ? 'text-gray-900' : 'text-gray-600'}`}>
                              {config.label}
                            </h3>
                            <span className="text-sm text-gray-400">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          {event.note && (
                            <p className="text-sm text-gray-500 mt-1">{event.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Información de envío (si aplica) */}
          {order.tracking && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Seguimiento del envío</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Transportista</p>
                    <p className="font-medium text-gray-900">{order.tracking.carrier}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Número de seguimiento</p>
                    <p className="font-mono font-medium text-gray-900">{order.tracking.number}</p>
                  </div>
                </div>
                
                <a
                  href={order.tracking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Ver seguimiento en {order.tracking.carrier}
                </a>
              </div>
            </div>
          )}
          
          {/* Información adicional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Dirección de envío */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900">Dirección de envío</h3>
              </div>
              <div className="text-gray-600 text-sm space-y-1">
                <p className="font-medium text-gray-900">Uniclima Solutions S.L.</p>
                <p>C/ Grafito 12, Nave 14 A</p>
                <p>28850 Torrejón de Ardoz</p>
                <p>Madrid, España</p>
              </div>
            </div>
            
            {/* Contacto */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">¿Necesitas ayuda?</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+34912345678"
                  className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>912 345 678</span>
                </a>
                <a
                  href="mailto:reparaciones@uniclima.es"
                  className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>reparaciones@uniclima.es</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Nota informativa */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Información importante</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Recibirás notificaciones por email en cada cambio de estado.</li>
                  <li>• El diagnóstico se realiza en 24-48 horas laborables tras recibir la placa.</li>
                  <li>• Todas las reparaciones tienen 1 año de garantía.</li>
                  <li>• Guarda este código para futuras consultas.</li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </>
  );
}
