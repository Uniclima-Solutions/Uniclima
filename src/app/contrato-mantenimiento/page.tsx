"use client";

/**
 * Contrato de Mantenimiento - Formulario completo con visualización de contrato
 * Uniclima Solutions - CIF B21651393
 * Con calculadora de precios, firma digital, visualización PDF y pago Stripe
 * 
 * MEJORAS IMPLEMENTADAS:
 * - Autocompletado de direcciones mejorado (calle + número -> CP, población, provincia)
 * - Firma digital compacta (400x120)
 * - Visualización del contrato en bloque con scroll interno
 * - Botón de pantalla completa para revisar cláusulas
 * - Texto del contrato pequeño, capitalizado, bien legible
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
  X
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
  sublabel
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
}) => {
  return (
    <div>
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
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            value && !error ? "border-green-500" : "",
            "pr-10"
          )}
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error ? (
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
  const [paso, setPaso] = useState<'formulario' | 'contrato' | 'pago' | 'completado'>('formulario');
  const [numeroContrato, setNumeroContrato] = useState<string>('');
  const [planSeleccionado, setPlanSeleccionado] = useState<string>("Esencial");
  const [contratoAmpliado, setContratoAmpliado] = useState(false);
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
    }, 600);
    
    return () => clearTimeout(timeoutId);
  }, [formData.direccion, direccionSeleccionada]);
  
  // Función para actualizar campos del formulario
  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  
  // Manejar selección de dirección - MEJORADO
  const handleDireccionSelect = async (resultado: AddressResult) => {
    setDireccionSeleccionada(true);
    setDireccionOpen(false);
    
    // Actualizar inmediatamente con los datos del resultado
    setFormData(prev => ({
      ...prev,
      direccion: resultado.mainText || resultado.name,
      codigoPostal: resultado.postalCode || '',
      poblacion: resultado.locality || '',
      provincia: resultado.province || 'Madrid',
    }));
    
    // Intentar obtener más detalles si es necesario
    if (!resultado.postalCode || !resultado.locality) {
      try {
        const detalles = await obtenerDetalles(resultado.placeId);
        setFormData(prev => ({
          ...prev,
          codigoPostal: detalles.codigoPostal || prev.codigoPostal,
          poblacion: detalles.poblacion || prev.poblacion,
          provincia: detalles.provincia || prev.provincia,
        }));
      } catch (error) {
        console.error('Error obteniendo detalles:', error);
      }
    }
  };
  
  // Obtener tipo seleccionado
  const tipoSeleccionado = tiposAparato.find(t => t.value === formData.tipoAparato);
  const esCaldera = tipoSeleccionado?.tipo === 'caldera';
  
  // Calcular precios
  const precioUnitario = tipoSeleccionado?.precios[planSeleccionado as keyof typeof tipoSeleccionado.precios] || 0;
  const { total: precioSinIVA, desglose: desglosePrecios } = calcularPrecioConDescuentos(precioUnitario, formData.cantidad);
  const precioTotal = Math.round(precioSinIVA * 1.21);
  const ahorroTotal = (precioUnitario * formData.cantidad) - precioSinIVA;
  
  // Verificar si el formulario está completo
  const formularioCompleto = formData.razonSocial && 
    formData.nif && 
    !fieldErrors.nif &&
    formData.direccion && 
    formData.poblacion && 
    formData.telefono && 
    formData.email && 
    formData.tipoAparato &&
    formData.aceptaTerminos &&
    formData.aceptaPrivacidad &&
    formData.firma;
  
  // Generar contrato y pasar al siguiente paso
  const generarContrato = () => {
    const numero = generarNumeroContrato(tipoSeleccionado?.tipo || 'caldera');
    setNumeroContrato(numero);
    setPaso('contrato');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Función para descargar PDF
  const descargarPDF = async () => {
    if (!contratoRef.current) return;
    
    setIsLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(contratoRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Contrato_${numeroContrato}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Imprimir contrato
  const imprimirContrato = () => {
    window.print();
  };
  
  // Proceder al pago
  const procederAlPago = () => {
    setPaso('pago');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Manejar pago exitoso
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log('Pago exitoso:', paymentIntentId);
    console.log('Enviando contrato por email a:', formData.email);
    
    const contrato = {
      numeroContrato,
      tipo: tipoSeleccionado?.tipo,
      plan: planSeleccionado,
      cliente: formData,
      precioTotal,
      fechaCreacion: new Date().toISOString(),
      paymentIntentId,
    };
    
    const contratos = JSON.parse(localStorage.getItem('uniclima_contratos') || '[]');
    contratos.push(contrato);
    localStorage.setItem('uniclima_contratos', JSON.stringify(contratos));
    
    setPaso('completado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Datos para el contrato
  const datosCliente = {
    razonSocial: formData.razonSocial,
    nif: formData.nif,
    direccion: formData.direccion,
    poblacion: formData.poblacion,
    codigoPostal: formData.codigoPostal,
    provincia: formData.provincia,
    telefono: formData.telefono,
    email: formData.email,
    esChalet: formData.esChalet,
    portal: formData.portal,
    escalera: formData.escalera,
    piso: formData.piso,
    puerta: formData.puerta,
  };
  
  const datosContrato = {
    numeroContrato: numeroContrato,
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
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Paso 1: Formulario */}
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo de Aparato <span className="text-orange-500">*</span></Label>
                        <Select
                          value={formData.tipoAparato}
                          onValueChange={(value) => updateField('tipoAparato', value)}
                        >
                          <SelectTrigger className="mt-1">
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
                      />
                      
                      {/* Campo de Dirección con Autocompletado MEJORADO */}
                      <div className="sm:col-span-2">
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
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                                    <p className="text-sm font-medium text-gray-900 truncate">{resultado.mainText}</p>
                                    <p className="text-xs text-gray-500 truncate">{resultado.secondaryText}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Escribe calle y número (ej: "Calle Grafito 12") y selecciona de las sugerencias
                        </p>
                      </div>
                      
                      {/* Checkbox Chalet */}
                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.esChalet}
                            onChange={(e) => updateField('esChalet', e.target.checked)}
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-900">Es un chalet o vivienda unifamiliar</span>
                            <p className="text-xs text-gray-500">Marca esta opción si no hay portal, escalera ni piso</p>
                          </div>
                        </label>
                      </div>
                      
                      {/* Campos de portal/escalera/piso/puerta - Solo si NO es chalet */}
                      {!formData.esChalet && (
                        <>
                          <InputConValidacion
                            id="portal"
                            label="Portal/Bloque"
                            value={formData.portal}
                            onChange={(value) => updateField('portal', value)}
                            placeholder="1, A, etc."
                          />
                          
                          <InputConValidacion
                            id="escalera"
                            label="Escalera"
                            value={formData.escalera}
                            onChange={(value) => updateField('escalera', value)}
                            placeholder="Izq, Dcha, etc."
                          />
                          
                          <InputConValidacion
                            id="piso"
                            label="Piso"
                            value={formData.piso}
                            onChange={(value) => updateField('piso', value)}
                            placeholder="1º, 2º, etc."
                          />
                          
                          <InputConValidacion
                            id="puerta"
                            label="Puerta"
                            value={formData.puerta}
                            onChange={(value) => updateField('puerta', value)}
                            placeholder="A, B, 1, etc."
                          />
                        </>
                      )}
                      
                      {/* Código Postal - Autocompletado pero editable */}
                      <InputConValidacion
                        id="codigoPostal"
                        label="Código Postal"
                        value={formData.codigoPostal}
                        onChange={(value) => updateField('codigoPostal', value)}
                        placeholder="28001"
                        required
                        sublabel="Se autocompleta al seleccionar dirección"
                      />
                      
                      {/* Población - Autocompletado pero editable */}
                      <InputConValidacion
                        id="poblacion"
                        label="Población"
                        value={formData.poblacion}
                        onChange={(value) => updateField('poblacion', value)}
                        placeholder="Madrid, Torrejón de Ardoz..."
                        required
                        sublabel="Se autocompleta al seleccionar dirección"
                      />
                      
                      {/* Provincia - Autocompletado pero editable */}
                      <InputConValidacion
                        id="provincia"
                        label="Provincia"
                        value={formData.provincia}
                        onChange={(value) => updateField('provincia', value)}
                        placeholder="Madrid"
                      />
                      
                      <InputConValidacion
                        id="telefono"
                        label="Teléfono"
                        value={formData.telefono}
                        onChange={(value) => updateField('telefono', value)}
                        placeholder="612 345 678"
                        type="tel"
                        required
                      />
                      
                      <InputConValidacion
                        id="email"
                        label="Email"
                        value={formData.email}
                        onChange={(value) => updateField('email', value)}
                        placeholder="tu@email.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Firma Digital - COMPACTA */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-500" />
                      Firma Digital
                    </h2>
                    
                    <SignaturePad
                      onSave={(firma) => updateField('firma', firma)}
                      onClear={() => updateField('firma', null)}
                    />
                  </div>
                  
                  {/* Términos y Condiciones */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-orange-500" />
                      Términos y Condiciones
                    </h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.aceptaTerminos}
                          onChange={(e) => updateField('aceptaTerminos', e.target.checked)}
                          className="w-5 h-5 mt-0.5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-600">
                          He leído y acepto los{' '}
                          <Link href="/terminos-mantenimiento" target="_blank" className="text-orange-500 hover:underline">
                            términos y condiciones del servicio de mantenimiento
                          </Link>
                          , incluyendo la cláusula de cancelación con preaviso de 1 mes.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.aceptaPrivacidad}
                          onChange={(e) => updateField('aceptaPrivacidad', e.target.checked)}
                          className="w-5 h-5 mt-0.5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-600">
                          He leído y acepto la{' '}
                          <Link href="/privacidad" target="_blank" className="text-orange-500 hover:underline">
                            política de privacidad
                          </Link>
                          .
                        </span>
                      </label>
                    </div>
                    
                    {/* Botón Generar Contrato */}
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={generarContrato}
                        disabled={!formularioCompleto}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Generar Contrato
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      
                      {!formularioCompleto && (
                        <p className="text-xs text-center text-gray-500 mt-2">
                          Completa todos los campos obligatorios y firma para continuar
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Calculadora y Resumen */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  {/* Calculadora de Precios */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-orange-500" />
                      Calculadora de Precios
                    </h2>
                    
                    {tipoSeleccionado ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <span className="text-sm text-gray-600">Plan {planSeleccionado}</span>
                          <span className="font-bold text-orange-600">€{precioUnitario}/equipo</span>
                        </div>
                        
                        {formData.cantidad > 1 && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Desglose por equipo:</p>
                            {desglosePrecios.map((item) => (
                              <div key={item.maquina} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  Equipo {item.maquina}
                                  {item.descuento > 0 && (
                                    <span className="ml-1 text-green-600 text-xs">(-{item.descuento}%)</span>
                                  )}
                                </span>
                                <span className="font-medium">€{item.precio}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {ahorroTotal > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-700 font-medium">
                              ¡Ahorras €{ahorroTotal} con descuento por volumen!
                            </p>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal (sin IVA)</span>
                            <span className="font-medium">€{precioSinIVA}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">IVA (21%)</span>
                            <span className="font-medium">€{precioTotal - precioSinIVA}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                            <span>Total Anual</span>
                            <span className="text-orange-600">€{precioTotal}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Selecciona un tipo de aparato para ver el precio
                      </p>
                    )}
                  </div>
                  
                  {/* Beneficios del Plan */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Plan {planSeleccionado}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {planSeleccionado === 'Esencial' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            1 revisión anual
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Certificado oficial
                          </li>
                        </>
                      )}
                      {planSeleccionado === 'Confort' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            2 revisiones anuales
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Atención prioritaria
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Certificado oficial
                          </li>
                        </>
                      )}
                      {planSeleccionado === 'Premium' && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Revisiones ilimitadas
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Mano de obra incluida
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Atención 24/7 prioritaria
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Descuento 10% en repuestos
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Certificado oficial
                          </li>
                        </>
                      )}
                    </ul>
                    <p className="mt-3 text-xs text-gray-500">
                      * Repuestos y gas NO incluidos en ningún plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Paso 2: Visualización del Contrato - REDISEÑADO */}
          {paso === 'contrato' && (
            <div className="space-y-6">
              {/* Barra de acciones */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Contrato de Mantenimiento</h2>
                  <p className="text-sm text-gray-500">Nº {numeroContrato}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setContratoAmpliado(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Ver Pantalla Completa
                  </button>
                  <button
                    onClick={descargarPDF}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    PDF
                  </button>
                  <button
                    onClick={imprimirContrato}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir
                  </button>
                </div>
              </div>
              
              {/* Vista previa del contrato en bloque con scroll - NUEVO DISEÑO */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Vista previa del contrato</span>
                  <span className="text-xs text-gray-500">Desplázate para revisar todas las cláusulas</span>
                </div>
                <div 
                  className="h-[400px] overflow-y-auto p-4 bg-gray-50"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <div 
                    ref={contratoRef} 
                    className="bg-white shadow-sm rounded-lg transform scale-[0.85] origin-top"
                    style={{ transformOrigin: 'top center' }}
                  >
                    {esCaldera ? (
                      <ContratoCaldera
                        datosCliente={datosCliente}
                        datosContrato={datosContrato}
                        firmaCliente={formData.firma || undefined}
                        mostrarFirmaEmpresa={true}
                      />
                    ) : (
                      <ContratoAireAcondicionado
                        datosCliente={datosCliente}
                        datosContrato={datosContrato}
                        firmaCliente={formData.firma || undefined}
                        mostrarFirmaEmpresa={true}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Resumen y botones de acción */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Resumen del Contrato</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cliente:</span>
                        <span className="font-medium">{formData.razonSocial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{planSeleccionado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipos:</span>
                        <span className="font-medium">{formData.cantidad} {tipoSeleccionado?.label}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold">Total Anual:</span>
                        <span className="font-bold text-orange-600">€{precioTotal}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-3">
                    <button
                      onClick={procederAlPago}
                      className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceder al Pago (€{precioTotal})
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPaso('formulario')}
                      className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Volver a Editar
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Modal de contrato en pantalla completa */}
              {contratoAmpliado && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                      <div>
                        <h3 className="font-bold text-gray-900">Contrato de Mantenimiento</h3>
                        <p className="text-sm text-gray-500">Nº {numeroContrato}</p>
                      </div>
                      <button
                        onClick={() => setContratoAmpliado(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Minimize2 className="w-4 h-4" />
                        Cerrar
                      </button>
                    </div>
                    <div className="p-6">
                      {esCaldera ? (
                        <ContratoCaldera
                          datosCliente={datosCliente}
                          datosContrato={datosContrato}
                          firmaCliente={formData.firma || undefined}
                          mostrarFirmaEmpresa={true}
                        />
                      ) : (
                        <ContratoAireAcondicionado
                          datosCliente={datosCliente}
                          datosContrato={datosContrato}
                          firmaCliente={formData.firma || undefined}
                          mostrarFirmaEmpresa={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Paso 3: Pago con Stripe */}
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
                  amount={precioTotal * 100}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => {
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
                />
                
                <button
                  onClick={() => setPaso('contrato')}
                  className="w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Volver al Contrato
                </button>
              </div>
            </div>
          )}
          
          {/* Paso 4: Completado */}
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
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={descargarPDF}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Descargar Contrato PDF
                  </button>
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>
      
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
