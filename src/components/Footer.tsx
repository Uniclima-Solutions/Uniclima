'use client'

/*
 * FOOTER - Colores corporativos (naranja/azul) sin saturar
 * - Fondo azul oscuro suave
 * - Acentos naranjas sutiles
 * - Ancho completo (full width)
 * - Diseño profesional y limpio
 */

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-800">
      {/* Sección principal */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Columna 1: Logo y descripción */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-white font-semibold text-lg">Uniclima</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Especialistas en repuestos para calderas y aire acondicionado. 
                Más de 10 años de experiencia al servicio de profesionales y particulares.
              </p>
              {/* Redes sociales */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://instagram.com/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a 
                  href="https://youtube.com/@uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a 
                  href="https://facebook.com/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a 
                  href="https://linkedin.com/company/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Columna 2: Productos */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Productos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tienda/repuestos/calderas" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Repuestos de Calderas
                  </Link>
                </li>
                <li>
                  <Link href="/tienda/repuestos/aire-acondicionado" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Repuestos de Aire Acondicionado
                  </Link>
                </li>
                <li>
                  <Link href="/calderas-completas" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Calderas Completas
                  </Link>
                </li>
                <li>
                  <Link href="/contrato-mantenimiento" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Contratos de Mantenimiento
                  </Link>
                </li>
                <li>
                  <Link href="/marcas" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Marcas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Información */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Información
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/sobre-nosotros" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/envios" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Envíos y Entregas
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/garantia" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Garantía
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/zona-profesionales" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    Zona Profesionales
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="tel:912345678" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                      912 345 678
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@uniclima.es" className="text-slate-300 hover:text-orange-400 text-sm transition-colors">
                    info@uniclima.es
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    Madrid, España
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    Lun - Vie: 9:00 - 18:00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de beneficios */}
      <div className="w-full bg-slate-700/50 border-t border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="text-orange-400">✓</span> Envío gratis +120€
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-400">✓</span> Entrega 24-48h
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-400">✓</span> Garantía 1 año
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-400">✓</span> Devoluciones gratis
            </span>
          </div>
        </div>
      </div>

      {/* Copyright y legales */}
      <div className="w-full bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-400 text-xs">
              © 2026 Uniclima Solutions. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link href="/aviso-legal" className="text-slate-400 hover:text-orange-400 transition-colors">
                Aviso Legal
              </Link>
              <Link href="/privacidad" className="text-slate-400 hover:text-orange-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-orange-400 transition-colors">
                Cookies
              </Link>
              <Link href="/condiciones-uso" className="text-slate-400 hover:text-orange-400 transition-colors">
                Condiciones de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
