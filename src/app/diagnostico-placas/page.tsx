'use client';

/**
 * DIAGNÓSTICO DE PLACAS ELECTRÓNICAS
 * Flujo: Info → Aceptar condiciones → Formulario
 */

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  getBrandsByType, 
  getModelsByBrand,
  commonErrorCodes,
  type EquipmentType,
  type EquipmentBrand,
  type EquipmentModel
} from '@/data/equipmentDatabase';
import {
  Flame,
  Wind,
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Upload,
  Video,
  X,
  Search,
  Loader2,
  CircuitBoard,
  Phone,
  Mail,
  Package,
  FileText,
  Wrench,
  Euro,
  Plus,
  Minus,
  Camera,
  Image as ImageIcon,
  AlertCircle,
  Shield,
  Clock,
  Award
} from 'lucide-react';

// Tipos
interface FormData {
  equipmentType: EquipmentType | '';
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  customModel: string;
  serialNumber: string;
  symptoms: string[];
  otherSymptomDescription: string;
  errorCode: string;
  description: string;
  photos: File[];
  video: File | null;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const initialFormData: FormData = {
  equipmentType: '',
  brandId: '',
  brandName: '',
  modelId: '',
  modelName: '',
  customModel: '',
  serialNumber: '',
  symptoms: [],
  otherSymptomDescription: '',
  errorCode: '',
  description: '',
  photos: [],
  video: null,
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  province: '',
  acceptTerms: false,
  acceptPrivacy: false,
};

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
  'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
  'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
  'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
  'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'
];

// Síntomas corregidos
const symptoms = [
  { id: 'no-enciende', label: 'No enciende' },
  { id: 'codigo-error', label: 'Muestra código de error' },
  { id: 'comunicacion-placas', label: 'Error de comunicación entre placas' },
  { id: 'ruidos', label: 'Hace ruidos extraños' },
  { id: 'se-apaga', label: 'Se apaga solo' },
  { id: 'display', label: 'Display apagado o parpadea' },
  { id: 'mando', label: 'No responde al mando' },
  { id: 'descripcion', label: 'Descripción del problema' },
  { id: 'otro', label: 'Otro problema' },
];

// FAQ data
const faqData = [
  {
    question: '¿Qué incluye el diagnóstico de 35€ + IVA?',
    answer: 'Incluye la revisión completa de la placa electrónica por nuestros técnicos especializados, identificación del fallo y presupuesto detallado de reparación sin compromiso.'
  },
  {
    question: '¿Qué pasa si acepto el presupuesto de reparación?',
    answer: 'El coste del diagnóstico (35€ + IVA) se descuenta íntegramente del precio final de la reparación. Solo pagarás el precio de la reparación.'
  },
  {
    question: '¿Qué opciones tengo si NO acepto el presupuesto?',
    answer: 'Tienes dos opciones:\n\n• Opción 1: Nos quedamos con la placa → Te devolvemos los 9€ del envío.\n\n• Opción 2: Quieres recuperar tu placa → Pagas 35€ (diagnóstico) + 9€ (portes ida y vuelta) = 44€ + IVA total.'
  },
  {
    question: '¿Cuánto tarda el diagnóstico?',
    answer: 'Una vez recibida la placa en nuestras instalaciones, el diagnóstico se realiza en 24-48 horas laborables. Recibirás el presupuesto por email.'
  },
  {
    question: '¿Qué garantía tiene la reparación?',
    answer: 'Todas nuestras reparaciones tienen 1 año de garantía. Si la placa falla por el mismo motivo durante ese periodo, la reparamos sin coste adicional.'
  },
];

