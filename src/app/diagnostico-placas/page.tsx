'use client';

/**
 * PÁGINA DE DIAGNÓSTICO DE PLACAS ELECTRÓNICAS - DISEÑO PREMIUM
 * Formulario avanzado multi-paso con estética cuidada y UX premium
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  equipmentDatabase, 
  getBrandsByType, 
  getModelsByBrand,
  commonSymptoms,
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
  Camera,
  Video,
  X,
  AlertTriangle,
  Info,
  Package,
  Truck,
  FileText,
  Wrench,
  Shield,
  Clock,
  Euro,
  Phone,
  Mail,
  MapPin,
  Search,
  HelpCircle,
  CheckCircle2,
  Circle,
  Image as ImageIcon,
  Play,
  Loader2,
  Sparkles,
  Award,
  Timer,
  CreditCard,
  ArrowRight,
  MessageCircle,
  Settings,
  Cpu,
  CircuitBoard,
  ThermometerSun,
  Snowflake,
  Power,
  AlertCircle,
  Volume2,
  Droplet,
  Monitor,
  Wifi,
  Star,
  BadgeCheck,
  Gift,
  Headphones
} from 'lucide-react';

// Tipos para el formulario
interface FormData {
  equipmentType: EquipmentType | '';
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  serialNumber: string;
  symptoms: string[];
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
  serialNumber: '',
  symptoms: [],
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

// Provincias de España
const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
  'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
  'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
  'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
  'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'
];

// Síntomas con iconos mejorados
const symptomsWithIcons = [
  { id: 'no-enciende', label: 'No enciende', icon: Power, color: 'red' },
  { id: 'codigo-error', label: 'Código de error', icon: AlertTriangle, color: 'amber' },
  { id: 'ruidos', label: 'Ruidos extraños', icon: Volume2, color: 'purple' },
  { id: 'no-calienta', label: 'No calienta/enfría', icon: ThermometerSun, color: 'blue' },
  { id: 'se-apaga', label: 'Se apaga solo', icon: Power, color: 'orange' },
  { id: 'gotea', label: 'Gotea o pierde agua', icon: Droplet, color: 'cyan' },
  { id: 'display-apagado', label: 'Display apagado', icon: Monitor, color: 'gray' },
  { id: 'no-responde', label: 'No responde al mando', icon: Wifi, color: 'indigo' },
  { id: 'otro', label: 'Otro problema', icon: HelpCircle, color: 'slate' },
];

export default function DiagnosticoPlacasPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
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
    setFormData(prev => ({
      ...prev,
      equipmentType: type,
      brandId: '',
      brandName: '',
      modelId: '',
      modelName: '',
    }));
    setBrandSearch('');
    setModelSearch('');
  };
  
  const handleBrandSelect = (brand: EquipmentBrand) => {
    setFormData(prev => ({
      ...prev,
      brandId: brand.id,
      brandName: brand.name,
      modelId: '',
      modelName: '',
    }));
    setBrandSearch(brand.name);
    setShowBrandDropdown(false);
    setModelSearch('');
  };
  
  const handleModelSelect = (model: EquipmentModel) => {
    setFormData(prev => ({
      ...prev,
      modelId: model.id,
      modelName: model.name,
    }));
    setModelSearch(model.name);
    setShowModelDropdown(false);
  };
  
  const handleSymptomToggle = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId],
    }));
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (formData.photos.length + validFiles.length <= 4) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...validFiles].slice(0, 4),
      }));
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size <= 15 * 1024 * 1024) {
        setFormData(prev => ({ ...prev, video: file }));
      } else {
        alert('El vídeo no puede superar los 15MB');
      }
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };
  
  const handleRemoveVideo = () => {
    setFormData(prev => ({ ...prev, video: null }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.equipmentType && formData.brandId && formData.modelId);
      case 2:
        return formData.symptoms.length > 0 && formData.description.trim().length >= 20;
      case 3:
        return true;
      case 4:
        return !!(
          formData.fullName.trim() &&
          formData.email.trim() &&
          formData.phone.trim() &&
          formData.address.trim() &&
          formData.city.trim() &&
          formData.postalCode.trim() &&
          formData.province &&
          formData.acceptTerms &&
          formData.acceptPrivacy
        );
      default:
        return false;
    }
  };
  
  const handleNext = () => {
    if (isStepValid(currentStep) && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleSubmit = async () => {
    if (!isStepValid(4)) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  // Pantalla de éxito
  if (submitSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
            {/* Success Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header verde */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-12 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  ¡Solicitud enviada!
                </h1>
                <p className="text-green-100 text-lg">
                  Hemos recibido tu solicitud correctamente
                </p>
              </div>
              
              {/* Contenido */}
              <div className="px-8 py-10">
                <p className="text-gray-600 text-center mb-8">
                  En breve recibirás un email con las instrucciones para realizar el pago y enviar tu placa.
                </p>
                
                {/* Próximos pasos */}
                <div className="space-y-4 mb-10">
                  <h2 className="font-bold text-gray-900 text-lg mb-4">Próximos pasos:</h2>
                  {[
                    { num: 1, icon: CreditCard, text: 'Revisa tu email y realiza el pago del diagnóstico (35€ + IVA)', color: 'orange' },
                    { num: 2, icon: Package, text: 'Envía la placa a nuestra dirección siguiendo las instrucciones', color: 'blue' },
                    { num: 3, icon: FileText, text: 'Recibirás el presupuesto de reparación en 24-48h', color: 'green' },
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className={`w-10 h-10 bg-${step.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <step.icon className={`w-5 h-5 text-${step.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">Paso {step.num}</span>
                        <p className="text-gray-700">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Botón volver */}
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                >
                  Volver al inicio
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
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
        {/* HERO PREMIUM */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          {/* Círculos decorativos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Texto */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-300 text-sm font-semibold mb-6 border border-orange-500/30">
                  <CircuitBoard className="w-4 h-4" />
                  Servicio Técnico Especializado
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Reparamos tu{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    placa electrónica
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Diagnóstico profesional y reparación de placas de calderas, aires acondicionados y aerotermia. 
                  <span className="text-white font-semibold"> Técnicos especializados con más de 15 años de experiencia.</span>
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '98%', label: 'Éxito', icon: Award },
                    { value: '24h', label: 'Diagnóstico', icon: Timer },
                    { value: '1 año', label: 'Garantía', icon: Shield },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* CTA scroll */}
                <button
                  onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl shadow-orange-500/30"
                >
                  <Sparkles className="w-5 h-5" />
                  Solicitar diagnóstico
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
              
              {/* Cards de precios */}
              <div className="space-y-4">
                {/* Card principal */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl shadow-orange-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Diagnóstico completo</h3>
                      <p className="text-orange-100 text-sm">Análisis profesional de tu placa</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black">35€</span>
                    <span className="text-orange-200">+ IVA</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {['Revisión completa de componentes', 'Identificación del fallo', 'Presupuesto detallado sin compromiso'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Cards secundarias */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <Gift className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="font-bold text-white mb-1">Si aceptas</h4>
                    <p className="text-sm text-gray-300">El diagnóstico se descuenta del precio final</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <Truck className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-bold text-white mb-1">Envío vuelta</h4>
                    <p className="text-sm text-gray-300">Solo 9€ si no aceptas el presupuesto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* PROCESO - Cards clicables */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Un proceso sencillo y transparente en 4 pasos
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  num: 1, 
                  icon: FileText, 
                  title: 'Rellena el formulario', 
                  desc: 'Cuéntanos qué le pasa a tu equipo',
                  color: 'orange',
                  gradient: 'from-orange-500 to-amber-500'
                },
                { 
                  num: 2, 
                  icon: CreditCard, 
                  title: 'Paga el diagnóstico', 
                  desc: '35€ + IVA por transferencia o tarjeta',
                  color: 'blue',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  num: 3, 
                  icon: Package, 
                  title: 'Envíanos la placa', 
                  desc: 'Te enviamos las instrucciones por email',
                  color: 'purple',
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  num: 4, 
                  icon: Wrench, 
                  title: 'Recibe presupuesto', 
                  desc: 'En 24-48h te enviamos el presupuesto',
                  color: 'green',
                  gradient: 'from-green-500 to-emerald-500'
                },
              ].map((step, index) => (
                <div
                  key={step.num}
                  className="group relative bg-white rounded-3xl p-6 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {/* Número */}
                  <div className={`absolute -top-4 -left-2 w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                    {step.num}
                  </div>
                  
                  {/* Icono */}
                  <div className={`w-16 h-16 bg-${step.color}-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-500`} />
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                  
                  {/* Flecha */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FORMULARIO */}
        <section id="formulario" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                {[
                  { num: 1, label: 'Tu equipo', icon: Settings },
                  { num: 2, label: 'El problema', icon: AlertTriangle },
                  { num: 3, label: 'Fotos', icon: Camera },
                  { num: 4, label: 'Tus datos', icon: Mail },
                ].map((step, index) => (
                  <div key={step.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        currentStep > step.num
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                          : currentStep === step.num
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-110'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {currentStep > step.num ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      <span className={`text-xs mt-2 font-semibold transition-colors ${
                        currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`w-full h-1 mx-2 rounded-full transition-colors hidden sm:block ${
                        currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                      }`} style={{ width: '60px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 sm:p-10">
                {/* PASO 1 */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-2">¿Qué equipo tienes?</h2>
                      <p className="text-gray-500">Selecciona el tipo de equipo y su marca</p>
                    </div>
                    
                    {/* Tipo de equipo */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                        Tipo de equipo
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { type: 'caldera' as EquipmentType, icon: Flame, label: 'Caldera', color: 'orange', desc: 'Gas, condensación, etc.' },
                          { type: 'aire_acondicionado' as EquipmentType, icon: Snowflake, label: 'Aire Acondicionado', color: 'blue', desc: 'Split, multisplit, conductos' },
                          { type: 'aerotermia' as EquipmentType, icon: Zap, label: 'Aerotermia', color: 'green', desc: 'Bomba de calor' },
                        ].map((item) => (
                          <button
                            key={item.type}
                            type="button"
                            onClick={() => handleEquipmentTypeSelect(item.type)}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                              formData.equipmentType === item.type
                                ? `border-${item.color}-500 bg-${item.color}-50 shadow-lg shadow-${item.color}-500/20`
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                          >
                            {formData.equipmentType === item.type && (
                              <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${item.color}-500 rounded-full flex items-center justify-center`}>
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                              formData.equipmentType === item.type
                                ? `bg-${item.color}-500 text-white`
                                : `bg-${item.color}-50 text-${item.color}-500 group-hover:bg-${item.color}-100`
                            }`}>
                              <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className={`font-bold text-lg mb-1 ${
                              formData.equipmentType === item.type ? `text-${item.color}-700` : 'text-gray-900'
                            }`}>
                              {item.label}
                            </h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Marca */}
                    {formData.equipmentType && (
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                          Marca del equipo
                        </label>
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={brandSearch}
                            onChange={(e) => {
                              setBrandSearch(e.target.value);
                              setShowBrandDropdown(true);
                              if (e.target.value !== formData.brandName) {
                                setFormData(prev => ({ ...prev, brandId: '', brandName: '', modelId: '', modelName: '' }));
                              }
                            }}
                            onFocus={() => setShowBrandDropdown(true)}
                            placeholder="Buscar marca... (Junkers, Vaillant, Daikin...)"
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                          />
                          
                          {showBrandDropdown && brandSearch && (
                            <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                              {filteredBrands.length > 0 ? (
                                filteredBrands.map(brand => (
                                  <button
                                    key={brand.id}
                                    type="button"
                                    onClick={() => handleBrandSelect(brand)}
                                    className="w-full px-5 py-4 text-left hover:bg-orange-50 flex items-center gap-4 transition-colors border-b border-gray-50 last:border-0"
                                  >
                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                      <CircuitBoard className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <span className="font-semibold text-gray-900">{brand.name}</span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-5 py-4 text-gray-500 text-center">
                                  No se encontraron marcas
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {formData.brandId && (
                          <div className="mt-3 flex items-center gap-2 text-green-600">
                            <BadgeCheck className="w-5 h-5" />
                            <span className="font-semibold">{formData.brandName}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Modelo */}
                    {formData.brandId && (
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                          Modelo del equipo
                        </label>
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={modelSearch}
                            onChange={(e) => {
                              setModelSearch(e.target.value);
                              setShowModelDropdown(true);
                              if (e.target.value !== formData.modelName) {
                                setFormData(prev => ({ ...prev, modelId: '', modelName: '' }));
                              }
                            }}
                            onFocus={() => setShowModelDropdown(true)}
                            placeholder="Buscar modelo..."
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                          />
                          
                          {showModelDropdown && (
                            <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                              {filteredModels.length > 0 ? (
                                filteredModels.map(model => (
                                  <button
                                    key={model.id}
                                    type="button"
                                    onClick={() => handleModelSelect(model)}
                                    className="w-full px-5 py-4 text-left hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                                  >
                                    <span className="font-semibold text-gray-900">{model.name}</span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-5 py-4 text-gray-500 text-center">
                                  Escribe el modelo manualmente
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {formData.modelId && (
                          <div className="mt-3 flex items-center gap-2 text-green-600">
                            <BadgeCheck className="w-5 h-5" />
                            <span className="font-semibold">{formData.modelName}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Número de serie */}
                    {formData.modelId && (
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Número de serie <span className="text-gray-400 font-normal normal-case">(opcional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.serialNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                          placeholder="Ej: 7736901234"
                          className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                        <p className="mt-2 text-sm text-gray-500 flex items-start gap-2">
                          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          El número de serie está en la etiqueta del equipo
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* PASO 2 */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-2">¿Qué problema tiene?</h2>
                      <p className="text-gray-500">Selecciona los síntomas y describe el fallo</p>
                    </div>
                    
                    {/* Síntomas */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                        Síntomas <span className="text-gray-400 font-normal normal-case">(selecciona todos los que apliquen)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {symptomsWithIcons.map((symptom) => (
                          <button
                            key={symptom.id}
                            type="button"
                            onClick={() => handleSymptomToggle(symptom.id)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 text-left ${
                              formData.symptoms.includes(symptom.id)
                                ? `border-${symptom.color}-500 bg-${symptom.color}-50 shadow-md`
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              formData.symptoms.includes(symptom.id)
                                ? `bg-${symptom.color}-500 text-white`
                                : `bg-${symptom.color}-50 text-${symptom.color}-500`
                            }`}>
                              <symptom.icon className="w-5 h-5" />
                            </div>
                            <span className={`font-semibold ${
                              formData.symptoms.includes(symptom.id) ? `text-${symptom.color}-700` : 'text-gray-700'
                            }`}>
                              {symptom.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Código de error */}
                    {formData.symptoms.includes('codigo-error') && (
                      <div className="animate-fadeIn bg-amber-50 rounded-2xl p-6 border border-amber-200">
                        <label className="block text-sm font-bold text-amber-800 mb-3 uppercase tracking-wide flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Código de error
                        </label>
                        <input
                          type="text"
                          value={formData.errorCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, errorCode: e.target.value.toUpperCase() }))}
                          placeholder="Ej: F28, E9, A01"
                          className="w-full px-5 py-4 text-xl font-mono font-bold border-2 border-amber-300 rounded-2xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all bg-white"
                        />
                        <div className="mt-4">
                          <p className="text-sm text-amber-700 mb-2">Códigos comunes de {formData.brandName}:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedErrorCodes.slice(0, 8).map(code => (
                              <button
                                key={code}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, errorCode: code }))}
                                className={`px-4 py-2 rounded-xl text-sm font-mono font-bold transition-all ${
                                  formData.errorCode === code
                                    ? 'bg-amber-500 text-white shadow-md'
                                    : 'bg-white text-amber-700 border border-amber-300 hover:bg-amber-100'
                                }`}
                              >
                                {code}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Descripción */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                        Descripción detallada
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Cuéntanos con detalle qué le ocurre a tu equipo. ¿Cuándo empezó? ¿Ocurre siempre o de forma intermitente? ¿Has notado algo inusual?"
                        rows={5}
                        className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                      />
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500">Mínimo 20 caracteres</span>
                        <span className={`font-semibold ${formData.description.length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                          {formData.description.length} / 20
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* PASO 3 */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-2">Fotos y vídeo</h2>
                      <p className="text-gray-500">Opcional pero muy recomendado para un mejor diagnóstico</p>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-900 mb-2">¿Qué fotografiar?</h3>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Foto general de la placa</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Conectores y su estado</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Zonas dañadas visibles</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Etiqueta con referencia</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Fotos */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                        Fotos <span className="text-gray-400 font-normal normal-case">(máximo 4)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group shadow-lg">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                              <span className="text-white text-xs font-semibold">Foto {index + 1}</span>
                            </div>
                          </div>
                        ))}
                        
                        {formData.photos.length < 4 && (
                          <div className="aspect-square">
                            <input
                              ref={photoInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                            <input
                              ref={cameraInputRef}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                            <div className="h-full flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() => photoInputRef.current?.click()}
                                className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 group"
                              >
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                                <span className="text-sm text-gray-500 group-hover:text-orange-600 font-medium">Subir</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => cameraInputRef.current?.click()}
                                className="py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/30"
                              >
                                <Camera className="w-5 h-5" />
                                Cámara
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Vídeo */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                        Vídeo <span className="text-gray-400 font-normal normal-case">(máximo 15MB)</span>
                      </label>
                      
                      {formData.video ? (
                        <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-2xl">
                          <video
                            src={URL.createObjectURL(formData.video)}
                            controls
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveVideo}
                            className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => videoInputRef.current?.click()}
                            className="w-full py-10 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-3 group"
                          >
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                              <Video className="w-8 h-8 text-purple-500" />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-gray-700 group-hover:text-purple-700">Subir vídeo</p>
                              <p className="text-sm text-gray-500">MP4, MOV - Máximo 15MB</p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* PASO 4 */}
                {currentStep === 4 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-2">Tus datos de contacto</h2>
                      <p className="text-gray-500">Para enviarte el presupuesto y coordinar el envío</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nombre completo</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Tu nombre y apellidos"
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="tu@email.com"
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="612 345 678"
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Provincia</label>
                        <select
                          value={formData.province}
                          onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all bg-white"
                        >
                          <option value="">Selecciona provincia</option>
                          {provincias.map(prov => (
                            <option key={prov} value={prov}>{prov}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Dirección completa</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Calle, número, piso, puerta..."
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Tu ciudad"
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Código postal</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                          placeholder="28001"
                          maxLength={5}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    {/* Términos */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                      <label className="flex items-start gap-4 cursor-pointer p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                          className="w-6 h-6 mt-0.5 rounded-lg border-2 border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-gray-600">
                          He leído y acepto las{' '}
                          <Link href="/condiciones-venta" className="text-orange-600 font-semibold hover:underline" target="_blank">
                            Condiciones de Venta
                          </Link>
                          {' '}y entiendo que el diagnóstico tiene un coste de <strong>35€ + IVA</strong>.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-4 cursor-pointer p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.acceptPrivacy}
                          onChange={(e) => setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))}
                          className="w-6 h-6 mt-0.5 rounded-lg border-2 border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-gray-600">
                          He leído y acepto la{' '}
                          <Link href="/privacidad" className="text-orange-600 font-semibold hover:underline" target="_blank">
                            Política de Privacidad
                          </Link>.
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navegación */}
              <div className="px-8 sm:px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
                      isStepValid(currentStep)
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid(4) || isSubmitting}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
                      isStepValid(4) && !isSubmitting
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Enviar solicitud
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ PREMIUM */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-semibold mb-4">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-gray-400 text-lg">
                Todo lo que necesitas saber sobre nuestro servicio
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: Euro,
                  color: 'orange',
                  q: '¿Qué incluye el diagnóstico de 35€ + IVA?',
                  a: 'El diagnóstico incluye la revisión completa de la placa electrónica por nuestros técnicos especializados, identificación del fallo y presupuesto detallado de reparación. Si aceptas el presupuesto, el coste del diagnóstico se descuenta del precio final de la reparación.'
                },
                {
                  icon: AlertCircle,
                  color: 'red',
                  q: '¿Qué pasa si no acepto el presupuesto?',
                  a: 'Tienes dos opciones: 1) Nos quedamos con la placa y te devolvemos el coste del diagnóstico (35€ + IVA), o 2) Pagas 9€ de gastos de envío y te devolvemos la placa sin reparar. Tú decides.'
                },
                {
                  icon: Timer,
                  color: 'blue',
                  q: '¿Cuánto tardan en diagnosticar mi placa?',
                  a: 'Una vez recibida la placa en nuestras instalaciones, el diagnóstico se realiza en 24-48 horas laborables. Recibirás el presupuesto por email con todos los detalles.'
                },
                {
                  icon: Shield,
                  color: 'green',
                  q: '¿Qué garantía tiene la reparación?',
                  a: 'Todas nuestras reparaciones tienen 1 año de garantía. Si la placa falla por el mismo motivo durante ese periodo, la reparamos sin coste adicional.'
                },
                {
                  icon: Package,
                  color: 'purple',
                  q: '¿Cómo debo enviar la placa?',
                  a: 'Una vez realizado el pago del diagnóstico, recibirás instrucciones detalladas por email con la dirección de envío y cómo embalar correctamente la placa para evitar daños durante el transporte.'
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-${faq.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <faq.icon className={`w-6 h-6 text-${faq.color}-400`} />
                    </div>
                    <span className="flex-1 font-bold text-white text-lg">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 pl-[88px] animate-fadeIn">
                      <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA FINAL */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-orange-500/30 relative overflow-hidden">
              {/* Decoración */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Headphones className="w-10 h-10" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  ¿Tienes dudas?
                </h2>
                <p className="text-orange-100 text-lg mb-8 max-w-lg mx-auto">
                  Nuestro equipo está disponible para ayudarte con cualquier consulta sobre tu placa electrónica
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+34912345678"
                    className="flex items-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a
                    href="mailto:reparaciones@uniclima.es"
                    className="flex items-center gap-3 px-8 py-4 bg-orange-600/30 text-white font-bold rounded-2xl hover:bg-orange-600/40 transition-colors border border-white/30"
                  >
                    <Mail className="w-5 h-5" />
                    reparaciones@uniclima.es
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
