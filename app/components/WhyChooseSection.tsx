"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, memo } from "react";

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const cards = [
    {
      title: "Personalized Support",
      description:
        "Work with dedicated consultants who understand your business goals.",
      gradient: "from-purple-600/20 to-pink-600/20",
      icon: "👥",
      mockup: "/mockup1.png",
      delay: 0,
    },
    {
      title: "With You Every Step",
      description:
        "From the first consultation to post-launch, we stay with you to ensure lasting success.",
      gradient: "from-blue-600/20 to-cyan-600/20",
      icon: "💬",
      mockup: "/mockup2.png",
      delay: 0.15,
    },
    {
      title: "Measurable Impact",
      description:
        "From performance gains to savings, we track progress and show ROI at every stage.",
      gradient: "from-cyan-600/20 to-teal-600/20",
      icon: "📊",
      mockup: "/mockup3.png",
      delay: 0.3,
    },
    {
      title: "Future-Ready Solutions",
      description:
        "We design scalable systems that keep you competitive tomorrow.",
      gradient: "from-indigo-600/20 to-purple-600/20",
      icon: "🚀",
      mockup: "/mockup4.png",
      delay: 0.45,
    },
    {
      title: "Transparent Process",
      description:
        "You'll always know what's happening with clear timelines, regular updates, and open communication.",
      gradient: "from-teal-600/20 to-green-600/20",
      icon: "📋",
      mockup: "/mockup5.png",
      delay: 0.6,
    },
    {
      title: "Proven Track Record",
      description:
        "200+ successful projects delivered across diverse industries with a 4.97 client satisfaction rating.",
      gradient: "from-orange-600/20 to-red-600/20",
      icon: "⭐",
      mockup: "/mockup6.png",
      delay: 0.75,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-[#0a1e2e] via-[#0f1820] to-black relative overflow-hidden"
    >
      {/* Background elements - static for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-[0.04]" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5 }}
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
          >
            Trust
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white"
          >
            Why Companies
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Choose Phyteam
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="group relative"
            >
              {/* Card glow effect on hover */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
              />

              <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0f1820] border border-gray-800/50 rounded-3xl p-8 h-full backdrop-blur-sm overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />

                <div className="relative z-10">
                  {/* Icon/Mockup area */}
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center border border-gray-700/50 relative overflow-hidden group-hover:border-cyan-500/50 transition-colors duration-300">
                      {/* Mockup placeholder with icon */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-6xl filter drop-shadow-lg"
                      >
                        {card.icon}
                      </motion.div>

                      {/* Static pattern lines */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                            style={{ top: `${20 + i * 20}%`, width: "100%" }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-100 transition-colors duration-300">
                    {card.title}
                  </motion.h3>
                  <motion.p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {card.description}
                  </motion.p>

                  {/* Floating particles removed for performance */}
                </div>

                {/* Corner accent */}
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(WhyChooseSection);
