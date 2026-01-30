import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Tempo Atelier"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-[var(--font-display)] text-xl font-semibold tracking-wide text-[var(--cream)] hidden sm:block">
                <span className="text-[var(--gold)]">Tempo</span>
                <span className="text-[var(--cream)]/60 font-light ml-1">Atelier</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <a href="#" className="text-sm font-medium text-[var(--cream)] hover:text-[var(--gold)] transition-colors relative group">
                Inicio
                <span className="absolute -bottom-1 left-0 w-full h-px bg-[var(--gold)] scale-x-100" />
              </a>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
                Reservar ahora
              </a>
              <a href="#services" className="text-sm font-medium text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
                Servicios
              </a>
              <a href="#contact" className="text-sm font-medium text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
                Contacto
              </a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-[var(--cream)] p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2218] via-[#3d3225] to-[#5a4a3a]" />

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left content */}
            <div className="space-y-8">
              <div className="opacity-0 animate-fade-in-up">
                <h1>
                  <span className="block font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-light text-[var(--cream)] leading-[1.1]">
                    Tu Estilo Personal
                  </span>
                  <span className="block font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-light italic text-[var(--gold)] leading-[1.1] mt-2">
                    Nuestra Pasión
                  </span>
                </h1>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-200 pt-8">
                <a
                  href="https://shelbyturnos.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-12 py-5 bg-transparent border border-[var(--cream)]/30 text-[var(--cream)] text-xs font-medium tracking-[0.3em] uppercase hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--charcoal)] transition-all duration-500"
                >
                  Reservar
                </a>
              </div>
            </div>

            {/* Right content - Image collage */}
            <div className="hidden lg:block relative h-[600px]">
              {/* Circular badge */}
              <div className="absolute top-16 left-0 z-20 opacity-0 animate-scale-in delay-300">
                <div className="w-28 h-28 rounded-full bg-[var(--gold)] flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                    </defs>
                    <text className="text-[8px] uppercase tracking-[0.3em] fill-[var(--charcoal)]">
                      <textPath href="#circle">
                        • Tempo Atelier • Peluquería Unisex •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[var(--charcoal)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                  </svg>
                </div>
              </div>

              {/* Top right image - rounded top corners */}
              <div className="absolute top-0 right-0 w-64 h-80 opacity-0 animate-slide-left delay-200">
                <div className="w-full h-full rounded-t-full bg-gradient-to-br from-[var(--cream-dark)] to-[var(--cream)] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8e0d4] to-[#f5f0e8]">
                    <Image
                      src="/logo.jpg"
                      alt="Tempo Atelier"
                      width={180}
                      height={180}
                      className="object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom left image - rectangular */}
              <div className="absolute bottom-20 left-8 w-52 h-64 opacity-0 animate-fade-in-up delay-400">
                <div className="w-full h-full bg-gradient-to-br from-[#d4c4b0] to-[#c9b89d] overflow-hidden">
                  <div className="w-full h-full flex items-end justify-center pb-8">
                    <div className="text-center">
                      <p className="text-[var(--charcoal)]/60 text-xs tracking-[0.2em] uppercase">Estilo</p>
                      <p className="text-[var(--charcoal)] text-2xl font-[var(--font-display)] italic">Elegante</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom right image - rounded corners */}
              <div className="absolute bottom-0 right-8 w-56 h-72 opacity-0 animate-slide-left delay-500">
                <div className="w-full h-full rounded-t-[100px] bg-gradient-to-br from-[var(--cream)] to-[#e8e0d4] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="6" cy="6" r="3" />
                          <circle cx="6" cy="18" r="3" />
                          <line x1="20" y1="4" x2="8.12" y2="15.88" />
                          <line x1="14.47" y1="14.48" x2="20" y2="20" />
                          <line x1="8.12" y1="8.12" x2="12" y2="12" />
                        </svg>
                      </div>
                      <p className="text-[var(--charcoal)]/60 text-xs tracking-[0.2em] uppercase">Desde</p>
                      <p className="text-[var(--charcoal)] text-3xl font-[var(--font-display)]">2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-20">
            <p className="text-[var(--gold)] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Nuestros Servicios
            </p>
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-[var(--charcoal)]">
              Lo Que <span className="italic text-[var(--gold)]">Ofrecemos</span>
            </h2>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card p-10 text-center group">
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--cream)] flex items-center justify-center group-hover:bg-[var(--gold)]/10 transition-colors">
                  <svg className="w-10 h-10 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                  </svg>
                </div>

                <h3 className="font-[var(--font-display)] text-2xl text-[var(--charcoal)] mb-4">
                  Corte Masculino
                </h3>

                <p className="text-[var(--charcoal)]/60 leading-relaxed">
                  Desde estilos clásicos hasta cortes modernos y de tendencia.
                  Cada corte adaptado a tu estilo personal.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card p-10 text-center group">
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--cream)] flex items-center justify-center group-hover:bg-[var(--gold)]/10 transition-colors">
                  <svg className="w-10 h-10 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  </svg>
                </div>

                <h3 className="font-[var(--font-display)] text-2xl text-[var(--charcoal)] mb-4">
                  Hidratación
                </h3>

                <p className="text-[var(--charcoal)]/60 leading-relaxed">
                  Tratamientos de hidratación profunda que nutren y revitalizan
                  tu cabello desde la raíz hasta las puntas.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card p-10 text-center group">
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--cream)] flex items-center justify-center group-hover:bg-[var(--gold)]/10 transition-colors">
                  <svg className="w-10 h-10 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>

                <h3 className="font-[var(--font-display)] text-2xl text-[var(--charcoal)] mb-4">
                  Brushing
                </h3>

                <p className="text-[var(--charcoal)]/60 leading-relaxed">
                  Peinados con volumen, suavidad y brillo.
                  El acabado perfecto para cualquier ocasión.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href="https://shelbyturnos.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Reservar Servicio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section id="contact" className="relative py-32 bg-[var(--charcoal)] overflow-hidden">
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
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light text-[var(--cream)] mb-12">
                Nuestros <span className="italic text-[var(--gold)]">Horarios</span>
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-[var(--cream)]/10">
                  <span className="text-[var(--cream)]/70">Martes - Sábado</span>
                  <span className="text-[var(--gold)] font-medium">13:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[var(--cream)]/10">
                  <span className="text-[var(--cream)]/70">Domingo</span>
                  <span className="text-[var(--cream)]/40">Cerrado</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[var(--cream)]/10">
                  <span className="text-[var(--cream)]/70">Lunes</span>
                  <span className="text-[var(--cream)]/40">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Right - Contact */}
            <div>
              <p className="text-[var(--gold)] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Contacto
              </p>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light text-[var(--cream)] mb-12">
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
                    <h4 className="text-[var(--cream)] font-medium mb-1">Dirección</h4>
                    <p className="text-[var(--cream)]/60">
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
                    <h4 className="text-[var(--cream)] font-medium mb-1 group-hover:text-[var(--gold)] transition-colors">WhatsApp</h4>
                    <p className="text-[var(--cream)]/60">+54 9 3794 91-0607</p>
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
                    <h4 className="text-[var(--cream)] font-medium mb-1 group-hover:text-[var(--gold)] transition-colors">Instagram</h4>
                    <p className="text-[var(--cream)]/60">@tempo.atelier</p>
                  </div>
                </a>
              </div>

              {/* Book button */}
              <div className="mt-12">
                <a
                  href="https://shelbyturnos.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-[var(--gold)] text-[var(--charcoal)] text-xs font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.4)]"
                >
                  <span className="relative z-10">Reservar Online</span>
                  <div className="absolute inset-0 bg-[var(--cream)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--charcoal)] border-t border-[var(--cream)]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Tempo Atelier"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="font-[var(--font-display)] text-xl text-[var(--cream)]">
                <span className="text-[var(--gold)]">Tempo</span>
                <span className="text-[var(--cream)]/30 text-sm ml-1">Atelier</span>
              </div>
            </div>

            <p className="text-[var(--cream)]/40 text-sm">
              &copy; {new Date().getFullYear()} Tempo Atelier. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/tempo.atelier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/543794910607"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
