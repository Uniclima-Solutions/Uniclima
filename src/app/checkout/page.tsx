'use client'

/*
 * CHECKOUT PAGE - Página de finalizar compra
 * - Resumen del pedido
 * - Formulario de datos de envío
 * - Métodos de pago
 * - Diseño profesional con colores corporativos
 */

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  Package,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState(1);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    addressExtra: '',
    postalCode: '',
    city: '',
    province: '',
    notes: '',
    paymentMethod: 'card',
    saveInfo: true,
    newsletter: false
  });

  const shippingCost = totalPrice >= 120 ? 0 : 5.95;
  const totalWithShipping = totalPrice + shippingCost;

  // Autocompletado de direcciones
  const [addressSuggestions, setAddressSuggestions] = useState<Array<{display: string, street: string, city: string, postalCode: string, province: string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Base de datos simulada de direcciones españolas
  const spanishAddresses = [
    { street: 'Calle Gran Vía, 1', city: 'Madrid', postalCode: '28013', province: 'madrid' },
    { street: 'Calle Gran Vía, 25', city: 'Madrid', postalCode: '28013', province: 'madrid' },
    { street: 'Calle Serrano, 50', city: 'Madrid', postalCode: '28001', province: 'madrid' },
    { street: 'Calle Alcalá, 100', city: 'Madrid', postalCode: '28009', province: 'madrid' },
    { street: 'Paseo de la Castellana, 200', city: 'Madrid', postalCode: '28046', province: 'madrid' },
    { street: 'Calle Velázquez, 75', city: 'Madrid', postalCode: '28006', province: 'madrid' },
    { street: 'Calle Goya, 30', city: 'Madrid', postalCode: '28001', province: 'madrid' },
    { street: 'Passeig de Gràcia, 50', city: 'Barcelona', postalCode: '08007', province: 'barcelona' },
    { street: 'La Rambla, 100', city: 'Barcelona', postalCode: '08002', province: 'barcelona' },
    { street: 'Avinguda Diagonal, 500', city: 'Barcelona', postalCode: '08006', province: 'barcelona' },
    { street: 'Calle Colón, 20', city: 'Valencia', postalCode: '46004', province: 'valencia' },
    { street: 'Avenida del Puerto, 100', city: 'Valencia', postalCode: '46023', province: 'valencia' },
    { street: 'Calle Sierpes, 50', city: 'Sevilla', postalCode: '41004', province: 'sevilla' },
    { street: 'Avenida de la Constitución, 25', city: 'Sevilla', postalCode: '41001', province: 'sevilla' },
    { street: 'Calle Larios, 10', city: 'Málaga', postalCode: '29015', province: 'malaga' },
    { street: 'Paseo del Parque, 1', city: 'Málaga', postalCode: '29015', province: 'malaga' },
    { street: 'Gran Vía de Don Diego López de Haro, 50', city: 'Bilbao', postalCode: '48011', province: 'bilbao' },
    { street: 'Calle Alfonso I, 30', city: 'Zaragoza', postalCode: '50003', province: 'zaragoza' },
    { street: 'Calle Mayor, 15', city: 'Murcia', postalCode: '30001', province: 'murcia' },
    { street: 'Paseo Marítimo, 100', city: 'Palma de Mallorca', postalCode: '07014', province: 'palma' },
    { street: 'Rambla Méndez Núñez, 20', city: 'Alicante', postalCode: '03002', province: 'alicante' },
  ];

  // Buscar sugerencias de dirección
  const searchAddresses = (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const filtered = spanishAddresses
      .filter(addr => 
        addr.street.toLowerCase().includes(query.toLowerCase()) ||
        addr.city.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(addr => ({
        display: `${addr.street}, ${addr.city}`,
        street: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
        province: addr.province
      }));
    
    setAddressSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  // Seleccionar una dirección sugerida
  const selectAddress = (suggestion: typeof addressSuggestions[0]) => {
    setFormData(prev => ({
      ...prev,
      address: suggestion.street,
      city: suggestion.city,
      postalCode: suggestion.postalCode,
      province: suggestion.province
    }));
    setShowSuggestions(false);
  };

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addressInputRef.current && !addressInputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-6">Añade productos para continuar con la compra</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb / Steps */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600">Tienda</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Finalizar compra</span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Columna izquierda - Formulario */}
          <div className="lg:col-span-7">
            {/* Resumen móvil colapsable */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Ver resumen del pedido</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{totalWithShipping.toFixed(2)}€</span>
                  {showOrderSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              
              {showOrderSummary && (
                <div className="mt-2 p-4 bg-white rounded-xl border border-gray-200">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información de contacto */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Información de contacto</h2>
                  <p className="text-sm text-gray-500">Te enviaremos la confirmación del pedido</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="612 345 678"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Dirección de envío</h2>
                  <p className="text-sm text-gray-500">¿Dónde enviamos tu pedido?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Juan"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="García López"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Empresa (opcional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de la empresa"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      
                    />
                  </div>
                </div>
                <div className="sm:col-span-2" ref={addressInputRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dirección *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={(e) => {
                        handleInputChange(e);
                        searchAddresses(e.target.value);
                      }}
                      onFocus={() => formData.address.length >= 3 && searchAddresses(formData.address)}
                      placeholder="Escribe tu calle y se autocompletará..."
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      
                      autoComplete="off"
                    />
                    {/* Dropdown de sugerencias */}
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                        {addressSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => selectAddress(suggestion)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{suggestion.street}</p>
                              <p className="text-xs text-gray-500">{suggestion.postalCode} {suggestion.city}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Escribe al menos 3 caracteres para ver sugerencias</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Código postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="28001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Madrid"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Provincia *
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    
                  >
                    <option value="">Selecciona provincia</option>
                    <option value="madrid">Madrid</option>
                    <option value="barcelona">Barcelona</option>
                    <option value="valencia">Valencia</option>
                    <option value="sevilla">Sevilla</option>
                    <option value="zaragoza">Zaragoza</option>
                    <option value="malaga">Málaga</option>
                    <option value="murcia">Murcia</option>
                    <option value="palma">Palma de Mallorca</option>
                    <option value="bilbao">Bilbao</option>
                    <option value="alicante">Alicante</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notas del pedido (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales para la entrega..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                    
                  />
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Método de pago</h2>
                  <p className="text-sm text-gray-500">Pago 100% seguro y encriptado</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-green-600">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-medium">SSL</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Tarjeta */}
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Tarjeta de crédito/débito</p>
                    <p className="text-sm text-gray-500">Pago instantáneo y seguro</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Visa Logo */}
                    <svg className="h-8" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                      <path d="M19.5 21H17L18.9 11H21.4L19.5 21ZM15.3 11L12.9 17.9L12.6 16.5L11.7 12C11.7 12 11.6 11 10.3 11H6.1L6 11.2C6 11.2 7.5 11.5 9.2 12.5L11.4 21H14L18 11H15.3ZM35 21H37.5L35.4 11H33.3C32.2 11 32 11.8 32 11.8L28 21H30.7L31.3 19.3H34.5L35 21ZM32 17.2L33.4 13.4L34.2 17.2H32ZM28.5 13.7L28.9 11.3C28.9 11.3 27.6 10.8 26.2 10.8C24.7 10.8 21.3 11.5 21.3 14.5C21.3 17.3 25.2 17.3 25.2 18.8C25.2 20.3 21.7 19.9 20.5 19L20.1 21.5C20.1 21.5 21.4 22 23.3 22C25.2 22 28.5 20.9 28.5 18.2C28.5 15.4 24.5 15.1 24.5 13.9C24.5 12.7 27.2 12.9 28.5 13.7Z" fill="white"/>
                    </svg>
                    {/* Mastercard Logo */}
                    <svg className="h-8" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
                      <circle cx="19" cy="16" r="8" fill="#EB001B"/>
                      <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
                      <path d="M24 10.5C25.8 12 27 14.3 27 16.8C27 19.3 25.8 21.6 24 23.1C22.2 21.6 21 19.3 21 16.8C21 14.3 22.2 12 24 10.5Z" fill="#FF5F00"/>
                    </svg>
                    {/* Amex Logo */}
                    <svg className="h-8" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#006FCF"/>
                      <path d="M8 16L10 12H14L15 14L16 12H20L18 16L20 20H16L15 18L14 20H10L8 16Z" fill="white"/>
                      <path d="M22 12H28L29 13V15L28 16L29 17V19L28 20H22V12ZM24 14V15.5H27V14H24ZM24 17V18.5H27V17H24Z" fill="white"/>
                      <path d="M31 12H37L38 13V15L37 16L38 17V19L37 20H31V12ZM33 14V15.5H36V14H33ZM33 17V18.5H36V17H33Z" fill="white"/>
                    </svg>
                  </div>
                </label>

                {/* PayPal */}
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">PayPal</p>
                    <p className="text-sm text-gray-500">Paga con tu cuenta PayPal</p>
                  </div>
                  {/* PayPal Logo */}
                  <svg className="h-8" viewBox="0 0 80 32" fill="none">
                    <path d="M28.5 6H22.5C22 6 21.6 6.4 21.5 6.9L19 22.4C19 22.7 19.2 23 19.5 23H22.3C22.6 23 22.9 22.8 22.9 22.5L23.5 18.6C23.6 18.1 24 17.7 24.5 17.7H26.5C30.3 17.7 32.5 15.8 33.1 12.2C33.4 10.6 33.1 9.3 32.4 8.4C31.5 7.3 30.2 6 28.5 6ZM29.2 12.4C28.9 14.5 27.3 14.5 25.8 14.5H24.9L25.5 10.8C25.5 10.6 25.7 10.4 25.9 10.4H26.3C27.3 10.4 28.3 10.4 28.8 11C29.1 11.4 29.3 11.8 29.2 12.4Z" fill="#253B80"/>
                    <path d="M44.5 12.3H41.7C41.5 12.3 41.3 12.5 41.3 12.7L41.1 13.7L40.9 13.4C40.3 12.5 38.9 12.2 37.5 12.2C34.2 12.2 31.4 14.7 30.9 18.2C30.6 20 31 21.7 32 22.9C32.9 24 34.2 24.5 35.7 24.5C38.3 24.5 39.7 22.8 39.7 22.8L39.5 23.8C39.5 24.1 39.7 24.4 40 24.4H42.5C43 24.4 43.4 24 43.5 23.5L45 12.9C45 12.6 44.8 12.3 44.5 12.3ZM40.5 18.3C40.2 20 38.9 21.2 37.2 21.2C36.3 21.2 35.6 20.9 35.2 20.4C34.8 19.9 34.6 19.2 34.7 18.4C35 16.7 36.3 15.5 38 15.5C38.9 15.5 39.6 15.8 40 16.3C40.5 16.9 40.6 17.6 40.5 18.3Z" fill="#253B80"/>
                    <path d="M58 12.3H55.2C54.9 12.3 54.7 12.5 54.5 12.7L50.5 18.7L48.8 13C48.7 12.6 48.3 12.3 47.9 12.3H45.2C44.8 12.3 44.6 12.7 44.7 13.1L47.8 22.2L44.9 26.3C44.7 26.7 45 27.2 45.4 27.2H48.2C48.5 27.2 48.7 27 48.9 26.8L58.5 13.1C58.7 12.7 58.4 12.3 58 12.3Z" fill="#253B80"/>
                    <path d="M66.5 6H60.5C60 6 59.6 6.4 59.5 6.9L57 22.4C57 22.7 57.2 23 57.5 23H60.5C60.8 23 61.1 22.7 61.1 22.4L61.7 18.6C61.8 18.1 62.2 17.7 62.7 17.7H64.7C68.5 17.7 70.7 15.8 71.3 12.2C71.6 10.6 71.3 9.3 70.6 8.4C69.7 7.3 68.2 6 66.5 6ZM67.2 12.4C66.9 14.5 65.3 14.5 63.8 14.5H62.9L63.5 10.8C63.5 10.6 63.7 10.4 63.9 10.4H64.3C65.3 10.4 66.3 10.4 66.8 11C67.1 11.4 67.3 11.8 67.2 12.4Z" fill="#179BD7"/>
                  </svg>
                </label>

                {/* Bizum */}
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'bizum' ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bizum"
                    checked={formData.paymentMethod === 'bizum'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Bizum</p>
                    <p className="text-sm text-gray-500">Pago instantáneo desde tu móvil</p>
                  </div>
                  {/* Bizum Logo */}
                  <svg className="h-8" viewBox="0 0 80 32" fill="none">
                    <rect width="80" height="32" rx="4" fill="#05C3DD"/>
                    <path d="M15 10H20L22 14L20 18H15L17 14L15 10Z" fill="white"/>
                    <path d="M25 10H27V22H25V10Z" fill="white"/>
                    <path d="M30 10H37V12H32V15H36V17H32V20H37V22H30V10Z" fill="white"/>
                    <path d="M40 10H47V12H42V15H46V17H42V20H47V22H40V10Z" fill="white"/>
                    <path d="M50 10H52V15L56 10H59L55 15L59 22H56L53 17L52 18V22H50V10Z" fill="white"/>
                    <path d="M61 10H63V22H61V10Z" fill="white"/>
                    <path d="M66 10H68L72 18V10H74V22H72L68 14V22H66V10Z" fill="white"/>
                  </svg>
                </label>

                {/* Transferencia */}
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Transferencia bancaria</p>
                    <p className="text-sm text-gray-500">Recibirás los datos por email</p>
                  </div>
                  <Building className="w-8 h-8 text-gray-400" />
                </label>

                {/* Contrareembolso */}
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Contrareembolso</p>
                    <p className="text-sm text-gray-500">Paga al recibir tu pedido (+3,50€)</p>
                  </div>
                  <Truck className="w-8 h-8 text-gray-400" />
                </label>
              </div>

              {/* Garantías de pago */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Encriptación SSL</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Protección al comprador</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 text-orange-500 focus:ring-orange-500 rounded"
                />
                <span className="text-sm text-gray-600">Guardar mi información para futuras compras</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 text-orange-500 focus:ring-orange-500 rounded"
                />
                <span className="text-sm text-gray-600">Suscribirme a la newsletter para recibir ofertas exclusivas</span>
              </label>
            </div>

            {/* Botón confirmar - Mobile */}
            <div className="lg:hidden">
              <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-colors flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Confirmar pedido · {totalWithShipping.toFixed(2)}€
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Al confirmar, aceptas nuestros <Link href="/condiciones" className="text-orange-500 hover:underline">términos y condiciones</Link>
              </p>
            </div>
          </div>

          {/* Columna derecha - Resumen del pedido (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del pedido</h2>
                
                {/* Lista de productos */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                        <p className="text-xs text-gray-500">{item.product.reference}</p>
                      </div>
                      <span className="font-semibold text-gray-900">{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                {/* Código descuento */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    
                  />
                  <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm">
                    Aplicar
                  </button>
                </div>

                {/* Totales */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    {shippingCost === 0 ? (
                      <span className="font-medium text-green-600">Gratis</span>
                    ) : (
                      <span className="font-medium">{shippingCost.toFixed(2)}€</span>
                    )}
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span className="text-orange-600">{totalWithShipping.toFixed(2)}€</span>
                  </div>
                  <p className="text-xs text-gray-500">IVA incluido</p>
                </div>

                {/* Botón confirmar */}
                <button className="w-full mt-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Confirmar pedido
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Al confirmar, aceptas nuestros <Link href="/condiciones" className="text-orange-500 hover:underline">términos y condiciones</Link>
                </p>

                {/* Garantías */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Garantía de 2 años en todos los productos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Entrega en 24-48 horas laborables</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Devolución gratuita en 30 días</span>
                  </div>
                </div>
              </div>

              {/* Métodos de pago aceptados */}
              <div className="mt-4 flex items-center justify-center gap-3 text-gray-400">
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium">VISA</span>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium">Mastercard</span>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium">PayPal</span>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium">Bizum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
