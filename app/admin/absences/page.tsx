"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, X, UserX } from "lucide-react";

interface Stylist {
  id: string;
  name: string;
}

interface Absence {
  id: string;
  stylistId: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  reason?: string | null;
  stylist: { id: string; name: string };
}

interface AbsenceFormData {
  stylistId: string;
  date: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  reason: string;
}

const emptyForm: AbsenceFormData = {
  stylistId: "",
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

export default function AbsencesPage() {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AbsenceFormData>(emptyForm);
  const [filterStylistId, setFilterStylistId] = useState("");

  const fetchAbsences = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStylistId) params.set("stylistId", filterStylistId);

      const res = await fetch(`/api/admin/stylist-absences?${params.toString()}`);
      if (!res.ok) throw new Error("Error al cargar ausencias");
      const json = await res.json();
      setAbsences(json);
    } catch {
      toast.error("No se pudieron cargar las ausencias");
    } finally {
      setLoading(false);
    }
  }, [filterStylistId]);

  const fetchStylists = async () => {
    try {
      const res = await fetch("/api/admin/stylists");
      if (!res.ok) return;
      const json = await res.json();
      setStylists(json);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  useEffect(() => {
    fetchAbsences();
  }, [fetchAbsences]);

  const openForm = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const body: Record<string, string | undefined> = {
        stylistId: form.stylistId,
        date: form.date,
        reason: form.reason || undefined,
      };
      if (!form.allDay) {
        body.startTime = form.startTime;
        body.endTime = form.endTime;
      }

      const res = await fetch("/api/admin/stylist-absences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al crear ausencia");

      toast.success("Ausencia creada");
      setShowForm(false);
      setForm(emptyForm);
      fetchAbsences();
    } catch {
      toast.error("No se pudo crear la ausencia");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/stylist-absences/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setAbsences((prev) => prev.filter((a) => a.id !== id));
      toast.success("Ausencia eliminada");
    } catch {
      toast.error("No se pudo eliminar la ausencia");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Ausencias de estilistas</h1>
          <p className="text-sm text-gray-500 mt-1">Registrar días o franjas de ausencia por estilista</p>
        </div>
        <button
          onClick={openForm}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva ausencia
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Filtrar por estilista:</label>
          <select
            value={filterStylistId}
            onChange={(e) => setFilterStylistId(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
          >
            <option value="">Todos</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Nueva ausencia</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Estilista <span className="text-red-500 font-bold">*</span></label>
                <select
                  value={form.stylistId}
                  onChange={(e) => setForm((f) => ({ ...f, stylistId: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                >
                  <option value="">Seleccionar...</option>
                  {stylists.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Fecha <span className="text-red-500 font-bold">*</span></label>
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
                  <label className="block text-xs font-medium text-gray-600 mb-1">Desde <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hasta <span className="text-red-500 font-bold">*</span></label>
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
                Crear ausencia
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Absences list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        </div>
      ) : (
        <div className="space-y-3">
          {absences.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400">
              <UserX className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No hay ausencias registradas</p>
            </div>
          ) : (
            absences.map((absence) => (
              <div key={absence.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-charcoal/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-semibold text-charcoal">
                          {absence.stylist.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {absence.stylist.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize ml-8">
                      {formatDate(absence.date)}
                    </p>
                    <p className="text-sm text-gray-500 ml-8">
                      {absence.startTime && absence.endTime
                        ? `${absence.startTime} - ${absence.endTime}`
                        : "Todo el día"}
                    </p>
                    {absence.reason && (
                      <p className="text-sm text-gray-400 mt-1 ml-8">{absence.reason}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(absence.id)}
                    disabled={deletingId === absence.id}
                    className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    title="Eliminar"
                  >
                    {deletingId === absence.id ? (
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
      )}
    </div>
  );
}
