export default function ServicesBar() {
  return (
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
  );
}
