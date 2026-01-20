/*
 * DESIGN: ImageLightbox - Visor de imágenes con zoom estable
 * - Pinch-to-zoom suave sin temblores
 * - Pan en todas direcciones cuando hay zoom
 * - El zoom se mantiene estable
 * - Doble tap para zoom rápido
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Touch state refs para evitar re-renders
  const touchStateRef = useRef({
    isPinching: false,
    isPanning: false,
    startDistance: 0,
    startScale: 1,
    startPosition: { x: 0, y: 0 },
    startTouchCenter: { x: 0, y: 0 },
    lastTouchEnd: 0,
  });

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  // Calcular distancia entre dos puntos táctiles
  const getDistance = (touch1: React.Touch, touch2: React.Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calcular centro entre dos puntos táctiles
  const getCenter = (touch1: React.Touch, touch2: React.Touch) => ({
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  });

  // Limitar posición para que la imagen no salga del viewport
  const clampPosition = useCallback((pos: { x: number; y: number }, currentScale: number) => {
    if (currentScale <= 1) {
      return { x: 0, y: 0 };
    }

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return pos;

    const containerRect = container.getBoundingClientRect();
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    
    // Calcular el tamaño de la imagen escalada
    const aspectRatio = imageWidth / imageHeight;
    let displayWidth, displayHeight;
    
    if (containerRect.width / containerRect.height > aspectRatio) {
      displayHeight = containerRect.height * 0.9;
      displayWidth = displayHeight * aspectRatio;
    } else {
      displayWidth = containerRect.width * 0.9;
      displayHeight = displayWidth / aspectRatio;
    }
    
    const scaledWidth = displayWidth * currentScale;
    const scaledHeight = displayHeight * currentScale;
    
    // Calcular límites de movimiento
    const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);
    
    return {
      x: Math.max(-maxX, Math.min(maxX, pos.x)),
      y: Math.max(-maxY, Math.min(maxY, pos.y)),
    };
  }, []);

  // Manejar inicio de toque
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const state = touchStateRef.current;
    
    if (e.touches.length === 2) {
      // Inicio de pinch zoom
      e.preventDefault();
      state.isPinching = true;
      state.isPanning = false;
      state.startDistance = getDistance(e.touches[0], e.touches[1]);
      state.startScale = scale;
      state.startPosition = { ...position };
      state.startTouchCenter = getCenter(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1 && scale > 1) {
      // Inicio de pan (solo si hay zoom)
      state.isPanning = true;
      state.isPinching = false;
      state.startPosition = { ...position };
      state.startTouchCenter = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, [scale, position]);

  // Manejar movimiento de toque
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const state = touchStateRef.current;
    
    if (state.isPinching && e.touches.length === 2) {
      e.preventDefault();
      
      // Calcular nuevo scale
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scaleChange = currentDistance / state.startDistance;
      let newScale = state.startScale * scaleChange;
      newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      
      // Calcular nuevo centro
      const currentCenter = getCenter(e.touches[0], e.touches[1]);
      
      // Ajustar posición para zoom centrado en el punto de pinch
      const scaleDiff = newScale / state.startScale;
      const newPosition = {
        x: state.startPosition.x + (currentCenter.x - state.startTouchCenter.x),
        y: state.startPosition.y + (currentCenter.y - state.startTouchCenter.y),
      };
      
      setScale(newScale);
      setPosition(clampPosition(newPosition, newScale));
      
    } else if (state.isPanning && e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      
      // Calcular desplazamiento
      const deltaX = e.touches[0].clientX - state.startTouchCenter.x;
      const deltaY = e.touches[0].clientY - state.startTouchCenter.y;
      
      const newPosition = {
        x: state.startPosition.x + deltaX,
        y: state.startPosition.y + deltaY,
      };
      
      setPosition(clampPosition(newPosition, scale));
    }
  }, [scale, clampPosition]);

  // Manejar fin de toque
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const state = touchStateRef.current;
    const now = Date.now();
    
    // Detectar doble tap
    if (e.touches.length === 0 && !state.isPinching) {
      if (now - state.lastTouchEnd < 300) {
        // Doble tap - toggle zoom
        if (scale > 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else {
          setScale(2.5);
        }
      }
      state.lastTouchEnd = now;
    }
    
    // Reset estados
    if (e.touches.length < 2) {
      state.isPinching = false;
    }
    if (e.touches.length === 0) {
      state.isPanning = false;
    }
  }, [scale]);

  // Zoom con botones
  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(MAX_SCALE, prev + 0.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(MIN_SCALE, scale - 0.5);
    setScale(newScale);
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition(clampPosition(position, newScale));
    }
  }, [scale, position, clampPosition]);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Navegación entre imágenes
  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  // Zoom con rueda del ratón
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
    setScale(newScale);
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // Mouse drag para desktop
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      const newPosition = {
        x: dragStartRef.current.posX + deltaX,
        y: dragStartRef.current.posY + deltaY,
      };
      setPosition(clampPosition(newPosition, scale));
    }
  }, [isDragging, scale, clampPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Barra de controles */}
      <div className="flex items-center justify-center gap-2 p-4 bg-black/50">
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Reducir zoom"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <span className="text-white font-medium min-w-[60px] text-center">
          {Math.round(scale * 100)}%
        </span>
        
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Aumentar zoom"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleReset}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Resetear zoom"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-4"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Contenedor de imagen */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden touch-none select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Flechas de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Imagen */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: touchStateRef.current.isPinching || touchStateRef.current.isPanning || isDragging 
              ? 'none' 
              : 'transform 0.2s ease-out',
          }}
        >
          <img
            ref={imageRef}
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[80vh] object-contain pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div 
          className="flex justify-center gap-2 p-4 bg-black/50 overflow-x-auto snap-x"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain'
          }}
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-orange-500 opacity-100' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Indicador de posición */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
