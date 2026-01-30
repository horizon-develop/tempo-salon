import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shelby Peluquería | Tu Estilo, Nuestra Pasión",
  description: "Peluquería unisex en Corrientes, Argentina. Cortes masculinos, hidratación y brushing. Una experiencia personalizada en un ambiente elegante y sofisticado.",
  keywords: ["peluquería", "corrientes", "corte de pelo", "unisex", "shelby", "hidratación", "brushing"],
  openGraph: {
    title: "Shelby Peluquería | Tu Estilo, Nuestra Pasión",
    description: "Peluquería unisex en Corrientes, Argentina. Una experiencia personalizada en un ambiente elegante.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
