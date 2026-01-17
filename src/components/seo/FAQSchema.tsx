/**
 * Componente FAQSchema - Genera JSON-LD y HTML para FAQs
 * Siguiendo las directrices SEO/GEO de Uniclima Solutions
 * 
 * Uso:
 * <FAQSchema 
 *   faqs={[
 *     { question: '¿Es compatible con mi equipo?', answer: 'Sí, es compatible con...' },
 *     { question: '¿Tiene garantía?', answer: 'Todos nuestros productos incluyen...' }
 *   ]}
 *   showHTML={true}
 * />
 */

'use client';

import { useState } from 'react';
import Script from 'next/script';
import { ChevronDown } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  showHTML?: boolean;
  title?: string;
  className?: string;
}

export default function FAQSchema({ 
  faqs, 
  showHTML = true, 
  title = 'Preguntas frecuentes',
  className = '' 
}: FAQSchemaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generar schema JSON-LD para FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Schema JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* HTML visual (opcional) */}
      {showHTML && (
        <section className={`${className}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {title}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="p-4 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
