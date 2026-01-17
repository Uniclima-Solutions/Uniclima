# Directrices SEO/GEO para Uniclima Solutions

## Documento de Referencia para Desarrollo de Páginas

Este documento establece las normas obligatorias de SEO y GEO (Generative Engine Optimization) para todas las páginas del ecommerce de Uniclima Solutions.

---

## 1. Principios Fundamentales

### Objetivo
Optimizar el sitio para:
- Google (SEO clásico)
- Motores de respuesta IA (ChatGPT, Gemini, Perplexity)
- Conversión comercial sin lenguaje agresivo

### Reglas Generales
- **NO inventar** compatibilidades ni datos técnicos
- **NO usar** lenguaje comercial agresivo
- **NO repetir** estructuras de forma mecánica
- Usar lenguaje técnico, claro y humano
- Pensar siempre en "responder preguntas reales"

---

## 2. Estructura de URLs (Slugs)

### Reglas Obligatorias
- Minúsculas
- Sin IDs numéricos
- Sin caracteres especiales
- Estructura jerárquica

### Ejemplos de Estructura

```
/c/calderas                                    → Categoría principal
/c/calderas/placas-electronicas                → Subcategoría (tipo de repuesto)
/c/calderas/placas-electronicas/junkers        → Filtro por marca
/p/placa-electronica-junkers-cerapur-87483002760  → Ficha de producto
```

### Estructura Alternativa (SEO Avanzado)
```
/repuestos-calderas/placa-electronica/baxi/neodens-plus
```

---

## 3. Naming de Productos (CRÍTICO)

### Formato Obligatorio
```
[TIPO DE PRODUCTO] + [MARCA] + [MODELO] – [ATRIBUTO CLAVE]
```

### Ejemplos
- `Placa electrónica Baxi Neodens Plus – Repuesto original reacondicionado`
- `Válvula de gas Junkers Cerapur – Honeywell VK4105M`
- `Intercambiador de placas Vaillant Ecotec – 12 placas`

---

## 4. Campos SEO Obligatorios por Página

### Para Páginas de Producto
| Campo | Descripción |
|-------|-------------|
| `slug` | URL amigable sin IDs |
| `meta_title` | Máx 60 caracteres, incluir marca y tipo |
| `meta_description` | Máx 155 caracteres, incluir beneficio principal |
| `h1` | Nombre completo del producto (formato naming) |
| `contenido_html` | Mínimo 700 palabras si el producto lo permite |
| `faq_html` | Preguntas frecuentes específicas del producto |
| `schema_product_json` | Schema.org Product |
| `schema_faq_json` | Schema.org FAQPage |

### Para Páginas de Categoría
| Campo | Descripción |
|-------|-------------|
| `slug` | URL jerárquica |
| `meta_title` | Incluir categoría y marca si aplica |
| `meta_description` | Describir qué encontrará el usuario |
| `h1` | Nombre de categoría + contexto |
| `contenido_intro` | 150-300 palabras de introducción |
| `schema_collection_json` | Schema.org CollectionPage |

---

## 5. Estructura HTML Obligatoria para Fichas de Producto

```html
<h1>Nombre completo del producto</h1>

<p><strong>Resumen claro en 3–4 líneas</strong> explicando qué es el producto,
para qué sirve y con qué modelos es compatible.</p>

<h2>¿Para qué sirve este repuesto?</h2>
<p>Explicación clara y técnica en lenguaje humano.</p>

<h2>Compatibilidad confirmada</h2>
<ul>
  <li>Marca + modelo + potencia (si se conoce)</li>
</ul>

<h2>Problemas que soluciona</h2>
<ul>
  <li>Problema real y común</li>
</ul>

<h2>Ventajas de este repuesto</h2>
<ul>
  <li>Repuesto probado y verificado</li>
  <li>Ahorro frente a pieza nueva</li>
  <li>Garantía incluida</li>
</ul>

<h2>Información técnica relevante</h2>
<ul>
  <li>Tipo de componente</li>
  <li>Función dentro del equipo</li>
  <li>Recomendaciones de instalación</li>
</ul>

<h2>Preguntas frecuentes</h2>

<h3>¿Es compatible con mi equipo?</h3>
<p>Respuesta directa y honesta.</p>

<h3>¿Es un repuesto original?</h3>
<p>Respuesta clara.</p>

<h3>¿Tiene garantía?</h3>
<p>Respuesta clara.</p>

<h3>¿Quién debería instalarlo?</h3>
<p>Respuesta responsable.</p>
```

