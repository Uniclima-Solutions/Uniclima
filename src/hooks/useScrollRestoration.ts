/**
 * Hook para restaurar la posición de scroll al navegar entre páginas
 * Guarda la posición de scroll en sessionStorage y la restaura al volver
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Almacén de posiciones de scroll por ruta
const SCROLL_POSITIONS_KEY = 'scroll_positions';

// Obtener posiciones guardadas
const getScrollPositions = (): Record<string, number> => {
  try {
    const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Guardar posición para una ruta
const saveScrollPosition = (path: string, position: number) => {
  try {
    const positions = getScrollPositions();
    positions[path] = position;
    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // Ignorar errores de storage
  }
};

// Obtener posición guardada para una ruta
const getScrollPosition = (path: string): number => {
  const positions = getScrollPositions();
  return positions[path] || 0;
};

export function useScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    // Guardar posición actual antes de cambiar de página
    const handleBeforeUnload = () => {
      saveScrollPosition(location, window.scrollY);
    };

    // Guardar posición en cada scroll (con debounce)
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        saveScrollPosition(location, window.scrollY);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Guardar posición al desmontar (cambio de ruta)
      saveScrollPosition(location, window.scrollY);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  useEffect(() => {
    // Restaurar posición al cargar la página
    const savedPosition = getScrollPosition(location);
    
    // Usar requestAnimationFrame para asegurar que el DOM está listo
    requestAnimationFrame(() => {
      // Pequeño delay para que el contenido se renderice
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
      }, 50);
    });
  }, [location]);
}

export default useScrollRestoration;
