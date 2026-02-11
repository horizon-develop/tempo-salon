"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Search,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  service: { name: string; price: number; duration: number };
  stylist: { name: string };
}

interface Stylist {
  id: string;
  name: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  CONFIRMED: { label: "Confirmada", color: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "Completada", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelada", color: "bg-red-100 text-red-700" },
  NO_SHOW: { label: "No asistió", color: "bg-yellow-100 text-yellow-700" },
};

const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "CONFIRMED", label: "Confirmada" },
  { value: "COMPLETED", label: "Completada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "NO_SHOW", label: "No asistió" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stylistId, setStylistId] = useState("");
  const [status, setStatus] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (stylistId) params.set("stylistId", stylistId);
      if (status) params.set("status", status);

      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      if (!res.ok) throw new Error("Error al cargar reservas");
      const json = await res.json();
      setBookings(json);
    } catch {
      toast.error("No se pudieron cargar las reservas");
    } finally {
      setLoading(false);
    }
  }, [from, to, stylistId, status]);

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
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
      const label = statusConfig[newStatus]?.label || newStatus;
      toast.success(`Reserva marcada como: ${label}`);
    } catch {
      toast.error("No se pudo actualizar la reserva");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Reservas</h1>
        <p className="text-sm text-gray-500 mt-1">Gestionar todas las reservas del salón</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Filtros</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Desde</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Hasta</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Estilista</label>
            <select
              value={stylistId}
              onChange={(e) => setStylistId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
            >
              <option value="">Todos</option>
              {stylists.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No se encontraron reservas</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden lg:grid grid-cols-[100px_80px_1fr_120px_1fr_120px_120px] gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Fecha</span>
              <span>Hora</span>
              <span>Cliente</span>
              <span>Teléfono</span>
              <span>Servicio</span>
              <span>Estilista</span>
              <span>Estado</span>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-gray-50">
              {bookings.map((booking) => {
                const st = statusConfig[booking.status] || {
                  label: booking.status,
                  color: "bg-gray-100 text-gray-700",
                };
                const isExpanded = expandedId === booking.id;

                return (
                  <div key={booking.id}>
                    <div
                      className="lg:grid lg:grid-cols-[100px_80px_1fr_120px_1fr_120px_120px] gap-2 px-6 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col lg:flex-row lg:items-center"
                      onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                    >
                      <span className="text-sm text-gray-700 font-medium lg:font-normal">
                        {formatDate(booking.date)}
                      </span>
                      <span className="text-sm text-gray-700">{booking.startTime}</span>
                      <span className="text-sm text-gray-800 font-medium truncate">
                        {booking.customerName}
                      </span>
                      <span className="text-sm text-gray-500 hidden lg:block">{booking.customerPhone}</span>
                      <span className="text-sm text-gray-600 truncate">{booking.service.name}</span>
                      <span className="text-sm text-gray-600 hidden lg:block">{booking.stylist.name}</span>
                      <div className="flex items-center gap-2 mt-2 lg:mt-0">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${st.color}`}>
                          {st.label}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 hidden lg:block" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
                        )}
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-400 text-xs">Cliente</span>
                            <p className="text-gray-800 font-medium">{booking.customerName}</p>
                            <p className="text-gray-500">{booking.customerPhone}</p>
                            {booking.customerEmail && (
                              <p className="text-gray-500">{booking.customerEmail}</p>
                            )}
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Servicio</span>
                            <p className="text-gray-800">{booking.service.name}</p>
                            <p className="text-gray-500">
                              ${(booking.service.price / 100).toLocaleString("es-AR")} &middot; {booking.service.duration} min
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Horario</span>
                            <p className="text-gray-800">
                              {booking.startTime} - {booking.endTime}
                            </p>
                            <p className="text-gray-500">{booking.stylist.name}</p>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mb-4">
                            <span className="text-gray-400 text-xs">Notas</span>
                            <p className="text-sm text-gray-600">{booking.notes}</p>
                          </div>
                        )}
                        {/* Actions */}
                        {booking.status === "CONFIRMED" && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(booking.id, "COMPLETED");
                              }}
                              disabled={updatingId === booking.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Completar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(booking.id, "CANCELLED");
                              }}
                              disabled={updatingId === booking.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Cancelar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(booking.id, "NO_SHOW");
                              }}
                              disabled={updatingId === booking.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors disabled:opacity-50"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                              No asistió
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
