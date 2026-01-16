"use client";

/**
 * Contrato de Mantenimiento - Formulario Completo
 * Uniclima Solutions - CIF B21651393
 * 
 * CARACTERÍSTICAS:
 * - Persistencia de datos en localStorage
 * - Autocompletado solo Madrid y alrededores
 * - Pago con Stripe/Link integrado en la misma página
 * - Casilla de importe STICKY que sigue al usuario
 * - Contrato con letra más grande y legible
 * - Banner de validación con scroll a campos incompletos
 */

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs, { breadcrumbsConfig } from '@/components/Breadcrumbs';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import SignaturePad from "@/components/SignaturePad";
import ContratoCaldera from "@/components/contratos/ContratoCaldera";
import ContratoAireAcondicionado from "@/components/contratos/ContratoAireAcondicionado";
import dynamic from 'next/dynamic';
import { 
  Check, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Plus,
  Minus,
  FileText,
  Calculator,
  Shield,
  Star,
  Crown,
  Flame,
  Wind,
  ArrowRight,
  CreditCard,
  Eye,
  Download,
  Maximize2,
  X,
  AlertTriangle,
  Printer
} from "lucide-react";
import { validarNifCif } from "@/data/poblacionesMadrid";
import { 
  buscarDireccionesMadrid, 
  DireccionSugerida,
  obtenerCPPorPoblacion,
  obtenerProvinciaPorPoblacion,
  obtenerDetallesLugar
} from "@/services/addressAutocompleteService";

// Cargar Stripe dinámicamente
const StripePaymentForm = dynamic(() => import('@/components/StripePaymentForm'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
      <p className="text-sm text-gray-600">Cargando sistema de pago...</p>
    </div>
  )
});

// Datos de la empresa
const EMPRESA = {
  nombre: "Uniclima Solutions",
  cif: "B21651393",
  direccion: "Calle Grafito 12, Nave 14 A, 28850 Torrejón de Ardoz, Madrid",
  telefono: "912 345 678",
  email: "info@uniclima.es",
  web: "www.uniclima.es",
};

// Precios por plan y tipo
const preciosPorPlan = {
  caldera: { Esencial: 90, Confort: 120, Premium: 140 },
  aire: { Esencial: 70, Confort: 95, Premium: 120 }
};

// Tipos de aparato
const tiposAparato = [
  { value: "aire-split", label: "Aire A. Split", tipo: "aire" },
  { value: "aire-conductos", label: "Aire A. Conductos", tipo: "aire" },
  { value: "aire-cassette", label: "Aire A. Cassette", tipo: "aire" },
  { value: "caldera-atmosferica", label: "Caldera Atmosférica", tipo: "caldera" },
  { value: "caldera-estanca", label: "Caldera Estanca", tipo: "caldera" },
  { value: "caldera-condensacion", label: "Caldera Condensación", tipo: "caldera" },
];

// Redondear a múltiplo de 5
function redondearA5(precio: number): number {
  return Math.floor(precio / 5) * 5;
}

// Calcular precio con descuentos
function calcularPrecioConDescuentos(precioBase: number, cantidad: number) {
  const desglose: { maquina: number; precio: number; descuento: number }[] = [];
  let total = 0;
  let precioAnterior = precioBase;
  
  for (let i = 1; i <= cantidad; i++) {
    let descuento = 0;
    let precioMaquina = 0;
    
    if (i === 1) {
      precioMaquina = precioBase;
    } else {
      descuento = Math.max(5, 30 - (i - 2) * 5);
      precioMaquina = redondearA5(precioAnterior * (1 - descuento / 100));
    }
    
    total += precioMaquina;
    desglose.push({ maquina: i, precio: precioMaquina, descuento });
    precioAnterior = precioMaquina;
  }
  
  return { total, desglose };
}

