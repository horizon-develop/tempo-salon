import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TEMPO Atelier | Tu Estilo, Nuestra Pasión",
  description: "Peluquería unisex en Corrientes, Argentina. Cortes masculinos, hidratación y brushing. Una experiencia personalizada en un ambiente elegante y sofisticado.",
  keywords: ["peluquería", "corrientes", "corte de pelo", "unisex", "tempo atelier", "hidratación", "brushing"],
  openGraph: {
    title: "TEMPO Atelier | Tu Estilo, Nuestra Pasión",
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
    <html lang="es" className={montserrat.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
