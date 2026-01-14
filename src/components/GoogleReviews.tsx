"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  photoUrl?: string;
  isNew?: boolean;
}

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/yG1jqyev3nfaRWGd8";

// Mock data - más reseñas con datos variados
const reviews: Review[] = [
  {
    author: "Cristina López",
    rating: 4,
    date: "hace 3 semanas",
    text: "Buena atención y precios razonables. El producto llegó en buen estado aunque el embalaje podría mejorar un poco.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    author: "Alberto Fernández",
    rating: 5,
    date: "hace 1 semana",
    text: "Fantástica experiencia. El técnico fue muy profesional y dejó todo funcionando perfectamente. Muy recomendable.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    isNew: true
  },
  {
    author: "Marta García",
    rating: 5,
    date: "hace 2 meses",
    text: "Muy recomendable. Compramos una caldera completa y nos la instalaron sin ningún problema. Trabajo impecable.",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    author: "Daniel Ruiz",
    rating: 5,
    date: "hace 2 meses",
    text: "Servicio excelente. Me eligieron el mejor repuesto para mi situación y acertaron de lleno. Muy agradecido.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    author: "Sandra Morales",
    rating: 5,
    date: "hace 3 meses",
    text: "Super servicio, muy profesionales y rápidos. Encontraron el repuesto que necesitaba al momento. Volveré sin duda.",
    photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop"
  },
  {
    author: "Raúl Herrera",
    rating: 5,
    date: "hace 3 meses",
    text: "Gran servicio técnico. Vinieron a revisar mi aire acondicionado y lo dejaron como nuevo. Muy profesionales.",
    photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop"
  },
  {
    author: "Pope Popey",
    rating: 5,
    date: "hace 3 meses",
    text: "Excelente atención al cliente, buena comunicación y atentos a cualquier duda. Les pedí una placa de caldera Saunier Duval.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    author: "María Borja",
    rating: 5,
    date: "hace 5 meses",
    text: "Muy recomendable. Muy profesionales y eficientes. Hoy nos instalaron dos aires acondicionados y quedaron perfectos.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    author: "Carlos Martín",
    rating: 5,
    date: "hace 1 mes",
    text: "Gran experiencia. Precio muy competitivo y envío rápido. La placa llegó perfectamente en tiempo récord.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    author: "Elena Sánchez",
    rating: 5,
    date: "hace 2 semanas",
    text: "Profesionales de verdad. Resolvieron mi problema en menos de 24 horas. Servicio impecable y garantizado."
  },
  {
    author: "Francisco López",
    rating: 5,
    date: "hace 1 mes",
    text: "Recomendadísimo. Encontraron el repuesto exacto que buscaba. Atención personalizada de principio a fin.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    author: "Beatriz Gómez",
    rating: 5,
    date: "hace 3 semanas",
    text: "Excelente calidad. El producto es exactamente lo que necesitaba. Volveré a comprar sin dudarlo.",
    photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop"
  },
  {
    author: "Javier Ruiz",
    rating: 5,
    date: "hace 2 meses",
    text: "Servicio de primera categoría. Los técnicos son muy competentes y dejan todo funcionando perfectamente.",
    photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop"
  },
  {
    author: "Lorena Díaz",
    rating: 4,
    date: "hace 1 mes",
    text: "Muy buena experiencia. Rápidos y eficientes. Aunque el embalaje podría ser un poco mejor.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    author: "Miguel Ángel",
    rating: 5,
    date: "hace 2 semanas",
    text: "Perfectamente satisfecho. Encontraron exactamente lo que buscaba. Recomiendo sin reservas.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    author: "Rosa Martínez",
    rating: 5,
    date: "hace 3 meses",
    text: "Profesionales de confianza. Instalación perfecta y atención excepcional. Muy agradecida.",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    author: "Antonio García",
    rating: 5,
    date: "hace 2 semanas",
    text: "Increíble servicio. Llegaron a tiempo y dejaron todo perfecto. Definitivamente volveré.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    author: "Isabel Rodríguez",
    rating: 5,
    date: "hace 1 mes",
    text: "Muy satisfecha con la compra. Producto de calidad y entrega rápida. Recomendado 100%.",
    photoUrl: "https://images.unsplash.com/photo-1517746915202-e2341056e981?w=100&h=100&fit=crop"
  },
  {
    author: "Sergio López",
    rating: 5,
    date: "hace 3 semanas",
    text: "Excelente atención. Resolvieron todas mis dudas y el producto es exacto. Muy contento.",
    photoUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=100&h=100&fit=crop"
  },
  {
    author: "Verónica Sánchez",
    rating: 5,
    date: "hace 2 meses",
    text: "Profesionales muy atentos. Instalación sin problemas y garantía incluida. Perfecto.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  }
];

// Componente de tarjeta de reseña
function ReviewCard({ review }: { review: Review }) {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col h-full select-none"
      draggable={false}
    >
      {/* Header con foto y nombre */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 overflow-hidden text-white font-bold">
          {review.photoUrl ? (
            <img
              src={review.photoUrl}
              alt={review.author}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
          {!review.photoUrl && (
            <span className="text-sm sm:text-base">
              {review.author.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {review.author}
            </h3>
            {review.isNew && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                NUEVO
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">{review.date}</p>
        </div>
      </div>

      {/* Estrellas */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-base sm:text-lg ${
              i < review.rating ? "text-yellow-400" : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Texto de la reseña */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 flex-1">
        {review.text}
      </p>
    </a>
  );
}

export default function GoogleReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Actualizar estado de scroll
  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      updateScrollState();
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
          Opiniones de nuestros clientes
        </h2>

        {/* Carrusel con scroll fluido */}
        <div className="relative group">
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl ${
              canScrollLeft
                ? "opacity-100 -translate-x-1/2"
                : "opacity-0 pointer-events-none -translate-x-full"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          {/* Contenedor de scroll fluido */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[300px] sm:w-[320px] lg:w-[350px]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl ${
              canScrollRight
                ? "opacity-100 translate-x-1/2"
                : "opacity-0 pointer-events-none translate-x-full"
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
