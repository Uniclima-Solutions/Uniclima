# Plan de Acción: Reducir LCP de 2.5s a menos de 1.1s

**Objetivo:** Superar a RepuestosCalefaccion.com (LCP: 1.1s) y convertir a Uniclima en el líder de rendimiento del sector.

**Estado Actual:**
- LCP Uniclima (desarrollo): 3.2s
- LCP Uniclima (producción estimado): 2.5s
- LCP Competidor líder: 1.1s
- **Reducción necesaria: 1.4s (56%)**

---

## Análisis del Elemento LCP Actual

El análisis de Lighthouse revela que el elemento LCP en las páginas de Calderas y Aire Acondicionado es:

```
Elemento: <p class="text-orange-100 text-lg lg:text-xl leading-relaxed">
Selector: div.max-w-7xl > div.flex > div.max-w-2xl > p.text-orange-100
Contenido: "Más de 3,144 referencias de repuestos para calderas..."
```

**Desglose del LCP (3.2s total):**
- Time to First Byte (TTFB): 418ms
- Element Render Delay: 319ms
- Resource Load: ~2.5s (JavaScript + hidratación)

---

## Acciones Concretas por Prioridad

### 🔴 PRIORIDAD 1: Eliminar Render Delay del Elemento LCP (Impacto: -0.5s)

**Problema:** El texto del hero está siendo renderizado después de que React hidrate el componente.

**Solución:** Convertir el hero a Server Component puro.

**Archivo:** `src/app/c/calderas/page.tsx`

**Cambios necesarios:**

1. Separar el hero section en un Server Component:

```tsx
// src/components/HeroSection.tsx (Server Component - sin 'use client')
export function HeroSection({ 
  title, 
  subtitle, 
  stats 
}: { 
  title: string
  subtitle: string
  stats: { label: string; value: string }[]
}) {
  return (
    <section className="relative bg-gradient-to-br from-orange-600 to-orange-700 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white">{title}</h1>
        <p className="text-orange-100 text-lg lg:text-xl leading-relaxed mt-4">
          {subtitle}
        </p>
        {/* Stats cards */}
      </div>
    </section>
  )
}
```

2. El hero se renderiza en el servidor, eliminando el delay de hidratación.

---

### 🔴 PRIORIDAD 2: Preload del CSS Crítico (Impacto: -0.3s)

**Problema:** El CSS de Tailwind bloquea el renderizado del LCP.

**Solución:** Inline critical CSS y preload del resto.

**Archivo:** `src/app/layout.tsx`

**Cambios necesarios:**

1. Añadir preload del CSS principal:

```tsx
// En el <head> del layout
<link 
  rel="preload" 
  href="/_next/static/css/app/layout.css" 
  as="style"
/>
```

2. Considerar extraer CSS crítico con `critters` o similar.

---

### 🔴 PRIORIDAD 3: Optimizar TTFB con Edge Runtime (Impacto: -0.2s)

**Problema:** TTFB de 418ms es aceptable pero mejorable.

**Solución:** Usar Edge Runtime para las páginas de categoría.

**Archivo:** `src/app/c/calderas/page.tsx`

**Cambios necesarios:**

```tsx
// Añadir al inicio del archivo
export const runtime = 'edge'
export const preferredRegion = 'fra1' // Frankfurt para España
```

**Nota:** Requiere despliegue en Vercel o similar con soporte Edge.

---

### 🟡 PRIORIDAD 4: Implementar Streaming SSR (Impacto: -0.4s)

**Problema:** La página espera a que todo el contenido esté listo antes de enviar.

**Solución:** Usar Suspense para streaming del contenido secundario.

**Archivo:** `src/app/c/calderas/page.tsx`

**Cambios necesarios:**

```tsx
import { Suspense } from 'react'

export default function CalderasPage() {
  return (
    <>
      {/* Hero se renderiza inmediatamente */}
      <HeroSection title="..." subtitle="..." stats={[...]} />
      
      {/* Categorías con streaming */}
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>
      
      {/* Marcas con streaming */}
      <Suspense fallback={<BrandsSkeleton />}>
        <BrandsSection />
      </Suspense>
    </>
  )
}
```

