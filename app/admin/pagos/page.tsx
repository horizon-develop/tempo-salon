"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Wallet } from "lucide-react";

interface PaymentConfigData {
  id?: string;
  isActive: boolean;
  depositType: "FIXED" | "PERCENTAGE";
  depositValue: number;
}

function formatPesos(cents: number): string {
  return "$" + Math.floor(cents / 100).toLocaleString("es-AR");
}

export default function PagosPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PaymentConfigData>({
    isActive: false,
    depositType: "PERCENTAGE",
    depositValue: 50,
  });

  // Local input state (pesos string for FIXED, number string for PERCENTAGE)
  const [inputValue, setInputValue] = useState("50");

  useEffect(() => {
    fetch("/api/admin/payment-config")
      .then((res) => res.json())
      .then((data: PaymentConfigData) => {
        setForm(data);
        if (data.depositType === "FIXED") {
          setInputValue(String(Math.floor(data.depositValue / 100)));
        } else {
          setInputValue(String(data.depositValue));
        }
      })
      .catch(() => toast.error("No se pudo cargar la configuración de pagos"))
      .finally(() => setLoading(false));
  }, []);

  function handleTypeChange(type: "FIXED" | "PERCENTAGE") {
    setForm((f) => ({ ...f, depositType: type }));
    setInputValue(type === "PERCENTAGE" ? "50" : "5000");
  }

  function getDepositValueCents(): number {
    const num = parseInt(inputValue, 10) || 0;
    return form.depositType === "FIXED" ? num * 100 : num;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const depositValue = getDepositValueCents();

    if (form.depositType === "PERCENTAGE" && (depositValue < 1 || depositValue > 100)) {
      toast.error("El porcentaje debe estar entre 1 y 100");
      return;
    }
    if (form.depositType === "FIXED" && depositValue <= 0) {
      toast.error("El monto debe ser mayor a $0");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/payment-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, depositValue }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      const updated: PaymentConfigData = await res.json();
      setForm(updated);
      toast.success("Configuración guardada");
    } catch {
      toast.error("No se pudo guardar la configuración");
    } finally {
      setSaving(false);
    }
  }

  // Example calculation using a sample price
  const samplePrice = 500000; // $5000 (50_000_00 cents → $5000)
  const depositValue = getDepositValueCents();
  const exampleDeposit =
    form.depositType === "FIXED"
      ? Math.min(depositValue, samplePrice)
      : Math.round((samplePrice * depositValue) / 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Pagos y depósitos</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configurá el monto de seña que se cobra al reservar vía Uala
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Enable toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Habilitar seña / depósito</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Cuando está activo, los clientes verán el monto de seña al reservar
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
              ${form.isActive ? "bg-charcoal" : "bg-gray-200"}
            `}
            aria-checked={form.isActive}
            role="switch"
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
                ${form.isActive ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>
        </div>

        {/* Config when active */}
        {form.isActive && (
          <div className="space-y-5 pt-2 border-t border-gray-100">
            {/* Deposit type */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Tipo de seña</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="depositType"
                    checked={form.depositType === "PERCENTAGE"}
                    onChange={() => handleTypeChange("PERCENTAGE")}
                    className="w-4 h-4 text-charcoal border-gray-300 focus:ring-charcoal/20"
                  />
                  <span className="text-sm text-gray-700">Porcentaje (%)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="depositType"
                    checked={form.depositType === "FIXED"}
                    onChange={() => handleTypeChange("FIXED")}
                    className="w-4 h-4 text-charcoal border-gray-300 focus:ring-charcoal/20"
                  />
                  <span className="text-sm text-gray-700">Monto fijo (ARS)</span>
                </label>
              </div>
            </div>

            {/* Value input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {form.depositType === "PERCENTAGE" ? "Porcentaje (1–100)" : "Monto en pesos"}
              </label>
              <div className="relative w-48">
                {form.depositType === "FIXED" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                )}
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  min={1}
                  max={form.depositType === "PERCENTAGE" ? 100 : undefined}
                  step={1}
                  className={`
                    w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-700
                    focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal
                    ${form.depositType === "FIXED" ? "pl-7 pr-3" : "px-3"}
                  `}
                />
                {form.depositType === "PERCENTAGE" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                )}
              </div>
            </div>

            {/* Example */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-charcoal" />
                <span className="font-medium text-gray-700 text-xs uppercase tracking-wide">Ejemplo de cálculo</span>
              </div>
              <p>
                Para un servicio de <span className="font-medium">{formatPesos(samplePrice)}</span>:
              </p>
              <div className="mt-1.5 space-y-0.5">
                <div className="flex justify-between">
                  <span>Seña a cobrar</span>
                  <span className="font-medium text-charcoal">{formatPesos(exampleDeposit)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Resto en el local</span>
                  <span>{formatPesos(samplePrice - exampleDeposit)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
