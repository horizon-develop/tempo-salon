"use client";

import { useReducer, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import StepIndicator from "./components/StepIndicator";
import ServiceStep from "./steps/ServiceStep";
import StylistStep from "./steps/StylistStep";
import DateStep from "./steps/DateStep";
import TimeSlotStep from "./steps/TimeSlotStep";
import DetailsStep from "./steps/DetailsStep";
import ConfirmationStep from "./steps/ConfirmationStep";

// ---------------------------------------------------------------------------
// Payment Config
// ---------------------------------------------------------------------------

export interface PaymentConfig {
  isActive: boolean;
  depositType: "FIXED" | "PERCENTAGE";
  depositValue: number;
}

export function calcDeposit(servicePrice: number, config: PaymentConfig | null): number {
  if (!config?.isActive) return 0;
  if (config.depositType === "FIXED") return Math.min(config.depositValue, servicePrice);
  return Math.round((servicePrice * config.depositValue) / 100);
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface BookingState {
  step: 1 | 2 | 3 | 4 | 5 | 6;
  serviceId: string | null;
  serviceName: string | null;
  serviceDuration: number | null;
  servicePrice: number | null;
  stylists: Array<{ id: string; name: string; imageUrl: string | null }>;
  stylistId: string | null;
  stylistName: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  bookingId: string | null;
}

const initialState: BookingState = {
  step: 1,
  serviceId: null,
  serviceName: null,
  serviceDuration: null,
  servicePrice: null,
  stylists: [],
  stylistId: null,
  stylistName: null,
  date: null,
  startTime: null,
  endTime: null,
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
  bookingId: null,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type Action =
  | {
      type: "SELECT_SERVICE";
      payload: {
        id: string;
        name: string;
        duration: number;
        price: number;
        stylists: Array<{ id: string; name: string; imageUrl: string | null }>;
      };
    }
  | { type: "SELECT_STYLIST"; payload: { id: string; name: string } }
  | { type: "SELECT_DATE"; payload: string }
  | { type: "SELECT_TIME"; payload: { start: string; end: string } }
  | { type: "UPDATE_FIELD"; payload: { field: string; value: string } }
  | { type: "BOOKING_SUCCESS"; payload: { bookingId: string } }
  | { type: "GO_BACK" }
  | { type: "GO_TO_STEP"; payload: 1 | 2 | 3 | 4 | 5 | 6 };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "SELECT_SERVICE":
      return {
        ...state,
        step: 2,
        serviceId: action.payload.id,
        serviceName: action.payload.name,
        serviceDuration: action.payload.duration,
        servicePrice: action.payload.price,
        stylists: action.payload.stylists,
        // Reset downstream selections
        stylistId: null,
        stylistName: null,
        date: null,
        startTime: null,
        endTime: null,
      };

    case "SELECT_STYLIST":
      return {
        ...state,
        step: 3,
        stylistId: action.payload.id,
        stylistName: action.payload.name,
        // Reset downstream
        date: null,
        startTime: null,
        endTime: null,
      };

    case "SELECT_DATE":
      return {
        ...state,
        step: 4,
        date: action.payload,
        // Reset downstream
        startTime: null,
        endTime: null,
      };

    case "SELECT_TIME":
      return {
        ...state,
        step: 5,
        startTime: action.payload.start,
        endTime: action.payload.end,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case "BOOKING_SUCCESS":
      return {
        ...state,
        step: 6,
        bookingId: action.payload.bookingId,
      };

    case "GO_BACK": {
      if (state.step <= 1) return state;
      const prev = (state.step - 1) as BookingState["step"];
      return { ...state, step: prev };
    }

    case "GO_TO_STEP":
      return { ...state, step: action.payload };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const contentRef = useRef<HTMLDivElement>(null);
  const preselectedRef = useRef(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);

  // Fetch payment config on mount
  useEffect(() => {
    fetch("/api/payment-config")
      .then((res) => res.json())
      .then((data: { isActive: boolean; depositType?: "FIXED" | "PERCENTAGE"; depositValue?: number }) => {
        if (data.isActive && data.depositType && data.depositValue != null) {
          setPaymentConfig({
            isActive: true,
            depositType: data.depositType,
            depositValue: data.depositValue,
          });
        }
      })
      .catch(() => {
        // Silently fail, deposit just won't show
      });
  }, []);

  // Pre-select service from query param
  const preselectedServiceId = searchParams.get("service");

  // Handle service pre-selection
  useEffect(() => {
    if (preselectedServiceId && !preselectedRef.current) {
      preselectedRef.current = true;
      // Fetch services to find the matching one
      fetch("/api/services")
        .then((res) => res.json())
        .then((services: Array<{
          id: string;
          name: string;
          duration: number;
          price: number;
          stylists: Array<{ id: string; name: string; imageUrl: string | null }>;
        }>) => {
          const match = services.find((s) => s.id === preselectedServiceId);
          if (match) {
            dispatch({
              type: "SELECT_SERVICE",
              payload: {
                id: match.id,
                name: match.name,
                duration: match.duration,
                price: match.price,
                stylists: match.stylists,
              },
            });
          }
        })
        .catch(() => {
          // Silently fail, user can still select manually
        });
    }
  }, [preselectedServiceId]);

  // Scroll to top of content on step change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.step]);

  // Handlers
  const handleServiceSelect = useCallback(
    (service: {
      id: string;
      name: string;
      duration: number;
      price: number;
      stylists: Array<{ id: string; name: string; imageUrl: string | null }>;
    }) => {
      dispatch({
        type: "SELECT_SERVICE",
        payload: {
          id: service.id,
          name: service.name,
          duration: service.duration,
          price: service.price,
          stylists: service.stylists,
        },
      });
    },
    []
  );

  const handleStylistSelect = useCallback(
    (stylist: { id: string; name: string }) => {
      dispatch({
        type: "SELECT_STYLIST",
        payload: { id: stylist.id, name: stylist.name },
      });
    },
    []
  );

  const handleDateSelect = useCallback((date: string) => {
    dispatch({ type: "SELECT_DATE", payload: date });
  }, []);

  const handleTimeSelect = useCallback((start: string, end: string) => {
    dispatch({ type: "SELECT_TIME", payload: { start, end } });
  }, []);

  const handleFieldChange = useCallback((field: string, value: string) => {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const body: Record<string, string | undefined> = {
        customerName: state.customerName.trim(),
        customerPhone: state.customerPhone.trim(),
        date: state.date!,
        startTime: state.startTime!,
        serviceId: state.serviceId!,
        stylistId: state.stylistId!,
      };

      if (state.customerEmail.trim()) {
        body.customerEmail = state.customerEmail.trim();
      }
      if (state.notes.trim()) {
        body.notes = state.notes.trim();
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 409) {
        toast.error("Este horario ya fue reservado. Por favor, elegi otro.", {
          duration: 5000,
        });
        dispatch({ type: "GO_TO_STEP", payload: 4 });
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Error al crear la reserva");
      }

      const booking = await res.json();
      dispatch({
        type: "BOOKING_SUCCESS",
        payload: { bookingId: booking.id },
      });

      toast.success("Reserva confirmada con exito!", {
        duration: 4000,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear la reserva";
      toast.error(message, { duration: 5000 });
      throw err; // Re-throw to let DetailsStep handle the loading state
    }
  }, [state]);

  const canGoBack = state.step > 1 && state.step < 6;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-ash-gray/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/logo/TEMPO.png"
              alt="TEMPO Atelier"
              width={32}
              height={32}
            />
            <span className="font-(--font-display) text-xl tracking-[0.25em] text-charcoal">
              TEMPO
            </span>
          </Link>
          {state.step < 6 && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium">
              Reservar turno
            </span>
          )}
        </div>
      </header>

      {/* Step indicator */}
      {state.step < 6 && (
        <div className="border-b border-ash-gray/20 py-6">
          <StepIndicator currentStep={state.step} totalSteps={6} />
        </div>
      )}

      {/* Back button */}
      {canGoBack && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <button
            onClick={() => dispatch({ type: "GO_BACK" })}
            className="
              flex items-center gap-2 text-xs uppercase tracking-[0.15em]
              text-charcoal hover:text-charcoal transition-colors duration-300 cursor-pointer
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      )}

      {/* Content */}
      <main
        ref={contentRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12"
      >
        <div className="flex gap-10">
          {/* Main step area */}
          <div className="flex-1 min-w-0">
            <StepContent state={state} paymentConfig={paymentConfig} handlers={{
              handleServiceSelect,
              handleStylistSelect,
              handleDateSelect,
              handleTimeSelect,
              handleFieldChange,
              handleSubmit,
            }} />
          </div>

          {/* Desktop sidebar summary (steps 2-5) */}
          {state.step >= 2 && state.step <= 4 && state.serviceId && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-8">
                <DesktopSummary state={state} paymentConfig={paymentConfig} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step Content
// ---------------------------------------------------------------------------

interface StepContentProps {
  state: BookingState;
  paymentConfig: PaymentConfig | null;
  handlers: {
    handleServiceSelect: (service: {
      id: string;
      name: string;
      duration: number;
      price: number;
      stylists: Array<{ id: string; name: string; imageUrl: string | null }>;
    }) => void;
    handleStylistSelect: (stylist: { id: string; name: string }) => void;
    handleDateSelect: (date: string) => void;
    handleTimeSelect: (start: string, end: string) => void;
    handleFieldChange: (field: string, value: string) => void;
    handleSubmit: () => Promise<void>;
  };
}

function StepContent({ state, paymentConfig, handlers }: StepContentProps) {
  switch (state.step) {
    case 1:
      return (
        <ServiceStep
          selectedServiceId={state.serviceId}
          onSelect={handlers.handleServiceSelect}
          paymentConfig={paymentConfig}
        />
      );

    case 2:
      return (
        <StylistStep
          stylists={state.stylists}
          selectedStylistId={state.stylistId}
          onSelect={handlers.handleStylistSelect}
        />
      );

    case 3:
      return (
        <DateStep
          serviceId={state.serviceId!}
          stylistId={state.stylistId!}
          selectedDate={state.date}
          onSelect={handlers.handleDateSelect}
        />
      );

    case 4:
      return (
        <TimeSlotStep
          serviceId={state.serviceId!}
          stylistId={state.stylistId!}
          date={state.date!}
          selectedTime={state.startTime}
          onSelect={handlers.handleTimeSelect}
        />
      );

    case 5:
      return (
        <DetailsStep
          summary={{
            serviceName: state.serviceName,
            servicePrice: state.servicePrice,
            serviceDuration: state.serviceDuration,
            stylistName: state.stylistName,
            date: state.date,
            startTime: state.startTime,
          }}
          paymentConfig={paymentConfig}
          customerName={state.customerName}
          customerPhone={state.customerPhone}
          customerEmail={state.customerEmail}
          notes={state.notes}
          onChange={handlers.handleFieldChange}
          onSubmit={handlers.handleSubmit}
        />
      );

    case 6:
      return (
        <ConfirmationStep
          bookingId={state.bookingId!}
          serviceName={state.serviceName}
          servicePrice={state.servicePrice}
          serviceDuration={state.serviceDuration}
          stylistName={state.stylistName}
          date={state.date}
          startTime={state.startTime}
          customerName={state.customerName}
          paymentConfig={paymentConfig}
        />
      );
  }
}

// ---------------------------------------------------------------------------
// Desktop Summary Sidebar
// ---------------------------------------------------------------------------

function DesktopSummary({ state, paymentConfig }: { state: BookingState; paymentConfig: PaymentConfig | null }) {
  const deposit = state.servicePrice !== null ? calcDeposit(state.servicePrice, paymentConfig) : 0;
  const showDeposit = deposit > 0 && state.servicePrice !== null;

  return (
    <div className="border border-ash-gray/40 rounded-sm p-5 bg-silver-gray/10 animate-fade-in">
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium mb-4">
        Tu reserva
      </h3>

      <div className="space-y-3 text-sm">
        {state.serviceName && (
          <div>
            <p className="text-charcoal font-medium">{state.serviceName}</p>
            <p className="text-xs text-charcoal mt-0.5">
              {state.servicePrice !== null && formatPriceSidebar(state.servicePrice)}
              {state.servicePrice !== null && state.serviceDuration !== null && " · "}
              {state.serviceDuration !== null && formatDurationSidebar(state.serviceDuration)}
            </p>
            {showDeposit && (
              <p className="text-xs text-charcoal mt-0.5">
                Seña: {formatPriceSidebar(deposit)}
              </p>
            )}
          </div>
        )}

        {state.stylistName && (
          <div className="pt-2 border-t border-ash-gray/30">
            <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal mb-1">
              Estilista
            </p>
            <p className="text-charcoal">{state.stylistName}</p>
          </div>
        )}

        {state.date && (
          <div className="pt-2 border-t border-ash-gray/30">
            <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal mb-1">
              Fecha
            </p>
            <p className="text-charcoal capitalize">
              {formatDateSidebar(state.date)}
            </p>
          </div>
        )}

        {state.startTime && (
          <div className="pt-2 border-t border-ash-gray/30">
            <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal mb-1">
              Horario
            </p>
            <p className="text-charcoal">{state.startTime} hs</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatPriceSidebar(cents: number): string {
  const whole = Math.floor(cents / 100);
  return "$" + whole.toLocaleString("es-AR");
}

function formatDurationSidebar(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

function formatDateSidebar(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
