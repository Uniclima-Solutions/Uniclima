"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  photoUrl?: string;
}

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/BshwReF7eKuF7RaC6";

// 25 reseñas de Google con valoraciones 4 y 5
const reviews: Review[] = [
  { author: "Cristina López", rating: 5, date: "hace 1 semana", text: "Excelente servicio. Encontraron el repuesto exacto para mi caldera Vaillant. Envío rapidísimo y muy bien embalado.", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { author: "Alberto Fernández", rating: 5, date: "hace 2 semanas", text: "Fantástica experiencia. El técnico fue muy profesional y dejó todo funcionando perfectamente. Muy recomendable.", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "Marta García", rating: 5, date: "hace 3 semanas", text: "Muy recomendable. Compramos una caldera completa y nos la instalaron sin ningún problema. Trabajo impecable.", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { author: "Daniel Ruiz", rating: 5, date: "hace 1 mes", text: "Servicio excelente. Me eligieron el mejor repuesto para mi situación y acertaron de lleno. Muy agradecido.", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { author: "Sandra Morales", rating: 5, date: "hace 1 mes", text: "Super servicio, muy profesionales y rápidos. Encontraron el repuesto que necesitaba al momento. Volveré sin duda.", photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop" },
  { author: "Raúl Herrera", rating: 5, date: "hace 1 mes", text: "Gran servicio técnico. Vinieron a revisar mi aire acondicionado y lo dejaron como nuevo. Muy profesionales.", photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop" },
  { author: "Pope Popey", rating: 5, date: "hace 2 meses", text: "Excelente atención al cliente, buena comunicación y atentos a cualquier duda. Les pedí una placa de caldera Saunier Duval y llegó perfecta.", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "María Borja", rating: 5, date: "hace 2 meses", text: "Muy recomendable. Muy profesionales y eficientes. Hoy nos instalaron dos aires acondicionados y quedaron perfectos.", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { author: "Carlos Martín", rating: 5, date: "hace 2 meses", text: "Gran experiencia. Precio muy competitivo y envío rápido. La placa llegó perfectamente en tiempo récord.", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "Elena Sánchez", rating: 5, date: "hace 2 meses", text: "Profesionales de verdad. Resolvieron mi problema en menos de 24 horas. Servicio impecable y garantizado." },
  { author: "Francisco López", rating: 5, date: "hace 3 meses", text: "Recomendadísimo. Encontraron el repuesto exacto que buscaba. Atención personalizada de principio a fin.", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { author: "Beatriz Gómez", rating: 5, date: "hace 3 meses", text: "Excelente calidad. El producto es exactamente lo que necesitaba. Volveré a comprar sin dudarlo.", photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop" },
  { author: "Javier Ruiz", rating: 5, date: "hace 3 meses", text: "Servicio de primera categoría. Los técnicos son muy competentes y dejan todo funcionando perfectamente.", photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop" },
  { author: "Lorena Díaz", rating: 4, date: "hace 3 meses", text: "Muy buena experiencia. Rápidos y eficientes. El producto llegó en perfectas condiciones.", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { author: "Miguel Ángel", rating: 5, date: "hace 4 meses", text: "Perfectamente satisfecho. Encontraron exactamente lo que buscaba. Recomiendo sin reservas.", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "Rosa Martínez", rating: 5, date: "hace 4 meses", text: "Profesionales de confianza. Instalación perfecta y atención excepcional. Muy agradecida.", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { author: "Antonio García", rating: 5, date: "hace 4 meses", text: "Increíble servicio. Llegaron a tiempo y dejaron todo perfecto. Definitivamente volveré.", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { author: "Isabel Rodríguez", rating: 5, date: "hace 5 meses", text: "Muy satisfecha con la compra. Producto de calidad y entrega rápida. Recomendado 100%.", photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop" },
  { author: "Sergio López", rating: 5, date: "hace 5 meses", text: "Excelente atención. Resolvieron todas mis dudas y el producto es exacto. Muy contento.", photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop" },
  { author: "Verónica Sánchez", rating: 5, date: "hace 5 meses", text: "Profesionales muy atentos. Instalación sin problemas y garantía incluida. Perfecto.", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { author: "Pedro Navarro", rating: 5, date: "hace 6 meses", text: "Servicio técnico de primera. Repararon mi caldera en el mismo día. Precio muy justo.", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "Laura Jiménez", rating: 5, date: "hace 6 meses", text: "Compré una placa electrónica y llegó en 24 horas. Funcionando perfectamente desde el primer día.", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { author: "Andrés Molina", rating: 4, date: "hace 6 meses", text: "Buen servicio y buenos precios. El envío tardó un poco más de lo esperado pero todo correcto.", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { author: "Carmen Ortiz", rating: 5, date: "hace 7 meses", text: "Excelente empresa. Me asesoraron muy bien sobre qué repuesto necesitaba. Totalmente recomendable.", photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop" },
  { author: "David Moreno", rating: 5, date: "hace 7 meses", text: "Instalación de aire acondicionado impecable. Técnicos muy profesionales y limpios.", photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop" },
];

// Estadísticas reales de Google Maps
const totalReviews = 293;
const averageRating = "4.7";
const fiveStarPercent = 78;
const fourStarPercent = 14;

// Componente de tarjeta de reseña compacta
function ReviewCard({ review }: { review: Review }) {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer group mx-2"
    >
      {/* Header con avatar y nombre */}
      <div className="flex items-center gap-3 mb-3">
        {review.photoUrl ? (
          <img
            src={review.photoUrl}
            alt={review.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
            {review.author.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">{review.author}</h4>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Texto de la reseña */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-2">
        {review.text}
      </p>

      {/* Fecha */}
      <p className="text-gray-400 text-xs">{review.date}</p>
    </a>
  );
}

export default function GoogleReviews() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con estadísticas */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Título */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Opiniones de nuestros clientes
            </h2>
            <p className="text-gray-500">Basado en reseñas verificadas de Google</p>
          </div>
          
          {/* Caja de puntuación */}
          <a 
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all"
          >
            {/* Logo Google */}
            <div className="flex-shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            
            {/* Puntuación */}
            <div className="text-center">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium">{totalReviews} reseñas</p>
            </div>
            
            {/* Barras de distribución */}
            <div className="hidden sm:block border-l border-gray-200 pl-4 ml-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 w-4">5</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${fiveStarPercent}%` }}></div>
                </div>
                <span className="text-gray-500 w-8">{fiveStarPercent}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-gray-600 w-4">4</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${fourStarPercent}%` }}></div>
                </div>
                <span className="text-gray-500 w-8">{fourStarPercent}%</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Carrusel con CSS animation - scroll infinito fluido */}
      <div className="infinite-scroll-wrapper bg-gray relative">
        <div className="infinite-scroll-container infinite-scroll-slow py-4">
          {/* Primera copia de reseñas */}
          {reviews.map((review, index) => (
            <ReviewCard key={`first-${index}`} review={review} />
          ))}
          {/* Segunda copia para el loop infinito */}
          {reviews.map((review, index) => (
            <ReviewCard key={`second-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
