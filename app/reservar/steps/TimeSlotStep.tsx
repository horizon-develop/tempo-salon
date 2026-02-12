"use client";

import { useEffect, useState } from "react";
import { Clock, Loader2 } from "lucide-react";

interface Slot {
  start: string; // "HH:mm"
  end: string;   // "HH:mm"
}

interface TimeSlotStepProps {
  serviceId: string;
  stylistId: string;
  date: string;
  selectedTime: string | null;
  onSelect: (start: string, end: string) => void;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function TimeSlotStep({
  serviceId,
  stylistId,
  date,
  selectedTime,
  onSelect,
}: TimeSlotStepProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/availability?date=${date}&serviceId=${serviceId}&stylistId=${stylistId}`
        );
        if (!res.ok) throw new Error("Error al cargar horarios");
        const data: Slot[] = await res.json();
        setSlots(data);
      } catch {
        setError("No pudimos cargar los horarios disponibles.");
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [serviceId, stylistId, date]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-charcoal animate-spin" />
        <p className="mt-4 text-sm text-charcoal tracking-wide">Cargando horarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal text-sm">{error}</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="animate-fade-in text-center py-20">
        <Clock className="w-10 h-10 text-charcoal mx-auto mb-4" />
        <p className="text-charcoal text-sm">
          No hay horarios disponibles para esta fecha.
        </p>
        <p className="text-charcoal text-xs mt-2">
          Probá seleccionando otro dia.
        </p>
      </div>
    );
  }

  // Group slots by morning / afternoon / evening
  const morning = slots.filter((s) => {
    const h = parseInt(s.start.split(":")[0]);
    return h < 12;
  });
  const afternoon = slots.filter((s) => {
    const h = parseInt(s.start.split(":")[0]);
    return h >= 12 && h < 18;
  });
  const evening = slots.filter((s) => {
    const h = parseInt(s.start.split(":")[0]);
    return h >= 18;
  });

  const groups = [
    { label: "Manana", slots: morning },
    { label: "Tarde", slots: afternoon },
    { label: "Noche", slots: evening },
  ].filter((g) => g.slots.length > 0);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
          Elegí el horario
        </h2>
        <p className="text-charcoal text-sm tracking-wide capitalize">
          {formatDisplayDate(date)}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-charcoal font-medium mb-3 ml-1">
              {group.label}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {group.slots.map((slot, index) => {
                const isSelected = selectedTime === slot.start;

                return (
                  <button
                    key={slot.start}
                    onClick={() => onSelect(slot.start, slot.end)}
                    className={`
                      py-3 px-2 rounded-sm text-sm font-medium tracking-wide
                      transition-all duration-300 cursor-pointer
                      opacity-0 animate-fade-in-up
                      ${isSelected
                        ? "bg-charcoal text-white shadow-lg scale-105"
                        : "bg-silver-gray/60 text-charcoal hover:bg-ash-gray/60 hover:-translate-y-0.5"
                      }
                    `}
                    style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
                  >
                    {slot.start}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
