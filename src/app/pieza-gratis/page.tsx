'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Gift, Video, CheckCircle, AlertCircle, ArrowLeft, Wrench, 
  Upload, Camera, Mic, MicOff, X, FileVideo,
  Square, Clock, HardDrive, Sparkles, Shield, Award, 
  ChevronRight, Info, ExternalLink
} from 'lucide-react';

// Datos de marcas para autocompletado (todas las marcas juntas)
const todasLasMarcas = [
  'Junkers / Bosch', 'Vaillant', 'Saunier Duval', 'Ferroli', 'Baxi / BaxiRoca',
  'Ariston', 'Beretta', 'Roca', 'Cointra', 'Chaffoteaux', 'Hermann', 'Manaut',
  'Fondital', 'Immergas', 'Viessmann', 'Wolf', 'De Dietrich', 'Lamborghini',
  'Fagor', 'Sime', 'Buderus', 'Atlantic', 'Thermor', 'Tesy',
  'Daikin', 'Mitsubishi Electric', 'Fujitsu', 'LG', 'Samsung', 'Panasonic',
  'Toshiba', 'Hitachi', 'Carrier', 'Hisense', 'Haier', 'Midea', 'Gree',
  'General (Fujitsu)', 'Johnson', 'Mundoclima', 'Kosner', 'HTW', 'Infiniton'
];

// Modelos por marca (ejemplos)
const modelosPorMarca: { [key: string]: string[] } = {
  'Junkers / Bosch': ['Cerapur', 'Cerapur Comfort', 'Cerapur Excellence', 'Cerapur Smart', 'Condens 2300', 'Condens 5300', 'Condens 7000', 'Euromaxx', 'Euroline', 'Ceraclass'],
  'Vaillant': ['EcoTec Plus', 'EcoTec Pro', 'EcoTec Pure', 'EcoTec Exclusive', 'TurboTec Plus', 'TurboTec Pro', 'AtmoTec Plus', 'EcoCompact'],
  'Saunier Duval': ['Themafast Condens', 'Thema Condens', 'Thelia Condens', 'Isofast Condens', 'Isomax Condens', 'Duomax Condens', 'Semia Condens'],
  'Ferroli': ['Bluehelix Tech', 'Bluehelix Pro', 'Divacondens', 'Domicondens', 'Econcept', 'Energy Top', 'Modena'],
  'Baxi / BaxiRoca': ['Platinum Compact', 'Platinum Max Plus', 'Platinum Alux', 'Victoria Condens', 'Duo-Tec Compact', 'Neodens Plus'],
  'Ariston': ['Genus Premium', 'Clas Premium', 'Alteas One', 'Cares Premium', 'HS Premium', 'Matis Condens'],
  'Daikin': ['Sensira', 'Perfera', 'Stylish', 'Emura', 'Ururu Sarara', 'Comfora', 'FTXM', 'FTXA', 'FTXJ'],
  'Mitsubishi Electric': ['MSZ-AP', 'MSZ-LN', 'MSZ-EF', 'MSZ-HR', 'MSZ-BT', 'MUZ-AP', 'MXZ-2F', 'MXZ-3F'],
  'Fujitsu': ['ASY', 'ASYG', 'AOYG', 'Nocria X', 'KM', 'KL', 'KE', 'LM', 'LU'],
  'LG': ['Artcool', 'Artcool Gallery', 'Dualcool', 'Standard Plus', 'Prestige', 'Libero Plus'],
  'Samsung': ['WindFree', 'WindFree Elite', 'WindFree Avant', 'Luzon', 'Maldives', 'AR'],
};

