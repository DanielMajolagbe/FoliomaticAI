import { motion } from "motion/react";
import alexTemplate from "figma:asset/528277f2112f9422bb480459f4585ea0230b017b.png";
import jayTemplate from "figma:asset/ad307de0329b2f8088c02e92caacd1167bbcc299.png";
import sarahTemplate from "figma:asset/ff9a9e7e618b0a5de370d7ee167d14083867d1fc.png";

const templates = [
  {
    id: 1,
    name: "Alexander",
    image: alexTemplate,
    description: "UI/UX Designer Portfolio"
  },
  {
    id: 2,
    name: "Jay Brown",
    image: jayTemplate,
    description: "Product Designer Portfolio"
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    image: sarahTemplate,
    description: "Creative Portfolio"
  },
];

export function InfiniteCarousel() {
  // Duplicate templates for seamless loop
  const duplicatedTemplates = [...templates, ...templates, ...templates];

  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden bg-black">
      <div className="mb-6 sm:mb-8 md:mb-12 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3 md:mb-4">
          Beautiful Portfolio Templates
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400">
          Choose from professionally designed templates
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-8"
          animate={{
            x: [0, -1800],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedTemplates.map((template, index) => (
            <div
              key={`${template.id}-${index}`}
              className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[350px] lg:w-[500px] group"
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-base sm:text-lg md:text-xl text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