// Términos y condiciones
const termsContent = `
CONDICIONES DEL SERVICIO DE DIAGNÓSTICO Y REPARACIÓN DE PLACAS ELECTRÓNICAS

1. OBJETO DEL SERVICIO
El presente servicio consiste en el diagnóstico y, en su caso, reparación de placas electrónicas de calderas, aires acondicionados y sistemas de aerotermia.

2. PRECIO DEL DIAGNÓSTICO
- El diagnóstico tiene un coste de 35€ + IVA.
- Este importe se abona por adelantado antes del envío de la placa.

3. OPCIONES TRAS EL DIAGNÓSTICO

3.1. Si el cliente ACEPTA el presupuesto de reparación:
- El coste del diagnóstico (35€ + IVA) se descuenta del precio final de la reparación.
- El cliente solo abona el precio de la reparación.

3.2. Si el cliente NO ACEPTA el presupuesto:
- Opción A: El cliente cede la placa a Uniclima → Se devuelven los 9€ del envío.
- Opción B: El cliente desea recuperar su placa → Debe abonar 35€ (diagnóstico) + 9€ (portes ida y vuelta) = 44€ + IVA.

4. ENVÍO DE LA PLACA
- El cliente es responsable del embalaje adecuado de la placa para evitar daños durante el transporte.
- Se recomienda utilizar embalaje antiestático y protección contra golpes.
- El coste del envío inicial corre a cargo del cliente.

5. GARANTÍA
- Las reparaciones tienen una garantía de 1 año.
- La garantía cubre únicamente el componente reparado.
- No cubre daños por mal uso, sobretensiones o manipulación indebida.

6. PLAZOS
- Diagnóstico: 24-48 horas laborables desde la recepción.
- Reparación: Variable según la complejidad, se informará en el presupuesto.

7. PROTECCIÓN DE DATOS
Los datos personales serán tratados conforme a nuestra política de privacidad y la normativa vigente (RGPD).

8. ACEPTACIÓN
Al enviar este formulario, el cliente declara haber leído y aceptado las presentes condiciones.
`;