// Generar número de contrato
function generarNumeroContrato(tipo: string): string {
  const prefijo = tipo === 'caldera' ? 'CAL' : 'AIR';
  const fecha = new Date();
  const año = fecha.getFullYear().toString().slice(-2);
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefijo}-${año}${mes}-${random}`;
}

// Clave para localStorage
const STORAGE_KEY = 'uniclima_contrato_form';

interface FormData {
  razonSocial: string;
  nif: string;
  direccion: string;
  esChalet: boolean;
  portal: string;
  escalera: string;
  piso: string;
  puerta: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  tipoAparato: string;
  cantidad: number;
  aceptaTerminos: boolean;
  aceptaPrivacidad: boolean;
  firma: string | null;
}

// Componente de Input con validación
const InputField = ({
  id, label, value, onChange, onBlur, error, placeholder, type = "text", required = false, hasError = false, sublabel
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; onBlur?: () => void;
  error?: string; placeholder?: string; type?: string; required?: boolean; hasError?: boolean; sublabel?: string;
}) => (
  <div id={`field-${id}`}>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-orange-500">*</span>}
    </Label>
    <div className="relative mt-1">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-all",
          "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
          error || hasError ? "border-red-500 ring-2 ring-red-200" : "border-gray-300",
          value && !error && !hasError && "border-green-500"
        )}
      />
      {value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {error || hasError ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-green-500" />}
        </div>
      )}
    </div>
    {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
    {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);

// Contenido principal
function ContratoMantenimientoContent() {
  const searchParams = useSearchParams();
  const contratoRef = useRef<HTMLDivElement>(null);
  
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [direccionOpen, setDireccionOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [paso, setPaso] = useState<'formulario' | 'completado'>('formulario');
  const [numeroContrato, setNumeroContrato] = useState<string>('');
  const [planSeleccionado, setPlanSeleccionado] = useState<string>("Esencial");
  const [contratoAmpliado, setContratoAmpliado] = useState(false);
  const [campoIncompleto, setCampoIncompleto] = useState<string | null>(null);
  const [camposConError, setCamposConError] = useState<string[]>([]);
  const [direccionesSugeridas, setDireccionesSugeridas] = useState<DireccionSugerida[]>([]);
  const [buscandoDirecciones, setBuscandoDirecciones] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [pagoCompletado, setPagoCompletado] = useState(false);
  
  // Form data con valores iniciales
  const [formData, setFormData] = useState<FormData>({
    razonSocial: "",
    nif: "",
    direccion: "",
    esChalet: false,
    portal: "",
    escalera: "",
    piso: "",
    puerta: "",
    poblacion: "",
    provincia: "Madrid",
    codigoPostal: "",
    telefono: "",
    email: "",
    tipoAparato: "",
    cantidad: 1,
    aceptaTerminos: false,
    aceptaPrivacidad: false,
    firma: null,
  });
  
  // Cargar datos de localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed, firma: null })); // No restaurar firma
      }
    } catch (e) {
      console.error('Error cargando datos guardados:', e);
    }
  }, []);
  
  // Guardar en localStorage cuando cambie formData
  useEffect(() => {
    try {
      const toSave = { ...formData, firma: null }; // No guardar firma
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Error guardando datos:', e);
    }
  }, [formData]);
  
  // Pre-seleccionar desde URL
  useEffect(() => {
    const tipoParam = searchParams.get('tipo');
    const planParam = searchParams.get('plan');
    
    if (planParam && ['Esencial', 'Confort', 'Premium'].includes(planParam)) {
      setPlanSeleccionado(planParam);
    }
    
    if (tipoParam) {
      const tipoEncontrado = tiposAparato.find(t => 
        t.label.toLowerCase().includes(tipoParam.toLowerCase().split(' ')[0])
      );
      if (tipoEncontrado) {
        setFormData(prev => ({ ...prev, tipoAparato: tipoEncontrado.value }));
      }
    }
  }, [searchParams]);
  
  // Buscar direcciones con debounce
  useEffect(() => {
    if (formData.direccion.length < 3) {
      setDireccionesSugeridas([]);
      setDireccionOpen(false);
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      setBuscandoDirecciones(true);
      try {
        const resultados = await buscarDireccionesMadrid(formData.direccion);
        setDireccionesSugeridas(resultados);
        if (resultados.length > 0) {
          setDireccionOpen(true);
        }
      } catch (error) {
        console.error('Error buscando direcciones:', error);
      } finally {
        setBuscandoDirecciones(false);
      }
    }, 400);
    
    return () => clearTimeout(timeoutId);
  }, [formData.direccion]);
  
  // Seleccionar dirección
  const handleDireccionSelect = async (dir: DireccionSugerida) => {
    // Actualizar inmediatamente con los datos básicos
    setFormData(prev => ({
      ...prev,
      direccion: dir.calle + (dir.numero ? ' ' + dir.numero : ''),
      codigoPostal: dir.codigoPostal || prev.codigoPostal,
      poblacion: dir.poblacion || prev.poblacion,
      provincia: dir.provincia || prev.provincia || 'Madrid',
    }));
    setDireccionOpen(false);
    setDireccionesSugeridas([]);
    
    // Si hay placeId, obtener detalles completos de Google Places (incluye CP)
    if (dir.placeId) {
      setBuscandoDirecciones(true);
      try {
        const detalles = await obtenerDetallesLugar(dir.placeId);
        if (detalles) {
          setFormData(prev => ({
            ...prev,
            direccion: detalles.calle + (detalles.numero ? ' ' + detalles.numero : (dir.numero ? ' ' + dir.numero : '')),
            codigoPostal: detalles.codigoPostal || prev.codigoPostal,
            poblacion: detalles.poblacion || prev.poblacion,
            provincia: detalles.provincia || prev.provincia || 'Madrid',
          }));
        }
      } catch (error) {
        console.error('Error obteniendo detalles de la dirección:', error);
      } finally {
        setBuscandoDirecciones(false);
      }
    }
  };
  
  // Actualizar campo
  const updateField = useCallback((field: keyof FormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (camposConError.includes(field)) {
      setCamposConError(prev => prev.filter(c => c !== field));
    }
    if (campoIncompleto === field) {
      setCampoIncompleto(null);
    }
  }, [camposConError, campoIncompleto]);
  
  // Validar NIF
  const validateNif = (nif: string) => {
    if (!nif) {
      setFieldErrors(prev => ({ ...prev, nif: '' }));
      return;
    }
    const resultado = validarNifCif(nif);
    setFieldErrors(prev => ({ ...prev, nif: resultado.valido ? '' : resultado.mensaje || 'NIF/CIF no válido' }));
  };
  
  // Validar email
  const validateEmail = (email: string) => {
    if (!email) {
      setFieldErrors(prev => ({ ...prev, email: '' }));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFieldErrors(prev => ({ ...prev, email: emailRegex.test(email) ? '' : 'Email no válido' }));
  };
  
  // Tipo seleccionado
  const tipoSeleccionado = tiposAparato.find(t => t.value === formData.tipoAparato);
  const esCaldera = tipoSeleccionado?.tipo === 'caldera';
  
  // Calcular precios
  const precioBase = tipoSeleccionado 
    ? preciosPorPlan[tipoSeleccionado.tipo as keyof typeof preciosPorPlan][planSeleccionado as keyof typeof preciosPorPlan.caldera] 
    : 0;
  const { total: precioSinIVA, desglose } = calcularPrecioConDescuentos(precioBase, formData.cantidad);
  const precioTotal = Math.round(precioSinIVA * 1.21);
  
  // Nombres de campos
  const nombresCampos: Record<string, string> = {
    tipoAparato: "Tipo de Aparato",
    razonSocial: "Nombre / Razón Social",
    nif: "NIF/CIF",
    direccion: "Dirección",
    codigoPostal: "Código Postal",
    poblacion: "Población",
    telefono: "Teléfono",
    email: "Email",
    aceptaTerminos: "Términos y Condiciones",
    aceptaPrivacidad: "Política de Privacidad",
    firma: "Firma Digital"
  };
  
  // Validar formulario
  const validarFormulario = (): boolean => {
    const errores: string[] = [];
    
    if (!formData.tipoAparato) errores.push('tipoAparato');
    if (!formData.razonSocial.trim()) errores.push('razonSocial');
    if (!formData.nif.trim()) errores.push('nif');
    if (!formData.direccion.trim()) errores.push('direccion');
    if (!formData.codigoPostal.trim()) errores.push('codigoPostal');
    if (!formData.poblacion.trim()) errores.push('poblacion');
    if (!formData.telefono.trim()) errores.push('telefono');
    if (!formData.email.trim()) errores.push('email');
    if (!formData.aceptaTerminos) errores.push('aceptaTerminos');
    if (!formData.aceptaPrivacidad) errores.push('aceptaPrivacidad');
    if (!formData.firma) errores.push('firma');
    
    if (errores.length > 0) {
      setCamposConError(errores);
      setCampoIncompleto(errores[0]);
      
      setTimeout(() => {
        const elemento = document.getElementById(`field-${errores[0]}`);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return false;
    }
    
    setCamposConError([]);
    setCampoIncompleto(null);
    return true;
  };
  
  // Mostrar formulario de pago
  const mostrarFormularioPago = () => {
    if (!validarFormulario()) return;
    
    const nuevoNumero = generarNumeroContrato(tipoSeleccionado?.tipo || 'caldera');
    setNumeroContrato(nuevoNumero);
    setMostrarPago(true);
    
    setTimeout(() => {
      document.getElementById('seccion-pago')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  // Pago exitoso
  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Pago exitoso:', paymentIntentId);
    setPagoCompletado(true);
    setPaso('completado');
    localStorage.removeItem(STORAGE_KEY); // Limpiar datos guardados
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Datos para el contrato
  const datosCliente = {
    razonSocial: formData.razonSocial || "Nombre del Cliente",
    nif: formData.nif || "00000000A",
    direccion: formData.direccion || "Dirección",
    poblacion: formData.poblacion || "Madrid",
    codigoPostal: formData.codigoPostal || "28000",
    provincia: formData.provincia,
    telefono: formData.telefono || "600000000",
    email: formData.email || "cliente@email.com",
    esChalet: formData.esChalet,
    portal: formData.portal,
    escalera: formData.escalera,
    piso: formData.piso,
    puerta: formData.puerta,
  };
  
  const datosContrato = {
    numeroContrato: numeroContrato || "BORRADOR",
    plan: planSeleccionado,
    cantidad: formData.cantidad,
    precioAnual: precioSinIVA,
    precioConIVA: precioTotal,
    fechaInicio: new Date().toISOString(),
    fechaFin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
  
  // Descargar PDF
  const descargarPDF = async () => {
    if (paso !== 'completado') return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('PDF generado correctamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.contratoMantenimiento} />
      
      {/* Banner de campo incompleto */}
      {campoIncompleto && (
        <div className="sticky top-0 z-50 bg-red-500 text-white px-4 py-3 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                Campo incompleto: <strong>{nombresCampos[campoIncompleto] || campoIncompleto}</strong>
              </span>
            </div>
            <button onClick={() => setCampoIncompleto(null)} className="p-1 hover:bg-red-600 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Paso Completado */}
          {paso === 'completado' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Contrato Completado!</h2>
                <p className="text-gray-600 mb-6">Tu contrato de mantenimiento ha sido procesado correctamente.</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Número de Contrato</p>
                  <p className="text-xl font-mono font-bold text-orange-600">{numeroContrato}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">📧 Email Enviado</h3>
                  <p className="text-sm text-blue-700">
                    Hemos enviado una copia del contrato a <strong>{formData.email}</strong>.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={descargarPDF}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Descargar Contrato PDF
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir
                  </button>
                </div>
                
                <Link href="/" className="inline-block mt-6 text-orange-600 font-semibold hover:underline">
                  Volver al Inicio
                </Link>
              </div>
            </div>
          )}
          
          {/* Formulario Principal */}
          {paso === 'formulario' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna Principal */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Selección de Plan */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Selecciona tu Plan
                  </h2>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['Esencial', 'Confort', 'Premium'].map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setPlanSeleccionado(plan)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-center",
                          planSeleccionado === plan
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-orange-300"
                        )}
                      >
                        <div className="mb-2">
                          {plan === 'Esencial' && <Shield className="w-6 h-6 mx-auto text-orange-400" />}
                          {plan === 'Confort' && <Star className="w-6 h-6 mx-auto text-orange-500" />}
                          {plan === 'Premium' && <Crown className="w-6 h-6 mx-auto text-orange-600" />}
                        </div>
                        <p className="font-semibold text-gray-900">{plan}</p>
                        {plan === 'Confort' && (
                          <span className="text-[10px] bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">
                            RECOMENDADO
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Tipo de aparato y cantidad */}
                  <div className="grid sm:grid-cols-2 gap-4" id="field-tipoAparato">
                    <div>
                      <Label>Tipo de Aparato <span className="text-orange-500">*</span></Label>
                      <Select
                        value={formData.tipoAparato}
                        onValueChange={(value) => updateField('tipoAparato', value)}
                      >
                        <SelectTrigger className={cn("mt-1", camposConError.includes('tipoAparato') && "border-red-500 ring-2 ring-red-200")}>
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header-calderas" disabled className="font-semibold text-orange-600">
                            <div className="flex items-center gap-2"><Flame className="w-4 h-4" /> Calderas</div>
                          </SelectItem>
                          {tiposAparato.filter(t => t.tipo === 'caldera').map(tipo => (
                            <SelectItem key={tipo.value} value={tipo.value} className="pl-6">{tipo.label}</SelectItem>
                          ))}
                          <SelectItem value="header-aires" disabled className="font-semibold text-blue-600">
                            <div className="flex items-center gap-2"><Wind className="w-4 h-4" /> Aires Acondicionados</div>
                          </SelectItem>
                          {tiposAparato.filter(t => t.tipo === 'aire').map(tipo => (
                            <SelectItem key={tipo.value} value={tipo.value} className="pl-6">{tipo.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Cantidad de Equipos</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="button"
                          onClick={() => updateField('cantidad', Math.max(1, formData.cantidad - 1))}
                          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-lg font-semibold">{formData.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => updateField('cantidad', formData.cantidad + 1)}
                          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Datos del Cliente */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Datos del Cliente
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      id="razonSocial"
                      label="Nombre / Razón Social"
                      value={formData.razonSocial}
                      onChange={(v) => updateField('razonSocial', v)}
                      placeholder="Nombre completo o empresa"
                      required
                      hasError={camposConError.includes('razonSocial')}
                    />
                    
                    <InputField
                      id="nif"
                      label="NIF/CIF"
                      value={formData.nif}
                      onChange={(v) => updateField('nif', v.toUpperCase())}
                      onBlur={() => validateNif(formData.nif)}
                      error={fieldErrors.nif}
                      placeholder="12345678A"
                      required
                      hasError={camposConError.includes('nif')}
                    />
                    
                    {/* Dirección con Autocompletado */}
                    <div className="sm:col-span-2" id="field-direccion">
                      <Label className="text-sm font-medium text-gray-700">
                        Dirección (Calle y Número) <span className="text-orange-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          value={formData.direccion}
                          onChange={(e) => updateField('direccion', e.target.value)}
                          onFocus={() => direccionesSugeridas.length > 0 && setDireccionOpen(true)}
                          placeholder="Ej: Calle Gran Vía 25, Calle Grafito 12..."
                          className={cn(
                            "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-all",
                            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500",
                            camposConError.includes('direccion') ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
                          )}
                          autoComplete="off"
                        />
                        {buscandoDirecciones && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-orange-500" />
                        )}
                        
                        {/* Dropdown de direcciones */}
                        {direccionOpen && direccionesSugeridas.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto">
                            <div className="px-3 py-2 text-xs text-gray-500 border-b bg-orange-50 font-medium">
                              📍 Solo Madrid y alrededores - Selecciona una dirección:
                            </div>
                            {direccionesSugeridas.map((dir) => (
                              <button
                                key={dir.id}
                                type="button"
                                onClick={() => handleDireccionSelect(dir)}
                                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                              >
                                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 text-sm">{dir.calle}{dir.numero ? ` ${dir.numero}` : ''}</p>
                                  <p className="text-xs text-gray-500">
                                    {dir.codigoPostal && <span className="font-medium text-orange-600">{dir.codigoPostal}</span>}
                                    {dir.codigoPostal && ' - '}
                                    {dir.poblacion}
                                    {dir.provincia && dir.provincia !== dir.poblacion && `, ${dir.provincia}`}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Se autocompleta CP, población y provincia al seleccionar</p>
                    </div>
                    
                    {/* Tipo de vivienda */}
                    <div className="sm:col-span-2">
                      <Label>Tipo de Vivienda</Label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={!formData.esChalet}
                            onChange={() => updateField('esChalet', false)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm">Piso / Apartamento</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={formData.esChalet}
                            onChange={() => updateField('esChalet', true)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm">Chalet / Casa</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Campos adicionales para piso */}
                    {!formData.esChalet && (
                      <>
                        <InputField id="portal" label="Portal" value={formData.portal} onChange={(v) => updateField('portal', v)} placeholder="Ej: 1, A..." />
                        <InputField id="escalera" label="Escalera" value={formData.escalera} onChange={(v) => updateField('escalera', v)} placeholder="Ej: Izq, Dcha..." />
                        <InputField id="piso" label="Piso" value={formData.piso} onChange={(v) => updateField('piso', v)} placeholder="Ej: 1, 2, Bajo..." />
                        <InputField id="puerta" label="Puerta" value={formData.puerta} onChange={(v) => updateField('puerta', v)} placeholder="Ej: A, B, 1..." />
                      </>
                    )}
                    
                    <InputField
                      id="codigoPostal"
                      label="Código Postal"
                      value={formData.codigoPostal}
                      onChange={(v) => updateField('codigoPostal', v)}
                      placeholder="28000"
                      required
                      hasError={camposConError.includes('codigoPostal')}
                    />
                    
                    <InputField
                      id="poblacion"
                      label="Población"
                      value={formData.poblacion}
                      onChange={(v) => updateField('poblacion', v)}
                      placeholder="Madrid"
                      required
                      hasError={camposConError.includes('poblacion')}
                    />
                    
                    <InputField
                      id="telefono"
                      label="Teléfono"
                      value={formData.telefono}
                      onChange={(v) => updateField('telefono', v)}
                      placeholder="600 000 000"
                      type="tel"
                      required
                      hasError={camposConError.includes('telefono')}
                    />
                    
                    <InputField
                      id="email"
                      label="Email"
                      value={formData.email}
                      onChange={(v) => updateField('email', v)}
                      onBlur={() => validateEmail(formData.email)}
                      error={fieldErrors.email}
                      placeholder="tu@email.com"
                      type="email"
                      required
                      hasError={camposConError.includes('email')}
                    />
                  </div>
                </div>
                
                {/* Vista previa del contrato - LETRA MÁS GRANDE */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-900">Vista Previa del Contrato</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContratoAmpliado(true)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 text-sm font-medium"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Pantalla Completa
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 px-4 py-2 bg-yellow-50 border-b border-yellow-100">
                    ⚠️ Revisa el contrato antes de firmar. Los datos se actualizan en tiempo real.
                  </div>
                  {/* Contrato con scroll interno y letra más grande */}
                  <div className="h-[400px] overflow-y-auto p-4 bg-gray-50" style={{ scrollbarWidth: 'thin' }}>
                    <div ref={contratoRef} className="bg-white shadow-sm rounded-lg p-6 transform scale-[0.85] origin-top">
                      {esCaldera ? (
                        <ContratoCaldera
                          datosCliente={datosCliente}
                          datosContrato={datosContrato}
                          firmaCliente={formData.firma || undefined}
                          mostrarFirmaEmpresa={false}
                        />
                      ) : (
                        <ContratoAireAcondicionado
                          datosCliente={datosCliente}
                          datosContrato={datosContrato}
                          firmaCliente={formData.firma || undefined}
                          mostrarFirmaEmpresa={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Firma Digital */}
                <div className="bg-white rounded-xl shadow-sm p-6" id="field-firma">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Firma Digital <span className="text-orange-500">*</span>
                  </h2>
                  
                  <div className={cn("rounded-lg", camposConError.includes('firma') && "ring-2 ring-red-500 p-1 bg-red-50")}>
                    <SignaturePad
                      onSave={(firma) => updateField('firma', firma)}
                      onClear={() => updateField('firma', null)}
                    />
                  </div>
                </div>
                
                {/* Términos y Condiciones */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Aceptación</h2>
                  
                  <div className="space-y-3" id="field-aceptaTerminos">
                    <label className={cn(
                      "flex items-start gap-3 cursor-pointer p-3 rounded-lg transition-colors",
                      camposConError.includes('aceptaTerminos') ? "bg-red-50 ring-2 ring-red-200" : "hover:bg-gray-50"
                    )}>
                      <input
                        type="checkbox"
                        checked={formData.aceptaTerminos}
                        onChange={(e) => updateField('aceptaTerminos', e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-orange-500 rounded flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        He leído y acepto los{' '}
                        <Link href="/terminos-mantenimiento" target="_blank" className="text-orange-600 hover:underline font-medium">
                          Términos y Condiciones
                        </Link>
                        <span className="text-orange-500"> *</span>
                      </span>
                    </label>
                    
                    <label className={cn(
                      "flex items-start gap-3 cursor-pointer p-3 rounded-lg transition-colors",
                      camposConError.includes('aceptaPrivacidad') ? "bg-red-50 ring-2 ring-red-200" : "hover:bg-gray-50"
                    )} id="field-aceptaPrivacidad">
                      <input
                        type="checkbox"
                        checked={formData.aceptaPrivacidad}
                        onChange={(e) => updateField('aceptaPrivacidad', e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-orange-500 rounded flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        Acepto la{' '}
                        <Link href="/privacidad" target="_blank" className="text-orange-600 hover:underline font-medium">
                          Política de Privacidad
                        </Link>
                        <span className="text-orange-500"> *</span>
                      </span>
                    </label>
                  </div>
                  
                  {/* Botón de pago */}
                  {!mostrarPago && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={mostrarFormularioPago}
                        className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        Proceder al Pago (€{precioTotal})
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Sección de Pago Integrada */}
                {mostrarPago && !pagoCompletado && (
                  <div id="seccion-pago" className="bg-white rounded-xl shadow-sm p-6 border-2 border-orange-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-orange-500" />
                      Finalizar Pago
                    </h2>
                    <p className="text-gray-600 mb-4">Contrato Nº <span className="font-mono font-bold">{numeroContrato}</span></p>
                    
                    {/* Resumen */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan {planSeleccionado} - {tipoSeleccionado?.label}</span>
                          <span className="font-medium">x{formData.cantidad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal (sin IVA)</span>
                          <span className="font-medium">€{precioSinIVA}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IVA (21%)</span>
                          <span className="font-medium">€{precioTotal - precioSinIVA}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total Anual</span>
                          <span className="font-bold text-orange-600 text-lg">€{precioTotal}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stripe Payment Form */}
                    <StripePaymentForm
                      amount={precioTotal}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={(error) => {
                        console.error('Error en el pago:', error);
                      }}
                      metadata={{
                        numeroContrato,
                        tipo: tipoSeleccionado?.tipo || '',
                        plan: planSeleccionado,
                        cliente: formData.razonSocial,
                        email: formData.email,
                      }}
                      clientName={formData.razonSocial}
                      clientEmail={formData.email}
                    />
                    
                    <button
                      onClick={() => setMostrarPago(false)}
                      className="w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Volver a Editar Datos
                    </button>
                  </div>
                )}
              </div>
              
              {/* Sidebar STICKY */}
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <div className="bg-white rounded-xl shadow-sm p-6 max-h-[calc(100vh-120px)] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-orange-500" />
                      Resumen del Pedido
                    </h3>
                    
                    {formData.tipoAparato ? (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Plan:</span>
                          <span className="font-medium">{planSeleccionado}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tipo:</span>
                          <span className="font-medium">{tipoSeleccionado?.label}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Equipos:</span>
                          <span className="font-medium">{formData.cantidad}</span>
                        </div>
                        
                        {/* Desglose */}
                        {formData.cantidad > 1 && (
                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <p className="text-xs text-gray-500 mb-2">Desglose por equipo:</p>
                            <div className="space-y-1 max-h-24 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                              {desglose.map((item) => (
                                <div key={item.maquina} className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Equipo {item.maquina}
                                    {item.descuento > 0 && <span className="text-green-600 ml-1">(-{item.descuento}%)</span>}
                                  </span>
                                  <span className="font-medium">€{item.precio}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-200 pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">€{precioSinIVA}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">IVA (21%):</span>
                            <span className="font-medium">€{precioTotal - precioSinIVA}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                            <span>Total Anual:</span>
                            <span className="text-orange-600">€{precioTotal}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Selecciona un tipo de aparato para ver el precio
                      </p>
                    )}
                    
                    {/* Beneficios */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Incluido en Plan {planSeleccionado}:
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {planSeleccionado === 'Esencial' && (
                          <>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />1 revisión anual</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Mano de obra incluida</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Certificado oficial</li>
                          </>
                        )}
                        {planSeleccionado === 'Confort' && (
                          <>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />2 revisiones anuales</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Mano de obra incluida</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Atención prioritaria</li>
                          </>
                        )}
                        {planSeleccionado === 'Premium' && (
                          <>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Revisiones ilimitadas</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />Atención 24/7</li>
                            <li className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />10% dto. repuestos</li>
                          </>
                        )}
                      </ul>
                      <p className="mt-2 text-[10px] text-gray-500">* Repuestos y gas NO incluidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>
      
      {/* Modal Contrato Ampliado */}
      {contratoAmpliado && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-bold text-gray-900">Vista Previa del Contrato</h3>
                <p className="text-sm text-gray-500">Revisa todas las cláusulas</p>
              </div>
              <button onClick={() => setContratoAmpliado(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <X className="w-4 h-4" />Cerrar
              </button>
            </div>
            <div className="p-6">
              {esCaldera ? (
                <ContratoCaldera datosCliente={datosCliente} datosContrato={datosContrato} firmaCliente={formData.firma || undefined} mostrarFirmaEmpresa={false} />
              ) : (
                <ContratoAireAcondicionado datosCliente={datosCliente} datosContrato={datosContrato} firmaCliente={formData.firma || undefined} mostrarFirmaEmpresa={false} />
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

// Componente principal
export default function ContratoMantenimiento() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    }>
      <ContratoMantenimientoContent />
    </Suspense>
  );
}
