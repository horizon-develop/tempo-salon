"use client";

import { useEffect, useState } from "react";
import { Clock, Scissors, Loader2 } from "lucide-react";
import { type PaymentConfig, calcDeposit } from "../BookingWizard";

interface Stylist {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  stylists: Stylist[];
}

interface ServiceStepProps {
  selectedServiceId: string | null;
  onSelect: (service: Service) => void;
  paymentConfig: PaymentConfig | null;
}

function formatPrice(cents: number): string {
  const whole = Math.floor(cents / 100);
  return "$" + whole.toLocaleString("es-AR");
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

export default function ServiceStep({ selectedServiceId, onSelect, paymentConfig }: ServiceStepProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Error al cargar servicios");
        const data = await res.json();
        setServices(data);
      } catch {
        setError("No pudimos cargar los servicios. Intentalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-charcoal animate-spin" />
        <p className="mt-4 text-sm text-charcoal tracking-wide">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 btn-outline text-xs"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
          Elegí tu servicio
        </h2>
        <p className="text-charcoal text-sm tracking-wide">
          Seleccioná el servicio que deseas reservar
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
        {services.map((service, index) => {
          const isSelected = selectedServiceId === service.id;
          const deposit = calcDeposit(service.price, paymentConfig);

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`
                group relative text-left p-6 rounded-sm border transition-all duration-500
                cursor-pointer opacity-0 animate-fade-in-up
                ${isSelected
                  ? "border-charcoal bg-charcoal/[0.03] shadow-lg"
                  : "border-ash-gray/50 hover:border-charcoal/30 hover:shadow-md hover:-translate-y-1"
                }
              `}
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
            >
              {/* Selection indicator */}
              <div
                className={`
                  absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${isSelected
                    ? "border-charcoal bg-charcoal"
                    : "border-ash-gray group-hover:border-charcoal/40"
                  }
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>

              {/* Service name */}
              <div className="flex items-start gap-3 mb-3 pr-8">
                <Scissors className="w-4 h-4 text-charcoal mt-1 shrink-0" />
                <h3 className="font-medium text-charcoal text-base tracking-wide">
                  {service.name}
                </h3>
              </div>

              {/* Description */}
              {service.description && (
                <p className="text-charcoal text-xs mb-4 ml-7 line-clamp-2">
                  {service.description}
                </p>
              )}

              {/* Price and duration */}
              <div className="flex items-center justify-between ml-7">
                <div className="flex items-center gap-4">
                  <span className="text-charcoal font-semibold text-lg">
                    {formatPrice(service.price)}
                  </span>
                  <span className="flex items-center gap-1 text-charcoal text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(service.duration)}
                  </span>
                </div>
              </div>

              {/* Deposit */}
              {deposit > 0 && (
                <p className="ml-7 mt-1.5 text-xs text-charcoal">
                  Seña: {formatPrice(deposit)}
                </p>
              )}

              {/* Stylists */}
              {service.stylists.length > 0 && (
                <div className="mt-3 ml-7">
                  <p className="text-[10px] text-charcoal uppercase tracking-widest">
                    {service.stylists.map((s) => s.name).join(" / ")}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
