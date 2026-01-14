/*
 * DESIGN: Chat en Vivo
 * - Widget flotante
 * - Formulario de inicio
 * - Simulación de chat
 * - Respuestas automáticas básicas
 * - Cierre al pinchar fuera
 */
import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

const autoResponses: { [key: string]: string } = {
  "hola": "¡Hola! Bienvenido al chat de Uniclima Solutions. ¿En qué puedo ayudarte hoy?",
  "precio": "Para consultar precios específicos, te recomiendo buscar el producto en nuestra web o indicarme la referencia exacta.",
  "envio": "Realizamos envíos en 24-48h a toda España. El envío es gratuito para pedidos superiores a 50€.",
  "devolucion": "Dispones de 30 días para devolver cualquier producto. Contacta con nosotros y te enviaremos una etiqueta de devolución.",
  "garantia": "Todos nuestros productos tienen garantía mínima de 2 años según la legislación vigente.",
  "horario": "Nuestro horario de atención es de Lunes a Viernes de 9:00 a 18:00h.",
  "telefono": "Puedes llamarnos al 91 117 77 77 de Lunes a Viernes de 9:00 a 18:00h.",
  "default": "Gracias por tu mensaje. Un agente te responderá en breve. Si es urgente, puedes llamarnos al 91 117 77 77."
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cerrar al pinchar fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        // No cerrar si está minimizado o si el usuario está en medio de una conversación
        if (isOpen && !isMinimized) {
          setIsMinimized(true);
        }
      }
    };

    if (isOpen) {
      // Pequeño delay para evitar que se cierre inmediatamente al abrir
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, isMinimized]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setStarted(true);
    setMessages([
      {
        id: "welcome",
        text: `¡Hola ${name}! Soy Ana del equipo de Uniclima Solutions. ¿En qué puedo ayudarte hoy?`,
        sender: "agent",
        timestamp: new Date()
      }
    ]);
  };

  const getAutoResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (keyword !== "default" && lowerText.includes(keyword)) {
        return response;
      }
    }
    return autoResponses.default;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular respuesta del agente
    setTimeout(() => {
      const response = getAutoResponse(inputValue);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "agent",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            ¿Necesitas ayuda?
          </span>
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div
          ref={chatRef}
          className={`fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized
              ? "bottom-6 right-6 w-72 h-14"
              : "bottom-6 right-6 w-[360px] h-[500px] max-h-[80vh]"
          }`}
        >
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between cursor-pointer"
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Chat en vivo</h3>
                <p className="text-xs text-white/80">
                  {isMinimized ? "Haz clic para expandir" : "Normalmente respondemos en minutos"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <>
              {!started ? (
                /* Formulario de inicio */
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      ¡Hola! 👋
                    </h4>
                    <p className="text-sm text-gray-600">
                      Introduce tus datos para iniciar el chat
                    </p>
                  </div>

                  <form onSubmit={handleStart} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="¿Cómo te llamas?"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (opcional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Iniciar chat
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Tiempo de respuesta: ~2 min</span>
                  </div>
                </div>
              ) : (
                /* Chat activo */
                <>
                  <div className="flex-1 overflow-y-auto p-4 h-[340px] space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] ${
                            msg.sender === "user"
                              ? "bg-primary text-white rounded-2xl rounded-br-md"
                              : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md"
                          } px-4 py-2.5`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === "user" ? "text-white/70" : "text-gray-400"
                            }`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSend} className="p-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="w-11 h-11 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
