import Image from "next/image";

export default function QuoteBanner() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/no image.jpg"
        alt="TEMPO Atelier"
        fill
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Quote Content */}
      <div className="absolute inset-0 flex items-end justify-center pb-16">
        <div className="text-center max-w-2xl px-6">
          {/* Quote Icon */}
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[var(--gold)] flex items-center justify-center">
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="font-[var(--font-display)] text-xl md:text-2xl text-white italic leading-relaxed">
            Nuestro objetivo es hacerte sentir increíble. Trabajamos persona a persona, creando un vínculo único con cada cliente.
          </p>
        </div>
      </div>
    </section>
  );
}
