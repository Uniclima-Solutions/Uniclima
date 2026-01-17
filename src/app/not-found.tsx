'use client';

/**
 * Página 404 - Uniclima
 * Diseño elegante, simple y gracioso
 * Colores corporativos: Naranja (#FF6B00) y Blanco
 */

import Link from 'next/link';
import { Home, Search, ArrowLeft, Snowflake, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [isShivering, setIsShivering] = useState(false);
  const [isSweating, setIsSweating] = useState(false);

  // Alternar entre frío y calor para el efecto gracioso
  useEffect(() => {
    const interval = setInterval(() => {
      setIsShivering(prev => !prev);
      setTimeout(() => {
        setIsSweating(prev => !prev);
      }, 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Copos de nieve y llamas flotantes */}
        <Snowflake className="absolute top-[10%] left-[10%] w-8 h-8 text-blue-200 animate-bounce opacity-40" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <Flame className="absolute top-[15%] right-[15%] w-10 h-10 text-orange-200 animate-pulse opacity-40" />
        <Snowflake className="absolute top-[30%] left-[5%] w-6 h-6 text-blue-200 animate-bounce opacity-30" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <Flame className="absolute top-[25%] right-[8%] w-8 h-8 text-orange-200 animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
        <Snowflake className="absolute bottom-[30%] left-[12%] w-10 h-10 text-blue-200 animate-bounce opacity-40" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <Flame className="absolute bottom-[25%] right-[10%] w-6 h-6 text-orange-200 animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />
        <Snowflake className="absolute bottom-[15%] left-[20%] w-8 h-8 text-blue-200 animate-bounce opacity-30" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
        <Flame className="absolute bottom-[20%] right-[20%] w-10 h-10 text-orange-200 animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
      </div>

      {/* Contenido principal */}
      <div className="text-center z-10 max-w-lg">
        {/* Logo Uniclima */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Uniclima</span>
          </Link>
        </div>

        {/* Número 404 con efecto */}
        <div className="relative mb-6">
          <h1 className={`text-[150px] sm:text-[200px] font-black leading-none transition-all duration-500 ${
            isShivering 
              ? 'text-blue-400 animate-pulse' 
              : isSweating 
                ? 'text-orange-500' 
                : 'text-orange-500'
          }`}>
            4
            <span className={`inline-block transition-transform duration-300 ${
              isShivering ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : ''
            }`}>
              {isShivering ? '🥶' : isSweating ? '🥵' : '0'}
            </span>
            4
          </h1>
          
          {/* Efecto de gotas de sudor o copos */}
          {isSweating && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl animate-bounce">💧</span>
            </div>
          )}
          {isShivering && (
            <div className="absolute top-1/4 right-1/4">
              <Snowflake className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Mensaje gracioso */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            ¡Ups! Esta página se ha evaporado
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Parece que el <span className="text-orange-500 font-semibold">aire acondicionado</span> enfrió demasiado 
            o la <span className="text-orange-500 font-semibold">caldera</span> calentó de más...
          </p>
          <p className="text-gray-500 text-sm">
            La página que buscas no existe o ha sido movida a otro lugar más templado.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </Link>
          
          <Link 
            href="/c/calderas"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-orange-300 w-full sm:w-auto justify-center"
          >
            <Search className="w-5 h-5" />
            Ver Catálogo
          </Link>
        </div>

        {/* Enlace adicional */}
        <div className="mt-8">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la página anterior
          </button>
        </div>

        {/* Mensaje de contacto */}
        <div className="mt-10 p-4 bg-white/80 backdrop-blur rounded-xl border border-orange-100 shadow-sm">
          <p className="text-gray-600 text-sm">
            ¿Necesitas ayuda? Llámanos al{' '}
            <a href="tel:+34912345678" className="text-orange-500 font-semibold hover:underline">
              912 345 678
            </a>
            {' '}o escríbenos a{' '}
            <a href="mailto:info@uniclima.es" className="text-orange-500 font-semibold hover:underline">
              info@uniclima.es
            </a>
          </p>
        </div>
      </div>

      {/* Animación CSS personalizada */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
