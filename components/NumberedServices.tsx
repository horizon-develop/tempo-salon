import Image from "next/image";

export default function NumberedServices() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-center text-black mb-16 italic">
          Nuestros Servicios
        </h2>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 01 */}
          <div className="group">
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100">
              <Image
                src="/no image.jpg"
                alt="Corte Simple"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-4">
                <span className="font-[var(--font-display)] text-4xl font-light text-[var(--gold)]">01</span>
                <span className="text-black font-medium">Corte Simple</span>
              </div>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[var(--gold)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Service 02 */}
          <div className="group border-l border-neutral-200 pl-8">
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100">
              <Image
                src="/no image.jpg"
                alt="Brushing"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-4">
                <span className="font-[var(--font-display)] text-4xl font-light text-[var(--gold)]">02</span>
                <span className="text-black font-medium">Brushing</span>
              </div>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[var(--gold)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Service 03 */}
          <div className="group border-l border-neutral-200 pl-8">
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100">
              <Image
                src="/no image.jpg"
                alt="Hidratación"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-4">
                <span className="font-[var(--font-display)] text-4xl font-light text-[var(--gold)]">03</span>
                <span className="text-black font-medium">Hidratación</span>
              </div>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[var(--gold)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
