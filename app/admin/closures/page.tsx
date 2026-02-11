"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, X, XCircle } from "lucide-react";

interface Closure {
  id: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  reason?: string | null;
}

interface ClosureFormData {
  date: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  reason: string;
}

const emptyForm: ClosureFormData = {
  date: "",
  allDay: true,
  startTime: "09:00",
  endTime: "18:00",
  reason: "",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ClosuresPage() {
  const [closures, setClosures] = useState<Closure[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ClosureFormData>(emptyForm);

  useEffect(() => {
    fetchClosures();
  }, []);

  const fetchClosures = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/salon-closures");
      if (!res.ok) throw new Error("Error al cargar cierres");
      const json = await res.json();
      setClosures(json);
    } catch {
      toast.error("No se pudieron cargar los cierres");
    } finally {
      setLoading(false);
    }
  };

  const openForm = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const body: Record<string, string | undefined> = {
        date: form.date,
        reason: form.reason || undefined,
      };
      if (!form.allDay) {
        body.startTime = form.startTime;
        body.endTime = form.endTime;
      }

      const res = await fetch("/api/admin/salon-closures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al crear cierre");

      toast.success("Cierre creado");
      setShowForm(false);
      setForm(emptyForm);
      fetchClosures();
    } catch {
      toast.error("No se pudo crear el cierre");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/salon-closures/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setClosures((prev) => prev.filter((c) => c.id !== id));
      toast.success("Cierre eliminado");
    } catch {
      toast.error("No se pudo eliminar el cierre");
    } finally {
      setDeletingId(null);
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
          <h1 className="text-2xl font-semibold text-gray-800">Cierres del salón</h1>
          <p className="text-sm text-gray-500 mt-1">Días o franjas horarias en que el salón no atiende</p>
        </div>
        <button
          onClick={openForm}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo cierre
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Nuevo cierre</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Fecha</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Motivo</label>
                <input
                  type="text"
                  value={form.reason}
                  onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                  placeholder="Opcional"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
            </div>

            {/* All day toggle */}
            <div>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.allDay}
                  onChange={(e) => setForm((f) => ({ ...f, allDay: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-charcoal focus:ring-charcoal/20"
                />
                <span className="text-sm text-gray-700">Todo el día</span>
              </label>
            </div>

            {!form.allDay && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Desde</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hasta</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Crear cierre
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Closures list */}
      <div className="space-y-3">
        {closures.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400">
            <XCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No hay cierres programados</p>
          </div>
        ) : (
          closures.map((closure) => (
            <div key={closure.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {formatDate(closure.date)}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {closure.startTime && closure.endTime
                      ? `${closure.startTime} - ${closure.endTime}`
                      : "Todo el día"}
                  </p>
                  {closure.reason && (
                    <p className="text-sm text-gray-400 mt-1">{closure.reason}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(closure.id)}
                  disabled={deletingId === closure.id}
                  className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  title="Eliminar"
                >
                  {deletingId === closure.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
