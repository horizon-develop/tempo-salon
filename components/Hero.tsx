import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2318]" />

      {/* Subtle gold accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--gold)]/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <div className="space-y-8">
            <div className="opacity-0 animate-fade-in-up">
              <p className="text-[var(--gold)] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                Peluquería Unisex
              </p>
              <h1>
                <span className="block font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1]">
                  Tu Estilo Personal
                </span>
                <span className="block font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-light italic text-[var(--gold)] leading-[1.1] mt-2">
                  Nuestra Pasión
                </span>
              </h1>
            </div>

            <p className="opacity-0 animate-fade-in-up delay-100 text-white/60 text-lg max-w-md leading-relaxed">
              Una experiencia personalizada en un ambiente elegante y sofisticado. Donde cada detalle cuenta.
            </p>

            <div className="opacity-0 animate-fade-in-up delay-200 pt-4">
              <a
                href="https://shelbyturnos.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-12 py-5 bg-[var(--gold)] text-black text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white transition-all duration-500"
              >
                Reservar
              </a>
            </div>
          </div>

          {/* Right content - Image collage */}
          <div className="hidden lg:block relative h-[600px]">
            {/* Circular badge */}
            <div className="absolute top-20 left-0 z-20 opacity-0 animate-scale-in delay-300">
              <div className="w-28 h-28 rounded-full bg-[var(--gold)] flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                  </defs>
                  <text className="text-[8px] uppercase tracking-[0.3em] fill-black">
                    <textPath href="#circle">
                      • TEMPO atelier • Peluquería Unisex •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
            </div>

            {/* Main image - rectangular */}
            <div className="absolute top-0 right-0 w-72 h-96 opacity-0 animate-slide-left delay-200">
              <div className="w-full h-full bg-neutral-800 overflow-hidden">
                <Image
                  src="/no image.jpg"
                  alt="Estilista profesional"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>

            {/* Circular image - overlapping */}
            <div className="absolute bottom-16 right-16 w-64 h-64 opacity-0 animate-fade-in-up delay-400">
              <div className="w-full h-full rounded-full bg-neutral-700 overflow-hidden border-4 border-black">
                <Image
                  src="/no image.jpg"
                  alt="Corte de cabello"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
    </section>
  );
}
