'use client'

import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { CompareProvider } from '@/contexts/CompareContext'
import { SearchHistoryProvider } from '@/contexts/SearchHistoryContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <CompareProvider>
            <SearchHistoryProvider>
              {children}
            </SearchHistoryProvider>
          </CompareProvider>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
