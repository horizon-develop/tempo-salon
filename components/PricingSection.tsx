const prices = [
  { service: "Balayage", price: "$35" },
  { service: "Corte Masculino", price: "$35" },
  { service: "Brushing", price: "$35" },
  { service: "Corte Masculino Y Barba", price: "$35" },
  { service: "Reflejos", price: "$35" },
];

export default function PricingSection() {
  return (
    <section id="precios" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-dark-gradient grain-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="font-(--font-display) text-3xl lg:text-4xl text-white text-center mb-12">
          Precios
        </h2>

        {/* Price List */}
        <div className="space-y-4">
          {prices.map((item, index) => (
            <a
              key={index}
              href={`https://shelbyturnos.vercel.app/?service=${encodeURIComponent(item.service)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm lg:text-base group-hover:text-silver-gray transition-colors duration-300">
                  {item.service}
                </span>
                <div className="relative">
                  <span className="text-silver-gray font-semibold text-sm lg:text-base group-hover:opacity-0 transition-opacity duration-300">
                    {item.price}
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-silver-gray flex items-center justify-center text-silver-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
              <div
                className="h-px mt-2 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to right, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 12px, transparent 12px, transparent 24px)'
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
