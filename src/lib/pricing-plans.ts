/**
 * Constantes de planes de mantenimiento
 * Centralizado para uso en múltiples componentes
 */

export interface PlanFeature {
  texto: string;
  incluido: boolean;
}

export interface PricingPlan {
  id: number;
  nombre: string;
  precio: number;
  periodo: string;
  destacado: boolean;
  color: string;
  icono: 'shield' | 'star' | 'crown';
  descripcion: string;
  caracteristicas: PlanFeature[];
}

// Planes de mantenimiento - Calderas (preventivo: octubre-noviembre)
export const CALDERAS_PLANS: PricingPlan[] = [
  {
    id: 1,
    nombre: "Esencial",
    precio: 90,
    periodo: "año",
    destacado: false,
    color: "orange",
    icono: "shield",
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión", incluido: false },
      { texto: "Asistencia técnica incluida", incluido: false },
    ],
  },
  {
    id: 2,
    nombre: "Confort",
    precio: 120,
    periodo: "año",
    destacado: true,
    color: "orange",
    icono: "star",
    descripcion: "Preventivo + reparaciones prioritarias",
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "Asistencia técnica incluida", incluido: false },
    ],
  },
  {
    id: 3,
    nombre: "Premium",
    precio: 140,
    periodo: "año",
    destacado: false,
    color: "violet",
    icono: "crown",
    descripcion: "Cobertura completa + verano",
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "2 horas asistencia técnica", incluido: true },
    ],
  }
];

// Planes de mantenimiento - Aire Acondicionado (preventivo: marzo-abril)
export const AIRE_PLANS: PricingPlan[] = [
  {
    id: 1,
    nombre: "Esencial",
    precio: 70,
    periodo: "año",
    destacado: false,
    color: "sky",
    icono: "shield",
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: false },
      { texto: "Asistencia 48/72 horas", incluido: false },
    ],
  },
  {
    id: 2,
    nombre: "Confort",
    precio: 95,
    periodo: "año",
    destacado: true,
    color: "blue",
    icono: "star",
    descripcion: "Preventivo + reparaciones prioritarias",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: true },
      { texto: "Asistencia 48/72 horas", incluido: false },
    ],
  },
  {
    id: 3,
    nombre: "Premium",
    precio: 120,
    periodo: "año",
    destacado: false,
    color: "indigo",
    icono: "crown",
    descripcion: "Cobertura completa + invierno",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: true },
      { texto: "Asistencia 48/72 horas", incluido: true },
    ],
  }
];

// Función helper para obtener plan por nombre
export function getPlanByName(nombre: string, tipo: 'calderas' | 'aire'): PricingPlan | undefined {
  const plans = tipo === 'calderas' ? CALDERAS_PLANS : AIRE_PLANS;
  return plans.find(plan => plan.nombre === nombre);
}

// Constantes de envío
export const SHIPPING = {
  FREE_THRESHOLD: 120,
  STANDARD_COST: 8.50,
  EXPRESS_COST: 12.00,
} as const;
