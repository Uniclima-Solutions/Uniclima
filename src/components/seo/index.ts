/**
 * Componentes SEO/GEO para Uniclima Solutions
 * 
 * Estos componentes implementan las directrices SEO/GEO definidas en:
 * /docs/SEO_GEO_GUIDELINES.md
 * 
 * Uso:
 * import { Breadcrumb, ProductSchema, FAQSchema, CollectionSchema } from '@/components/seo';
 */

export { default as Breadcrumb } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';

export { default as ProductSchema } from './ProductSchema';
export type { ProductSchemaData } from './ProductSchema';

export { default as FAQSchema } from './FAQSchema';
export type { FAQ } from './FAQSchema';

export { default as CollectionSchema } from './CollectionSchema';
export type { CollectionData, CollectionItem } from './CollectionSchema';
