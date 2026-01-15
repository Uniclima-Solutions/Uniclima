import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Llévate tu Pieza GRATIS | Promoción Exclusiva Uniclima",
  description: "Envíanos un vídeo de tu reparación y te regalamos la pieza. Promoción exclusiva para clientes de Uniclima. Repuestos de calderas y aire acondicionado gratis. Sin letra pequeña, 100% del valor de la pieza.",
  keywords: "pieza gratis, repuesto gratis, promoción calderas, regalo reparación, uniclima promoción, repuestos gratis, vídeo reparación, cupón descuento calderas, aire acondicionado gratis",
  openGraph: {
    title: "¡Llévate tu Pieza GRATIS! | Uniclima",
    description: "Envíanos un vídeo de tu reparación y te regalamos el 100% del valor de la pieza para tu próxima compra. Sin trampas, sin letra pequeña.",
    type: "website",
    locale: "es_ES",
    siteName: "Uniclima - Repuestos HVAC",
    images: [
      {
        url: "/banner_pieza_gratis_final.png",
        width: 1200,
        height: 630,
        alt: "Promoción Pieza Gratis Uniclima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Llévate tu Pieza GRATIS! | Uniclima",
    description: "Envíanos un vídeo de tu reparación y te regalamos el 100% del valor de la pieza.",
    images: ["/banner_pieza_gratis_final.png"],
  },
  alternates: {
    canonical: "https://uniclima.es/pieza-gratis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PiezaGratisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
