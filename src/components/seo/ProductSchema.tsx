/**
 * Componente ProductSchema - Genera JSON-LD para productos
 * Siguiendo las directrices SEO/GEO de Uniclima Solutions
 * 
 * Uso:
 * <ProductSchema 
 *   product={{
 *     name: 'Placa electrónica Junkers Cerapur',
 *     description: 'Placa de control para calderas Junkers Cerapur',
 *     sku: '87483002760',
 *     brand: 'Junkers',
 *     price: 189.90,
 *     image: '/images/productos/placa-junkers.webp',
 *     inStock: true,
 *     rating: 4.5,
 *     reviewCount: 23
 *   }}
 * />
 */

import Script from 'next/script';

export interface ProductSchemaData {
  name: string;
  description: string;
  sku: string;
  mpn?: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  inStock: boolean;
  condition?: 'NewCondition' | 'RefurbishedCondition' | 'UsedCondition';
  rating?: number;
  reviewCount?: number;
  category?: string;
  url?: string;
}

interface ProductSchemaProps {
  product: ProductSchemaData;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images && product.images.length > 0 
      ? product.images.map(img => `https://uniclima.es${img}`)
      : `https://uniclima.es${product.image}`,
    "sku": product.sku,
    ...(product.mpn && { "mpn": product.mpn }),
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    ...(product.category && {
      "category": product.category
    }),
    "offers": {
      "@type": "Offer",
      "url": product.url || `https://uniclima.es/p/${product.sku}`,
      "price": product.price.toFixed(2),
      "priceCurrency": "EUR",
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "itemCondition": product.condition 
        ? `https://schema.org/${product.condition}`
        : "https://schema.org/RefurbishedCondition",
      "seller": {
        "@type": "Organization",
        "name": "Uniclima Solutions"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "ES"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "ES",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    ...(product.rating && product.reviewCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toFixed(1),
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": product.reviewCount
      }
    })
  };

  return (
    <Script
      id={`product-schema-${product.sku}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
