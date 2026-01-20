# Análisis de Rendimiento - Uniclima Web

## Resumen Ejecutivo

Se ha realizado un análisis completo de la velocidad de carga de la web tras las mejoras de UI/UX. Se han identificado varios cuellos de botella que afectan al rendimiento.

---

## 1. Tiempos de Carga por Página

| Página | TTFB | Tiempo Total | Tamaño HTML |
|--------|------|--------------|-------------|
| **Home** (/) | 0.13s ✅ | 0.13s | 117 KB |
| **Calderas** (/c/calderas) | 1.23s ⚠️ | 1.23s | 133 KB |
| **Aire Acondicionado** (/c/aire-acondicionado) | 1.41s ⚠️ | 1.41s | 99 KB |
| **Marcas** (/marcas) | 1.07s ⚠️ | 1.08s | 89 KB |
| **Contrato Mantenimiento** | 0.12s ✅ | 0.13s | 96 KB |

### Observaciones:
- **Home y Contrato de Mantenimiento**: Tiempos excelentes (<0.15s)
- **Calderas, Aire y Marcas**: TTFB alto (>1s) - Posible renderizado del servidor lento

---

## 2. Cuellos de Botella Identificados

### 🔴 CRÍTICO: Imágenes Sin Optimizar

**Problema**: Las imágenes en `/public/images/` son extremadamente pesadas (PNG sin comprimir).

| Imagen | Tamaño | Impacto |
|--------|--------|---------|
| placa-electronica.png | 5.4 MB | Muy Alto |
| intercambiador.png | 5.3 MB | Muy Alto |
| valvula-gas.png | 5.2 MB | Muy Alto |
| hero-banner-*.png | 4.8 MB c/u | Muy Alto |
| bomba-circulacion.png | 4.5 MB | Muy Alto |
| caldera-condensacion.png | 4.3 MB | Muy Alto |

**Total imágenes**: 311 archivos = **145 MB**

**Solución recomendada**:
1. Convertir todas las imágenes a formato **WebP**
2. Usar el componente `next/image` con optimización automática
3. Implementar lazy loading para imágenes below-the-fold
4. Reducir resolución de imágenes a tamaños apropiados

### 🟡 MEDIO: Bundles de JavaScript

**Tamaño total de chunks**: 4.6 MB

| Chunk | Tamaño | Posible contenido |
|-------|--------|-------------------|
| 94981986f0e2d51c.js | 408 KB | Librería pesada |
| 25e2576033d0447f.js | 235 KB | Componentes |
| 46e13aea8a6eef4d.js | 235 KB | Componentes |
| b17a7984d18ef570.js | 219 KB | Librería |
| cf4fc1e20e39d4cb.js | 194 KB | Componentes |

**Dependencias pesadas identificadas**:
- `framer-motion` (usado solo en MobileMenu.tsx) - ~150 KB
- `recharts` (NO SE USA) - ~300 KB
- `jspdf` + `html2canvas` (solo en contrato-mantenimiento) - ~200 KB

**Solución recomendada**:
1. Eliminar `recharts` del proyecto (no se usa)
2. Usar dynamic imports para `jspdf` y `html2canvas`
3. Evaluar si framer-motion es necesario o usar CSS animations

### 🟡 MEDIO: Logos de Marcas

**Total logos**: 28 archivos = 1.4 MB (PNG)

Algunos logos son muy pesados:
- carrier.png: 170 KB
- ferroli.png: 108 KB
- chaffoteaux.png: 85 KB

**Solución recomendada**:
1. Convertir logos a SVG (vectorial, más pequeño)
2. O convertir a WebP con compresión
3. Usar sprites para cargar todos los logos en una sola petición

### 🟢 BAJO: Categorías de Productos

**Imágenes de categorías calderas**: 7.3 MB
**Imágenes de categorías aire**: 1.7 MB

La imagen más pesada es `placa-electronica.png` (1.9 MB en calderas).

---

## 3. Recomendaciones Prioritarias

### Prioridad Alta (Impacto inmediato)

1. **Optimizar imágenes de productos y banners**
   - Convertir a WebP
   - Reducir resolución a 800-1200px máximo
   - Comprimir con calidad 80-85%
   - Ahorro estimado: **~130 MB → ~15 MB**

2. **Eliminar dependencias no utilizadas**
   - Eliminar `recharts` del package.json
   - Ahorro estimado: **~300 KB de JS**

3. **Implementar lazy loading**
   - Usar `next/image` con `loading="lazy"`
   - Solo cargar imágenes visibles en viewport

### Prioridad Media

4. **Dynamic imports para librerías pesadas**
   ```javascript
   // En contrato-mantenimiento
   const jsPDF = await import('jspdf');
   const html2canvas = await import('html2canvas');
   ```

5. **Optimizar logos de marcas**
   - Convertir a SVG o WebP
   - Reducir tamaño a 100x100px máximo

### Prioridad Baja

6. **Evaluar framer-motion**
   - Considerar CSS animations para el menú móvil
   - O usar dynamic import solo cuando se abre el menú

---

## 4. Métricas Objetivo

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| TTFB Home | 0.13s | < 0.2s ✅ |
| TTFB Calderas | 1.23s | < 0.5s |
| Total imágenes | 145 MB | < 20 MB |
| JS Bundle | 4.6 MB | < 2 MB |
| LCP | ~3s | < 2.5s |
| FCP | ~1.5s | < 1.8s |

---

## 5. Conclusión

Los principales cuellos de botella son:

1. **Imágenes sin optimizar** (145 MB total) - CRÍTICO
2. **Dependencias JS no utilizadas** (recharts) - MEDIO
3. **TTFB alto en páginas de categorías** - MEDIO

La optimización de imágenes es la acción más urgente y con mayor impacto en el rendimiento. Se estima que convertir todas las imágenes a WebP y reducir su tamaño puede mejorar el tiempo de carga en un **60-70%**.
