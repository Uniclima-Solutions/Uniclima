/*
 * DESIGN: Notificación de Stock
 * - Modal para suscribirse a alertas
 * - Guarda emails en localStorage (demo)
 * - Animaciones suaves
 */
import { useState } from "react";
import { X, Bell, Mail, CheckCircle } from "lucide-react";

interface StockNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

export default function StockNotification({ 
  isOpen, 
  onClose, 
  productName,
  productId 
}: StockNotificationProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Por favor, introduce un email válido");
      return;
    }

    // Guardar en localStorage (en producción sería una API)
    const notifications = JSON.parse(localStorage.getItem("uniclima_stock_notifications") || "[]");
    const exists = notifications.some((n: any) => n.productId === productId && n.email === email);
    
    if (exists) {
      setError("Ya estás suscrito a las alertas de este producto");
      return;
    }

    notifications.push({
      productId,
      productName,
      email,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("uniclima_stock_notifications", JSON.stringify(notifications));
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
            <Bell className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">Avísame cuando esté disponible</h2>
          <p className="text-white/80 text-sm mt-2">
            Te enviaremos un email cuando el producto vuelva a estar en stock
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¡Suscripción confirmada!
              </h3>
              <p className="text-gray-600 text-sm">
                Te avisaremos cuando "{productName}" esté disponible
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Producto:</span>{" "}
                  {productName}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Activar alerta
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Solo te enviaremos un email cuando el producto esté disponible. 
                  Puedes cancelar en cualquier momento.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
