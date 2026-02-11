"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Scissors,
  User,
  Calendar,
  Clock,
  MessageCircle,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

interface ConfirmationStepProps {
  bookingId: string;
  serviceName: string | null;
  servicePrice: number | null;
  serviceDuration: number | null;
  stylistName: string | null;
  date: string | null;
  startTime: string | null;
  customerName: string;
}

const SALON_WHATSAPP = "5493794000000";

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

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ConfirmationStep({
  bookingId,
  serviceName,
  servicePrice,
  serviceDuration,
  stylistName,
  date,
  startTime,
  customerName,
}: ConfirmationStepProps) {
  const [copied, setCopied] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hola! Soy ${customerName}. Acabo de reservar un turno para ${serviceName} el ${date ? formatDisplayDate(date) : ""} a las ${startTime} hs. Mi codigo de reserva es: ${bookingId}. Muchas gracias!`
  );
  const whatsappUrl = `https://wa.me/${SALON_WHATSAPP}?text=${whatsappMessage}`;

  function copyBookingId() {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto text-center">
      {/* Success icon */}
      <div className="mb-6 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-charcoal/5 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-charcoal" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
        Reserva confirmada
      </h2>
      <p className="text-charcoal/50 text-sm tracking-wide mb-8">
        Tu turno fue reservado con exito
      </p>

      {/* Booking ID */}
      <div className="bg-silver-gray/40 border border-ash-gray/40 rounded-sm p-4 mb-8 inline-flex items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-medium">
            Codigo de reserva
          </p>
          <p className="text-sm font-mono font-semibold text-charcoal mt-0.5">
            {bookingId}
          </p>
        </div>
        <button
          onClick={copyBookingId}
          className="p-2 hover:bg-ash-gray/30 rounded transition-colors"
          title="Copiar codigo"
        >
          {copied ? (
            <Check className="w-4 h-4 text-charcoal" />
          ) : (
            <Copy className="w-4 h-4 text-charcoal/40" />
          )}
        </button>
      </div>

      {/* Summary card */}
      <div className="border border-ash-gray/50 rounded-sm p-6 text-left mb-8">
        <div className="space-y-4">
          {serviceName && (
            <div className="flex items-start gap-3">
              <Scissors className="w-4 h-4 text-charcoal/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-charcoal">{serviceName}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  {servicePrice !== null && (
                    <span className="text-xs text-charcoal/60">
                      {formatPrice(servicePrice)}
                    </span>
                  )}
                  {serviceDuration !== null && (
                    <span className="text-xs text-charcoal/40">
                      {formatDuration(serviceDuration)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {stylistName && (
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-charcoal/40 shrink-0" />
              <p className="text-sm text-charcoal">{stylistName}</p>
            </div>
          )}

          {date && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-charcoal/40 mt-0.5 shrink-0" />
              <p className="text-sm text-charcoal capitalize">
                {formatDisplayDate(date)}
              </p>
            </div>
          )}

          {startTime && (
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-charcoal/40 shrink-0" />
              <p className="text-sm text-charcoal">{startTime} hs</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full btn-primary py-4 flex items-center justify-center gap-2
            bg-[#25D366] hover:bg-[#20bd5a]
          "
        >
          <span className="flex items-center gap-2 relative z-1">
            <MessageCircle className="w-4 h-4" />
            Confirmar por WhatsApp
          </span>
        </a>

        <Link
          href="/"
          className="
            w-full btn-outline py-4 flex items-center justify-center gap-2
          "
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
