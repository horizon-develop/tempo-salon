import Image from "next/image";

export default function Navbar() {
  return (
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
  );
}
