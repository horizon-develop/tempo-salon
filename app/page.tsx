import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="TEMPO Atelier"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-[var(--font-display)] text-xl font-semibold tracking-wide text-white hidden sm:block">
                <span className="text-[var(--gold)]">TEMPO</span>
                <span className="text-white/60 font-light ml-1">Atelier</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <a href="#" className="text-sm font-medium text-white hover:text-[var(--gold)] transition-colors relative">
                Inicio
                <span className="absolute -bottom-1 left-0 w-full h-px bg-[var(--gold)]" />
              </a>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/70 hover:text-[var(--gold)] transition-colors">
                Reservar ahora
              </a>
              <a href="#services" className="text-sm font-medium text-white/70 hover:text-[var(--gold)] transition-colors">
                Servicios
              </a>
              <a href="#contact" className="text-sm font-medium text-white/70 hover:text-[var(--gold)] transition-colors">
                Contacto
              </a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Services Bar */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black uppercase tracking-wide">Corte & Estilo</h3>
                <p className="text-xs text-neutral-500 mt-1">Cortes modernos y clásicos</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black uppercase tracking-wide">Hidratación</h3>
                <p className="text-xs text-neutral-500 mt-1">Tratamientos profesionales</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black uppercase tracking-wide">Brushing</h3>
                <p className="text-xs text-neutral-500 mt-1">Secado y peinado perfecto</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M3 12h18" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-black uppercase tracking-wide">Coloración</h3>
                <p className="text-xs text-neutral-500 mt-1">Color y mechas premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Stylist Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="lg:order-1">
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-black leading-[1.1]">
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

      {/* Quote Banner Section */}
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

      {/* Numbered Services Section */}
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

      {/* Hours & Location Section */}
      <section id="contact" className="relative py-32 bg-black overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Hours */}
            <div>
              <p className="text-[var(--gold)] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Horarios
              </p>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light text-white mb-12">
                Nuestros <span className="italic text-[var(--gold)]">Horarios</span>
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-white/70">Martes - Sábado</span>
                  <span className="text-[var(--gold)] font-medium">13:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-white/70">Domingo</span>
                  <span className="text-white/40">Cerrado</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-white/70">Lunes</span>
                  <span className="text-white/40">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Right - Contact */}
            <div>
              <p className="text-[var(--gold)] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Contacto
              </p>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light text-white mb-12">
                Encontranos <span className="italic text-[var(--gold)]">Aquí</span>
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Dirección</h4>
                    <p className="text-white/60">
                      Jujuy 805 (esquina 9 de Julio)<br />
                      Corrientes, Corrientes, Argentina
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/543794910607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--gold)]/20 transition-colors">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 group-hover:text-[var(--gold)] transition-colors">WhatsApp</h4>
                    <p className="text-white/60">+54 9 3794 91-0607</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/tempo.atelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--gold)]/20 transition-colors">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 group-hover:text-[var(--gold)] transition-colors">Instagram</h4>
                    <p className="text-white/60">@tempo.atelier</p>
                  </div>
                </a>
              </div>

              {/* Book button */}
              <div className="mt-12">
                <a
                  href="https://shelbyturnos.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[var(--gold)] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500"
                >
                  Reservar Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        {/* Top border line */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Contact Column */}
            <div className="text-center md:text-left">
              <h3 className="text-[var(--gold)] font-medium mb-6 underline underline-offset-4 decoration-[var(--gold)]">
                Contacto
              </h3>
              <div className="space-y-3 text-neutral-600 text-sm">
                <p>tempo.atelier@email.com</p>
                <p>Jujuy 805 (esq. 9 de Julio)</p>
                <p>Corrientes, Argentina</p>
                <p>+54 9 3794 91-0607</p>
              </div>
            </div>

            {/* Center Logo Column */}
            <div className="text-center">
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-[0.2em] text-black mb-6">
                TEMPO
              </h2>
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/tempo.atelier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-[var(--gold)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <span className="text-neutral-300">|</span>
                <a
                  href="https://wa.me/543794910607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-[var(--gold)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Working Hours Column */}
            <div className="text-center md:text-right">
              <h3 className="text-[var(--gold)] font-medium mb-6 underline underline-offset-4 decoration-[var(--gold)]">
                Horarios
              </h3>
              <div className="space-y-3 text-neutral-600 text-sm">
                <p>Martes - Sábado: <span className="italic">13:00 - 22:00</span></p>
                <p>Domingo: <span className="italic">Cerrado</span></p>
                <p>Lunes: <span className="italic">Cerrado</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
              <p>
                Copyright By TEMPO Atelier
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-[var(--gold)] transition-colors">Términos y Condiciones</a>
                <span>•</span>
                <a href="#" className="hover:text-[var(--gold)] transition-colors">Política de Privacidad</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
