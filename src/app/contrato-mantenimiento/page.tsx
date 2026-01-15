"use client";

/**
 * Contrato de Mantenimiento - Formulario completo
 * Uniclima Solutions - CIF B21651393
 * Con calculadora de precios con descuento por volumen
 */

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Check, 
  Loader2,
  ChevronsUpDown,
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
  Phone,
  Mail,
  Building
} from "lucide-react";
import { poblacionesMadrid, validarNifCif } from "@/data/poblacionesMadrid";
import { 
  buscarDirecciones, 
  obtenerDetalles, 
  AddressResult 
} from "@/services/addressAutocompleteService";
import { cn } from "@/lib/utils";

// Datos de la empresa
const EMPRESA = {
  nombre: "Uniclima Solutions",
  cif: "B21651393",
  direccion: "C/ Grafito 27, 28770 Colmenar Viejo, Madrid",
  telefono: "91 117 77 77",
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
  { value: "aire-split", label: "Aire A. Split", precio: 120, tipo: "aire" },
  { value: "aire-conductos", label: "Aire A. Conductos", precio: 120, tipo: "aire" },
  { value: "aire-cassette", label: "Aire A. Cassette", precio: 120, tipo: "aire" },
  { value: "aire-varios", label: "Aire A. Varios", precio: 120, tipo: "aire" },
  { value: "caldera-atmosferica", label: "Caldera Atmosférica", precio: 140, tipo: "caldera" },
  { value: "caldera-estanca", label: "Caldera Estanca", precio: 140, tipo: "caldera" },
  { value: "caldera-condensacion", label: "Caldera Condensación", precio: 140, tipo: "caldera" },
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
}

interface FieldErrors {
  nif?: string;
  email?: string;
  telefono?: string;
}

