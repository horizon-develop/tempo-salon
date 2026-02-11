import { prisma } from "@/lib/prisma";

function formatPrice(cents: number): string {
  const pesos = Math.floor(cents / 100);
  return `$${pesos.toLocaleString("es-AR")}`;
}

export default async function PricingSection() {
  let services: { id: string; name: string; price: number }[] = [];

  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      select: { id: true, name: true, price: true },
      orderBy: { order: "asc" },
    });
  } catch {
    // Fallback if DB is not connected yet
    services = [
      { id: "1", name: "Balayage", price: 8000 },
      { id: "2", name: "Corte Masculino", price: 3500 },
      { id: "3", name: "Brushing", price: 3500 },
      { id: "4", name: "Corte Masculino y Barba", price: 5000 },
      { id: "5", name: "Reflejos", price: 6000 },
    ];
  }

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
          {services.map((item) => (
            <a
              key={item.id}
              href={`/reservar?service=${item.id}`}
              className="block py-3 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm lg:text-base group-hover:text-silver-gray transition-colors duration-300">
                  {item.name}
                </span>
                <div className="relative">
                  <span className="text-silver-gray font-semibold text-sm lg:text-base group-hover:opacity-0 transition-opacity duration-300">
                    {formatPrice(item.price)}
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
