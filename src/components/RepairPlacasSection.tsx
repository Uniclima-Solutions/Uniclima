/**
 * RepairPlacasSection - Banner de reparación de placas
 * Usa la imagen del banner original como fondo
 */

import Link from "next/link";

export default function RepairPlacasSection() {
  return (
    <section className="w-full my-8 md:my-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/diagnostico-placas" className="block">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            {/* Imagen del banner */}
            <img 
              src="/images/banners/banner-reparacion-placas.webp" 
              alt="¿No encuentras tu placa? ¡La reparamos! Técnicos especializados con 1 año de garantía"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Overlay sutil para efecto hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        </Link>
      </div>
    </section>
  );
}
