export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3d3225] via-[#4a3c2a] to-[#5a4a35]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h3 className="text-[var(--gold)] font-medium mb-4 underline underline-offset-4 decoration-[var(--gold)]">
              Contacto
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>Dirección</p>
              <p>Teléfono</p>
            </div>
          </div>

          {/* Center Logo Column */}
          <div className="text-center">
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[0.3em] text-white mb-4">
              TEMPO
            </h2>
          </div>

          {/* Working Hours Column */}
          <div className="text-center md:text-right">
            <h3 className="text-[var(--gold)] font-medium mb-4 underline underline-offset-4 decoration-[var(--gold)]">
              Horario
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>Dias Laborales: 9AM - 9PM</p>
              <p>Sábado: 10AM - 8PM</p>
              <p>Domingo: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-white/50">
            <p>Todos los derechos reservados</p>
            <span className="hidden md:inline">•</span>
            <p>
              Desarrollado por{" "}
              <a
                href="https://alankke.github.io/" target="_blank" rel="noopener noreferrer"
                className="text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors"
              >
                Alan Kennedy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
