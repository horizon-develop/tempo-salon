import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background gradient + grain */}
      <div className="absolute inset-0 bg-dark-gradient grain-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full px-20 pt-32 pb-27.75 h-screen flex items-center">
        <div className="flex justify-between items-end w-full">
          {/* Left content */}
          <div>
            <div className="opacity-0 animate-fade-in-up">
              <h1>
                <span className="block font-(--font-display) text-[40px] md:text-[50px] lg:text-[60px] text-white leading-[1.1]">
                  Tu Estilo Personal
                </span>
                <span className="block font-(--font-display) text-[60px] md:text-[75px] lg:text-[90px] italic text-silver-gray leading-[1.1] whitespace-nowrap">
                  Nuestra Pasión
                </span>
              </h1>
            </div>

            <div className="opacity-0 animate-fade-in-up delay-200 mt-27.75">
              <a
                href="/reservar"
                className="btn-reservar"
              >
                <span className="btn-corner btn-corner-tr"></span>
                <span className="btn-corner btn-corner-bl"></span>
                Reservar
              </a>
            </div>
          </div>

          {/* Right content - Image collage */}
          <div className="hidden lg:block relative h-104 w-136.5 shrink-0">
            {/* Main image - rounded corners except bottom-left (264x416) */}
            <div
              className="absolute top-0 right-0 w-66 h-104 opacity-0 animate-slide-left delay-200 overflow-hidden bg-white"
              style={{
                borderTopLeftRadius: '132px',
                borderTopRightRadius: '132px',
                borderBottomRightRadius: '132px',
                borderBottomLeftRadius: 0
              }}
            >
              <Image
                src="/no image.jpg"
                alt="Estilista profesional"
                fill
                className="object-cover"
                style={{
                  borderTopLeftRadius: '132px',
                  borderTopRightRadius: '132px',
                  borderBottomRightRadius: '132px',
                  borderBottomLeftRadius: 0
                }}
              />
            </div>

            {/* Second image - rounded left side, flat right side (262x180) */}
            <div
              className="absolute bottom-0 left-0 w-65.5 h-45 opacity-0 animate-fade-in-up delay-400 overflow-hidden bg-white"
              style={{
                borderTopLeftRadius: '90.5px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: '90.5px'
              }}
            >
              <Image
                src="/no image.jpg"
                alt="Corte de cabello"
                fill
                className="object-cover"
                style={{
                  borderTopLeftRadius: '90.5px',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: '90.5px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
