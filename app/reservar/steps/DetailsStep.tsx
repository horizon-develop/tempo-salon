"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Scissors,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface BookingSummary {
  serviceName: string | null;
  servicePrice: number | null;
  serviceDuration: number | null;
  stylistName: string | null;
  date: string | null;
  startTime: string | null;
}

interface DetailsStepProps {
  summary: BookingSummary;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => Promise<void>;
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

export default function DetailsStep({
  summary,
  customerName,
  customerPhone,
  customerEmail,
  notes,
  onChange,
  onSubmit,
}: DetailsStepProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.customerName = "El nombre es obligatorio (minimo 2 caracteres)";
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 6) {
      errs.customerPhone = "El telefono es obligatorio (minimo 6 digitos)";
    }
    if (customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      errs.customerEmail = "El email no es valido";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
          Tus datos
        </h2>
        <p className="text-charcoal/50 text-sm tracking-wide">
          Completa tus datos para confirmar la reserva
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal/60 font-medium mb-2">
              <User className="w-3.5 h-3.5" />
              Nombre completo <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                onChange("customerName", e.target.value);
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: "" }));
              }}
              placeholder="Tu nombre"
              className={`
                w-full px-4 py-3 bg-silver-gray/40 border rounded-sm text-sm text-charcoal
                placeholder:text-charcoal/30 outline-none transition-all duration-300
                focus:border-charcoal focus:bg-white
                ${errors.customerName ? "border-red-400" : "border-ash-gray/50"}
              `}
            />
            {errors.customerName && (
              <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                <AlertCircle className="w-3 h-3" />
                {errors.customerName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal/60 font-medium mb-2">
              <Phone className="w-3.5 h-3.5" />
              Teléfono <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => {
                onChange("customerPhone", e.target.value);
                if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: "" }));
              }}
              placeholder="Ej: 3794123456"
              className={`
                w-full px-4 py-3 bg-silver-gray/40 border rounded-sm text-sm text-charcoal
                placeholder:text-charcoal/30 outline-none transition-all duration-300
                focus:border-charcoal focus:bg-white
                ${errors.customerPhone ? "border-red-400" : "border-ash-gray/50"}
              `}
            />
            {errors.customerPhone && (
              <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                <AlertCircle className="w-3 h-3" />
                {errors.customerPhone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal/60 font-medium mb-2">
              <Mail className="w-3.5 h-3.5" />
              Email (opcional)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => {
                onChange("customerEmail", e.target.value);
                if (errors.customerEmail) setErrors((prev) => ({ ...prev, customerEmail: "" }));
              }}
              placeholder="tu@email.com"
              className={`
                w-full px-4 py-3 bg-silver-gray/40 border rounded-sm text-sm text-charcoal
                placeholder:text-charcoal/30 outline-none transition-all duration-300
                focus:border-charcoal focus:bg-white
                ${errors.customerEmail ? "border-red-400" : "border-ash-gray/50"}
              `}
            />
            {errors.customerEmail && (
              <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                <AlertCircle className="w-3 h-3" />
                {errors.customerEmail}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal/60 font-medium mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => onChange("notes", e.target.value)}
              placeholder="Algo que quieras que sepamos..."
              rows={3}
              className="
                w-full px-4 py-3 bg-silver-gray/40 border border-ash-gray/50 rounded-sm text-sm text-charcoal
                placeholder:text-charcoal/30 outline-none transition-all duration-300
                focus:border-charcoal focus:bg-white resize-none
              "
            />
          </div>

          {/* Mobile summary (visible only on mobile) */}
          <div className="lg:hidden">
            <SummaryCard summary={summary} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed
              disabled:transform-none
            "
          >
            <span className="flex items-center justify-center gap-2">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Reservando...
                </>
              ) : (
                "Confirmar reserva"
              )}
            </span>
          </button>
        </form>

        {/* Desktop summary (hidden on mobile) */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-8">
            <SummaryCard summary={summary} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ summary }: { summary: BookingSummary }) {
  return (
    <div className="border border-ash-gray/50 rounded-sm p-6 bg-silver-gray/20">
      <h3 className="text-xs uppercase tracking-[0.2em] text-charcoal/50 font-medium mb-5">
        Resumen de tu reserva
      </h3>

      <div className="space-y-4">
        {summary.serviceName && (
          <div className="flex items-start gap-3">
            <Scissors className="w-4 h-4 text-charcoal/40 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-charcoal">{summary.serviceName}</p>
              <div className="flex items-center gap-3 mt-0.5">
                {summary.servicePrice !== null && (
                  <span className="text-xs text-charcoal/60">
                    {formatPrice(summary.servicePrice)}
                  </span>
                )}
                {summary.serviceDuration !== null && (
                  <span className="text-xs text-charcoal/40">
                    {formatDuration(summary.serviceDuration)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {summary.stylistName && (
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-charcoal/40 shrink-0" />
            <p className="text-sm text-charcoal">{summary.stylistName}</p>
          </div>
        )}

        {summary.date && (
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-charcoal/40 mt-0.5 shrink-0" />
            <p className="text-sm text-charcoal capitalize">
              {formatDisplayDate(summary.date)}
            </p>
          </div>
        )}

        {summary.startTime && (
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-charcoal/40 shrink-0" />
            <p className="text-sm text-charcoal">{summary.startTime} hs</p>
          </div>
        )}
      </div>

      {summary.servicePrice !== null && (
        <>
          <div className="silver-line my-5" />
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.15em] text-charcoal/50 font-medium">
              Total
            </span>
            <span className="text-lg font-semibold text-charcoal">
              {formatPrice(summary.servicePrice)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
