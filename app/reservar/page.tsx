import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = {
  title: "Reservar Turno | TEMPO Atelier",
  description:
    "Reserva tu turno en TEMPO Atelier. Elegi servicio, estilista, fecha y horario en pocos pasos.",
  openGraph: {
    title: "Reservar Turno | TEMPO Atelier",
    description:
      "Reserva tu turno online en TEMPO Atelier, peluqueria unisex en Corrientes, Argentina.",
    locale: "es_AR",
    type: "website",
  },
};

export default function ReservarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm text-charcoal tracking-wide">
              Cargando...
            </p>
          </div>
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
