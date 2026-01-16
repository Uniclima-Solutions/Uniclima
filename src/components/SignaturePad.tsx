'use client';

/*
 * SIGNATURE PAD - Componente de firma digital COMPACTO
 * - Canvas HTML5 para dibujar firma
 * - Soporte táctil y ratón
 * - Exportación como imagen base64
 * - Diseño responsive y compacto
 * - Tamaño reducido: 400x120 (era 500x200)
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, Check, PenTool, RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave?: (signature: string) => void;
  onClear?: () => void;
  onSignatureChange?: (signature: string | null) => void;
  width?: number;
  height?: number;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function SignaturePad({
  onSave,
  onClear,
  onSignatureChange,
  width = 400,  // Reducido de 500
  height = 120, // Reducido de 200
  className = '',
  label = 'Firma del cliente',
  required = true,
  error
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width, height });

  // Ajustar tamaño del canvas al contenedor
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 2; // -2 para el borde
        const newWidth = Math.min(containerWidth, width);
        const newHeight = Math.round((newWidth / width) * height);
        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [width, height]);

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar el canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1.5; // Línea más fina para el tamaño reducido
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [canvasSize]);

  // Obtener posición del cursor/touch
  const getPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  }, []);

  // Iniciar dibujo
  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  }, [getPosition]);

  // Dibujar
  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSignature(true);
  }, [isDrawing, getPosition]);

  // Terminar dibujo y guardar automáticamente
  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      // Guardar automáticamente al terminar de dibujar
      const canvas = canvasRef.current;
      if (canvas && hasSignature) {
        const dataUrl = canvas.toDataURL('image/png');
        onSignatureChange?.(dataUrl);
        onSave?.(dataUrl);
      }
    }
  }, [isDrawing, hasSignature, onSignatureChange, onSave]);

  // Limpiar canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange?.(null);
    onClear?.();
  }, [onSignatureChange, onClear]);

  // Confirmar firma manualmente
  const confirmSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange?.(dataUrl);
      onSave?.(dataUrl);
    }
  }, [hasSignature, onSignatureChange, onSave]);

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-orange-500 ml-1">*</span>}
      </label>

      {/* Instrucciones compactas */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-1.5">
        <PenTool className="w-3 h-3" />
        <span>Dibuja tu firma con el ratón o el dedo</span>
      </div>

      {/* Canvas container - más compacto */}
      <div className={`relative border-2 rounded-lg overflow-hidden transition-colors ${
        error ? 'border-red-300 bg-red-50' : hasSignature ? 'border-green-400 bg-green-50/30' : 'border-gray-300 bg-white'
      }`}>
        {/* Línea de firma - ajustada para tamaño compacto */}
        <div 
          className="absolute bottom-5 left-3 right-3 border-b border-dashed border-gray-300 pointer-events-none"
          style={{ zIndex: 1 }}
        />
        <span 
          className="absolute bottom-1 left-3 text-[10px] text-gray-400 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          Firma aquí
        </span>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="touch-none cursor-crosshair"
          style={{ width: '100%', height: 'auto', maxHeight: '120px' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Indicador de firma válida - más pequeño */}
        {hasSignature && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            <Check className="w-2.5 h-2.5" />
            <span>OK</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}

      {/* Botones de acción - más compactos */}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Eraser className="w-3.5 h-3.5" />
          Limpiar
        </button>
        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>
        {hasSignature && (
          <button
            type="button"
            onClick={confirmSignature}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors ml-auto"
          >
            <Check className="w-3.5 h-3.5" />
            Confirmar
          </button>
        )}
      </div>

      {/* Nota legal - más compacta */}
      <p className="mt-2 text-[10px] text-gray-500 leading-tight">
        Al firmar, confirmas que aceptas los términos del contrato. Firma válida según Reglamento (UE) Nº 910/2014 (eIDAS).
      </p>
    </div>
  );
}