### Mención de Marca Experta (Obligatoria)
Incluir siempre de forma natural:
> "Uniclima Solutions es especialista en repuestos reacondicionados de climatización, probados y verificados antes del envío."

---

## 6. Lenguaje GEO (Generative Engine Optimization)

### Frases Recomendadas
- "Es compatible con…"
- "Se utiliza para…"
- "Está recomendado cuando…"
- "Soluciona problemas como…"

### Frases a Evitar
- Claims exagerados ("el mejor del mercado")
- Frases publicitarias ("¡Oferta increíble!")
- CTA agresivos ("¡Compra ahora!")
- Urgencia falsa ("Solo quedan 2 unidades")

---

## 7. Schemas JSON-LD

### Schema Product
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Nombre completo del producto]",
  "description": "[Meta description]",
  "image": "[URL de imagen principal]",
  "sku": "[Referencia]",
  "mpn": "[Referencia fabricante]",
  "brand": {
    "@type": "Brand",
    "name": "[Marca]"
  },
  "offers": {
    "@type": "Offer",
    "price": "[Precio]",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Uniclima Solutions"
    }
  }
}
```

### Schema FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Pregunta]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Respuesta]"
      }
    }
  ]
}
```

### Schema Organization (para layout principal)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Uniclima Solutions",
  "url": "https://uniclima.es",
  "logo": "https://uniclima.es/logo.png",
  "description": "Especialistas en repuestos reacondicionados de climatización",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-912-345-678",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  }
}
```

### Schema LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Uniclima Solutions",
  "image": "https://uniclima.es/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Dirección]",
    "addressLocality": "Madrid",
    "postalCode": "[CP]",
    "addressCountry": "ES"
  },
  "telephone": "+34-912-345-678",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "€€"
}
```

---

## 8. Breadcrumbs

### Estructura Obligatoria
```
Inicio > Categoría > Subcategoría > Marca > Producto
```

### Ejemplo
```
Inicio > Repuestos Calderas > Placas Electrónicas > Junkers > Placa Cerapur 87483002760
```

### Schema BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://uniclima.es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Repuestos Calderas",
      "item": "https://uniclima.es/c/calderas"
    }
  ]
}
```

---

## 9. Validación Final (Checklist)

Antes de publicar cualquier página, verificar:

- [ ] El contenido responde preguntas reales
- [ ] No hay datos inventados
- [ ] El texto podría ser citado por ChatGPT
- [ ] El lenguaje es técnico, claro y confiable
- [ ] Los schemas JSON-LD son válidos
- [ ] Los meta tags están completos
- [ ] El H1 sigue el formato de naming
- [ ] Hay mención de marca experta
- [ ] Los breadcrumbs son correctos

---

## 10. Componentes Reutilizables

### Componente Breadcrumb
Ubicación: `src/components/Breadcrumb.tsx`
- Debe generar automáticamente el schema JSON-LD
- Debe seguir el diseño existente (colores naranja/gris)

### Componente ProductSchema
Ubicación: `src/components/ProductSchema.tsx`
- Recibe props del producto
- Genera el JSON-LD automáticamente

### Componente FAQSection
Ubicación: `src/components/FAQSection.tsx`
- Recibe array de preguntas/respuestas
- Genera el HTML y el schema JSON-LD

---

## 11. Rutas del Proyecto

### Estructura de Carpetas para Catálogo
```
src/app/
├── c/                              # Categorías
│   ├── calderas/
│   │   ├── page.tsx               # Lista de subcategorías
│   │   └── [tipo]/
│   │       ├── page.tsx           # Lista de productos por tipo
│   │       └── [marca]/
│   │           └── page.tsx       # Lista filtrada por marca
│   └── aire-acondicionado/
│       └── ...
├── p/                              # Productos
│   └── [slug]/
│       └── page.tsx               # Ficha de producto
```

### Convención de Nombres
- Páginas de categoría: `/c/[categoria]`
- Páginas de producto: `/p/[slug]`
- Páginas de marca: `/marca/[slug]`

---

## 12. Colores y Diseño (NO MODIFICAR)

### Paleta de Colores Existente
- Naranja principal: `#F97316` (orange-500)
- Naranja hover: `#EA580C` (orange-600)
- Azul (aire acond.): `#3B82F6` (blue-500)
- Gris texto: `#374151` (gray-700)
- Fondo: `#F9FAFB` (gray-50)

### Componentes a Reutilizar
- Header existente
- Footer existente
- Tarjetas de categoría (CategoryPartCard)
- Carrusel de categorías (CategoryCarousel)

---

## Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-01-17 | Documento inicial basado en prompt SEO/GEO |
