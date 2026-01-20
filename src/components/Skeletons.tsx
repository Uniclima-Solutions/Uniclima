// Server Components - Skeletons para Suspense streaming

export function CategorySkeleton() {
  return (
    <div className="bg-gray-100 rounded-3xl aspect-square animate-pulse">
      <div className="h-full flex flex-col justify-end p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}

export function CategoriesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  )
}

export function BrandSkeleton() {
  return (
    <div className="bg-gray-100 rounded-2xl aspect-[4/3] animate-pulse" />
  )
}

export function BrandsSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <BrandSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <section className="bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse" style={{ minHeight: '320px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="h-4 bg-gray-400 rounded w-48 mb-8" />
        <div className="max-w-2xl">
          <div className="h-12 bg-gray-400 rounded w-3/4 mb-4" />
          <div className="h-6 bg-gray-400 rounded w-full mb-2" />
          <div className="h-6 bg-gray-400 rounded w-2/3" />
        </div>
      </div>
    </section>
  )
}

export function ContentSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  )
}
