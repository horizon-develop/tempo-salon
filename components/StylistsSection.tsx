import Image from "next/image";

export default function StylistsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-(--font-display) text-3xl lg:text-4xl text-black mb-4">
            Conoce A Nuestros Estilistas
          </h2>
          <div className="h-px bg-neutral-200 w-full" />
        </div>

        {/* Stylists with Background Text */}
        <div className="relative h-100 lg:h-125 flex items-center justify-center">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <div className="text-center">
              <p className="font-(--font-display) text-4xl md:text-6xl lg:text-8xl text-neutral-100 uppercase leading-tight tracking-wide">
                If You Can
              </p>
              <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-neutral-100 uppercase leading-tight tracking-wide">
                Dream It You
              </p>
              <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-neutral-100 uppercase leading-tight tracking-wide">
                Can Be It
              </p>
            </div>
          </div>

          {/* Stylist Photos */}
          <div className="relative z-10 flex items-center justify-center gap-4 lg:gap-8">
            {/* Left Photo */}
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-neutral-200 overflow-hidden shadow-lg -rotate-12 border-4 border-white">
              <Image
                src="/no image.jpg"
                alt="Estilista 1"
                fill
                className="object-cover"
              />
            </div>

            {/* Center Photo */}
            <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-full bg-neutral-200 overflow-hidden shadow-xl border-4 border-white z-10">
              <Image
                src="/no image.jpg"
                alt="Estilista 2"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Photo */}
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-neutral-200 overflow-hidden shadow-lg rotate-12 border-4 border-white">
              <Image
                src="/no image.jpg"
                alt="Estilista 3"
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
