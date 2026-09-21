"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import { fadeUp, scaleIn, slideIn, hoverLift } from "../utils/motion";

const AboutPage = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const approachRef = useRef(null);
  const achievementsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.15 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.15 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.15 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.1 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.1 });
  const isAchievementsInView = useInView(achievementsRef, {
    once: true,
    amount: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions that drive your business forward.",
      icon: "💡",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Integrity",
      description:
        "Transparency and honesty guide every decision we make, building lasting trust with our clients.",
      icon: "🤝",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Excellence",
      description:
        "We strive for perfection in every project, ensuring the highest quality standards.",
      icon: "⭐",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Collaboration",
      description:
        "Success is built on teamwork. We work closely with you to achieve shared goals.",
      icon: "🚀",
      gradient: "from-pink-500 to-cyan-500",
    },
  ];

  const approach = [
    {
      step: "01",
      title: "Discover",
      description:
        "We dive deep into understanding your business, challenges, and goals.",
      icon: "🔍",
    },
    {
      step: "02",
      title: "Design",
      description:
        "Creating tailored solutions that align perfectly with your vision.",
      icon: "✏️",
    },
    {
      step: "03",
      title: "Develop",
      description:
        "Building robust, scalable solutions with cutting-edge technology.",
      icon: "⚙️",
    },
    {
      step: "04",
      title: "Deliver",
      description: "Seamless deployment with ongoing support and optimization.",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e2e] via-black to-[#0a1e2e] text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e2e] via-[#0d1b2a] to-black" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isHeroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-500/50">
                PT
              </div>
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Innovating Tomorrow,
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Today
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
            >
              A fresh perspective on technology solutions. Founded in 2025, we
              bring modern innovation and cutting-edge expertise to transform
              your business challenges into opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {[
                {
                  label: "50+",
                  subtitle: "Clients",
                  color: "from-cyan-400 to-blue-500",
                },
                {
                  label: "100+",
                  subtitle: "Projects",
                  color: "from-blue-400 to-purple-500",
                },
                {
                  label: "2025",
                  subtitle: "Founded",
                  color: "from-purple-400 to-pink-500",
                },
              ].map((stat, idx) => (
                <div key={idx} className="flex-1 min-w-[120px]">
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {stat.subtitle}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Vector Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-auto drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#a855f7", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#a855f7", stopOpacity: 0.8 }}
                  />
                </linearGradient>
              </defs>

              {/* Background Circle */}
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="url(#grad3)"
                opacity="0.1"
              />

              {/* Main geometric shapes representing innovation */}
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "250px 250px" }}
              >
                <path
                  d="M 250 100 L 350 200 L 250 300 L 150 200 Z"
                  fill="url(#grad1)"
                  opacity="0.3"
                />
              </motion.g>

              {/* Orbiting elements */}
              <motion.circle
                cx="250"
                cy="150"
                r="20"
                fill="url(#grad1)"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="350"
                cy="250"
                r="25"
                fill="url(#grad2)"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="250"
                cy="350"
                r="22"
                fill="url(#grad1)"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.circle
                cx="150"
                cy="250"
                r="18"
                fill="url(#grad2)"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />

              {/* Central hexagon */}
              <motion.path
                d="M 250 200 L 280 220 L 280 260 L 250 280 L 220 260 L 220 220 Z"
                fill="url(#grad2)"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ transformOrigin: "250px 240px" }}
              />

              {/* Connection lines */}
              <line
                x1="250"
                y1="150"
                x2="250"
                y2="200"
                stroke="#06b6d4"
                strokeWidth="2"
                opacity="0.5"
              />
              <line
                x1="350"
                y1="250"
                x2="280"
                y2="240"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.5"
              />
              <line
                x1="250"
                y1="350"
                x2="250"
                y2="280"
                stroke="#06b6d4"
                strokeWidth="2"
                opacity="0.5"
              />
              <line
                x1="150"
                y1="250"
                x2="220"
                y2="240"
                stroke="#a855f7"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              {...fadeUp}
              initial="initial"
              animate={isStoryInView ? "animate" : "initial"}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 rounded-full" />

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Founded in 2025, Phyteam emerged with a bold vision: to bridge
                the gap between cutting-edge technology and business success.
                We&apos;re a dynamic team of passionate developers, designers,
                and strategists committed to becoming the leading technology
                partner for businesses across India.
              </p>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Since our inception, we&apos;ve rapidly built a portfolio of
                successful projects, helping startups and enterprises navigate
                their digital transformation journey. Our fresh perspective,
                combined with industry expertise, positions us as an innovative
                force in the technology landscape.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <motion.div
                  {...hoverLift}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/50 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    2025
                  </div>
                  <div className="text-gray-400">Founded</div>
                </motion.div>
                <motion.div
                  {...hoverLift}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/50 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    50+
                  </div>
                  <div className="text-gray-400">Happy Clients</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Visual - Improved Vector Illustration */}
            <motion.div
              {...slideIn("right")}
              initial="initial"
              animate={isStoryInView ? "animate" : "initial"}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Modern Vector Illustration */}
              <div className="relative rounded-3xl overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-8">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="cardGrad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }}
                      />
                    </linearGradient>
                    <linearGradient
                      id="cardGrad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#a855f7", stopOpacity: 0.8 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* Growth chart representation */}
                  <path
                    d="M 50 250 L 100 220 L 150 200 L 200 170 L 250 140 L 300 100 L 350 80"
                    stroke="url(#cardGrad1)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  <circle cx="50" cy="250" r="8" fill="#06b6d4" />
                  <circle cx="100" cy="220" r="8" fill="#06b6d4" />
                  <circle cx="150" cy="200" r="8" fill="#3b82f6" />
                  <circle cx="200" cy="170" r="8" fill="#3b82f6" />
                  <circle cx="250" cy="140" r="8" fill="#a855f7" />
                  <circle cx="300" cy="100" r="8" fill="#a855f7" />
                  <circle cx="350" cy="80" r="10" fill="#ec4899">
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Background bars */}
                  <rect
                    x="40"
                    y="200"
                    width="25"
                    height="60"
                    rx="4"
                    fill="url(#cardGrad1)"
                    opacity="0.3"
                  />
                  <rect
                    x="120"
                    y="160"
                    width="25"
                    height="100"
                    rx="4"
                    fill="url(#cardGrad1)"
                    opacity="0.3"
                  />
                  <rect
                    x="200"
                    y="120"
                    width="25"
                    height="140"
                    rx="4"
                    fill="url(#cardGrad2)"
                    opacity="0.3"
                  />
                  <rect
                    x="280"
                    y="80"
                    width="25"
                    height="180"
                    rx="4"
                    fill="url(#cardGrad2)"
                    opacity="0.3"
                  />
                </svg>

                {/* Floating Timeline Card */}
                <div className="mt-6 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    {[
                      { year: "2025", event: "Company Founded", icon: "🎯" },
                      { year: "Q2 2025", event: "50+ Projects", icon: "🚀" },
                      { year: "2026", event: "Global Expansion", icon: "🌍" },
                    ].map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="text-2xl transform group-hover/item:scale-110 transition-transform duration-300">
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-cyan-400 text-sm">
                            {milestone.year}
                          </div>
                          <div className="text-gray-300 text-xs">
                            {milestone.event}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={missionRef}
        className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-black via-[#0a1520] to-black"
      >
        {/* Vector Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#06b6d4" opacity="0.5" />
              </pattern>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
            {/* Diagonal lines */}
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            initial="initial"
            animate={isMissionInView ? "animate" : "initial"}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            {...scaleIn}
            initial="initial"
            animate={isMissionInView ? "animate" : "initial"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed relative z-10 mb-12">
              To be the trusted technology partner that helps businesses
              navigate digital transformation with confidence. We believe in
              creating sustainable, scalable solutions that not only solve
              today&apos;s challenges but anticipate tomorrow&apos;s
              opportunities.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <motion.div
                {...hoverLift}
                className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                  Vision
                </h3>
                <p className="text-gray-400 text-sm">
                  Leading digital innovation globally
                </p>
              </motion.div>
              <motion.div
                {...hoverLift}
                className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Quality
                </h3>
                <p className="text-gray-400 text-sm">
                  Excellence in every solution
                </p>
              </motion.div>
              <motion.div
                {...hoverLift}
                className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Impact
                </h3>
                <p className="text-gray-400 text-sm">
                  Measurable business results
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="relative py-32 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full relative overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20">
                  {/* Hover gradient effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div className="relative z-10 text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="relative z-10 text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section
        ref={approachRef}
        className="relative py-32 px-6 bg-gradient-to-b from-black via-[#0a1520] to-black overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Approach
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connection Line */}
                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent -z-10" />
                )}

                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-cyan-400/20 mb-4 group-hover:text-cyan-400/40 transition-colors duration-300">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Highlight Section */}
      <section ref={achievementsRef} className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Why Businesses Choose Us
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What sets us apart in the industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Client-Centric Approach",
                description:
                  "Your success is our priority. We tailor every solution to meet your unique business needs and goals.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: "⚡",
                title: "Cutting-Edge Technology",
                description:
                  "We leverage the latest technologies and best practices to deliver future-proof solutions.",
                gradient: "from-blue-500 to-purple-500",
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                description:
                  "Our team is always here to help. 24/7 support ensures your business never skips a beat.",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 rounded-2xl p-10 h-full hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                    {feature.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let&apos;s discuss how we can help transform your business
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default AboutPage;