export default function DiagnosticoPlacasPage() {
  const [showForm, setShowForm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const cameraPhotoRef = useRef<HTMLInputElement>(null);
  const cameraVideoRef = useRef<HTMLInputElement>(null);
  
  const filteredBrands = formData.equipmentType 
    ? getBrandsByType(formData.equipmentType).filter(brand =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
      )
    : [];
  
  const filteredModels = formData.brandId
    ? getModelsByBrand(formData.equipmentType as EquipmentType, formData.brandId).filter(model =>
        model.name.toLowerCase().includes(modelSearch.toLowerCase())
      )
    : [];
  
  const suggestedErrorCodes = formData.brandId 
    ? commonErrorCodes[formData.brandId] || commonErrorCodes['default']
    : commonErrorCodes['default'];

  // Handlers
  const handleEquipmentTypeSelect = (type: EquipmentType) => {
    setFormData(prev => ({ ...prev, equipmentType: type, brandId: '', brandName: '', modelId: '', modelName: '', customModel: '' }));
    setBrandSearch('');
    setModelSearch('');
  };
  
  const handleBrandSelect = (brand: EquipmentBrand) => {
    setFormData(prev => ({ ...prev, brandId: brand.id, brandName: brand.name, modelId: '', modelName: '', customModel: '' }));
    setBrandSearch(brand.name);
    setShowBrandDropdown(false);
    setModelSearch('');
  };
  
  const handleModelSelect = (model: EquipmentModel) => {
    setFormData(prev => ({ ...prev, modelId: model.id, modelName: model.name, customModel: '' }));
    setModelSearch(model.name);
    setShowModelDropdown(false);
  };
  
  const handleCustomModelChange = (value: string) => {
    setFormData(prev => ({ ...prev, customModel: value, modelId: '', modelName: '' }));
    setModelSearch(value);
  };
  
  const handleSymptomToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(id) ? prev.symptoms.filter(s => s !== id) : [...prev.symptoms, id],
    }));
  };
  
  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const images = files.filter(f => f.type.startsWith('image/'));
    const videos = files.filter(f => f.type.startsWith('video/'));
    
    if (images.length > 0) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...images].slice(0, 4)
      }));
    }
    
    if (videos.length > 0 && videos[0].size <= 15 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, video: videos[0] }));
    }
  }, []);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    if (formData.photos.length + files.length <= 4) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files].slice(0, 4) }));
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('video/') && file.size <= 15 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, video: file }));
    }
  };

  // Validación: modelo puede ser de la lista O escrito manualmente
  const hasValidModel = formData.modelId || formData.customModel.trim().length >= 2;

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: return !!(formData.equipmentType && formData.brandId && hasValidModel);
      case 2: return formData.symptoms.length > 0 && (
        !formData.symptoms.includes('otro') || formData.otherSymptomDescription.trim().length >= 10
      );
      case 3: return true;
      case 4: return !!(formData.fullName && formData.email && formData.phone && formData.address && formData.city && formData.postalCode && formData.province && formData.acceptTerms && formData.acceptPrivacy);
      default: return false;
    }
  };
  
  const handleNext = () => { if (isStepValid(currentStep) && currentStep < 4) setCurrentStep(prev => prev + 1); };
  const handlePrev = () => { if (currentStep > 1) setCurrentStep(prev => prev - 1); };
  
  const handleSubmit = async () => {
    if (!isStepValid(4)) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  // Éxito
  if (submitSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Solicitud enviada</h1>
            <p className="text-gray-600 mb-8">Recibirás un email con las instrucciones de pago y envío.</p>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-left mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">Próximos pasos:</h2>
              <div className="space-y-3">
                {['Realiza el pago del diagnóstico (35€ + IVA)', 'Envía la placa siguiendo las instrucciones', 'Recibe el presupuesto en 24-48h'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">{i + 1}</div>
                    <span className="text-gray-600 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* HERO */}
        <section className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Reparación de placas electrónicas
                </h1>
                <p className="text-gray-400 mb-5">
                  Diagnóstico profesional para calderas, aires acondicionados y aerotermia.
                </p>
                
                {/* Checkpoints */}
                <div className="space-y-2">
                  {['Técnicos especializados con +15 años de experiencia', 'Diagnóstico en 24-48 horas', '1 año de garantía en reparaciones'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Precios */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CircuitBoard className="w-6 h-6 text-orange-500" />
                  <span className="font-semibold">Diagnóstico completo</span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">35€</span>
                  <span className="text-gray-400">+ IVA</span>
                </div>
                <div className="space-y-2 text-sm text-gray-400 border-t border-gray-700 pt-4">
                  <p className="text-gray-300 font-medium mb-2">Si aceptas la reparación:</p>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Los 35€ se descuentan del precio final</span>
                  </div>
                  <p className="text-gray-300 font-medium mb-2 mt-4">Si NO aceptas:</p>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Nos quedamos la placa → Te devolvemos los 9€ del envío</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Quieres recuperarla → 35€ + 9€ portes = 44€ + IVA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* PROCESO */}
        <section className="py-6 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto gap-4 py-2">
              {[
                { icon: FileText, label: 'Formulario' },
                { icon: Euro, label: 'Pago' },
                { icon: Package, label: 'Envío' },
                { icon: Wrench, label: 'Presupuesto' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 hidden sm:inline">{step.label}</span>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-gray-300 ml-2" />}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ PREMIUM */}
        <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información del servicio</h2>
              <p className="text-gray-500">Lee atentamente antes de continuar</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {faqData.map((faq, index) => (
                <div 
                  key={index} 
                  className={`${index !== faqData.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      expandedFaq === index 
                        ? 'bg-orange-500 text-white rotate-0' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {expandedFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-5">
                      <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* ACEPTAR CONDICIONES - Antes del formulario */}
        {!showForm && (
          <section className="py-10 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Condiciones del servicio</h3>
                    <p className="text-sm text-gray-500">Debes aceptar para continuar</p>
                  </div>
                </div>
                
                {/* Desplegable de términos */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <span className="font-medium text-gray-700">Ver términos y condiciones completos</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showTerms ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${showTerms ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">{termsContent}</pre>
                    </div>
                  </div>
                </div>
                
                {/* Checkbox de aceptación */}
                <label className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 transition-colors">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    termsAccepted ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  }`}>
                    {termsAccepted && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">He leído y acepto las condiciones del servicio</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Incluyendo el coste del diagnóstico (35€ + IVA) y las opciones disponibles si no acepto el presupuesto.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="hidden"
                  />
                </label>
                
                {/* Botón continuar */}
                <button
                  onClick={() => termsAccepted && setShowForm(true)}
                  disabled={!termsAccepted}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                    termsAccepted
                      ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continuar al formulario
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        )}
        
        {/* FORMULARIO - Solo si aceptó condiciones */}
        {showForm && (
          <section id="formulario" className="py-10 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Solicitar diagnóstico</h2>
                <p className="text-gray-500">Completa el formulario en 4 sencillos pasos</p>
              </div>
              
              {/* Progress */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep > step ? 'bg-green-500 text-white' :
                      currentStep === step ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && <div className={`w-10 h-0.5 transition-colors duration-300 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
              
              {/* Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 sm:p-8">
                  {/* PASO 1 */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Tu equipo</h3>
                        <p className="text-sm text-gray-500">Selecciona el tipo, marca y modelo</p>
                      </div>
                      
                      {/* Tipo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de equipo</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { type: 'caldera' as EquipmentType, icon: Flame, label: 'Caldera' },
                            { type: 'aire_acondicionado' as EquipmentType, icon: Wind, label: 'Aire Acond.' },
                            { type: 'aerotermia' as EquipmentType, icon: Zap, label: 'Aerotermia' },
                          ].map((item) => (
                            <button
                              key={item.type}
                              type="button"
                              onClick={() => handleEquipmentTypeSelect(item.type)}
                              className={`p-4 rounded-lg border-2 transition-all text-center ${
                                formData.equipmentType === item.type
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <item.icon className={`w-6 h-6 mx-auto mb-2 ${formData.equipmentType === item.type ? 'text-orange-500' : 'text-gray-400'}`} />
                              <span className={`text-sm font-medium ${formData.equipmentType === item.type ? 'text-orange-600' : 'text-gray-600'}`}>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Marca */}
                      {formData.equipmentType && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={brandSearch}
                              onChange={(e) => { setBrandSearch(e.target.value); setShowBrandDropdown(true); if (e.target.value !== formData.brandName) setFormData(prev => ({ ...prev, brandId: '', brandName: '', modelId: '', modelName: '', customModel: '' })); }}
                              onFocus={() => setShowBrandDropdown(true)}
                              onBlur={() => setTimeout(() => setShowBrandDropdown(false), 200)}
                              placeholder="Buscar marca..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            />
                            {showBrandDropdown && brandSearch && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {filteredBrands.length > 0 ? filteredBrands.map(brand => (
                                  <button key={brand.id} type="button" onMouseDown={() => handleBrandSelect(brand)} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">{brand.name}</button>
                                )) : <div className="px-4 py-2 text-sm text-gray-500">No encontrado</div>}
                              </div>
                            )}
                          </div>
                          {formData.brandId && <p className="mt-2 text-sm text-green-600 flex items-center gap-1"><Check className="w-4 h-4" />{formData.brandName}</p>}
                        </div>
                      )}
                      
                      {/* Modelo - Permite escribir libremente */}
                      {formData.brandId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={modelSearch}
                              onChange={(e) => { 
                                setModelSearch(e.target.value); 
                                setShowModelDropdown(true);
                                // Si escribe algo diferente a un modelo seleccionado, usar como modelo personalizado
                                if (!filteredModels.some(m => m.name.toLowerCase() === e.target.value.toLowerCase())) {
                                  handleCustomModelChange(e.target.value);
                                }
                              }}
                              onFocus={() => setShowModelDropdown(true)}
                              onBlur={() => setTimeout(() => setShowModelDropdown(false), 200)}
                              placeholder="Buscar o escribir modelo..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            />
                            {showModelDropdown && modelSearch && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {filteredModels.length > 0 ? (
                                  <>
                                    {filteredModels.map(model => (
                                      <button key={model.id} type="button" onMouseDown={() => handleModelSelect(model)} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">{model.name}</button>
                                    ))}
                                    <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                                      ¿No encuentras tu modelo? Escríbelo manualmente
                                    </div>
                                  </>
                                ) : (
                                  <div className="px-4 py-3 text-sm">
                                    <p className="text-gray-700 font-medium">Modelo personalizado: "{modelSearch}"</p>
                                    <p className="text-gray-400 text-xs mt-1">Pulsa fuera para confirmar</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {(formData.modelId || formData.customModel) && (
                            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              {formData.modelName || formData.customModel}
                              {formData.customModel && !formData.modelId && <span className="text-gray-400 ml-1">(personalizado)</span>}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Nº Serie */}
                      {hasValidModel && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nº de serie <span className="text-gray-400 font-normal">(opcional)</span></label>
                          <input
                            type="text"
                            value={formData.serialNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                            placeholder="Ej: 7736901234"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* PASO 2 */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">El problema</h3>
                        <p className="text-sm text-gray-500">Describe qué le ocurre a tu equipo</p>
                      </div>
                      
                      {/* Síntomas */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Síntomas (selecciona todos los que apliquen)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {symptoms.map((s) => (
                            <label key={s.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.symptoms.includes(s.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${formData.symptoms.includes(s.id) ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                {formData.symptoms.includes(s.id) && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm text-gray-700">{s.label}</span>
                              <input type="checkbox" checked={formData.symptoms.includes(s.id)} onChange={() => handleSymptomToggle(s.id)} className="hidden" />
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Campo para "Otro problema" */}
                      {formData.symptoms.includes('otro') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Describe el otro problema</label>
                          <textarea
                            value={formData.otherSymptomDescription}
                            onChange={(e) => setFormData(prev => ({ ...prev, otherSymptomDescription: e.target.value }))}
                            placeholder="Describe el problema que no aparece en la lista..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                          />
                          <p className={`text-xs mt-1 ${formData.otherSymptomDescription.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                            {formData.otherSymptomDescription.length}/10 caracteres mínimo
                          </p>
                        </div>
                      )}
                      
                      {/* Código error */}
                      {formData.symptoms.includes('codigo-error') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Código de error</label>
                          <input
                            type="text"
                            value={formData.errorCode}
                            onChange={(e) => setFormData(prev => ({ ...prev, errorCode: e.target.value.toUpperCase() }))}
                            placeholder="Ej: F28, E9"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-mono"
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {suggestedErrorCodes.slice(0, 6).map(code => (
                              <button key={code} type="button" onClick={() => setFormData(prev => ({ ...prev, errorCode: code }))} className={`px-3 py-1 text-xs font-mono rounded transition-colors ${formData.errorCode === code ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{code}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Campo para "Descripción del problema" */}
                      {formData.symptoms.includes('descripcion') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción detallada</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe el problema con el mayor detalle posible..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* PASO 3 - Fotos y vídeos con drag&drop y cámara */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Fotos y vídeo</h3>
                        <p className="text-sm text-gray-500">Opcional pero recomendado para un mejor diagnóstico</p>
                      </div>
                      
                      {/* Tips */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Qué fotografiar:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          {['Foto general de la placa', 'Conectores principales', 'Zonas dañadas', 'Etiqueta con referencia'].map((tip, i) => (
                            <div key={i} className="flex items-center gap-2"><Check className="w-3 h-3 text-orange-500" />{tip}</div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Zona de drag & drop */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                          isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <Video className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Arrastra fotos o vídeos aquí</p>
                            <p className="text-sm text-gray-500 mt-1">o usa los botones de abajo</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Botones de subida */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-600">Subir fotos</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => cameraPhotoRef.current?.click()}
                          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Camera className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-600">Hacer foto</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => videoInputRef.current?.click()}
                          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-600">Subir vídeo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => cameraVideoRef.current?.click()}
                          className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Video className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-600">Grabar vídeo</span>
                        </button>
                      </div>
                      
                      {/* Inputs ocultos */}
                      <input ref={photoInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                      <input ref={cameraPhotoRef} type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                      <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                      <input ref={cameraVideoRef} type="file" accept="video/*" capture="environment" onChange={handleVideoUpload} className="hidden" />
                      
                      {/* Preview fotos */}
                      {formData.photos.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Fotos ({formData.photos.length}/4)</label>
                          <div className="grid grid-cols-4 gap-3">
                            {formData.photos.map((photo, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <img src={URL.createObjectURL(photo)} alt="" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, idx) => idx !== i) }))} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><X className="w-3 h-3" /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Preview vídeo */}
                      {formData.video && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vídeo</label>
                          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
                            <video src={URL.createObjectURL(formData.video)} controls className="w-full h-full" />
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, video: null }))} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400 text-center">Máximo 4 fotos • Vídeo máximo 15MB</p>
                    </div>
                  )}
                  
                  {/* PASO 4 */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Tus datos</h3>
                        <p className="text-sm text-gray-500">Para enviarte el presupuesto</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                          <input type="text" value={formData.fullName} onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                          <select value={formData.province} onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white">
                            <option value="">Seleccionar</option>
                            {provincias.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                        <input type="text" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Calle, número, piso..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                          <input type="text" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">C.P.</label>
                          <input type="text" value={formData.postalCode} onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))} maxLength={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                        </div>
                      </div>
                      
                      {/* Términos */}
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={formData.acceptTerms} onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                          <span className="text-sm text-gray-600">Acepto las <Link href="/condiciones-venta" className="text-orange-600 hover:underline">condiciones</Link> y el coste del diagnóstico (35€ + IVA)</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={formData.acceptPrivacy} onChange={(e) => setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                          <span className="text-sm text-gray-600">Acepto la <Link href="/privacidad" className="text-orange-600 hover:underline">política de privacidad</Link></span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Nav */}
                <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                  <button type="button" onClick={handlePrev} disabled={currentStep === 1} className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>
                  {currentStep < 4 ? (
                    <button type="button" onClick={handleNext} disabled={!isStepValid(currentStep)} className={`flex items-center gap-1 px-5 py-2 rounded-lg font-semibold transition-all ${isStepValid(currentStep) ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit} disabled={!isStepValid(4) || isSubmitting} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all ${isStepValid(4) && !isSubmitting ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <><Check className="w-4 h-4" /> Enviar</>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* CONTACTO */}
        <section className="py-8 bg-gray-900">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 mb-4">¿Tienes dudas?</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a href="tel:+34912345678" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
                <Phone className="w-4 h-4" /> 912 345 678
              </a>
              <a href="mailto:reparaciones@uniclima.es" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
                <Mail className="w-4 h-4" /> reparaciones@uniclima.es
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