// Componente interno que usa useSearchParams
function ContratoMantenimientoContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [poblacionOpen, setPoblacionOpen] = useState(false);
  const [direccionOpen, setDireccionOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [planSeleccionado, setPlanSeleccionado] = useState<string>("Premium");
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
  
  // Buscar direcciones con debounce (usando Nominatim/OpenStreetMap)
  useEffect(() => {
    // Si ya seleccionó una dirección, no buscar más
    if (direccionSeleccionada) {
      return;
    }
    
    // Limpiar si hay menos de 3 caracteres
    if (formData.direccion.length < 3) {
      setDireccionesFiltradas([]);
      setDireccionOpen(false);
      return;
    }
    
    // Debounce de 600ms para no interferir con la escritura
    const timeoutId = setTimeout(async () => {
      if (formData.direccion.length >= 3 && !direccionSeleccionada) {
        setBuscandoDirecciones(true);
        try {
          const resultados = await buscarDirecciones(formData.direccion);
          setDireccionesFiltradas(resultados);
          // Solo abrir si hay resultados y el usuario sigue escribiendo
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
  }, [formData.direccion]);
  
  // Obtener tipo de aparato seleccionado
  const tipoSeleccionado = tiposAparato.find(t => t.value === formData.tipoAparato);
  
  // Calcular precio según plan
  const obtenerPrecioSegunPlan = () => {
    if (!tipoSeleccionado) return 0;
    const tipoEquipo = tipoSeleccionado.tipo as 'caldera' | 'aire';
    const preciosDelTipo = preciosPorPlan[tipoEquipo];
    if (preciosDelTipo && planSeleccionado in preciosDelTipo) {
      return preciosDelTipo[planSeleccionado as keyof typeof preciosDelTipo];
    }
    return tipoSeleccionado.precio;
  };
  
  // Calcular precios con descuentos
  const precioUnitario = obtenerPrecioSegunPlan();
  const { total: precioConDescuentos, desglose: desglosePrecios } = calcularPrecioConDescuentos(precioUnitario, formData.cantidad);
  const precioTotal = precioConDescuentos - formData.descuentoCupon;
  const precioSinDescuentos = precioUnitario * formData.cantidad;
  const ahorroTotal = precioSinDescuentos - precioConDescuentos;
  
  // Determinar tipo
  const esAire = tipoSeleccionado?.tipo === "aire";
  const esCaldera = tipoSeleccionado?.tipo === "caldera";
  
  // Actualizar campo
  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field in fieldErrors) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  // Manejar selección de población
  const handlePoblacionSelect = (nombrePoblacion: string) => {
    const poblacion = poblacionesMadrid.find(p => p.nombre === nombrePoblacion);
    if (poblacion) {
      setFormData(prev => ({
        ...prev,
        poblacion: poblacion.nombre,
        codigoPostal: poblacion.codigoPostal,
        provincia: "Madrid"
      }));
    }
    setPoblacionOpen(false);
  };
  
  // Manejar selección de dirección (usando Nominatim)
  const handleDireccionSelect = (resultado: AddressResult) => {
    // Cerrar dropdown inmediatamente
    setDireccionOpen(false);
    setDireccionesFiltradas([]);
    setDireccionSeleccionada(true);
    
    // Obtener detalles de la dirección seleccionada
    const detalles = obtenerDetalles(resultado);
    
    // Construir dirección formateada (calle y número)
    let direccionFormateada = detalles.formattedAddress;
    
    // Actualizar todos los campos de una vez
    setFormData(prev => ({
      ...prev,
      direccion: direccionFormateada,
      poblacion: detalles.locality || prev.poblacion,
      codigoPostal: detalles.postalCode || prev.codigoPostal,
      provincia: detalles.administrativeArea || 'Madrid'
    }));
    
    // Quitar el foco del input para evitar que se vuelva a abrir
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  
  // Validaciones
  const validateNif = (value: string) => {
    if (!value) {
      setFieldErrors(prev => ({ ...prev, nif: undefined }));
      return;
    }
    const resultado = validarNifCif(value);
    if (!resultado.valido) {
      setFieldErrors(prev => ({ ...prev, nif: resultado.mensaje }));
    } else {
      setFieldErrors(prev => ({ ...prev, nif: undefined }));
    }
  };
  
  const validateEmail = (value: string) => {
    if (!value) {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setFieldErrors(prev => ({ ...prev, email: "Email no válido" }));
    } else {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
    }
  };
  
  const validateTelefono = (value: string) => {
    if (!value) {
      setFieldErrors(prev => ({ ...prev, telefono: undefined }));
      return;
    }
    const telefonoLimpio = value.replace(/\s/g, "");
    if (telefonoLimpio.length < 9) {
      setFieldErrors(prev => ({ ...prev, telefono: "Teléfono debe tener al menos 9 dígitos" }));
    } else {
      setFieldErrors(prev => ({ ...prev, telefono: undefined }));
    }
  };
  
  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos || !formData.aceptaPrivacidad) {
      alert("Debe aceptar los términos y condiciones y la política de privacidad");
      return;
    }
    
    setIsLoading(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("¡Contrato enviado correctamente! Nos pondremos en contacto contigo pronto.");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contrato de <span className="text-orange-500">Mantenimiento</span>
          </h1>
          <p className="text-gray-600">
            Protege tu inversión con nuestros planes de mantenimiento preventivo
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selección de Plan */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-500" />
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
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="header-aire" disabled className="font-semibold text-blue-600">
                          <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4" /> Aire Acondicionado
                          </div>
                        </SelectItem>
                        {tiposAparato.filter(t => t.tipo === 'aire').map(tipo => (
                          <SelectItem key={tipo.value} value={tipo.value}>
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
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{formData.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => updateField('cantidad', formData.cantidad + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
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
                  <Building className="w-5 h-5 text-orange-500" />
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
                  
                  <div className="sm:col-span-2">
                    <Label>Dirección <span className="text-orange-500">*</span></Label>
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
                        placeholder="Escribe tu calle (ej: Calle Gran Vía 25)..."
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        
                        autoComplete="off"
                      />
                      {buscandoDirecciones && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-orange-500" />
                      )}
                      {!buscandoDirecciones && formData.direccion && direccionSeleccionada && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                      {!buscandoDirecciones && formData.direccion && !direccionSeleccionada && (
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      )}
                      
                      {/* Dropdown de sugerencias */}
                      {direccionOpen && direccionesFiltradas.length > 0 && !direccionSeleccionada && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                            Selecciona una dirección:
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
                      Escribe al menos 3 caracteres y selecciona de las sugerencias
                    </p>
                  </div>
                  
                  <div>
                    <Label>Población <span className="text-orange-500">*</span></Label>
                    <Popover open={poblacionOpen} onOpenChange={setPoblacionOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between mt-1"
                        >
                          {formData.poblacion || "Selecciona población"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar población..." />
                          <CommandList>
                            <CommandEmpty>No se encontró la población</CommandEmpty>
                            <CommandGroup>
                              {poblacionesMadrid.map((poblacion) => (
                                <CommandItem
                                  key={poblacion.nombre}
                                  onSelect={() => handlePoblacionSelect(poblacion.nombre)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.poblacion === poblacion.nombre ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {poblacion.nombre}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <InputConValidacion
                    id="codigoPostal"
                    label="Código Postal"
                    value={formData.codigoPostal}
                    onChange={(value) => updateField('codigoPostal', value)}
                    placeholder="28XXX"
                    required
                  />
                  
                  <InputConValidacion
                    id="telefono"
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={(value) => updateField('telefono', value)}
                    onBlur={() => validateTelefono(formData.telefono)}
                    error={fieldErrors.telefono}
                    placeholder="612 345 678"
                    type="tel"
                    required
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
                  />
                </div>
              </div>
              
              {/* Términos y Condiciones */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  Términos y Condiciones
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.aceptaTerminos}
                      onChange={(e) => updateField('aceptaTerminos', e.target.checked)}
                      className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-600">
                      Acepto los <Link href="/terminos-condiciones" className="text-orange-500 hover:underline">términos y condiciones</Link> del servicio de mantenimiento
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.aceptaPrivacidad}
                      onChange={(e) => updateField('aceptaPrivacidad', e.target.checked)}
                      className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-600">
                      He leído y acepto la <Link href="/politica-privacidad" className="text-orange-500 hover:underline">política de privacidad</Link>
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Botón Enviar */}
              <button
                type="submit"
                disabled={isLoading || !formData.aceptaTerminos || !formData.aceptaPrivacidad}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Contratar Ahora
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
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
                    {/* Plan seleccionado */}
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm text-gray-600">Plan {planSeleccionado}</span>
                      <span className="font-bold text-orange-600">€{precioUnitario}/equipo</span>
                    </div>
                    
                    {/* Desglose por máquina */}
                    {formData.cantidad > 1 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Desglose por equipo:</p>
                        {desglosePrecios.map((item) => (
                          <div key={item.maquina} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Equipo {item.maquina}
                              {item.descuento > 0 && (
                                <span className="text-green-600 text-xs ml-1">(-{item.descuento}%)</span>
                              )}
                            </span>
                            <span className="font-medium">€{item.precio}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Ahorro */}
                    {ahorroTotal > 0 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-sm text-green-700">¡Ahorro por volumen!</span>
                        <span className="font-bold text-green-600">-€{ahorroTotal}</span>
                      </div>
                    )}
                    
                    {/* Total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total Anual</span>
                        <span className="text-2xl font-black text-orange-600">€{precioTotal}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Selecciona un tipo de aparato para ver el precio</p>
                  </div>
                )}
              </div>
              
              {/* Información de Contacto */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-sm p-6 text-white">
                <h3 className="font-semibold mb-4">¿Necesitas ayuda?</h3>
                <div className="space-y-3">
                  <a href={`tel:${EMPRESA.telefono}`} className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>{EMPRESA.telefono}</span>
                  </a>
                  <a href={`mailto:${EMPRESA.email}`} className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>{EMPRESA.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
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
