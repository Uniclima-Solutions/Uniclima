"use client";

/**
 * Contrato de Mantenimiento - Formulario completo con visualización de contrato
 * Uniclima Solutions - CIF B21651393
 * 
 * MEJORAS IMPLEMENTADAS:
 * - Vista previa del contrato ANTES de firmar (en el formulario)
 * - Validación con banner de campos incompletos + scroll automático
 * - Calculadora con scroll interno
 * - Botones de descarga/impresión SOLO después del pago completado
 * - Pago con Stripe (modo live)
 */

import { useState, useRef, useEffect, Suspense } from "react";
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
  Minimize2,
  Printer,
  X,
  AlertTriangle
} from "lucide-react";
import { poblacionesMadrid, validarNifCif } from "@/data/poblacionesMadrid";
import { 
  buscarDirecciones, 
  obtenerDetalles, 
  AddressResult 
} from "@/services/addressAutocompleteService";

// Cargar Stripe dinámicamente para evitar SSR
const StripePaymentForm = dynamic(() => import('@/components/StripePaymentForm'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
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

// Componente de input con validación visual
const InputConValidacion = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  sublabel,
  hasError = false
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  sublabel?: string;
  hasError?: boolean;
}) => {
  return (
    <div id={`field-${id}`}>
      <Label htmlFor={id}>{label} {required && <span className="text-orange-500">*</span>}</Label>
      <div className="relative mt-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70",
            error || hasError ? "border-red-500 ring-2 ring-red-200 focus:ring-red-500" : "border-gray-300",
            value && !error && !hasError ? "border-green-500" : "",
            "pr-10"
          )}
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error || hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
        )}
      </div>
      {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

// Precios por plan y tipo de equipo
const preciosPorPlan = {
  caldera: {
    Esencial: 90,
    Confort: 120,
    Premium: 140,
  },
  aire: {
    Esencial: 70,
    Confort: 95,
    Premium: 120,
  }
};

// Tipos de aparato con precios base
const tiposAparato = [
  { value: "aire-split", label: "Aire A. Split", tipo: "aire", precios: preciosPorPlan.aire },
  { value: "aire-conductos", label: "Aire A. Conductos", tipo: "aire", precios: preciosPorPlan.aire },
  { value: "aire-cassette", label: "Aire A. Cassette", tipo: "aire", precios: preciosPorPlan.aire },
  { value: "aire-varios", label: "Aire A. Varios", tipo: "aire", precios: preciosPorPlan.aire },
  { value: "caldera-atmosferica", label: "Caldera Atmosférica", tipo: "caldera", precios: preciosPorPlan.caldera },
  { value: "caldera-estanca", label: "Caldera Estanca", tipo: "caldera", precios: preciosPorPlan.caldera },
  { value: "caldera-condensacion", label: "Caldera Condensación", tipo: "caldera", precios: preciosPorPlan.caldera },
];

// Función para redondear a la baja al múltiplo de 5 más cercano
function redondearA5(precio: number): number {
  return Math.floor(precio / 5) * 5;
}

// Función para calcular el precio total con descuentos progresivos por máquina
function calcularPrecioConDescuentos(precioBase: number, cantidad: number): { total: number; desglose: { maquina: number; precio: number; descuento: number }[] } {
  const desglose: { maquina: number; precio: number; descuento: number }[] = [];
  let total = 0;
  let precioAnterior = precioBase;
  
  for (let i = 1; i <= cantidad; i++) {
    let descuento = 0;
    let precioMaquina = 0;
    
    if (i === 1) {
      descuento = 0;
      precioMaquina = precioBase;
    } else {
      descuento = Math.max(5, 30 - (i - 2) * 5);
      const precioSinRedondear = precioAnterior * (1 - descuento / 100);
      precioMaquina = redondearA5(precioSinRedondear);
    }
    
    total += precioMaquina;
    desglose.push({ maquina: i, precio: precioMaquina, descuento });
    precioAnterior = precioMaquina;
  }
  
  return { total, desglose };
}

// Generar número de contrato único
function generarNumeroContrato(tipo: string): string {
  const prefijo = tipo === 'caldera' ? 'CAL' : 'AIR';
  const fecha = new Date();
  const año = fecha.getFullYear().toString().slice(-2);
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefijo}-${año}${mes}-${random}`;
}

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
  codigoPais: string;
  email: string;
  tipoAparato: string;
  cantidad: number;
  cuponDescuento: string;
  descuentoCupon: number;
  aceptaTerminos: boolean;
  aceptaPrivacidad: boolean;
  firma: string | null;
}

interface FieldErrors {
  nif?: string;
  email?: string;
  telefono?: string;
}

// Componente interno que usa useSearchParams
function ContratoMantenimientoContent() {
  const searchParams = useSearchParams();
  const contratoRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [direccionOpen, setDireccionOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [paso, setPaso] = useState<'formulario' | 'pago' | 'completado'>('formulario');
  const [numeroContrato, setNumeroContrato] = useState<string>('');
  const [planSeleccionado, setPlanSeleccionado] = useState<string>("Esencial");
  const [contratoAmpliado, setContratoAmpliado] = useState(false);
  const [campoIncompleto, setCampoIncompleto] = useState<string | null>(null);
  const [camposConError, setCamposConError] = useState<string[]>([]);
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
    codigoPais: "+34",
    email: "",
    tipoAparato: "",
    cantidad: 1,
    cuponDescuento: "",
    descuentoCupon: 0,
    aceptaTerminos: false,
    aceptaPrivacidad: false,
    firma: null,
  });
  
  // Sugerencias de direcciones filtradas
  const [direccionesFiltradas, setDireccionesFiltradas] = useState<AddressResult[]>([]);
  const [buscandoDirecciones, setBuscandoDirecciones] = useState(false);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(false);
  
  // Pre-seleccionar tipo y plan desde parámetros URL
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
        setFormData(prev => ({
          ...prev,
          tipoAparato: tipoEncontrado.value
        }));
      }
    }
  }, [searchParams]);
  
  // Buscar direcciones con debounce
  useEffect(() => {
    if (direccionSeleccionada) return;
    
    if (formData.direccion.length < 3) {
      setDireccionesFiltradas([]);
      setDireccionOpen(false);
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      if (formData.direccion.length >= 3 && !direccionSeleccionada) {
        setBuscandoDirecciones(true);
        try {
          const resultados = await buscarDirecciones(formData.direccion);
          setDireccionesFiltradas(resultados);
          if (resultados.length > 0) {
            setDireccionOpen(true);
          }
        } catch (error) {
          console.error('Error buscando direcciones:', error);
        } finally {
          setBuscandoDirecciones(false);
        }
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [formData.direccion, direccionSeleccionada]);
  
  // Manejar selección de dirección
  const handleDireccionSelect = async (resultado: AddressResult) => {
    setDireccionSeleccionada(true);
    setDireccionOpen(false);
    
    // Obtener detalles completos
    const detalles = await obtenerDetalles(resultado.placeId);
    
    if (detalles) {
      setFormData(prev => ({
        ...prev,
        direccion: detalles.direccionCompleta,
        codigoPostal: detalles.codigoPostal || prev.codigoPostal,
        poblacion: detalles.poblacion || prev.poblacion,
        provincia: detalles.provincia || prev.provincia,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        direccion: resultado.direccion,
      }));
    }
  };
  
  // Actualizar campo del formulario
  const updateField = (field: keyof FormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo si existe
    if (camposConError.includes(field)) {
      setCamposConError(prev => prev.filter(c => c !== field));
    }
    if (campoIncompleto === field) {
      setCampoIncompleto(null);
    }
  };
  
  // Validar NIF/CIF
  const validateNif = (nif: string) => {
    if (!nif) {
      setFieldErrors(prev => ({ ...prev, nif: undefined }));
      return;
    }
    
    const resultado = validarNifCif(nif);
    if (!resultado.valido) {
      setFieldErrors(prev => ({ ...prev, nif: resultado.mensaje }));
    } else {
      setFieldErrors(prev => ({ ...prev, nif: undefined }));
    }
  };
  
  // Validar email
  const validateEmail = (email: string) => {
    if (!email) {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFieldErrors(prev => ({ ...prev, email: "Email no válido" }));
    } else {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
    }
  };
  
  // Tipo seleccionado
  const tipoSeleccionado = tiposAparato.find(t => t.value === formData.tipoAparato);
  const esCaldera = tipoSeleccionado?.tipo === 'caldera';
  
  // Calcular precios
  const precioBase = tipoSeleccionado?.precios[planSeleccionado as keyof typeof preciosPorPlan.caldera] || 0;
  const { total: precioSinIVA, desglose } = calcularPrecioConDescuentos(precioBase, formData.cantidad);
  const precioTotal = Math.round(precioSinIVA * 1.21);
  
  // Mapa de nombres de campos para el banner
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
  
  // Validar formulario y mostrar banner con scroll
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
      const primerError = errores[0];
      setCampoIncompleto(primerError);
      
      // Scroll al campo con error
      setTimeout(() => {
        const elemento = document.getElementById(`field-${primerError}`);
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
  
  // Proceder al pago
  const procederAlPago = () => {
    if (!validarFormulario()) return;
    
    // Generar número de contrato
    const nuevoNumero = generarNumeroContrato(tipoSeleccionado?.tipo || 'caldera');
    setNumeroContrato(nuevoNumero);
    setPaso('pago');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Manejar pago exitoso
  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Pago exitoso:', paymentIntentId);
    setPaso('completado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Descargar PDF (solo disponible después del pago)
  const descargarPDF = async () => {
    if (paso !== 'completado') return;
    
    setIsLoading(true);
    try {
      // Simular generación de PDF
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('PDF generado correctamente. En producción se descargaría el archivo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Imprimir contrato (solo disponible después del pago)
  const imprimirContrato = () => {
    if (paso !== 'completado') return;
    window.print();
  };
  
  // Datos para el contrato
  const datosCliente = {
    razonSocial: formData.razonSocial || "Nombre del Cliente",
    nif: formData.nif || "00000000A",
    direccion: formData.direccion || "Dirección del cliente",
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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbsConfig.contratoMantenimiento} />
      
      {/* Banner de campo incompleto */}
      {campoIncompleto && (
        <div className="sticky top-0 z-50 bg-red-500 text-white px-4 py-3 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">
                Campo incompleto: <strong>{nombresCampos[campoIncompleto] || campoIncompleto}</strong>
              </span>
            </div>
            <button 
              onClick={() => setCampoIncompleto(null)}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Paso 1: Formulario con vista previa del contrato */}
          {paso === 'formulario' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Formulario Principal */}
              <div className="lg:col-span-2">
                <form className="space-y-6">
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
                    
                    {/* Tipo de aparato */}
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
                              <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4" /> Calderas
                              </div>
                            </SelectItem>
                            {tiposAparato.filter(t => t.tipo === 'caldera').map(tipo => (
                              <SelectItem key={tipo.value} value={tipo.value} className="pl-6">
                                {tipo.label}
                              </SelectItem>
                            ))}
                            <SelectItem value="header-aires" disabled className="font-semibold text-blue-600">
                              <div className="flex items-center gap-2">
                                <Wind className="w-4 h-4" /> Aires Acondicionados
                              </div>
                            </SelectItem>
                            {tiposAparato.filter(t => t.tipo === 'aire').map(tipo => (
                              <SelectItem key={tipo.value} value={tipo.value} className="pl-6">
                                {tipo.label}
                              </SelectItem>
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
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-lg font-semibold">{formData.cantidad}</span>
                          <button
                            type="button"
                            onClick={() => updateField('cantidad', formData.cantidad + 1)}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
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
                      <InputConValidacion
                        id="razonSocial"
                        label="Nombre / Razón Social"
                        value={formData.razonSocial}
                        onChange={(value) => updateField('razonSocial', value)}
                        placeholder="Nombre completo o empresa"
                        required
                        hasError={camposConError.includes('razonSocial')}
                      />
                      
                      <InputConValidacion
                        id="nif"
                        label="NIF/CIF"
                        value={formData.nif}
                        onChange={(value) => updateField('nif', value.toUpperCase())}
                        onBlur={() => validateNif(formData.nif)}
                        error={fieldErrors.nif}
                        placeholder="12345678A"
                        required
                        hasError={camposConError.includes('nif')}
                      />
                      
                      {/* Campo de Dirección con Autocompletado */}
                      <div className="sm:col-span-2" id="field-direccion">
                        <Label>Dirección (Calle y Número) <span className="text-orange-500">*</span></Label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            value={formData.direccion}
                            onChange={(e) => {
                              updateField('direccion', e.target.value);
                              setDireccionSeleccionada(false);
                            }}
                            onFocus={() => {
                              if (direccionesFiltradas.length > 0 && !direccionSeleccionada) {
                                setDireccionOpen(true);
                              }
                            }}
                            placeholder="Ej: Calle Grafito 12, Calle Gran Vía 25..."
                            className={cn(
                              "flex h-10 w-full rounded-md border bg-white px-3 py-2 pr-10 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                              camposConError.includes('direccion') ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
                            )}
                            autoComplete="off"
                          />
                          {buscandoDirecciones && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-orange-500" />
                          )}
                          {!buscandoDirecciones && formData.direccion && direccionSeleccionada && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                          )}
                          
                          {/* Dropdown de sugerencias */}
                          {direccionOpen && direccionesFiltradas.length > 0 && !direccionSeleccionada && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                              <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                                Selecciona una dirección (se autocompletará CP, población y provincia):
                              </div>
                              {direccionesFiltradas.map((resultado) => (
                                <button
                                  key={resultado.placeId}
                                  type="button"
                                  onClick={() => handleDireccionSelect(resultado)}
                                  className="w-full flex items-start gap-3 px-3 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                                >
                                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{resultado.direccion}</p>
                                    {resultado.detalles && (
                                      <p className="text-xs text-gray-500 truncate">{resultado.detalles}</p>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Se autocompleta al seleccionar dirección</p>
                      </div>
                      
                      {/* Tipo de vivienda */}
                      <div className="sm:col-span-2">
                        <Label>Tipo de Vivienda</Label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="tipoVivienda"
                              checked={!formData.esChalet}
                              onChange={() => updateField('esChalet', false)}
                              className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm">Piso / Apartamento</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="tipoVivienda"
                              checked={formData.esChalet}
                              onChange={() => updateField('esChalet', true)}
                              className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm">Chalet / Casa</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* Campos adicionales para piso */}
                      {!formData.esChalet && (
                        <>
                          <InputConValidacion
                            id="portal"
                            label="Portal"
                            value={formData.portal}
                            onChange={(value) => updateField('portal', value)}
                            placeholder="Ej: 1, A, B..."
                          />
                          <InputConValidacion
                            id="escalera"
                            label="Escalera"
                            value={formData.escalera}
                            onChange={(value) => updateField('escalera', value)}
                            placeholder="Ej: Izq, Dcha, A..."
                          />
                          <InputConValidacion
                            id="piso"
                            label="Piso"
                            value={formData.piso}
                            onChange={(value) => updateField('piso', value)}
                            placeholder="Ej: 1, 2, Bajo..."
                          />
                          <InputConValidacion
                            id="puerta"
                            label="Puerta"
                            value={formData.puerta}
                            onChange={(value) => updateField('puerta', value)}
                            placeholder="Ej: A, B, 1..."
                          />
                        </>
                      )}
                      
                      <InputConValidacion
                        id="codigoPostal"
                        label="Código Postal"
                        value={formData.codigoPostal}
                        onChange={(value) => updateField('codigoPostal', value)}
                        placeholder="28000"
                        required
                        hasError={camposConError.includes('codigoPostal')}
                      />
                      
                      <InputConValidacion
                        id="poblacion"
                        label="Población"
                        value={formData.poblacion}
                        onChange={(value) => updateField('poblacion', value)}
                        placeholder="Madrid"
                        required
                        hasError={camposConError.includes('poblacion')}
                      />
                      
                      <InputConValidacion
                        id="telefono"
                        label="Teléfono"
                        value={formData.telefono}
                        onChange={(value) => updateField('telefono', value)}
                        placeholder="600 000 000"
                        type="tel"
                        required
                        hasError={camposConError.includes('telefono')}
                      />
                      
                      <InputConValidacion
                        id="email"
                        label="Email"
                        value={formData.email}
                        onChange={(value) => updateField('email', value)}
                        onBlur={() => validateEmail(formData.email)}
                        error={fieldErrors.email}
                        placeholder="tu@email.com"
                        type="email"
                        required
                        hasError={camposConError.includes('email')}
                      />
                    </div>
                  </div>
                  
                  {/* Vista previa del contrato ANTES de firmar */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-900">Vista Previa del Contrato</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setContratoAmpliado(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                      >
                        <Maximize2 className="w-4 h-4" />
                        Pantalla Completa
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 px-4 py-2 bg-yellow-50 border-b border-yellow-100">
                      Revisa el contrato antes de firmar. Los datos se actualizan en tiempo real.
                    </div>
                    <div 
                      className="h-[350px] overflow-y-auto p-4 bg-gray-50"
                      style={{ scrollbarWidth: 'thin' }}
                    >
                      <div 
                        ref={contratoRef} 
                        className="bg-white shadow-sm rounded-lg transform scale-[0.8] origin-top"
                        style={{ transformOrigin: 'top center' }}
                      >
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
                    
                    <div className={cn(
                      "rounded-lg p-1",
                      camposConError.includes('firma') && "ring-2 ring-red-500 bg-red-50"
                    )}>
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
                          className="w-5 h-5 mt-0.5 text-orange-500 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          He leído y acepto los{' '}
                          <Link href="/terminos-mantenimiento" target="_blank" className="text-orange-600 hover:underline font-medium">
                            Términos y Condiciones del Contrato de Mantenimiento
                          </Link>
                          , incluyendo la política de renovación automática y cancelación.
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
                          className="w-5 h-5 mt-0.5 text-orange-500 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          Acepto la{' '}
                          <Link href="/privacidad" target="_blank" className="text-orange-600 hover:underline font-medium">
                            Política de Privacidad
                          </Link>
                          {' '}y el tratamiento de mis datos personales.
                          <span className="text-orange-500"> *</span>
                        </span>
                      </label>
                    </div>
                    
                    {/* Botón de continuar */}
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={procederAlPago}
                        className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        Proceder al Pago (€{precioTotal})
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Calculadora lateral con scroll */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-orange-500" />
                    Resumen del Pedido
                  </h3>
                  
                  {/* Contenedor con scroll para la calculadora */}
                  <div className="max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                    {formData.tipoAparato && (
                      <div className="space-y-3 mb-4">
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
                        
                        {/* Desglose de precios */}
                        {formData.cantidad > 1 && (
                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <p className="text-xs text-gray-500 mb-2">Desglose por equipo:</p>
                            <div className="space-y-1">
                              {desglose.map((item) => (
                                <div key={item.maquina} className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Equipo {item.maquina}
                                    {item.descuento > 0 && (
                                      <span className="text-green-600 ml-1">(-{item.descuento}%)</span>
                                    )}
                                  </span>
                                  <span className="font-medium">€{item.precio}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-200 pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal (sin IVA):</span>
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
                    )}
                    
                    {!formData.tipoAparato && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Selecciona un tipo de aparato para ver el precio
                      </p>
                    )}
                  </div>
                  
                  {/* Beneficios del plan */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Incluido en Plan {planSeleccionado}:
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {planSeleccionado === 'Esencial' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            1 revisión anual
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Certificado oficial
                          </li>
                        </>
                      )}
                      {planSeleccionado === 'Confort' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            2 revisiones anuales
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Atención prioritaria
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Certificado oficial
                          </li>
                        </>
                      )}
                      {planSeleccionado === 'Premium' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Revisiones ilimitadas
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Atención 24/7 prioritaria
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            Descuento 10% en repuestos
                          </li>
                        </>
                      )}
                    </ul>
                    <p className="mt-2 text-[10px] text-gray-500">
                      * Repuestos y gas NO incluidos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Paso 2: Pago con Stripe */}
          {paso === 'pago' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Finalizar Pago</h2>
                <p className="text-gray-600 mb-6">Contrato Nº {numeroContrato}</p>
                
                {/* Resumen del pedido */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Resumen del Contrato</h3>
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
                  <p className="text-xs text-gray-500 mt-3">
                    * La suscripción se renovará automáticamente cada año. Puedes cancelar con 1 mes de antelación.
                  </p>
                </div>
                
                {/* Formulario de pago Stripe */}
                <StripePaymentForm
                  amount={precioTotal}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={(error) => {
                    console.error('Error en el pago:', error);
                    alert('Error en el pago. Por favor, intenta de nuevo.');
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
                  onClick={() => setPaso('formulario')}
                  className="w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Volver al Formulario
                </button>
              </div>
            </div>
          )}
          
          {/* Paso 3: Completado - AQUÍ están los botones de descarga/impresión */}
          {paso === 'completado' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Contrato Completado!</h2>
                <p className="text-gray-600 mb-6">
                  Tu contrato de mantenimiento ha sido procesado correctamente.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Número de Contrato</p>
                  <p className="text-xl font-mono font-bold text-orange-600">{numeroContrato}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">📧 Email Enviado</h3>
                  <p className="text-sm text-blue-700">
                    Hemos enviado una copia del contrato a <strong>{formData.email}</strong>.
                    Si no lo recibes en unos minutos, revisa tu carpeta de spam.
                  </p>
                </div>
                
                {/* Botones de descarga e impresión - SOLO AQUÍ después del pago */}
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
                    onClick={imprimirContrato}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir Contrato
                  </button>
                </div>
                
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-orange-600 font-semibold hover:underline"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>
      
      {/* Modal de contrato en pantalla completa */}
      {contratoAmpliado && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-bold text-gray-900">Vista Previa del Contrato</h3>
                <p className="text-sm text-gray-500">Revisa todas las cláusulas antes de firmar</p>
              </div>
              <button
                onClick={() => setContratoAmpliado(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Cerrar
              </button>
            </div>
            <div className="p-6">
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
      )}
      
      <Footer />
      
      {/* Estilos para impresión */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #contrato-print, #contrato-print * {
            visibility: visible;
          }
          #contrato-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Componente principal con Suspense
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
