"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PersonalStylist() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for images
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const circleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Apple-like easing curve
  const appleEase = [0.25, 0.4, 0.25, 1] as const;

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: appleEase,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: appleEase,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            className="lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              style={{
                background: "linear-gradient(to bottom, #141414, #C9A227)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span className="italic">Tu Estilista</span>
              <br />
              <span className="font-light">Personal</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-neutral-600 leading-relaxed max-w-md"
            >
              En TEMPO Atelier nos dedicamos a realzar tu estilo único. Cada
              visita es una experiencia personalizada donde combinamos técnica
              profesional con atención al detalle.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="#services"
              className="inline-flex items-center justify-center mt-8 px-8 py-4 border border-black text-black text-xs font-medium tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Conocer Más
            </motion.a>
          </motion.div>

          {/* Right content - Image collage */}
          <div className="lg:order-2 relative h-[500px]">
            {/* Rotating badge */}
            <motion.div
              className="absolute bottom-1/3 left-0 z-20"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: appleEase,
              }}
              style={{ rotate: badgeRotate }}
            >
              <div className="w-24 h-24 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_15s_linear_infinite]">
                  <defs>
                    <path
                      id="circle2"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    />
                  </defs>
                  <text className="text-[7px] uppercase tracking-[0.2em] fill-neutral-600">
                    <textPath href="#circle2">
                      • Estilo • Elegancia • Pasión •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
            </motion.div>

            {/* Main rectangular image */}
            <motion.div
              className="absolute top-0 left-1/4 w-64 h-80 shadow-2xl"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ y: imageY }}
            >
              <Image
                src="/no image.jpg"
                alt="Estilista profesional"
                fill
                className="object-cover grayscale"
              />
            </motion.div>

            {/* Circular overlapping image */}
            <motion.div
              className="absolute bottom-0 right-0 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-8 border-white"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              style={{ y: circleY }}
            >
              <Image
                src="/no image.jpg"
                alt="Corte de cabello"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
