# Arquitectura de Rutas para Repuestos - SEO/GEO/IA

## Estructura de URLs

```
🏠 / repuestos / [tipo-maquina] / [marca] / [familia-piezas] / [articulo-sku]
```

### Niveles de Navegación

| Nivel | Ruta | Ejemplo | Propósito SEO |
|-------|------|---------|---------------|
| 1 | `/repuestos` | `/repuestos` | Hub de intención de búsqueda |
| 2 | `/repuestos/[tipo]` | `/repuestos/calderas` | Categoría de producto |
| 3 | `/repuestos/[tipo]/[marca]` | `/repuestos/calderas/vaillant` | Authority Hub de marca |
| 4 | `/repuestos/[tipo]/[marca]/[familia]` | `/repuestos/calderas/vaillant/bombas-circulacion` | Familia de piezas técnicas |
| 5 | `/repuestos/[tipo]/[marca]/[familia]/[producto]` | `/repuestos/calderas/vaillant/bombas-circulacion/ventilador-turbotec-pro-0020020000` | Producto específico |

## Categorías de Calderas

### Marcas
- junkers-bosch
- vaillant
- saunier-duval
- baxi
- ferroli
- ariston
- roca
- cointra
- chaffoteaux
- beretta
- immergas
- hermann

### Familias de Piezas (Calderas)
- placas-electronicas
- intercambiadores
- bombas-circulacion
- valvulas-gas
- valvulas-3-vias
- sensores
- ventiladores
- electrodos
- presostatos
- termostatos
- juntas
- membranas

## Categorías de Aire Acondicionado

### Marcas
- mitsubishi-electric
- daikin
- fujitsu
- lg
- samsung
- panasonic
- toshiba
- hisense
- haier
- carrier
- midea
- gree

### Familias de Piezas (Aire Acondicionado)
- placas-interior
- placas-exterior
- turbinas
- motores-turbina
- helices-compresor
- motores-helice
- bombas-condensados
- mandos-distancia
- sensores
- ventiladores

## Breadcrumbs Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://uniclima.es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Repuestos",
      "item": "https://uniclima.es/repuestos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Calderas",
      "item": "https://uniclima.es/repuestos/calderas"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Vaillant",
      "item": "https://uniclima.es/repuestos/calderas/vaillant"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Bombas de Circulación",
      "item": "https://uniclima.es/repuestos/calderas/vaillant/bombas-circulacion"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Ventilador Vaillant TurboTEC Pro 0020020000",
      "item": "https://uniclima.es/repuestos/calderas/vaillant/bombas-circulacion/ventilador-turbotec-pro-0020020000"
    }
  ]
}
```

## Product Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ventilador Vaillant TurboTEC Pro 0020020000",
  "description": "Ventilador original para caldera Vaillant TurboTEC Pro. Referencia fabricante: 0020020000",
  "sku": "0020020000",
  "mpn": "0020020000",
  "brand": {
    "@type": "Brand",
    "name": "Vaillant"
  },
  "model": "TurboTEC Pro",
  "category": "Repuestos > Calderas > Vaillant > Bombas de Circulación",
  "offers": {
    "@type": "Offer",
    "price": "189.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Uniclima Solutions"
    }
  },
  "isRelatedTo": [
    {
      "@type": "Product",
      "name": "Ventilador Vaillant TurboMAX",
      "url": "/repuestos/calderas/vaillant/ventiladores/ventilador-turbomax-0020020001"
    }
  ]
}
```

## Interlinking Silo

- Los repuestos de una marca solo enlazan a otros repuestos de la misma marca y tipo de máquina
- Evitar dilución de relevancia entre marcas competidoras
- Estructura de enlaces internos:
  - Producto → Otros productos de la misma familia y marca
  - Producto → Otros productos compatibles del mismo modelo
  - Familia → Otras familias de la misma marca
  - Marca → Otras marcas del mismo tipo de máquina (solo en navegación principal)
