"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, memo } from "react";
import Link from "next/link";

const PricingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter Package",
      description: "Perfect for startups and small businesses getting started.",
      price: "₹14,999",
      period: "/project",
      features: [
        "Responsive Website (5-8 pages)",
        "Basic SEO Setup",
        "Mobile App (Single Platform)",
        "1 Months Free Maintenance",
        "Social Media Integration",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-800 text-white hover:bg-gray-700",
      popular: false,
      gradient: "from-gray-800 to-gray-900",
    },
    {
      name: "Business Package",
      description: "For growing businesses ready to scale digitally.",
      price: "₹29,999",
      period: "/project",
      features: [
        "Custom Website Development (10-15 pages)",
        "iOS & Android Mobile App",
        "Complete SEO & Digital Marketing",
        "Data Analytics & AI Integration",
        "3 Months Free Support",
        "Priority Customer Service",
      ],
      buttonText: "Most Popular",
      buttonStyle: "bg-white text-black hover:bg-gray-100",
      popular: true,
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      name: "Enterprise Package",
      description:
        "Comprehensive solution for established businesses and enterprises.",
      price: "Custom",
      period: "",
      features: [
        "Advanced Custom Software Development",
        "Full-Stack Web & Mobile Applications",
        "AI & Machine Learning Solutions",
        "Complete Digital Marketing Campaign",
        "Dedicated Account Manager",
        "Upto 12 Months Premium Support",
        "Scalable Cloud Infrastructure",
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gray-800 text-white hover:bg-gray-700",
      popular: false,
      gradient: "from-gray-800 to-gray-900",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-[#0a1520] to-[#0a1e2e] overflow-hidden"
    >
      {/* Animated curved background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          style={{ height: "60%" }}
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            fill="url(#pricingGradient)"
            d="M0,256 C320,192 420,288 720,256 C1020,224 1120,320 1440,288 L1440,400 L0,400 Z"
          />
          <defs>
            <linearGradient
              id="pricingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Floating particles disabled for performance */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
              Flexible Pricing
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              for Every Business
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose a plan that fits your needs. From startups to enterprises, we
            have solutions for everyone.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: plan.popular ? 1.03 : 1.05,
                y: -10,
              }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`group relative ${
                plan.popular ? "lg:-mt-4 lg:mb-4" : ""
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-4 right-6 z-20"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⭐
                    </motion.span>
                    Popular
                  </div>
                </motion.div>
              )}

              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${
                  plan.gradient
                } rounded-[2rem] opacity-0 group-hover:opacity-${
                  plan.popular ? "100" : "50"
                } blur-2xl transition-opacity duration-500`}
              />

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${
                  plan.popular
                    ? "from-[#1a3040] to-[#0f1e2e] border-cyan-500/50"
                    : "from-[#1a2332] to-[#0f1820] border-gray-800/50"
                } backdrop-blur-xl border-2 rounded-[2rem] p-8 h-full overflow-hidden transition-colors duration-500`}
              >
                {/* Animated background gradient */}
                {plan.popular && (
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {/* Shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={
                    hoveredPlan === index ? { x: "200%" } : { x: "-100%" }
                  }
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                <div className="relative z-10">
                  {/* Plan name & description */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-100 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <motion.div
                      className="flex items-baseline gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span
                        className={`text-5xl font-bold ${
                          plan.popular
                            ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
                            : "text-white"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-lg">
                        {plan.period}
                      </span>
                    </motion.div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 text-sm group-hover:text-white transition-colors"
                      >
                        <motion.svg
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-cyan-400" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full ${plan.buttonStyle} px-6 py-4 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group/btn cursor-pointer`}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                      <span className="relative z-10">{plan.buttonText}</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-gray-700/30 group-hover:border-cyan-400/50 rounded-tr-2xl transition-colors" />
                <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-gray-700/30 group-hover:border-cyan-400/50 rounded-bl-2xl transition-colors" />

                {/* Floating sparkles on hover */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -30],
                      x: [0, (i - 1.5) * 15],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className={`absolute bottom-20 left-1/2 w-1.5 h-1.5 ${
                      plan.popular ? "bg-cyan-400" : "bg-gray-400"
                    } rounded-full`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            Need a custom enterprise solution?
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-cyan-500/50 text-cyan-400 px-8 py-3 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
            >
              Contact Sales
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PricingSection);
