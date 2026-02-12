"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Servicio",
  "Estilista",
  "Fecha",
  "Horario",
  "Datos",
  "Listo",
];

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center
                    text-xs font-medium transition-all duration-500 ease-out
                    ${isCompleted
                      ? "bg-charcoal text-white scale-90"
                      : isCurrent
                        ? "bg-charcoal text-white ring-4 ring-ash-gray/30 scale-110"
                        : "bg-silver-gray text-charcoal"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-[10px] tracking-wider uppercase font-medium
                    transition-colors duration-300 hidden sm:block
                    ${isCurrent ? "text-charcoal" : isCompleted ? "text-charcoal" : "text-charcoal"}
                  `}
                >
                  {stepLabels[i]}
                </span>
              </div>

              {/* Connecting line */}
              {step < totalSteps && (
                <div className="flex-1 mx-2 sm:mx-3 h-px relative mt-[-20px] sm:mt-0">
                  <div className="absolute inset-0 bg-ash-gray/40" />
                  <div
                    className="absolute inset-y-0 left-0 bg-charcoal transition-all duration-700 ease-out"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
