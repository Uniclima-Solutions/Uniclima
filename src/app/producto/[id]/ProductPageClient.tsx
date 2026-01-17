'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Phone,
  Share2,
  Heart,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Copy,
  X,
  Star,
  ChevronDown
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductPageClientProps {
  product: {
    id: string;
    name: string;
    reference: string;
    brand: string;
    partType: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: Array<{ id: string; url: string; alt: string; isPrimary: boolean }>;
    inStock: boolean;
    stockQuantity?: number;
    description: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    averageRating?: number;
    reviewCount?: number;
    warranty?: string;
    deliveryTime?: string;
    compatibleModels?: string[];
    problemsSolved?: string[];
    specifications?: Array<{ label: string; value: string; group: string }>;
    faqs?: Array<{ question: string; answer: string }>;
  };
}

// Componente Acordeón
function Accordion({ 
  title, 
  children, 
  defaultOpen = false,
  icon
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-primary">{icon}</span>}
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  
  const { addItem, openCart } = useCart();
  
  // Verificar si Web Share API está disponible
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    setCurrentUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, []);
  
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;
  
  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        reference: product.reference
      });
    }
    
    openCart();
    toast.success(`${quantity} ${quantity === 1 ? 'unidad añadida' : 'unidades añadidas'} al carrito`);
    setIsAdding(false);
  };
  
  // Función de compartir mejorada con Web Share API
  const handleShare = async (platform?: string) => {
    const url = currentUrl;
    const text = `${product.name} - ${product.price.toFixed(2)}€`;
    const title = product.name;
    
    // Si es compartir nativo (móvil) y está disponible
    if (!platform && canNativeShare) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err) {
        // Si el usuario cancela, no hacer nada
        if ((err as Error).name === 'AbortError') return;
        // Si falla, mostrar el modal de fallback
        setShowShareMenu(true);
        return;
      }
    }
    
    // Si no hay platform, mostrar modal
    if (!platform) {
      setShowShareMenu(true);
      return;
    }
    
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
    };
    
    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      toast.success('Enlace copiado al portapapeles');
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
    
    setShowShareMenu(false);
  };
  
  const images = product.images || [{ id: '1', url: product.image, alt: product.name, isPrimary: true }];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative aspect-square bg-white rounded-xl border overflow-hidden">
              {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-lg">
                  -{discount}%
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 right-4 z-10 px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-lg">
                  Top ventas
                </span>
              )}
              <img
                src={images[selectedImage]?.url || product.image}
                alt={images[selectedImage]?.alt || product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            
            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Información del producto */}
          <div className="space-y-6">
            {/* Referencia y badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-500 font-mono">
                Ref: {product.reference}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                product.isNew 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {product.isNew ? 'Nuevo (Original)' : 'Reacondicionado'}
              </span>
            </div>
            
            {/* Nombre del producto */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.averageRating && product.reviewCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.averageRating!) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {product.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} valoraciones)
                </span>
              </div>
            )}
            
            {/* Descripción corta */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            
            {/* Precio */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toFixed(2)}€
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice.toFixed(2)}€
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">IVA incluido</p>
            </div>
            
            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock 
                  ? `En stock${product.stockQuantity ? ` (${product.stockQuantity} unidades)` : ''}` 
                  : 'Agotado'
                }
              </span>
            </div>
            
            {/* Selector de cantidad y botones de acción */}
            <div className="flex flex-col gap-4">
              {/* Fila principal: cantidad + añadir al carrito */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Selector cantidad */}
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity || 99, quantity + 1))}
                    disabled={!product.inStock}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Botón añadir al carrito */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                    product.inStock
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Añadiendo...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Añadir al carrito
                    </>
                  )}
                </button>
              </div>
              
              {/* Fila secundaria: Favorito + Compartir - centrados */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                    isFavorite 
                      ? 'border-red-200 bg-red-50 text-red-600' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>Favorito</span>
                </button>
                
                {/* Botón compartir */}
                <button
                  onClick={() => handleShare()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
            
            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Envío 24-48h</p>
                  <p className="text-xs text-gray-500">Gratis +120€</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Garantía 1 año</p>
                  <p className="text-xs text-gray-500">Sustitución gratis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Devolución 14 días</p>
                  <p className="text-xs text-gray-500">Sin preguntas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Soporte técnico</p>
                  <p className="text-xs text-gray-500">912 345 678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Secciones SEO en Acordeón */}
        <div className="mt-12 space-y-4">
          {/* ¿Para qué sirve este repuesto? */}
          <Accordion title="¿Para qué sirve este repuesto?" defaultOpen={true}>
            <p className="text-gray-700 leading-relaxed">
              Este {product.partType?.toLowerCase() || 'repuesto'} es un componente esencial en las calderas {product.brand}. 
              Se utiliza para garantizar el correcto funcionamiento del sistema de calefacción y agua caliente sanitaria. 
              Es compatible con los modelos de la serie {product.compatibleModels?.[0]?.split(' ').pop() || '1000'} y está 
              recomendado cuando la caldera presenta fallos relacionados con {product.partType?.toLowerCase() || 'este componente'}.
            </p>
          </Accordion>
          
          {/* Compatibilidad confirmada */}
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <Accordion title="Compatibilidad confirmada">
              <p className="text-gray-600 mb-4">
                Este repuesto es compatible con los siguientes modelos de calderas {product.brand}:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.compatibleModels.map((model, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {model}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Si no encuentras tu modelo en la lista, contacta con nuestro soporte técnico para confirmar la compatibilidad.
              </p>
            </Accordion>
          )}
          
          {/* Problemas que soluciona */}
          {product.problemsSolved && product.problemsSolved.length > 0 && (
            <Accordion title="Problemas que soluciona">
              <p className="text-gray-600 mb-4">
                Este {product.partType?.toLowerCase() || 'repuesto'} soluciona problemas comunes como:
              </p>
              <ul className="space-y-2">
                {product.problemsSolved.map((problem, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5">•</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </Accordion>
          )}
          
          {/* Información técnica */}
          {product.specifications && product.specifications.length > 0 && (
            <Accordion title="Información técnica">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {product.specifications.map((spec, index) => (
                      <tr key={index}>
                        <td className="py-3 pr-4 text-gray-600 font-medium w-1/3">{spec.label}</td>
                        <td className="py-3 text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>
          )}
          
          {/* Preguntas frecuentes */}
          {product.faqs && product.faqs.length > 0 && (
            <Accordion title="Preguntas frecuentes">
              <div className="space-y-6">
                {product.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Accordion>
          )}
        </div>
        

      </div>
      
      {/* Modal de compartir centrado y responsive */}
      {showShareMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowShareMenu(false)} 
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Compartir producto</h3>
              <button 
                onClick={() => setShowShareMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Redes sociales */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-lg shadow-black/30">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">X</span>
                </button>
                
                <button
                  onClick={() => handleShare('telegram')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Telegram</span>
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-700/30">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center shadow-lg shadow-gray-600/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Email</span>
                </button>
                
                <button
                  onClick={() => handleShare('copy')}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors col-span-2"
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Copy className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Copiar enlace</span>
                </button>
              </div>
              
              {/* URL para copiar */}
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none truncate"
                />
                <button
                  onClick={() => handleShare('copy')}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
