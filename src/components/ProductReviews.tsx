/*
 * DESIGN: Sistema de Valoraciones
 * - Estrellas interactivas
 * - Formulario de reseña
 * - Lista de reseñas con filtros
 * - Resumen de valoraciones
 */
import { useState } from "react";
import { Star, ThumbsUp, User, Check, Camera } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

// Datos de ejemplo
const sampleReviews: Review[] = [
  {
    id: "1",
    author: "Carlos M.",
    rating: 5,
    title: "Excelente calidad, igual que el original",
    comment: "Llegó muy rápido y el repuesto es exactamente igual al original. La caldera funciona perfectamente. Muy recomendable.",
    date: "2024-01-05",
    verified: true,
    helpful: 12
  },
  {
    id: "2",
    author: "María G.",
    rating: 4,
    title: "Buen producto, envío rápido",
    comment: "El producto cumple su función correctamente. El envío fue muy rápido, llegó en 24 horas. Solo le quito una estrella porque el embalaje podría mejorar.",
    date: "2024-01-03",
    verified: true,
    helpful: 8
  },
  {
    id: "3",
    author: "Antonio R.",
    rating: 5,
    title: "Perfecto para mi Junkers",
    comment: "Compatible 100% con mi caldera Junkers. Fácil de instalar y funciona a la perfección. Precio muy competitivo.",
    date: "2023-12-28",
    verified: true,
    helpful: 15
  }
];

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(sampleReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    name: "",
    email: ""
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [helpfulClicked, setHelpfulClicked] = useState<string[]>([]);

  // Calcular estadísticas
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((r) => r.rating === rating).length
  );

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Gracias por tu valoración! Se publicará tras ser revisada.");
    setShowForm(false);
    setNewReview({ rating: 0, title: "", comment: "", name: "", email: "" });
  };

  const handleHelpful = (reviewId: string) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked([...helpfulClicked, reviewId]);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Opiniones de clientes
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {reviews.length} valoraciones para este producto
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Escribir opinión
          </button>
        </div>
      </div>

      {/* Resumen de valoraciones */}
      <div className="p-6 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Puntuación media */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-gray-800">
              {avgRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(avgRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Basado en {reviews.length} opiniones
            </p>
          </div>

          {/* Distribución de estrellas */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const count = ratingCounts[index];
              const percentage = (count / reviews.length) * 100;

              return (
                <button
                  key={rating}
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-3 group ${
                    filterRating === rating ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="text-sm text-gray-600 w-16 text-left">
                    {rating} estrellas
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filterRating && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Mostrando solo {filterRating} estrellas
            </span>
            <button
              onClick={() => setFilterRating(null)}
              className="text-sm text-primary hover:underline"
            >
              Ver todas
            </button>
          </div>
        )}
      </div>

      {/* Formulario de nueva reseña */}
      {showForm && (
        <div className="p-6 bg-blue-50 border-b border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-4">
            Escribe tu opinión sobre {productName}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Estrellas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu valoración *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || newReview.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newReview.email}
                  onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título de tu opinión *
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                required
                placeholder="Resume tu experiencia en una frase"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tu opinión *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                rows={4}
                placeholder="Cuéntanos tu experiencia con este producto..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={!newReview.rating}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar opinión
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de reseñas */}
      <div className="divide-y divide-gray-100">
        {filteredReviews.map((review) => (
          <div key={review.id} className="p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex-1">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Compra verificada
                    </span>
                  )}
                  <span className="text-sm text-gray-400">
                    {formatDate(review.date)}
                  </span>
                </div>

                {/* Estrellas */}
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Contenido */}
                <h4 className="font-medium text-gray-800 mb-1">
                  {review.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>

                {/* Acciones */}
                <div className="mt-4">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    disabled={helpfulClicked.includes(review.id)}
                    className={`inline-flex items-center gap-2 text-sm transition-colors ${
                      helpfulClicked.includes(review.id)
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {helpfulClicked.includes(review.id) ? "¡Gracias!" : "Útil"} (
                    {review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No hay opiniones con esta valoración
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
