'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Gift, Video, CheckCircle, Upload, Camera, X, Play, Pause,
  Clock, Sparkles, Shield, ChevronRight, ChevronLeft, Film,
  User, Mail, Phone, FileVideo, AlertCircle
} from 'lucide-react';

export default function PiezaGratisPage() {
  // Estados principales
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    acceptTerms: false
  });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Manejar drag & drop
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoFile(files[0]);
    }
  }, []);

  // Procesar archivo de vídeo
  const handleVideoFile = (file: File) => {
    setErrors([]);
    
    // Validar tipo
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|avi)$/i)) {
      setErrors(['Formato no válido. Usa MP4, WebM, MOV o AVI.']);
      return;
    }
    
    // Validar tamaño (500MB)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors([`El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo 500MB.`]);
      return;
    }
    
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    
    // Simular progreso de carga
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // Eliminar vídeo
  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validar paso actual
  const validateStep = () => {
    const newErrors: string[] = [];
    
    if (step === 1) {
      if (!videoFile) {
        newErrors.push('Debes subir un vídeo de tu reparación');
      }
    } else if (step === 2) {
      if (!formData.brand.trim()) newErrors.push('La marca es obligatoria');
      if (!formData.model.trim()) newErrors.push('El modelo es obligatorio');
    } else if (step === 3) {
      if (!formData.name.trim()) newErrors.push('El nombre es obligatorio');
      if (!formData.email.trim()) newErrors.push('El email es obligatorio');
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.push('El email no es válido');
      }
      if (!formData.acceptTerms) newErrors.push('Debes aceptar los términos y condiciones');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Navegar entre pasos
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 3));
      setErrors([]);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setErrors([]);
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setSubmitted(true);
    }
  };

  // Pantalla de éxito
  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center animate-fade-in">
            {/* Icono de éxito animado */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Vídeo enviado!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Nuestro equipo lo revisará en <strong className="text-green-600">48-72 horas</strong>
            </p>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Te contactaremos por email</p>
                  <p className="text-gray-500">{formData.email}</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
        {/* Breadcrumbs */}
        <nav className="max-w-5xl mx-auto px-4 py-4">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Pieza Gratis</li>
          </ol>
        </nav>

        {/* Hero Section - Compacto y atractivo */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge animado */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-pulse">
              <Gift className="w-4 h-4" />
              Promoción Activa
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Consigue tu pieza <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">GRATIS</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Sube un vídeo de tu reparación y te regalamos una pieza o te devolvemos el dinero
            </p>

            {/* Beneficios en cards */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">48-72h</p>
                <p className="text-xs text-gray-500">Validación</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">100%</p>
                <p className="text-xs text-gray-500">Gratis</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Garantía</p>
                <p className="text-xs text-gray-500">1 año</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario principal */}
        <section className="pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step >= s 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 md:w-24 h-1 mx-2 rounded transition-all duration-300 ${
                      step > s ? 'bg-orange-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between text-sm text-gray-500 mb-8 px-4">
              <span className={step >= 1 ? 'text-orange-600 font-medium' : ''}>Vídeo</span>
              <span className={step >= 2 ? 'text-orange-600 font-medium' : ''}>Equipo</span>
              <span className={step >= 3 ? 'text-orange-600 font-medium' : ''}>Datos</span>
            </div>

            {/* Errores */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-shake">
                {errors.map((error, i) => (
                  <div key={i} className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            {/* Card del formulario */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 transition-all duration-500">
              <form onSubmit={handleSubmit}>
                
                {/* PASO 1: Subir vídeo */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Sube tu vídeo</h2>
                        <p className="text-sm text-gray-500">Mínimo 5 minutos mostrando la reparación</p>
                      </div>
                    </div>

                    {!videoFile ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                          isDragging 
                            ? 'border-orange-500 bg-orange-50 scale-[1.02]' 
                            : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
                          className="hidden"
                        />
                        
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isDragging ? 'bg-orange-500 scale-110' : 'bg-gray-100'
                        }`}>
                          <Upload className={`w-10 h-10 transition-colors ${isDragging ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          {isDragging ? 'Suelta el vídeo aquí' : 'Arrastra tu vídeo aquí'}
                        </p>
                        <p className="text-gray-500 mb-4">o haz clic para seleccionar</p>
                        
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                          <span className="px-2 py-1 bg-gray-100 rounded">MP4</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">WebM</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">MOV</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">Máx. 500MB</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden bg-black">
                        {/* Preview del vídeo */}
                        <video
                          ref={videoRef}
                          src={videoPreview || ''}
                          className="w-full aspect-video object-contain"
                          controls
                        />
                        
                        {/* Barra de progreso */}
                        {isUploading && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-medium">{Math.round(uploadProgress)}%</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        
                        {/* Info del archivo */}
                        {!isUploading && (
                          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <FileVideo className="w-4 h-4" />
                            <span className="text-sm">{videoFile.name}</span>
                            <span className="text-xs text-gray-300">({(videoFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tips */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm font-medium text-blue-900 mb-2">💡 Consejos para un buen vídeo:</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Muestra claramente el problema y la solución</li>
                        <li>• Graba en horizontal para mejor calidad</li>
                        <li>• Asegúrate de tener buena iluminación</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* PASO 2: Datos del equipo */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Film className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Datos del equipo</h2>
                        <p className="text-sm text-gray-500">Indica qué equipo has reparado</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Marca del equipo *
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          placeholder="Ej: Vaillant, Daikin, Junkers..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Modelo *
                        </label>
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          placeholder="Ej: EcoTec Plus, Sensira..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción de la reparación
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe brevemente qué problema tenía y cómo lo solucionaste..."
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PASO 3: Datos de contacto */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Tus datos</h2>
                        <p className="text-sm text-gray-500">Para enviarte tu recompensa</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono (opcional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="612 345 678"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="w-5 h-5 mt-0.5 text-orange-500 focus:ring-orange-500 rounded"
                        />
                        <span className="text-sm text-gray-600">
                          Acepto los{' '}
                          <Link href="/terminos-cesion-video" className="text-orange-600 hover:underline">
                            términos de cesión de derechos
                          </Link>
                          {' '}y la{' '}
                          <Link href="/politica-privacidad" className="text-orange-600 hover:underline">
                            política de privacidad
                          </Link>
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navegación */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Anterior
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Siguiente
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Gift className="w-5 h-5" />
                      Enviar y conseguir pieza
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Enlace a términos */}
            <p className="text-center text-sm text-gray-500 mt-6">
              ¿Dudas?{' '}
              <Link href="/terminos-cesion-video" className="text-orange-600 hover:underline">
                Ver condiciones completas
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Estilos de animación */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
