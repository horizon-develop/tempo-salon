"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Clock, Save } from "lucide-react";

interface ScheduleBlock {
  id?: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

const DAYS_OF_WEEK = [
  { key: "MONDAY", label: "Lunes" },
  { key: "TUESDAY", label: "Martes" },
  { key: "WEDNESDAY", label: "Miércoles" },
  { key: "THURSDAY", label: "Jueves" },
  { key: "FRIDAY", label: "Viernes" },
  { key: "SATURDAY", label: "Sábado" },
  { key: "SUNDAY", label: "Domingo" },
];

const HOURS = Array.from({ length: 15 }, (_, i) => {
  const h = i + 7; // 07:00 to 21:00
  return `${String(h).padStart(2, "0")}:00`;
});

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToPercent(minutes: number) {
  // Map 07:00 (420) to 0% and 22:00 (1320) to 100%
  const start = 420;
  const end = 1320;
  return ((minutes - start) / (end - start)) * 100;
}

export default function SchedulePage() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/salon-schedule");
      if (!res.ok) throw new Error("Error al cargar horarios");
      const json = await res.json();
      setBlocks(json);
    } catch {
      toast.error("No se pudieron cargar los horarios");
    } finally {
      setLoading(false);
    }
  };

  const addBlock = (dayOfWeek: string) => {
    setBlocks((prev) => [
      ...prev,
      { dayOfWeek, startTime: "09:00", endTime: "18:00", isActive: true },
    ]);
  };

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, field: keyof ScheduleBlock, value: string) => {
    setBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        blocks: blocks.map((b) => ({
          dayOfWeek: b.dayOfWeek,
          startTime: b.startTime,
          endTime: b.endTime,
          isActive: b.isActive ?? true,
        })),
      };

      const res = await fetch("/api/admin/salon-schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar");
      const updated = await res.json();
      setBlocks(updated);
      toast.success("Horarios guardados");
    } catch {
      toast.error("No se pudieron guardar los horarios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Horarios del salón</h1>
          <p className="text-sm text-gray-500 mt-1">Configurar horarios de atención semanales</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar
        </button>
      </div>

      {/* Schedule grid */}
      <div className="space-y-4">
        {DAYS_OF_WEEK.map((day) => {
          const dayBlocks = blocks
            .map((b, idx) => ({ ...b, _idx: idx }))
            .filter((b) => b.dayOfWeek === day.key);

          return (
            <div key={day.key} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">{day.label}</h3>
                <button
                  onClick={() => addBlock(day.key)}
                  className="inline-flex items-center gap-1 text-xs text-charcoal hover:text-charcoal/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar bloque
                </button>
              </div>

              {dayBlocks.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Sin horario - cerrado</p>
              ) : (
                <div className="space-y-3">
                  {/* Visual bar */}
                  <div className="relative h-8 bg-gray-50 rounded-lg overflow-hidden">
                    {/* Hour markers */}
                    {HOURS.map((hour) => {
                      const left = minutesToPercent(timeToMinutes(hour));
                      return (
                        <div
                          key={hour}
                          className="absolute top-0 h-full border-l border-gray-200"
                          style={{ left: `${left}%` }}
                        >
                          <span className="absolute -top-0.5 left-0.5 text-[9px] text-gray-400">
                            {hour.slice(0, 2)}
                          </span>
                        </div>
                      );
                    })}
                    {/* Time blocks */}
                    {dayBlocks.map((block) => {
                      const left = minutesToPercent(timeToMinutes(block.startTime));
                      const right = minutesToPercent(timeToMinutes(block.endTime));
                      const width = right - left;
                      return (
                        <div
                          key={block._idx}
                          className="absolute top-1.5 h-5 bg-charcoal/80 rounded"
                          style={{ left: `${left}%`, width: `${width}%` }}
                          title={`${block.startTime} - ${block.endTime}`}
                        />
                      );
                    })}
                  </div>

                  {/* Block editors */}
                  {dayBlocks.map((block) => (
                    <div key={block._idx} className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="time"
                        value={block.startTime}
                        onChange={(e) => updateBlock(block._idx, "startTime", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                      />
                      <span className="text-gray-400 text-sm">a</span>
                      <input
                        type="time"
                        value={block.endTime}
                        onChange={(e) => updateBlock(block._idx, "endTime", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                      />
                      <button
                        onClick={() => removeBlock(block._idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar bloque"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
