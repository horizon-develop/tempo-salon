"use client";

import { useEffect, useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { Loader2 } from "lucide-react";
import "react-day-picker/style.css";

interface DateInfo {
  date: string; // "YYYY-MM-DD"
  hasSlots: boolean;
}

interface DateStepProps {
  serviceId: string;
  stylistId: string;
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export default function DateStep({ serviceId, stylistId, selectedDate, onSelect }: DateStepProps) {
  const [dates, setDates] = useState<DateInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDates() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/availability/dates?serviceId=${serviceId}&stylistId=${stylistId}&days=60`
        );
        if (!res.ok) throw new Error("Error al cargar fechas");
        const data: DateInfo[] = await res.json();
        setDates(data);
      } catch {
        setError("No pudimos cargar las fechas disponibles.");
      } finally {
        setLoading(false);
      }
    }
    fetchDates();
  }, [serviceId, stylistId]);

  // Build sets for available and unavailable dates
  const { availableDates, disabledDates } = useMemo(() => {
    const available = new Set<string>();
    const disabled: Date[] = [];

    for (const d of dates) {
      if (d.hasSlots) {
        available.add(d.date);
      } else {
        const [y, m, day] = d.date.split("-").map(Number);
        disabled.push(new Date(y, m - 1, day));
      }
    }

    return { availableDates: available, disabledDates: disabled };
  }, [dates]);

  // Convert selectedDate string to Date object
  const selectedDayObj = useMemo(() => {
    if (!selectedDate) return undefined;
    const [y, m, d] = selectedDate.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [selectedDate]);

  // Today and max date for range
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return d;
  }, []);

  function handleDayClick(day: Date) {
    const y = day.getFullYear();
    const m = String(day.getMonth() + 1).padStart(2, "0");
    const d = String(day.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${d}`;

    if (availableDates.has(dateStr)) {
      onSelect(dateStr);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-charcoal animate-spin" />
        <p className="mt-4 text-sm text-charcoal/60 tracking-wide">Cargando disponibilidad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal/70 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
          Elegí la fecha
        </h2>
        <p className="text-charcoal/50 text-sm tracking-wide">
          Los dias habilitados tienen turnos disponibles
        </p>
      </div>

      <div className="flex justify-center">
        <div className="rdp-tempo">
          <DayPicker
            mode="single"
            locale={es}
            selected={selectedDayObj}
            onSelect={(day) => {
              if (day) handleDayClick(day);
            }}
            disabled={[
              { before: today },
              { after: maxDate },
              ...disabledDates.map((d) => d),
            ]}
            startMonth={today}
            endMonth={maxDate}
            weekStartsOn={1}
            modifiers={{
              available: (day) => {
                const y = day.getFullYear();
                const m = String(day.getMonth() + 1).padStart(2, "0");
                const d = String(day.getDate()).padStart(2, "0");
                return availableDates.has(`${y}-${m}-${d}`);
              },
            }}
            modifiersClassNames={{
              available: "rdp-day-available",
            }}
          />
        </div>
      </div>

      <style>{`
        .rdp-tempo {
          --rdp-accent-color: #9B9898;
          --rdp-accent-background-color: #F5F4F4;
          --rdp-day-height: 44px;
          --rdp-day-width: 44px;
          font-family: var(--font-body);
        }

        .rdp-tempo .rdp-root {
          --rdp-accent-color: #9B9898;
          --rdp-accent-background-color: #F5F4F4;
        }

        .rdp-tempo .rdp-month_caption {
          font-weight: 500;
          text-transform: capitalize;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: #9B9898;
        }

        .rdp-tempo .rdp-button_next,
        .rdp-tempo .rdp-button_previous {
          color: #9B9898;
        }

        .rdp-tempo .rdp-button_next:hover,
        .rdp-tempo .rdp-button_previous:hover {
          background-color: #F5F4F4;
        }

        .rdp-tempo .rdp-weekday {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9B9898;
        }

        .rdp-tempo .rdp-day button {
          font-size: 0.85rem;
          font-weight: 400;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .rdp-tempo .rdp-day button:hover:not(:disabled) {
          background-color: #E8E5E5;
        }

        .rdp-tempo .rdp-selected .rdp-day_button {
          background-color: #9B9898;
          color: white;
          font-weight: 500;
        }

        .rdp-tempo .rdp-disabled .rdp-day_button {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .rdp-tempo .rdp-day-available .rdp-day_button:not(.rdp-selected .rdp-day_button) {
          font-weight: 500;
          color: #333;
        }

        .rdp-tempo .rdp-today:not(.rdp-selected) .rdp-day_button {
          font-weight: 700;
          border: 1px solid #E8E5E5;
        }
      `}</style>
    </div>
  );
}
