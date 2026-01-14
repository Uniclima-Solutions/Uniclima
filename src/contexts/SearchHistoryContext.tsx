'use client'

/*
 * DESIGN: Historial de Búsquedas
 * - Guarda últimas 10 búsquedas
 * - Persistencia en localStorage
 * - Eliminar búsquedas individuales o todas
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SearchHistoryContextType {
  history: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

const STORAGE_KEY = "uniclima_search_history";
const MAX_HISTORY = 10;

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);

  // Cargar de localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing search history:", e);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;
    
    setHistory((prev) => {
      // Eliminar si ya existe para moverlo al principio
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed);
      // Añadir al principio y limitar a MAX_HISTORY
      return [query.trim(), ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const removeSearch = (query: string) => {
    setHistory((prev) => prev.filter((q) => q !== query));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        history,
        addSearch,
        removeSearch,
        clearHistory,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error("useSearchHistory must be used within a SearchHistoryProvider");
  }
  return context;
}
