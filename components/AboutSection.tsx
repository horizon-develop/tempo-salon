import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row">
        {/* Left - Image */}
        <div className="relative h-82.5 lg:h-132.5 lg:w-[58%] bg-neutral-100 flex items-center justify-center">
          <Image
            src="/no image.jpg"
            alt="Sobre Nosotros"
            fill
            className="object-cover"
          />
        </div>

        {/* Right - Content */}
        <div
          className="px-8 py-12 lg:pl-25 lg:pr-12 lg:pb-29.25 lg:w-[42%] lg:h-132.5 flex flex-col justify-center"
          style={{
            background: "linear-gradient(135deg, #8a8787 0%, #9B9898 40%, #a8a5a5 70%, #9B9898 100%)",
          }}
        >
          <h2 className="font-(--font-display) text-3xl lg:text-4xl text-white mb-6">
            Sobre Nosotros
          </h2>

          <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-20 max-w-92.75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Fermentum leo vel orci porta non.
          </p>

          <div>
            <a
              href="https://shelbyturnos.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reservar bg-white! text-charcoal! border-ash-gray! hover:bg-silver-gray!"
            >
              <span className="btn-corner btn-corner-tr"></span>
              <span className="btn-corner btn-corner-bl"></span>
              Reservar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