// Tipos de piezas (todas juntas)
const todasLasPiezas = [
  'Válvula de gas', 'Placa electrónica', 'Intercambiador primario', 'Intercambiador ACS',
  'Bomba de circulación', 'Ventilador / Extractor', 'Electrodo de encendido', 'Electrodo de ionización',
  'Presostato de agua', 'Presostato de humos', 'Termostato', 'Sonda NTC', 'Vaso de expansión',
  'Válvula de 3 vías', 'Motor de 3 vías', 'Grifo de llenado', 'Cuerpo de agua', 'Manómetro',
  'Junta / Retén', 'Quemador', 'Cámara de combustión', 'Transformador de encendido',
  'Placa electrónica interior', 'Placa electrónica exterior', 'Compresor', 'Motor ventilador interior',
  'Motor ventilador exterior', 'Turbina', 'Condensador', 'Evaporador', 'Válvula de expansión',
  'Sensor de temperatura', 'Sensor de humedad', 'Mando a distancia', 'Receptor IR', 'Filtro',
  'Bobina / Solenoide', 'Tarjeta de control', 'Capacitador', 'Relé', 'Termistor'
];

// Errores comunes (todos juntos)
const todosLosErrores = [
  'Error F28 - Fallo de encendido', 'Error F29 - Llama se apaga', 'Error F22 - Falta de agua',
  'Error F75 - Fallo bomba/presostato', 'Error F20 - Sobrecalentamiento', 'Error F27 - Llama parásita',
  'Error F24 - Calentamiento rápido', 'Error F25 - Gases de combustión', 'Error F05 - Sonda ACS',
  'Error F10 - Sonda NTC ida', 'Error F11 - Sonda NTC retorno', 'Error A01 - Sin llama',
  'Error E01 - Fallo general', 'Error E02 - Termostato seguridad', 'Error E03 - Presostato humos',
  'Error E04 - Fallo ionización', 'Error E05 - Sonda calefacción', 'Error E06 - Sonda ACS',
  'No enciende', 'No calienta agua', 'No calienta calefacción', 'Hace ruido', 'Pierde agua',
  'Presión baja', 'Presión alta', 'Se apaga solo', 'Tarda en encender',
  'Error E1 - Sensor temperatura', 'Error E2 - Sensor evaporador', 'Error E3 - Sensor condensador',
  'Error E4 - Protección compresor', 'Error E5 - Comunicación', 'Error E6 - Motor ventilador',
  'Error F1 - Sensor interior', 'Error F2 - Sensor exterior', 'Error F3 - Sensor descarga',
  'Error H1 - Descongelación', 'Error H3 - Protección alta presión', 'Error H6 - Sensor posición',
  'No enfría', 'No calienta', 'No arranca', 'Gotea agua', 'Mal olor',
  'Mando no funciona', 'Parpadean luces', 'Se para solo', 'Hielo en unidad exterior'
];

