"use client";

import { useEffect } from "react";
import { User } from "lucide-react";

interface Stylist {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface StylistStepProps {
  stylists: Stylist[];
  selectedStylistId: string | null;
  onSelect: (stylist: Stylist) => void;
}

export default function StylistStep({ stylists, selectedStylistId, onSelect }: StylistStepProps) {
  // Auto-advance if only 1 stylist
  useEffect(() => {
    if (stylists.length === 1 && !selectedStylistId) {
      onSelect(stylists[0]);
    }
  }, [stylists, selectedStylistId, onSelect]);

  // If auto-advancing, show a brief loading state
  if (stylists.length === 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <p className="text-sm text-charcoal/60 tracking-wide">Seleccionando estilista...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-(--font-display) text-2xl lg:text-3xl text-charcoal mb-2">
          Elegí tu estilista
        </h2>
        <p className="text-charcoal/50 text-sm tracking-wide">
          Seleccioná con quién querés atenderte
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
        {stylists.map((stylist, index) => {
          const isSelected = selectedStylistId === stylist.id;

          return (
            <button
              key={stylist.id}
              onClick={() => onSelect(stylist)}
              className={`
                group relative flex flex-col items-center p-8 rounded-sm border
                transition-all duration-500 cursor-pointer
                opacity-0 animate-fade-in-up
                ${isSelected
                  ? "border-charcoal bg-charcoal/[0.03] shadow-lg"
                  : "border-ash-gray/50 hover:border-charcoal/30 hover:shadow-md hover:-translate-y-1"
                }
              `}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              {/* Avatar placeholder */}
              <div
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-4
                  transition-all duration-500
                  ${isSelected
                    ? "bg-charcoal text-white"
                    : "bg-silver-gray text-charcoal/40 group-hover:bg-ash-gray group-hover:text-charcoal/60"
                  }
                `}
              >
                {stylist.imageUrl ? (
                  <img
                    src={stylist.imageUrl}
                    alt={stylist.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>

              {/* Name */}
              <h3 className="font-medium text-charcoal tracking-wide text-sm">
                {stylist.name}
              </h3>

              {/* Selection ring */}
              <div
                className={`
                  absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${isSelected
                    ? "border-charcoal bg-charcoal"
                    : "border-ash-gray group-hover:border-charcoal/40"
                  }
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
