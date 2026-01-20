/**
 * Componente JsonLd para Schema.org structured data
 * Mejora el SEO y la visibilidad en buscadores
 */

import Script from 'next/script';

// Tipos de Schema
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }[];
}

export interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  mpn?: string;
  brand?: {
    "@type": "Brand";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    url?: string;
    priceCurrency?: string;
    price?: number;
    priceValidUntil?: string;
    availability?: string;
    seller?: {
      "@type": "Organization";
      name: string;
    };
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness" | "Store" | "HVACBusiness";
  name: string;
  url: string;
  logo?: string;
  image?: string;
  description?: string;
  telephone?: string;
  email?: string;
  priceRange?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  sameAs?: string[];
}

export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description?: string;
  provider?: {
    "@type": "Organization";
    name: string;
  };
  serviceType?: string;
  areaServed?: string | {
    "@type": "Country" | "State" | "City";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    price?: number;
    priceCurrency?: string;
  };
}

export interface CollectionPageSchema {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description?: string;
  url?: string;
  mainEntity?: {
    "@type": "ItemList";
    itemListElement: {
      "@type": "ListItem";
      position: number;
      name: string;
      url?: string;
    }[];
  };
}

// Tipo unión para todos los schemas
type SchemaType = 
  | OrganizationSchema 
  | WebSiteSchema 
  | BreadcrumbSchema 
  | ProductSchema 
  | LocalBusinessSchema 
  | FAQSchema 
  | ServiceSchema
  | CollectionPageSchema;

interface JsonLdProps {
  data: SchemaType | SchemaType[];
}

/**
 * Componente que renderiza JSON-LD structured data
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

// Schemas predefinidos para Uniclima

export const UNICLIMA_ORGANIZATION: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uniclima Solutions",
  url: "https://uniclima.es",
  logo: "https://uniclima.es/images/logo.png",
  description: "Especialistas en repuestos de calderas y aire acondicionado. Componentes originales y compatibles con envío en 24-48h.",
  telephone: "+34912345678",
  email: "info@uniclima.es",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressRegion: "Madrid",
    addressCountry: "ES"
  },
  sameAs: [
    "https://www.facebook.com/uniclima",
    "https://www.instagram.com/uniclima",
    "https://www.linkedin.com/company/uniclima"
  ]
};

export const UNICLIMA_WEBSITE: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uniclima Solutions",
  url: "https://uniclima.es",
  description: "Tienda online de repuestos de calderas y aire acondicionado",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://uniclima.es/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const UNICLIMA_LOCAL_BUSINESS: LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Uniclima Solutions",
  url: "https://uniclima.es",
  logo: "https://uniclima.es/images/logo.png",
  image: "https://uniclima.es/images/tienda.jpg",
  description: "Especialistas en repuestos de calderas y aire acondicionado. Servicio técnico y contratos de mantenimiento.",
  telephone: "+34912345678",
  email: "info@uniclima.es",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressRegion: "Madrid",
    postalCode: "28001",
    addressCountry: "ES"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  sameAs: [
    "https://www.facebook.com/uniclima",
    "https://www.instagram.com/uniclima"
  ]
};

// Funciones helper para crear schemas

export function createBreadcrumbSchema(items: { name: string; url?: string }[]): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url })
    }))
  };
}

export function createProductSchema(product: {
  name: string;
  description?: string;
  image?: string;
  sku?: string;
  brand?: string;
  price?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    ...(product.brand && {
      brand: {
        "@type": "Brand",
        name: product.brand
      }
    }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price,
        availability: `https://schema.org/${product.availability || 'InStock'}`,
        seller: {
          "@type": "Organization",
          name: "Uniclima Solutions"
        }
      }
    })
  };
}

export function createCollectionPageSchema(
  name: string,
  description: string,
  url: string,
  items: { name: string; url?: string }[]
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(item.url && { url: item.url })
      }))
    }
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function createServiceSchema(service: {
  name: string;
  description?: string;
  serviceType?: string;
  price?: number;
}): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      "@type": "Organization",
      name: "Uniclima Solutions"
    },
    areaServed: {
      "@type": "Country",
      name: "España"
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "EUR"
      }
    })
  };
}

export default JsonLd;
