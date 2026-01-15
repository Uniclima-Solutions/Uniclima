'use client'

/*
 * FOOTER PREMIUM - Diseño atractivo con acordeones en móvil
 * - Más información y secciones
 * - Acordeones colapsables en móvil
 * - Colores corporativos naranja
 * - Newsletter y métodos de pago
 */

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, Linkedin,
  ChevronDown, CreditCard, Truck, Shield, Headphones, Award
} from 'lucide-react';

// Componente Acordeón para móvil
function FooterAccordion({ 
  title, 
  children, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-700 lg:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 lg:py-0 lg:cursor-default"
      >
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
          {title}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 lg:hidden transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 lg:overflow-visible lg:max-h-none ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'} lg:mt-4`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-gradient-to-b from-slate-800 to-slate-900">
      
      {/* Barra de beneficios superior */}
      <div className="w-full bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 text-white">
              <Truck className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Envío Gratis</p>
                <p className="text-xs text-orange-100">Pedidos +120€</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Entrega Rápida</p>
                <p className="text-xs text-orange-100">24-48 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Garantía</p>
                <p className="text-xs text-orange-100">1 año en todo</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Headphones className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Soporte Técnico</p>
                <p className="text-xs text-orange-100">Expertos HVAC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="w-full bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg">Suscríbete a nuestra newsletter</h3>
              <p className="text-slate-400 text-sm">Recibe ofertas exclusivas y novedades del sector</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Tu email..."
                className="flex-1 md:w-64 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange-500"
                
              />
              <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-colors">
                Suscribir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal con acordeones */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8">
            
            {/* Columna 1: Logo y descripción (siempre visible) */}
            <div className="space-y-4 pb-6 lg:pb-0 border-b border-slate-700 lg:border-0 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">U</span>
                </div>
                <div>
                  <span className="text-white font-bold text-xl">Uniclima</span>
                  <p className="text-orange-400 text-xs font-medium">Repuestos HVAC</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Especialistas en repuestos para calderas y aire acondicionado. 
                Más de 10 años al servicio de profesionales y particulares.
              </p>
              
              {/* Redes sociales */}
              <div className="flex items-center gap-2 pt-2">
                <a 
                  href="https://instagram.com/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://youtube.com/@uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://facebook.com/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://linkedin.com/company/uniclimasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Columna 2: Productos (Acordeón en móvil) */}
            <FooterAccordion 
              title="Productos" 
              isOpen={openSection === 'productos'}
              onToggle={() => toggleSection('productos')}
            >
              <ul className="space-y-2.5">
                <li>
                  <Link href="/tienda/repuestos/calderas" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Repuestos de Calderas
                  </Link>
                </li>
                <li>
                  <Link href="/tienda/repuestos/aire-acondicionado" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Repuestos de Aire Acondicionado
                  </Link>
                </li>
                <li>
                  <Link href="/calderas-completas" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Calderas Completas
                  </Link>
                </li>
                <li>
                  <Link href="/aires-acondicionados" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Aires Acondicionados
                  </Link>
                </li>
                <li>
                  <Link href="/contrato-mantenimiento" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Contratos de Mantenimiento
                  </Link>
                </li>
                <li>
                  <Link href="/ofertas" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    🔥 Ofertas
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            {/* Columna 3: Servicios (Acordeón en móvil) */}
            <FooterAccordion 
              title="Servicios" 
              isOpen={openSection === 'servicios'}
              onToggle={() => toggleSection('servicios')}
            >
              <ul className="space-y-2.5">
                <li>
                  <Link href="/reparacion-placas" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Reparación de Placas
                  </Link>
                </li>
                <li>
                  <Link href="/instalacion" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Instalación Profesional
                  </Link>
                </li>
                <li>
                  <Link href="/mantenimiento" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Mantenimiento Preventivo
                  </Link>
                </li>
                <li>
                  <Link href="/asistencia-tecnica" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Asistencia Técnica
                  </Link>
                </li>
                <li>
                  <Link href="/zona-profesionales" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Zona Profesionales
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            {/* Columna 4: Ayuda (Acordeón en móvil) */}
            <FooterAccordion 
              title="Ayuda" 
              isOpen={openSection === 'ayuda'}
              onToggle={() => toggleSection('ayuda')}
            >
              <ul className="space-y-2.5">
                <li>
                  <Link href="/sobre-nosotros" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/envios" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Envíos y Entregas
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/garantia" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Garantía
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/marcas" className="text-slate-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Marcas
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            {/* Columna 5: Contacto (Acordeón en móvil) */}
            <FooterAccordion 
              title="Contacto" 
              isOpen={openSection === 'contacto'}
              onToggle={() => toggleSection('contacto')}
            >
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <a href="tel:911177777" className="text-white hover:text-orange-400 font-semibold transition-colors">
                      91 117 77 77
                    </a>
                    <p className="text-slate-500 text-xs">Lun-Vie: 9:00-20:00</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <a href="mailto:info@uniclima.es" className="text-white hover:text-orange-400 font-medium transition-colors text-sm">
                      info@uniclima.es
                    </a>
                    <p className="text-slate-500 text-xs">Respuesta en 24h</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-white text-sm">Madrid, España</span>
                    <p className="text-slate-500 text-xs">Envíos a toda España</p>
                  </div>
                </li>
              </ul>
            </FooterAccordion>
          </div>
        </div>
      </div>

      {/* Métodos de pago y certificaciones */}
      <div className="w-full bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CreditCard className="w-5 h-5" />
              <span>Pago 100% seguro:</span>
              <div className="flex items-center gap-3 ml-2">
                <span className="px-2 py-1 bg-slate-700 rounded text-xs font-medium">VISA</span>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs font-medium">Mastercard</span>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs font-medium">PayPal</span>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs font-medium">Bizum</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Award className="w-4 h-4 text-orange-400" />
                <span>Empresa Certificada</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SSL Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright y legales */}
      <div className="w-full bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              © 2026 Uniclima Solutions S.L. Todos los derechos reservados. CIF: B12345678
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link href="/aviso-legal" className="text-slate-500 hover:text-orange-400 transition-colors">
                Aviso Legal
              </Link>
              <Link href="/privacidad" className="text-slate-500 hover:text-orange-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/cookies" className="text-slate-500 hover:text-orange-400 transition-colors">
                Cookies
              </Link>
              <Link href="/condiciones-uso" className="text-slate-500 hover:text-orange-400 transition-colors">
                Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
