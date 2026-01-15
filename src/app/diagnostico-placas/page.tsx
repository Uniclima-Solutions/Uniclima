'use client';

/**
 * PÁGINA DE DIAGNÓSTICO DE PLACAS ELECTRÓNICAS
 * Formulario avanzado multi-paso para solicitar diagnóstico y reparación
 * de placas electrónicas de calderas, aires acondicionados y aerotermia.
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
  Loader2
} from 'lucide-react';

// Tipos para el formulario
interface FormData {
  // Paso 1: Datos del equipo
  equipmentType: EquipmentType | '';
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  serialNumber: string;
  
  // Paso 2: Descripción del problema
  symptoms: string[];
  errorCode: string;
  description: string;
  
  // Paso 3: Fotos y vídeos
  photos: File[];
  video: File | null;
  
  // Paso 4: Datos de contacto
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  
  // Términos
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

// Estado inicial del formulario
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

// Iconos para tipos de equipo
const equipmentIcons: Record<EquipmentType, React.ReactNode> = {
  caldera: <Flame className="w-6 h-6" />,
  aire_acondicionado: <Wind className="w-6 h-6" />,
  aerotermia: <Zap className="w-6 h-6" />,
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

export default function DiagnosticoPlacasPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Estados para búsqueda
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  
  // Referencias
  const brandInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // Obtener marcas filtradas
  const filteredBrands = formData.equipmentType 
    ? getBrandsByType(formData.equipmentType).filter(brand =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
      )
    : [];
  
  // Obtener modelos filtrados
  const filteredModels = formData.brandId
    ? getModelsByBrand(formData.equipmentType as EquipmentType, formData.brandId).filter(model =>
        model.name.toLowerCase().includes(modelSearch.toLowerCase())
      )
    : [];
  
  // Obtener códigos de error sugeridos
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
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && formData.photos.length + files.indexOf(file) < 4
    );
    
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
      // Verificar tamaño (15MB máximo)
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
  
  const handleCameraCapture = async () => {
    try {
      // Solicitar permisos de cámara
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      
      // Abrir el input de cámara
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    } catch (error) {
      alert('No se pudo acceder a la cámara. Por favor, permite el acceso o sube las fotos manualmente.');
    }
  };
  
  // Validación por paso
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.equipmentType && formData.brandId && formData.modelId);
      case 2:
        return formData.symptoms.length > 0 && formData.description.trim().length >= 20;
      case 3:
        return true; // Fotos y vídeos son opcionales
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
    
    // Simular envío (aquí iría la lógica real de envío)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };
  
  // Renderizar paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };
  
  // PASO 1: Datos del equipo
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Tipo de equipo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ¿Qué tipo de equipo es? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {equipmentDatabase.map(category => (
            <button
              key={category.type}
              type="button"
              onClick={() => handleEquipmentTypeSelect(category.type)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                formData.equipmentType === category.type
                  ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                formData.equipmentType === category.type
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {equipmentIcons[category.type]}
              </div>
              <span className={`font-semibold ${
                formData.equipmentType === category.type ? 'text-orange-600' : 'text-gray-700'
              }`}>
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Marca */}
      {formData.equipmentType && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Marca del equipo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={brandInputRef}
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
                placeholder="Buscar marca... (ej: Junkers, Vaillant, Daikin)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors text-lg"
              />
            </div>
            
            {showBrandDropdown && brandSearch && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map(brand => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => handleBrandSelect(brand)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 flex items-center gap-3 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        {equipmentIcons[formData.equipmentType as EquipmentType]}
                      </div>
                      <span className="font-medium text-gray-700">{brand.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No se encontraron marcas
                  </div>
                )}
              </div>
            )}
          </div>
          
          {formData.brandId && (
            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Marca seleccionada: {formData.brandName}
            </p>
          )}
        </div>
      )}
      
      {/* Modelo */}
      {formData.brandId && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Modelo del equipo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={modelInputRef}
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
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors text-lg"
              />
            </div>
            
            {showModelDropdown && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                {filteredModels.length > 0 ? (
                  filteredModels.map(model => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleModelSelect(model)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{model.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No se encontraron modelos. Escribe el nombre manualmente.
                  </div>
                )}
              </div>
            )}
          </div>
          
          {formData.modelId && (
            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Modelo seleccionado: {formData.modelName}
            </p>
          )}
        </div>
      )}
      
      {/* Número de serie (opcional) */}
      {formData.modelId && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Número de serie <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            value={formData.serialNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
            placeholder="Ej: 7736901234"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
          <p className="mt-2 text-sm text-gray-500">
            El número de serie nos ayuda a identificar tu equipo con precisión. Suele estar en una etiqueta en el lateral o parte inferior del equipo.
          </p>
        </div>
      )}
    </div>
  );
  
  // PASO 2: Descripción del problema
  const renderStep2 = () => (
    <div className="space-y-8">
      {/* Síntomas */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ¿Qué síntomas presenta el equipo? <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">Selecciona todos los que apliquen</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commonSymptoms.map(symptom => (
            <button
              key={symptom.id}
              type="button"
              onClick={() => handleSymptomToggle(symptom.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 text-left ${
                formData.symptoms.includes(symptom.id)
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                formData.symptoms.includes(symptom.id)
                  ? 'border-orange-500 bg-orange-500'
                  : 'border-gray-300'
              }`}>
                {formData.symptoms.includes(symptom.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`font-medium ${
                formData.symptoms.includes(symptom.id) ? 'text-orange-700' : 'text-gray-700'
              }`}>
                {symptom.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Código de error */}
      {formData.symptoms.includes('codigo-error') && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Código de error que muestra
          </label>
          <input
            type="text"
            value={formData.errorCode}
            onChange={(e) => setFormData(prev => ({ ...prev, errorCode: e.target.value.toUpperCase() }))}
            placeholder="Ej: F28, E9, A01"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors text-lg font-mono"
          />
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-2">Códigos comunes para {formData.brandName}:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedErrorCodes.map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, errorCode: code }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                    formData.errorCode === code
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Descripción detallada */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Descripción detallada del problema <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Cuéntanos con el mayor detalle posible qué le ocurre a tu equipo. ¿Cuándo empezó el fallo? ¿Ocurre siempre o de forma intermitente? ¿Has notado algo inusual antes del fallo?"
          rows={5}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors resize-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mínimo 20 caracteres
          </p>
          <p className={`text-sm ${formData.description.length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
            {formData.description.length} caracteres
          </p>
        </div>
      </div>
    </div>
  );
  
  // PASO 3: Fotos y vídeos
  const renderStep3 = () => (
    <div className="space-y-8">
      {/* Instrucciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">¿Qué fotografiar?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Foto general</strong> de la placa electrónica</li>
              <li>• <strong>Conectores principales</strong> y su estado</li>
              <li>• <strong>Zonas dañadas</strong> (quemaduras, corrosión, componentes hinchados)</li>
              <li>• <strong>Etiqueta</strong> con el número de referencia de la placa</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Subida de fotos */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Fotos de la placa <span className="text-gray-400 font-normal">(máximo 4)</span>
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Fotos subidas */}
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                Foto {index + 1}
              </div>
            </div>
          ))}
          
          {/* Botón añadir foto */}
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
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-500">Subir foto</span>
                </button>
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="py-3 border-2 border-orange-200 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Usar cámara</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Subida de vídeo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Vídeo del problema <span className="text-gray-400 font-normal">(máximo 15MB)</span>
        </label>
        
        {formData.video ? (
          <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video">
            <video
              src={URL.createObjectURL(formData.video)}
              controls
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 rounded-lg text-white text-sm flex items-center gap-2">
              <Play className="w-4 h-4" />
              {(formData.video.size / (1024 * 1024)).toFixed(1)} MB
            </div>
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
              className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-colors flex flex-col items-center justify-center gap-3"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                <Video className="w-7 h-7 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-700">Subir vídeo</p>
                <p className="text-sm text-gray-500 mt-1">MP4, MOV - Máximo 15MB</p>
              </div>
            </button>
          </div>
        )}
        
        <p className="mt-3 text-sm text-gray-500">
          Un vídeo mostrando el comportamiento del equipo nos ayuda a diagnosticar mejor el problema.
        </p>
      </div>
    </div>
  );
  
  // PASO 4: Datos de contacto
  const renderStep4 = () => (
    <div className="space-y-8">
      {/* Datos personales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Tu nombre y apellidos"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="612 345 678"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Provincia <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors bg-white"
          >
            <option value="">Selecciona provincia</option>
            {provincias.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Dirección */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Dirección completa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Calle, número, piso, puerta..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ciudad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Tu ciudad"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código postal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
            placeholder="28001"
            maxLength={5}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
          />
        </div>
      </div>
      
      {/* Términos y condiciones */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-600">
            He leído y acepto las{' '}
            <Link href="/condiciones-venta" className="text-orange-600 hover:underline" target="_blank">
              Condiciones de Venta
            </Link>
            {' '}y entiendo que el diagnóstico tiene un coste de 35€ + IVA. <span className="text-red-500">*</span>
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={(e) => setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-600">
            He leído y acepto la{' '}
            <Link href="/privacidad" className="text-orange-600 hover:underline" target="_blank">
              Política de Privacidad
            </Link>
            . <span className="text-red-500">*</span>
          </span>
        </label>
      </div>
    </div>
  );
  
  // Pantalla de éxito
  if (submitSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Solicitud enviada correctamente!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido tu solicitud de diagnóstico. En breve recibirás un email con las instrucciones para realizar el pago y enviar tu placa.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">Próximos pasos:</h2>
              <ol className="text-left space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">1</span>
                  <span className="text-gray-600">Revisa tu email y realiza el pago del diagnóstico (35€ + IVA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">2</span>
                  <span className="text-gray-600">Envía la placa a nuestra dirección siguiendo las instrucciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">3</span>
                  <span className="text-gray-600">Recibirás el presupuesto de reparación en 24-48h</span>
                </li>
              </ol>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
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
      
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6">
                <Wrench className="w-4 h-4" />
                Servicio de Reparación
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Diagnóstico y Reparación de{' '}
                <span className="text-orange-400">Placas Electrónicas</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                ¿Tu caldera, aire acondicionado o aerotermia no funciona? Diagnosticamos y reparamos la placa electrónica. Rápido, económico y con garantía.
              </p>
              
              {/* Precios destacados */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-orange-400">35€<span className="text-sm font-normal text-gray-400"> + IVA</span></div>
                  <div className="text-sm text-gray-300">Diagnóstico</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-orange-400">9€</div>
                  <div className="text-sm text-gray-300">Envío de vuelta*</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-orange-400">1 año</div>
                  <div className="text-sm text-gray-300">Garantía</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">*Solo si no se acepta el presupuesto de reparación</p>
            </div>
          </div>
        </section>
        
        {/* Pasos del proceso */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { num: 1, label: 'Equipo' },
                { num: 2, label: 'Problema' },
                { num: 3, label: 'Fotos' },
                { num: 4, label: 'Datos' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                      currentStep > step.num
                        ? 'bg-green-500 text-white'
                        : currentStep === step.num
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.num ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.num
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`w-12 sm:w-20 h-1 mx-2 rounded ${
                      currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Formulario */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {currentStep === 1 && 'Datos del equipo'}
                  {currentStep === 2 && 'Descripción del problema'}
                  {currentStep === 3 && 'Fotos y vídeos'}
                  {currentStep === 4 && 'Datos de contacto'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {currentStep === 1 && 'Selecciona el tipo de equipo y su marca y modelo'}
                  {currentStep === 2 && 'Cuéntanos qué le ocurre a tu equipo'}
                  {currentStep === 3 && 'Sube fotos y/o vídeo de la placa (opcional pero recomendado)'}
                  {currentStep === 4 && 'Introduce tus datos para el envío y contacto'}
                </p>
                
                {renderStep()}
              </div>
              
              {/* Navegación */}
              <div className="px-6 sm:px-8 lg:px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors ${
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
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                      isStepValid(currentStep)
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
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
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                      isStepValid(4) && !isSubmitting
                        ? 'bg-green-500 text-white hover:bg-green-600'
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
        
        {/* FAQ */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Preguntas frecuentes
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: '¿Qué incluye el diagnóstico de 35€ + IVA?',
                  a: 'El diagnóstico incluye la revisión completa de la placa electrónica por nuestros técnicos especializados, identificación del fallo y presupuesto detallado de reparación. Si aceptas el presupuesto, el coste del diagnóstico se descuenta del precio final.'
                },
                {
                  q: '¿Qué pasa si no acepto el presupuesto?',
                  a: 'Tienes dos opciones: 1) Nos quedamos con la placa y te devolvemos el coste del diagnóstico (35€ + IVA), o 2) Pagas 9€ de gastos de envío y te devolvemos la placa sin reparar.'
                },
                {
                  q: '¿Cuánto tardan en diagnosticar mi placa?',
                  a: 'Una vez recibida la placa en nuestras instalaciones, el diagnóstico se realiza en 24-48 horas laborables. Recibirás el presupuesto por email.'
                },
                {
                  q: '¿Qué garantía tiene la reparación?',
                  a: 'Todas nuestras reparaciones tienen 1 año de garantía. Si la placa falla por el mismo motivo durante ese periodo, la reparamos sin coste adicional.'
                },
                {
                  q: '¿Cómo debo enviar la placa?',
                  a: 'Una vez realizado el pago del diagnóstico, recibirás instrucciones detalladas por email con la dirección de envío y cómo embalar correctamente la placa para evitar daños durante el transporte.'
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    {faq.q}
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA final */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¿Tienes dudas?
              </h2>
              <p className="text-orange-100 mb-6">
                Llámanos o escríbenos y te ayudamos con tu caso
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+34912345678"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  912 345 678
                </a>
                <a
                  href="mailto:reparaciones@uniclima.es"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-400/30 text-white font-semibold rounded-xl hover:bg-orange-400/40 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  reparaciones@uniclima.es
                </a>
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
