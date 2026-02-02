export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Social icons and address */}
      <div className="bg-transparent pt-[9px]">
        <div className="flex items-center justify-between text-white/80 text-xs pl-[80px] pr-[109px] pb-[9px]">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <img src="/icons/facebook.svg" alt="Facebook" className="w-[10px] h-[10px]" />
            </a>
            <a
              href="https://www.instagram.com/tempo.atelier"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <img src="/icons/instagram.svg" alt="Instagram" className="w-[10px] h-[10px]" />
            </a>
          </div>

          {/* Address */}
          <a href="#contact" className="hover:text-white transition-colors hidden sm:block">
            Dirección
          </a>
        </div>

        {/* Horizontal line across full screen */}
        <div className="w-full h-px bg-white/30"></div>
      </div>

      {/* Main Navigation */}
      <div className="bg-transparent pt-[12px]">
        <div className="pl-[80px] pr-[109px]">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <span className="font-[var(--font-display)] text-[38px] font-medium tracking-[0.05em] text-white">
                TEMPO
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="nav-link-hover text-[14px] font-normal text-white italic">
                Inicio
                <span className="nav-link-underline nav-link-active">
                  <span className="nav-line-large"></span>
                  <span className="nav-line-small"></span>
                </span>
              </a>
              <a href="https://shelbyturnos.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-link-hover text-[14px] font-normal text-white/80">
                Reservar ahora
                <span className="nav-link-underline">
                  <span className="nav-line-large"></span>
                  <span className="nav-line-small"></span>
                </span>
              </a>
              <a href="#services" className="nav-link-hover text-[14px] font-normal text-white/80">
                Servicios
                <span className="nav-link-underline">
                  <span className="nav-line-large"></span>
                  <span className="nav-line-small"></span>
                </span>
              </a>
              <a href="#precios" className="nav-link-hover text-[14px] font-normal text-white/80">
                Precios
                <span className="nav-link-underline">
                  <span className="nav-line-large"></span>
                  <span className="nav-line-small"></span>
                </span>
              </a>
              <a href="#contact" className="nav-link-hover text-[14px] font-normal text-white/80">
                Contacto
                <span className="nav-link-underline">
                  <span className="nav-line-large"></span>
                  <span className="nav-line-small"></span>
                </span>
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
      </div>
    </nav>
  );
}
