"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  X,
  Scissors,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface ServiceStylist {
  stylist: { id: string; name: string };
}

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
  order: number;
  stylists: ServiceStylist[];
}

interface Stylist {
  id: string;
  name: string;
  isActive: boolean;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: string;
  duration: string;
  stylistIds: string[];
}

const emptyForm: ServiceFormData = {
  name: "",
  description: "",
  price: "",
  duration: "",
  stylistIds: [],
};

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("es-AR");
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceFormData>(emptyForm);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [sRes, stRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/stylists"),
      ]);
      if (!sRes.ok || !stRes.ok) throw new Error("Error al cargar datos");
      const [sData, stData] = await Promise.all([sRes.json(), stRes.json()]);
      setServices(sData);
      setStylists(stData);
    } catch {
      toast.error("No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      name: service.name,
      description: service.description || "",
      price: String(service.price / 100),
      duration: String(service.duration),
      stylistIds: service.stylists.map((s) => s.stylist.id),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const toggleStylist = (id: string) => {
    setForm((prev) => ({
      ...prev,
      stylistIds: prev.stylistIds.includes(id)
        ? prev.stylistIds.filter((sid) => sid !== id)
        : [...prev.stylistIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const priceInCents = Math.round(parseFloat(form.price) * 100);
    const durationMin = parseInt(form.duration, 10);

    if (isNaN(priceInCents) || priceInCents <= 0) {
      toast.error("El precio debe ser mayor a 0");
      setSaving(false);
      return;
    }
    if (isNaN(durationMin) || durationMin < 15) {
      toast.error("La duración mínima es 15 minutos");
      setSaving(false);
      return;
    }

    try {
      if (editingId) {
        // Update service
        const res = await fetch(`/api/admin/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            description: form.description || undefined,
            price: priceInCents,
            duration: durationMin,
          }),
        });
        if (!res.ok) throw new Error("Error al actualizar servicio");

        // Update stylist assignments
        const stRes = await fetch(`/api/admin/services/${editingId}/stylists`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stylistIds: form.stylistIds }),
        });
        if (!stRes.ok) throw new Error("Error al actualizar estilistas");

        toast.success("Servicio actualizado");
      } else {
        // Create service
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            description: form.description || undefined,
            price: priceInCents,
            duration: durationMin,
          }),
        });
        if (!res.ok) throw new Error("Error al crear servicio");
        const created = await res.json();

        // Assign stylists if any
        if (form.stylistIds.length > 0) {
          await fetch(`/api/admin/services/${created.id}/stylists`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stylistIds: form.stylistIds }),
          });
        }

        toast.success("Servicio creado");
      }

      closeForm();
      fetchAll();
    } catch {
      toast.error("No se pudo guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, isActive: !s.isActive } : s
        )
      );
      toast.success(service.isActive ? "Servicio desactivado" : "Servicio activado");
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
          <h1 className="text-2xl font-semibold text-gray-800">Servicios</h1>
          <p className="text-sm text-gray-500 mt-1">Gestionar los servicios del salón</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo servicio
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingId ? "Editar servicio" : "Nuevo servicio"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="Ej: Corte masculino"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Opcional"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Precio (en pesos) <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  required
                  placeholder="Ej: 3500"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Duración (minutos) <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="number"
                  min="15"
                  step="5"
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  required
                  placeholder="Ej: 30"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
                />
              </div>
            </div>

            {/* Stylists checkboxes */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Estilistas asignados</label>
              <div className="flex flex-wrap gap-2">
                {stylists
                  .filter((s) => s.isActive)
                  .map((s) => (
                    <label
                      key={s.id}
                      className={`
                        inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer border transition-colors
                        ${
                          form.stylistIds.includes(s.id)
                            ? "border-charcoal bg-charcoal text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={form.stylistIds.includes(s.id)}
                        onChange={() => toggleStylist(s.id)}
                        className="sr-only"
                      />
                      {s.name}
                    </label>
                  ))}
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
                {editingId ? "Guardar cambios" : "Crear servicio"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services list */}
      <div className="grid gap-4">
        {services.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400">
            <Scissors className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No hay servicios registrados</p>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl border border-gray-200 p-5 ${
                !service.isActive ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-gray-800">{service.name}</h3>
                    {!service.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Inactivo
                      </span>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span className="font-medium">${formatPrice(service.price)}</span>
                    <span>{service.duration} min</span>
                  </div>
                  {service.stylists.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {service.stylists.map((ss) => (
                        <span
                          key={ss.stylist.id}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {ss.stylist.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(service)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title={service.isActive ? "Desactivar" : "Activar"}
                  >
                    {service.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(service)}
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
