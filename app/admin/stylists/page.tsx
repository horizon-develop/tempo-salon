"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  X,
  Users,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface StylistService {
  service: { id: string; name: string };
}

interface Stylist {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  order: number;
  services: StylistService[];
}

interface StylistFormData {
  name: string;
  phone: string;
  email: string;
}

const emptyForm: StylistFormData = {
  name: "",
  phone: "",
  email: "",
};

export default function StylistsPage() {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StylistFormData>(emptyForm);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stylists");
      if (!res.ok) throw new Error("Error al cargar estilistas");
      const json = await res.json();
      setStylists(json);
    } catch {
      toast.error("No se pudieron cargar los estilistas");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (stylist: Stylist) => {
    setEditingId(stylist.id);
    setForm({
      name: stylist.name,
      phone: stylist.phone || "",
      email: stylist.email || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const body = {
        name: form.name,
        phone: form.phone || undefined,
        email: form.email || undefined,
      };

      if (editingId) {
        const res = await fetch(`/api/admin/stylists/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Error al actualizar");
        toast.success("Estilista actualizado");
      } else {
        const res = await fetch("/api/admin/stylists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Error al crear");
        toast.success("Estilista creado");
      }

      closeForm();
      fetchStylists();
    } catch {
      toast.error("No se pudo guardar el estilista");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (stylist: Stylist) => {
    try {
      const res = await fetch(`/api/admin/stylists/${stylist.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !stylist.isActive }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setStylists((prev) =>
        prev.map((s) =>
          s.id === stylist.id ? { ...s, isActive: !s.isActive } : s
        )
      );
      toast.success(stylist.isActive ? "Estilista desactivado" : "Estilista activado");
    } catch {
      toast.error("No se pudo actualizar el estado");
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
          <h1 className="text-2xl font-semibold text-gray-800">Estilistas</h1>
          <p className="text-sm text-gray-500 mt-1">Gestionar el equipo del salón</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo estilista
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingId ? "Editar estilista" : "Nuevo estilista"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="Ej: María García"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Opcional"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Opcional"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeForm}
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
                {editingId ? "Guardar cambios" : "Crear estilista"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stylists list */}
      <div className="grid gap-4">
        {stylists.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No hay estilistas registrados</p>
          </div>
        ) : (
          stylists.map((stylist) => (
            <div
              key={stylist.id}
              className={`bg-white rounded-xl border border-gray-200 p-5 ${
                !stylist.isActive ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-charcoal/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-charcoal">
                      {stylist.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-gray-800">{stylist.name}</h3>
                      {!stylist.isActive && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          Inactivo
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                      {stylist.phone && <span>{stylist.phone}</span>}
                      {stylist.email && <span>{stylist.email}</span>}
                    </div>
                    {stylist.services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {stylist.services.map((ss) => (
                          <span
                            key={ss.service.id}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {ss.service.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(stylist)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title={stylist.isActive ? "Desactivar" : "Activar"}
                  >
                    {stylist.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(stylist)}
                    className="text-gray-400 hover:text-charcoal transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
