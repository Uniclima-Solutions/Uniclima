/**
 * Componente CollectionSchema - Genera JSON-LD para páginas de categoría/colección
 * Siguiendo las directrices SEO/GEO de Uniclima Solutions
 * 
 * Uso:
 * <CollectionSchema 
 *   collection={{
 *     name: 'Placas Electrónicas para Calderas',
 *     description: 'Encuentra placas electrónicas originales y compatibles...',
 *     url: '/c/calderas/placas-electronicas',
 *     image: '/images/categorias/placas.webp',
 *     itemCount: 245
 *   }}
 *   items={[
 *     { name: 'Placa Junkers Cerapur', url: '/p/placa-junkers-cerapur', position: 1 },
 *     ...
 *   ]}
 * />
 */

import Script from 'next/script';

export interface CollectionItem {
  name: string;
  url: string;
  position: number;
  image?: string;
}

export interface CollectionData {
  name: string;
  description: string;
  url: string;
  image?: string;
  itemCount?: number;
}

interface CollectionSchemaProps {
  collection: CollectionData;
  items?: CollectionItem[];
}

export default function CollectionSchema({ collection, items = [] }: CollectionSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "description": collection.description,
    "url": `https://uniclima.es${collection.url}`,
    ...(collection.image && { "image": `https://uniclima.es${collection.image}` }),
    ...(collection.itemCount && { "numberOfItems": collection.itemCount }),
    "isPartOf": {
      "@type": "WebSite",
      "name": "Uniclima Solutions",
      "url": "https://uniclima.es"
    },
    ...(items.length > 0 && {
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": items.length,
        "itemListElement": items.map(item => ({
          "@type": "ListItem",
          "position": item.position,
          "name": item.name,
          "url": `https://uniclima.es${item.url}`,
          ...(item.image && { "image": `https://uniclima.es${item.image}` })
        }))
      }
    })
  };

  return (
    <Script
      id="collection-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
