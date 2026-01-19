"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, Info, X, Shield, Star, Crown, Flame, Wind } from "lucide-react";

// Tipos
interface Plan {
  id: number;
  nombre: string;
  precio: number;
  periodo: string;
  destacado: boolean;
  color: string;
  icono: string;
  descripcion: string;
  caracteristicas: string[];
  detalles?: string[];
  ventajas?: string[];
}

// Colores con degradados - Naranja para calderas, Azul para aire
const calderaColors = {
  esencial: { gradient: 'from-orange-400 to-orange-500', bg: 'bg-orange-400', bgLight: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-300', accent: 'bg-orange-100' },
  confort: { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-500', bgLight: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-400', accent: 'bg-orange-100' },
  premium: { gradient: 'from-orange-600 to-orange-700', bg: 'bg-orange-600', bgLight: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-500', accent: 'bg-orange-100' },
};

const aireColors = {
  esencial: { gradient: 'from-sky-400 to-sky-500', bg: 'bg-sky-400', bgLight: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-300', accent: 'bg-sky-100' },
  confort: { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-400', accent: 'bg-blue-100' },
  premium: { gradient: 'from-blue-600 to-blue-700', bg: 'bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', accent: 'bg-blue-100' },
};

// Función para obtener colores según tipo de equipo y plan
const getColors = (tipoEquipo: 'calderas' | 'aire', planNombre: string) => {
  const colorSet = tipoEquipo === 'calderas' ? calderaColors : aireColors;
  const planKey = planNombre.toLowerCase() as keyof typeof calderaColors;
  return colorSet[planKey] || colorSet.confort;
};

// Iconos por tipo
const PlanIcon = ({ icono, className }: { icono: string; className?: string }) => {
  switch (icono) {
    case 'shield': return <Shield className={className} />;
    case 'star': return <Star className={className} />;
    case 'crown': return <Crown className={className} />;
    default: return <Shield className={className} />;
  }
};

// Componente de tarjeta de precio con efecto flip
export default function PricingCardFlip({ plan, tipoEquipo }: { plan: Plan; tipoEquipo: 'calderas' | 'aire' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Mapear tipo de equipo a valor del formulario
  const tipoAparatoParam = tipoEquipo === 'calderas' ? 'Caldera de Gas' : 'Aire A. Split';
  const urlParams = new URLSearchParams({
    tipo: tipoAparatoParam,
    plan: plan.nombre
  });
  
  // Obtener colores según tipo de equipo y plan
  const colors = getColors(tipoEquipo, plan.nombre);
  const isHighlighted = plan.destacado;
  
  const handleContract = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/contrato-mantenimiento?${urlParams.toString()}`;
  };
  
  return (
    <div 
      className="relative w-[280px] sm:w-[300px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full transition-transform duration-700 group-hover:scale-[1.02]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Cara frontal */}
        <div 
          className={`w-full rounded-2xl overflow-hidden shadow-lg bg-white ${
            isHighlighted ? 'ring-2 ring-orange-500 ring-offset-2' : 'border border-gray-200'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Badge Recomendado */}
          {isHighlighted && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-[9px] font-bold px-3 py-1 rounded-b-md shadow-md">
                ★ RECOMENDADO
              </div>
            </div>
          )}
          
          {/* Header con gradiente */}
          <div className={`bg-gradient-to-br ${colors.gradient} px-4 py-4 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <PlanIcon icono={plan.icono} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{plan.nombre}</h3>
                  <p className="text-white/70 text-[10px] leading-tight">{plan.descripcion}</p>
                </div>
              </div>
              
              {/* Precio en header */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">€{plan.precio}</span>
                <span className="text-white/70 text-xs">/{plan.periodo}</span>
              </div>
            </div>
          </div>
        
          <div className="px-4 py-4 bg-white">
            {/* Características principales */}
            <ul className="space-y-2 mb-4">
              {plan.caracteristicas.map((caracteristica, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Check className={`w-2.5 h-2.5 ${colors.text}`} />
                  </div>
                  <span className="text-[12px] text-gray-700 leading-tight">{caracteristica}</span>
                </li>
              ))}
            </ul>
            
            {/* Ventajas destacadas - solo si existen */}
            {plan.ventajas && plan.ventajas.length > 0 && (
              <div className={`bg-gradient-to-r ${colors.bgLight} rounded-lg p-3 mb-4 border ${colors.border}`}>
                <p className={`text-[10px] font-bold ${colors.text} mb-2 flex items-center gap-1 uppercase tracking-wider`}>
                  <Zap className="w-3 h-3" /> Ventajas incluidas
                </p>
                <ul className="space-y-1">
                  {plan.ventajas.map((ventaja, idx) => (
                    <li key={idx} className="text-[10px] text-gray-600 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                      {ventaja}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Indicador de flip */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-[10px] text-gray-500 hover:bg-gray-200 transition-all duration-300`}>
                <div className="w-3 h-3 border-2 border-current rounded-full flex items-center justify-center animate-pulse">
                  <ArrowRight className="w-2 h-2" />
                </div>
                <span>Click para ver detalles</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cara trasera */}
        <div 
          className="absolute inset-0 w-full rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Header */}
          <div className={`bg-gradient-to-br ${colors.gradient} px-4 py-3 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <PlanIcon icono={plan.icono} className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold">{plan.nombre}</h3>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="px-4 py-4 flex flex-col h-[calc(100%-60px)]">
            {/* Detalles completos - solo si existen */}
            <div className="flex-1">
              {plan.detalles && plan.detalles.length > 0 ? (
                <>
                  <p className={`text-[11px] font-bold ${colors.text} mb-3 uppercase tracking-wider flex items-center gap-1.5`}>
                    <Info className="w-3 h-3" />
                    Detalles del servicio
                  </p>
                  <ul className="space-y-2">
                    {plan.detalles.map((detalle, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-md ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <ArrowRight className={`w-3 h-3 ${colors.text}`} />
                        </div>
                        <span className="text-[12px] text-gray-700 leading-tight">{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center text-gray-500 text-sm py-4">
                  <p>Servicio de mantenimiento profesional</p>
                </div>
              )}
            </div>
            
            {/* Precio y botón */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">Precio anual:</span>
                <span className="text-2xl font-black text-gray-900">€{plan.precio}</span>
              </div>
              <button
                onClick={handleContract}
                className={`w-full bg-gradient-to-r ${colors.gradient} text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2`}
              >
                Contratar ahora
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
