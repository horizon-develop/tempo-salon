import Image from "next/image";

export default function PersonalStylist() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="lg:order-1">
            <h2
              className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              style={{
                background: 'linear-gradient(to bottom, #141414, #C9A227)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="italic">Tu Estilista</span>
              <br />
              <span className="font-light">Personal</span>
            </h2>

            <p className="mt-8 text-neutral-600 leading-relaxed max-w-md">
              En TEMPO Atelier nos dedicamos a realzar tu estilo único. Cada visita es una experiencia personalizada donde combinamos técnica profesional con atención al detalle.
            </p>

            <a
              href="#services"
              className="inline-flex items-center justify-center mt-8 px-8 py-4 border border-black text-black text-xs font-medium tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              Conocer Más
            </a>
          </div>

          {/* Right content - Image collage */}
          <div className="lg:order-2 relative h-[500px]">
            {/* Rotating badge */}
            <div className="absolute bottom-1/3 left-0 z-20">
              <div className="w-24 h-24 rounded-full bg-white border border-neutral-200 flex items-center justify-center animate-[spin_15s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path id="circle2" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/>
                  </defs>
                  <text className="text-[7px] uppercase tracking-[0.2em] fill-neutral-600">
                    <textPath href="#circle2">
                      • Estilo • Elegancia • Pasión •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
            </div>

            {/* Main rectangular image */}
            <div className="absolute top-0 left-1/4 w-64 h-80 shadow-2xl">
              <Image
                src="/no image.jpg"
                alt="Estilista profesional"
                fill
                className="object-cover grayscale"
              />
            </div>

            {/* Circular overlapping image */}
            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-8 border-white">
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
    </section>
  );
}
