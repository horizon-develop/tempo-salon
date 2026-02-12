"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const results = [
  { title: "Brushing", image: "/no image.jpg" },
  { title: "Coloración", image: "/no image.jpg" },
  { title: "Corte", image: "/no image.jpg" },
  { title: "Hidratación", image: "/no image.jpg" },
];

export default function ResultsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="py-16 lg:py-24 bg-white" id="results">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-(--font-display) text-3xl lg:text-4xl mb-4">
            <span className="text-charcoal font-medium">Nuestros </span>
            <span className="text-charcoal italic">Resultados</span>
          </h2>
          <div className="h-px bg-neutral-200 w-full" />
        </div>

        {/* Results Grid */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
              >
                <div className="relative aspect-4/5 bg-neutral-100 overflow-hidden group cursor-pointer">
                  <Image
                    src={result.image}
                    alt={result.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Service Name - shows on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-lg">{result.title}</p>
                    <button className="mt-2 w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {results.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-charcoal w-3"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
