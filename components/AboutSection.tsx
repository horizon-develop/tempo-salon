import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2">
        {/* Left - Image */}
        <div className="relative h-80 lg:h-[500px] bg-white flex items-center justify-center">
          <div className="w-64 h-72 lg:w-80 lg:h-96 bg-neutral-200 overflow-hidden">
            <Image
              src="/no image.jpg"
              alt="Sobre Nosotros"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="bg-[#BE8F45] px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
          <h2 className="font-[var(--font-display)] text-3xl lg:text-4xl text-white font-medium mb-6">
            Sobre Nosotros
          </h2>

          <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-8 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Fermentum leo vel orci porta non.
          </p>

          <div>
            <a
              href="https://shelbyturnos.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-[var(--gold-dark)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
