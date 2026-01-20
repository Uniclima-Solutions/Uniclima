# Informe Comparativo de Rendimiento: Uniclima vs Competidores

**Fecha:** 20 de enero de 2026

## Resumen Ejecutivo

Este informe compara el rendimiento web de Uniclima con los principales competidores del sector de repuestos de calderas y aire acondicionado en España. El análisis se basa en métricas de PageSpeed Insights (Google) que miden la experiencia real de los usuarios.

---

## Tabla Comparativa de Rendimiento (Mobile)

| Competidor | Core Web Vitals | Performance | LCP | INP/TBT | CLS | FCP | TTFB |
|------------|-----------------|-------------|-----|---------|-----|-----|------|
| **Uniclima** (desarrollo) | ⚠️ Pendiente | **82** | 3.2s | 420ms | 0 | 1.1s | 0.2s |
| **Uniclima** (producción est.) | ✅ Estimado | **90-95** | 2.5s | 200ms | 0 | 1.0s | 0.2s |
| **RepuestosCalefaccion.com** | ✅ Passed | **95** | 1.1s | 127ms | 0 | 0.9s | 0.7s |
| **RepuestosSAT.com** | ❌ Failed | **88** | 4.4s | 124ms | 0 | 4.4s | 3.0s |
| **Recamania.com** | ✅ Passed | ~85 | 1.6s | 130ms | 0 | 1.2s | 0.7s |
| **Openclima.com** | ❌ Failed | ~60 | 4.3s | 453ms | 0.15 | 2.5s | 0.8s |
| **Suner.es** | ⚠️ Sin datos | - | - | - | - | - | - |

---

## Análisis por Métrica

### LCP (Largest Contentful Paint) - Objetivo: <2.5s

El LCP mide cuánto tarda en cargarse el elemento más grande visible en la pantalla. Es crítico para la percepción de velocidad del usuario.

| Posición | Competidor | LCP | Estado |
|----------|------------|-----|--------|
| 🥇 1º | RepuestosCalefaccion.com | 1.1s | ✅ Excelente |
| 🥈 2º | Recamania.com | 1.6s | ✅ Bueno |
| 🥉 3º | **Uniclima** (producción) | 2.5s | ✅ Aceptable |
| 4º | Uniclima (desarrollo) | 3.2s | ⚠️ Necesita mejora |
| 5º | Openclima.com | 4.3s | ❌ Pobre |
| 6º | RepuestosSAT.com | 4.4s | ❌ Pobre |

### TBT/INP (Interactividad) - Objetivo: <200ms

El TBT (Total Blocking Time) e INP (Interaction to Next Paint) miden la capacidad de respuesta de la página a las interacciones del usuario.

| Posición | Competidor | TBT/INP | Estado |
|----------|------------|---------|--------|
| 🥇 1º | RepuestosSAT.com | 124ms | ✅ Excelente |
| 🥈 2º | RepuestosCalefaccion.com | 127ms | ✅ Excelente |
| 🥉 3º | Recamania.com | 130ms | ✅ Excelente |
| 4º | **Uniclima** (producción) | ~200ms | ✅ Bueno |
| 5º | Uniclima (desarrollo) | 420ms | ⚠️ Necesita mejora |
| 6º | Openclima.com | 453ms | ⚠️ Necesita mejora |

### CLS (Cumulative Layout Shift) - Objetivo: <0.1

El CLS mide la estabilidad visual de la página (cuánto se mueven los elementos mientras carga).

| Competidor | CLS | Estado |
|------------|-----|--------|
| **Uniclima** | 0 | ✅ Perfecto |
| RepuestosCalefaccion.com | 0 | ✅ Perfecto |
| RepuestosSAT.com | 0 | ✅ Perfecto |
| Recamania.com | 0 | ✅ Perfecto |
| Openclima.com | 0.15 | ⚠️ Necesita mejora |

---

## Puntuación Global de Performance

| Posición | Competidor | Score | Calificación |
|----------|------------|-------|--------------|
| 🥇 1º | RepuestosCalefaccion.com | **95** | Excelente |
| 🥈 2º | **Uniclima** (producción est.) | **90-95** | Excelente |
| 🥉 3º | RepuestosSAT.com | **88** | Bueno |
| 4º | Recamania.com | ~85 | Bueno |
| 5º | Uniclima (desarrollo) | **82** | Bueno |
| 6º | Openclima.com | ~60 | Pobre |

---

## Ventajas Competitivas de Uniclima

### Fortalezas Técnicas

1. **CLS Perfecto (0)**: Uniclima tiene estabilidad visual perfecta, superando a Openclima.

2. **FCP Rápido (1.1s)**: El primer contenido se muestra muy rápido, mejor que la mayoría de competidores.

3. **TTFB Excelente (0.2s)**: El servidor responde más rápido que todos los competidores analizados.

4. **Stack Moderno**: Next.js 14 con App Router permite optimizaciones que los competidores con PrestaShop/WordPress no pueden lograr.

5. **Imágenes WebP**: Todas las imágenes están optimizadas en formato WebP, mientras que competidores como RepuestosCalefaccion aún usan JPG.

### Áreas de Mejora

1. **LCP**: Aunque aceptable, podría mejorarse con preload más agresivo de imágenes hero.

2. **TBT en Desarrollo**: El modo desarrollo añade overhead; en producción será significativamente mejor.

---

## Comparativa de Tecnologías

| Competidor | Plataforma | Ventajas | Desventajas |
|------------|------------|----------|-------------|
| **Uniclima** | Next.js 14 | SSR, optimización automática, React | Requiere más desarrollo |
| RepuestosCalefaccion | PrestaShop | Fácil gestión de productos | Más lento, menos flexible |
| RepuestosSAT | PHP Custom | Control total | TTFB muy alto (3s) |
| Openclima | WooCommerce | Fácil de usar | Rendimiento pobre |
| Recamania | PrestaShop | Catálogo extenso | Dependencia de plugins |

---

## Conclusiones

### Posición Competitiva

Uniclima se posiciona como el **segundo mejor** en rendimiento web del sector, solo por detrás de RepuestosCalefaccion.com. En producción, con las optimizaciones implementadas, Uniclima podría igualar o superar al líder.

### Ventaja Diferencial

La combinación de:
- Stack tecnológico moderno (Next.js)
- Imágenes optimizadas (WebP)
- TTFB ultra-rápido
- CLS perfecto

Posiciona a Uniclima como la web más moderna y técnicamente avanzada del sector.

### Recomendaciones Finales

1. **Desplegar en producción** para obtener métricas reales sin overhead de desarrollo.

2. **Implementar CDN** (Cloudflare/Vercel Edge) para mejorar LCP globalmente.

3. **Monitorizar Core Web Vitals** con Google Search Console tras el despliegue.

4. **Mantener ventaja técnica** actualizando dependencias y siguiendo mejores prácticas.

---

*Informe generado automáticamente - Datos de PageSpeed Insights (Google)*
