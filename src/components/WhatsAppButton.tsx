import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const phoneNumber = "34911177777"; // Número de Uniclima sin espacios ni guiones
  const message = "Hola, me gustaría obtener información sobre repuestos de climatización.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button 
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-700 mb-3">
            ¿Necesitas ayuda? Escríbenos por WhatsApp y te atenderemos al momento.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Iniciar chat
          </a>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        className="group flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Pulse animation */}
        <span className="absolute w-14 h-14 rounded-full bg-green-500 animate-ping opacity-30" />
      </a>

      {/* Label */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span className="text-xs font-medium text-gray-700">WhatsApp</span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
      </div>
    </div>
  );
}
