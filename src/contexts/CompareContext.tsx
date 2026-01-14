'use client'

/*
 * DESIGN: Sistema de Comparación de Productos
 * - Máximo 4 productos a comparar
 * - Persistencia en sessionStorage
 * - Barra flotante con productos seleccionados
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string;
  reference: string;
  brand: string;
  category: "calderas" | "aire-acondicionado";
}

interface CompareContextType {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  canAddMore: boolean;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = "uniclima_compare";
const MAX_COMPARE = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  // Cargar de sessionStorage al iniciar
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompareItems(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing compare list:", e);
      }
    }
  }, []);

  // Guardar en sessionStorage cuando cambie
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: CompareItem): boolean => {
    if (compareItems.length >= MAX_COMPARE) {
      return false;
    }
    if (compareItems.some(p => p.id === item.id)) {
      return false;
    }
    setCompareItems(prev => [...prev, item]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(prev => prev.filter(p => p.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return compareItems.some(p => p.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        canAddMore: compareItems.length < MAX_COMPARE,
        compareCount: compareItems.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
