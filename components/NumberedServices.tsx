"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const services = [
  {
    number: "01",
    title: "Corte Simple",
    image: "/no image.jpg",
  },
  {
    number: "02",
    title: "Brushing",
    image: "/no image.jpg",
  },
  {
    number: "03",
    title: "Hidratación",
    image: "/no image.jpg",
  },
  {
    number: "04",
    title: "Coloración",
    image: "/no image.jpg",
  },
  {
    number: "05",
    title: "Tratamiento Capilar",
    image: "/no image.jpg",
  },
];

export default function NumberedServices() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-black italic">
            Nuestros Servicios
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {services.map((service) => (
              <div
                key={service.number}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>

                {/* Service Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-[var(--font-display)] text-4xl font-light text-[var(--gold)]">
                      {service.number}
                    </span>
                    <span className="text-black font-medium">{service.title}</span>
                  </div>
                  <a
                    href="https://shelbyturnos.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-[var(--gold)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