---

### 🟡 PRIORIDAD 5: Prerender Páginas Estáticas (Impacto: -0.3s)

**Problema:** Las páginas de categoría se generan en cada request.

**Solución:** Usar Static Generation con revalidación.

**Archivo:** `src/app/c/calderas/page.tsx`

**Cambios necesarios:**

```tsx
// Generar estáticamente con revalidación cada hora
export const revalidate = 3600 // 1 hora

// O usar generateStaticParams para SSG completo
export async function generateStaticParams() {
  return [
    { category: 'calderas' },
    { category: 'aire-acondicionado' },
  ]
}
```

---

### 🟡 PRIORIDAD 6: Optimizar Imágenes Above-the-Fold (Impacto: -0.2s)

**Problema:** Las imágenes de categorías no tienen preload.

**Solución:** Precargar las primeras 4 imágenes de categorías.

**Archivo:** `src/app/c/calderas/page.tsx`

**Cambios necesarios:**

```tsx
// En el head de la página
<link 
  rel="preload" 
  as="image" 
  href="/images/categories/placas-electronicas.webp"
  fetchpriority="high"
/>
<link 
  rel="preload" 
  as="image" 
  href="/images/categories/bombas.webp"
/>
```

---

### 🟢 PRIORIDAD 7: Implementar Service Worker para Cache (Impacto: -0.5s en revisitas)

**Problema:** Cada visita descarga todos los recursos de nuevo.

**Solución:** Implementar Service Worker con Workbox.

**Beneficio:** Las revisitas cargarán en <0.5s desde cache.

---

### 🟢 PRIORIDAD 8: CDN con Edge Caching (Impacto: -0.3s)

**Problema:** Los assets se sirven desde un único servidor.

**Solución:** Desplegar en Vercel/Cloudflare con edge caching.

**Configuración recomendada:**
- Vercel con Edge Network
- Cloudflare con cache de 1 año para assets estáticos
- Headers: `Cache-Control: public, max-age=31536000, immutable`

---

## Resumen de Impacto Estimado

| Acción | Impacto | Dificultad | Prioridad |
|--------|---------|------------|-----------|
| Server Component Hero | -0.5s | Media | 🔴 Alta |
| Preload CSS Crítico | -0.3s | Baja | 🔴 Alta |
| Edge Runtime | -0.2s | Baja | 🔴 Alta |
| Streaming SSR | -0.4s | Media | 🟡 Media |
| Static Generation | -0.3s | Baja | 🟡 Media |
| Preload Imágenes | -0.2s | Baja | 🟡 Media |
| Service Worker | -0.5s* | Alta | 🟢 Baja |
| CDN Edge Caching | -0.3s | Baja | 🟢 Baja |

**Total potencial:** -2.7s (de 3.2s a ~0.5s)

*Solo en revisitas

---

## Resultado Esperado

Implementando las acciones de **Prioridad 1, 2 y 3**:

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **LCP** | 3.2s | **~1.0s** | -69% |
| **Score** | 82 | **95+** | +13 |

Implementando **todas las acciones**:

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **LCP** | 3.2s | **~0.5s** | -84% |
| **Score** | 82 | **98+** | +16 |

---

## Comparativa Final con Competidores

| Posición | Competidor | LCP Actual | LCP Proyectado |
|----------|------------|------------|----------------|
| 🥇 **1º** | **Uniclima** | 3.2s | **0.5-1.0s** |
| 🥈 2º | RepuestosCalefaccion | 1.1s | 1.1s |
| 🥉 3º | Recamania | 1.6s | 1.6s |

**Uniclima pasaría de 5º a 1º en rendimiento del sector.**

---

## Próximos Pasos

1. **Crear checkpoint** antes de implementar cambios
2. **Implementar Prioridad 1** (Server Component Hero)
3. **Medir impacto** con Lighthouse
4. **Implementar Prioridad 2** (Preload CSS)
5. **Medir impacto** con Lighthouse
6. **Continuar iterativamente** hasta alcanzar <1.1s

---

*Documento generado el 20 de enero de 2026*
