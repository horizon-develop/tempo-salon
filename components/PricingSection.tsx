const prices = [
  { service: "Balayage", price: "$35" },
  { service: "Corte Masculino", price: "$35" },
  { service: "Brushing", price: "$35" },
  { service: "Corte Masculino Y Barba", price: "$35" },
  { service: "Reflejos", price: "$35" },
];

export default function PricingSection() {
  return (
    <section id="precios" className="py-16 lg:py-24 bg-gradient-to-br from-[#6d5a42] via-[#7a6548] to-[#8a7555]">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="font-[var(--font-display)] text-3xl lg:text-4xl text-white font-medium text-center mb-12">
          Precios
        </h2>

        {/* Price List */}
        <div className="space-y-4">
          {prices.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3"
            >
              <span className="text-white font-medium text-sm lg:text-base">
                {item.service}
              </span>
              <div className="flex-1 mx-4 border-b border-dotted border-white/30" />
              <span className="text-[#BE8F45] font-semibold text-sm lg:text-base">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