export default function PiezaGratisPage() {
  // Estados del formulario
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    error: '',
    pieza: '',
    descripcion: '',
    nombre: '',
    email: '',
    telefono: '',
    aceptaTerminos: false
  });
  
  // Estados de UI
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);
  const [paso, setPaso] = useState(1);
  
  // Estados de autocompletado
  const [marcasSugeridas, setMarcasSugeridas] = useState<string[]>([]);
  const [modelosSugeridos, setModelosSugeridos] = useState<string[]>([]);
  const [piezasSugeridas, setPiezasSugeridas] = useState<string[]>([]);
  const [erroresSugeridos, setErroresSugeridos] = useState<string[]>([]);
  const [showMarcas, setShowMarcas] = useState(false);
  const [showModelos, setShowModelos] = useState(false);
  const [showPiezas, setShowPiezas] = useState(false);
  const [showErrores, setShowErrores] = useState(false);
  
  // Estados de vídeo
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  
  // Estados de grabación
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  // Estados de voz
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Verificar soporte de Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);
  
  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [cameraStream, videoPreview]);
  
  // Manejar cambio de marca
  const handleMarcaChange = (value: string) => {
    setFormData({ ...formData, marca: value, modelo: '' });
    if (value.length > 0) {
      const filtered = todasLasMarcas.filter(m => 
        m.toLowerCase().includes(value.toLowerCase())
      );
      setMarcasSugeridas(filtered);
      setShowMarcas(filtered.length > 0);
    } else {
      setMarcasSugeridas([]);
      setShowMarcas(false);
    }
  };
  
  // Manejar cambio de modelo
  const handleModeloChange = (value: string) => {
    setFormData({ ...formData, modelo: value });
    const modelos = modelosPorMarca[formData.marca] || [];
    if (value.length > 0 && modelos.length > 0) {
      const filtered = modelos.filter(m => 
        m.toLowerCase().includes(value.toLowerCase())
      );
      setModelosSugeridos(filtered);
      setShowModelos(filtered.length > 0);
    } else if (value.length === 0 && modelos.length > 0) {
      setModelosSugeridos(modelos);
      setShowModelos(true);
    } else {
      setModelosSugeridos([]);
      setShowModelos(false);
    }
  };
  
  // Manejar cambio de pieza
  const handlePiezaChange = (value: string) => {
    setFormData({ ...formData, pieza: value });
    if (value.length > 0) {
      const filtered = todasLasPiezas.filter(p => 
        p.toLowerCase().includes(value.toLowerCase())
      );
      setPiezasSugeridas(filtered);
      setShowPiezas(filtered.length > 0);
    } else {
      setPiezasSugeridas(todasLasPiezas.slice(0, 10));
      setShowPiezas(true);
    }
  };
  
  // Manejar cambio de error
  const handleErrorChange = (value: string) => {
    setFormData({ ...formData, error: value });
    if (value.length > 0) {
      const filtered = todosLosErrores.filter(e => 
        e.toLowerCase().includes(value.toLowerCase())
      );
      setErroresSugeridos(filtered);
      setShowErrores(filtered.length > 0);
    } else {
      setErroresSugeridos(todosLosErrores.slice(0, 8));
      setShowErrores(true);
    }
  };
  
  // Manejar reconocimiento de voz
  const handleVoiceInput = () => {
    if (!speechSupported) {
      setVoiceError('Tu navegador no soporta reconocimiento de voz');
      return;
    }
    
    setVoiceError(null);
    
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'no-speech') {
          setVoiceError('No se detectó voz. Intenta de nuevo.');
        } else if (event.error === 'not-allowed') {
          setVoiceError('Permiso de micrófono denegado. Actívalo en tu navegador.');
        } else {
          setVoiceError('Error al escuchar. Intenta de nuevo.');
        }
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          descripcion: prev.descripcion + (prev.descripcion ? ' ' : '') + transcript
        }));
        // Enfocar el textarea después de añadir texto
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      };
      
      recognition.start();
    } catch (error) {
      setVoiceError('Error al iniciar el reconocimiento de voz');
      setIsListening(false);
    }
  };
  
  // Manejar drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoFile(files[0]);
    }
  };
  
  // Validar y procesar archivo de vídeo
  const handleVideoFile = (file: File) => {
    setVideoError(null);
    
    // Validar tipo
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/avi'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|avi)$/i)) {
      setVideoError('Formato no válido. Usa MP4, WebM, MOV o AVI.');
      return;
    }
    
    // Validar tamaño (100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setVideoError(`El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo 100MB.`);
      return;
    }
    
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    
    // Simular progreso de carga
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };
  
  // Iniciar grabación de cámara
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: true 
      });
      
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `grabacion-${Date.now()}.webm`, { type: 'video/webm' });
        handleVideoFile(file);
        setShowCamera(false);
        stream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      };
      
      setMediaRecorder(recorder);
      recorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setVideoError('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  };
  
  // Detener grabación
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };
  
  // Cancelar grabación
  const cancelRecording = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    setShowCamera(false);
    setRecordingTime(0);
  };
  
  // Eliminar vídeo
  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
  };
  
  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };
  
  // Validar paso actual
  const validateStep = (step: number): boolean => {
    const nuevosErrores: string[] = [];
    
    if (step === 1) {
      if (!formData.marca) nuevosErrores.push('Indica la marca del equipo');
      if (!formData.modelo) nuevosErrores.push('Indica el modelo del equipo');
    } else if (step === 2) {
      if (!formData.error) nuevosErrores.push('Describe el error o problema');
      if (!formData.pieza) nuevosErrores.push('Indica la pieza sustituida');
    } else if (step === 3) {
      if (!videoFile) nuevosErrores.push('Debes subir o grabar un vídeo');
    } else if (step === 4) {
      if (!formData.nombre) nuevosErrores.push('Indica tu nombre');
      if (!formData.email) nuevosErrores.push('Indica tu email');
      if (!formData.aceptaTerminos) nuevosErrores.push('Debes aceptar los términos y condiciones');
    }
    
    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };
  
  // Avanzar paso
  const nextStep = () => {
    if (validateStep(paso)) {
      setPaso(prev => Math.min(prev + 1, 4));
      setErrores([]);
    }
  };
  
  // Retroceder paso
  const prevStep = () => {
    setPaso(prev => Math.max(prev - 1, 1));
    setErrores([]);
  };
  
  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setEnviado(true);
    }
  };
  
  // Pantalla de éxito
  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Reparación enviada!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Hemos recibido tu vídeo correctamente. Nuestro equipo técnico lo revisará en las próximas <strong>48-72 horas</strong>.
          </p>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 mb-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">Estado: Pendiente de revisión</span>
            </div>
            <p className="text-sm text-gray-600">
              Te contactaremos por email a <strong>{formData.email}</strong> para informarte del resultado.
            </p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30">
      {/* Header elegante */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-xl text-gray-800">Uniclima</span>
          </Link>
          <Link 
            href="/"
            className="text-gray-500 hover:text-orange-600 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver a la tienda</span>
          </Link>
        </div>
      </header>

      {/* Hero Section - Diseño Profesional */}
      <section className="py-8 sm:py-12 px-4 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-md border border-orange-100">
            <Sparkles className="w-4 h-4" />
            Promoción exclusiva para profesionales
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Pieza reacondicionada <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">GRATIS</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Comparte tu reparación en vídeo y recibe una pieza reacondicionada gratis o el reembolso de tu compra.
          </p>
          
          {/* Stats rápidos */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium">+500 vídeos validados</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Validación en 48-72h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium">100% gratis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios - Diseño Profesional */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">¿Cómo funciona?</h2>
              <p className="text-gray-400 text-sm">Tres simples pasos para obtener tu recompensa</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-700/50">01</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Graba tu reparación</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Mínimo 7 minutos mostrando el proceso completo de diagnóstico y reparación.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-700/50">02</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Validación profesional</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Nuestro equipo técnico verifica la calidad y utilidad del contenido en 48-72h.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-700/50">03</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Recibe tu recompensa</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Pieza reacondicionada gratis o reembolso completo de tu compra anterior.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indicador de pasos - Diseño Profesional */}
      <section className="px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between relative">
              {/* Línea de progreso */}
              <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((paso - 1) / 3) * 100}%` }}
                />
              </div>
              {[
                { num: 1, label: 'Equipo', icon: Wrench },
                { num: 2, label: 'Problema', icon: AlertCircle },
                { num: 3, label: 'Vídeo', icon: Video },
                { num: 4, label: 'Enviar', icon: Gift }
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    paso > step.num 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30' 
                      : paso === step.num
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-110'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {paso > step.num ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-semibold transition-colors ${
                    paso > step.num 
                      ? 'text-green-600' 
                      : paso === step.num 
                        ? 'text-orange-600' 
                        : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
            {/* Decoración superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>
            
            {/* Errores */}
            {errores.length > 0 && (
              <div className="bg-red-50 border-b border-red-100 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 mb-1">Por favor, corrige los siguientes errores:</p>
                    <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                      {errores.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              
              {/* Paso 1: Datos del equipo */}
              {paso === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Datos del equipo</h2>
                    <p className="text-gray-600">Indica la marca y modelo del equipo reparado</p>
                  </div>
                  
                  {/* Marca con autocompletado */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      value={formData.marca}
                      onChange={(e) => handleMarcaChange(e.target.value)}
                      onFocus={() => {
                        if (formData.marca.length === 0) {
                          setMarcasSugeridas(todasLasMarcas.slice(0, 10));
                          setShowMarcas(true);
                        }
                      }}
                      onBlur={() => setTimeout(() => setShowMarcas(false), 200)}
                      placeholder="Ej: Vaillant, Daikin, Junkers..."
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                    />
                    {showMarcas && marcasSugeridas.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {marcasSugeridas.map((marca, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, marca, modelo: '' });
                              setShowMarcas(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {marca}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Modelo con autocompletado */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      value={formData.modelo}
                      onChange={(e) => handleModeloChange(e.target.value)}
                      onFocus={() => {
                        const modelos = modelosPorMarca[formData.marca] || [];
                        if (modelos.length > 0) {
                          setModelosSugeridos(modelos);
                          setShowModelos(true);
                        }
                      }}
                      onBlur={() => setTimeout(() => setShowModelos(false), 200)}
                      placeholder="Ej: EcoTec Plus, Sensira, Cerapur..."
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                    />
                    {showModelos && modelosSugeridos.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {modelosSugeridos.map((modelo, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, modelo });
                              setShowModelos(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {modelo}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Paso 2: Error y pieza */}
              {paso === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Problema y solución</h2>
                    <p className="text-gray-600">Describe el error y la pieza que has sustituido</p>
                  </div>
                  
                  {/* Error con autocompletado */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Error o síntoma *
                    </label>
                    <input
                      type="text"
                      value={formData.error}
                      onChange={(e) => handleErrorChange(e.target.value)}
                      onFocus={() => {
                        setErroresSugeridos(todosLosErrores.slice(0, 8));
                        setShowErrores(true);
                      }}
                      onBlur={() => setTimeout(() => setShowErrores(false), 200)}
                      placeholder="Ej: Error F28, No enciende, No enfría..."
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                    />
                    {showErrores && erroresSugeridos.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {erroresSugeridos.map((error, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, error });
                              setShowErrores(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {error}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Pieza con autocompletado */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pieza sustituida *
                    </label>
                    <input
                      type="text"
                      value={formData.pieza}
                      onChange={(e) => handlePiezaChange(e.target.value)}
                      onFocus={() => {
                        setPiezasSugeridas(todasLasPiezas.slice(0, 10));
                        setShowPiezas(true);
                      }}
                      onBlur={() => setTimeout(() => setShowPiezas(false), 200)}
                      placeholder="Ej: Placa electrónica, Válvula de gas..."
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                    />
                    {showPiezas && piezasSugeridas.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {piezasSugeridas.map((pieza, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, pieza });
                              setShowPiezas(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {pieza}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Descripción con micrófono integrado */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción adicional (opcional)
                    </label>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describe brevemente el proceso de diagnóstico y reparación... o pulsa el micrófono para dictar"
                        rows={4}
                        className="w-full px-4 py-3.5 pr-20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base resize-none"
                      />
                      {/* Botón de micrófono grande y atractivo */}
                      {speechSupported && (
                        <button
                          type="button"
                          onClick={handleVoiceInput}
                          className={`absolute right-3 top-3 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                            isListening 
                              ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
                              : 'bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                          }`}
                          title={isListening ? 'Escuchando...' : 'Pulsa para dictar'}
                        >
                          {isListening ? (
                            <MicOff className="w-7 h-7 text-white" />
                          ) : (
                            <Mic className="w-7 h-7 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                    {/* Indicador de estado del micrófono */}
                    {isListening && (
                      <div className="mt-2 flex items-center gap-2 text-orange-600">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                        <span className="text-sm font-medium">Escuchando... habla ahora</span>
                      </div>
                    )}
                    {voiceError && (
                      <div className="mt-2 flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{voiceError}</span>
                      </div>
                    )}
                    {!speechSupported && (
                      <p className="mt-2 text-xs text-gray-500">
                        Tu navegador no soporta dictado por voz. Usa Chrome o Edge para esta función.
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Paso 3: Vídeo */}
              {paso === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Vídeo de la reparación</h2>
                    <p className="text-gray-600">Sube o graba un vídeo mostrando el proceso completo</p>
                  </div>
                  
                  {/* Vista previa de cámara */}
                  {showCamera && (
                    <div className="relative rounded-2xl overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        REC {formatTime(recordingTime)}
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={cancelRecording}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                        >
                          <X className="w-6 h-6" />
                        </button>
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all shadow-lg"
                        >
                          <Square className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Vista previa del vídeo subido */}
                  {videoPreview && !showCamera && (
                    <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full aspect-video object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="absolute top-3 right-3 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      {uploadProgress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                          <div 
                            className="h-full bg-orange-500 transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                      {videoFile && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm">
                          <FileVideo className="w-4 h-4" />
                          {formatFileSize(videoFile.size)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Zona de subida */}
                  {!videoPreview && !showCamera && (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                        isDragging 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50'
                      }`}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-orange-600" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        Arrastra tu vídeo aquí
                      </p>
                      <p className="text-gray-500 mb-6">
                        o elige una opción
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-medium hover:border-orange-400 hover:text-orange-700 transition-all"
                        >
                          <FileVideo className="w-5 h-5" />
                          Seleccionar archivo
                        </button>
                        <button
                          type="button"
                          onClick={startRecording}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                        >
                          <Camera className="w-5 h-5" />
                          Grabar ahora
                        </button>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,.mp4,.webm,.mov,.avi"
                        onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
                        className="hidden"
                      />
                    </div>
                  )}
                  
                  {/* Error de vídeo */}
                  {videoError && (
                    <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{videoError}</p>
                    </div>
                  )}
                  
                  {/* Requisitos del vídeo */}
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-orange-600" />
                      Requisitos del vídeo
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-orange-500" />
                        Duración mínima: 7 minutos
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <HardDrive className="w-4 h-4 text-orange-500" />
                        Tamaño máximo: 100 MB
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Video className="w-4 h-4 text-orange-500" />
                        Formatos: MP4, WebM, MOV, AVI
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Camera className="w-4 h-4 text-orange-500" />
                        Resolución mínima: 720p
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Paso 4: Datos de contacto y envío */}
              {paso === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Datos de contacto</h2>
                    <p className="text-gray-600">Indica cómo podemos contactarte</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="612 345 678"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base"
                    />
                  </div>
                  
                  {/* Resumen */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Resumen de tu envío</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipo:</span>
                        <span className="font-medium text-gray-900">{formData.marca} {formData.modelo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Error:</span>
                        <span className="font-medium text-gray-900">{formData.error}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pieza:</span>
                        <span className="font-medium text-gray-900">{formData.pieza}</span>
                      </div>
                      {videoFile && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vídeo:</span>
                          <span className="font-medium text-gray-900">{formatFileSize(videoFile.size)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Términos y condiciones */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aceptaTerminos}
                        onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })}
                        className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        He leído y acepto los{' '}
                        <Link 
                          href="/terminos-cesion-video" 
                          target="_blank"
                          className="text-orange-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Términos y Condiciones de Cesión de Derechos
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        , incluyendo la cesión de derechos de autor del vídeo a Uniclima Solutions y los requisitos técnicos del contenido.
                      </span>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Navegación */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {paso > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </button>
                ) : (
                  <div />
                )}
                
                {paso < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Gift className="w-5 h-5" />
                    Enviar para validación
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Enlace a términos */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Al participar aceptas nuestra{' '}
            <Link href="/politica-privacidad" className="text-orange-600 hover:underline">
              política de privacidad
            </Link>
            {' '}y los{' '}
            <Link href="/terminos-cesion-video" className="text-orange-600 hover:underline">
              términos de cesión de derechos
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
