"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, CalendarRange, CalendarClock, Loader2 } from "lucide-react";

interface DashboardBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  service: { name: string; price: number; duration: number };
  stylist: { name: string };
}

interface DashboardData {
  todayBookings: DashboardBooking[];
  todayCount: number;
  weekCount: number;
  monthCount: number;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  CONFIRMED: { label: "Confirmada", color: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "Completada", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelada", color: "bg-red-100 text-red-700" },
  NO_SHOW: { label: "No asistió", color: "bg-yellow-100 text-yellow-700" },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error("Error al cargar datos");
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("No se pudieron cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No se pudieron cargar los datos.</p>
        <button onClick={fetchDashboard} className="mt-3 text-sm text-charcoal underline">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen general del salón</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Reservas hoy"
          value={data.todayCount}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={CalendarRange}
          label="Esta semana"
          value={data.weekCount}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={CalendarClock}
          label="Este mes"
          value={data.monthCount}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Today's bookings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Reservas de hoy</h2>
        </div>

        {data.todayBookings.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No hay reservas para hoy</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.todayBookings.map((booking) => {
              const status = statusConfig[booking.status] || {
                label: booking.status,
                color: "bg-gray-100 text-gray-700",
              };
              return (
                <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  {/* Time */}
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-800">{booking.startTime}</span>
                    <span className="text-xs text-gray-400 ml-1">- {booking.endTime}</span>
                  </div>

                  {/* Customer */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{booking.customerName}</p>
                    <p className="text-xs text-gray-400">{booking.customerPhone}</p>
                  </div>

                  {/* Service */}
                  <div className="hidden sm:block flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">{booking.service.name}</p>
                    <p className="text-xs text-gray-400">{booking.service.duration} min</p>
                  </div>

                  {/* Stylist */}
                  <div className="hidden md:block flex-shrink-0">
                    <p className="text-sm text-gray-600">{booking.stylist.name}</p>
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
