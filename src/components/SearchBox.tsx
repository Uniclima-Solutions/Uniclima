'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBox({ 
  placeholder = "Buscar por referencia, marca...",
  onSearch,
  className = ""
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  return (
    <div className={`relative transition-all duration-300 ${focused ? 'transform scale-105' : ''} ${className}`}>
      <Search 
        className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
          focused ? 'text-orange-500' : 'text-gray-400'
        }`} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300/50 shadow-2xl transition-all duration-300 text-base"
      />
    </div>
  )
}
