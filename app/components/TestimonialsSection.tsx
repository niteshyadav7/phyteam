"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, memo } from "react";

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CTO, InfoTech Solutions",
      quote:
        "Working with Phyteam has been refreshing. Their innovative approach and modern tech stack delivered exactly what we needed for our digital transformation.",
      gradient: "from-cyan-400 to-blue-500",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Priya Sharma",
      role: "VP Engineering, TechnoServe",
      quote:
        "Despite being new, their team showed remarkable expertise and professionalism. The mobile app they built exceeded our expectations.",
      gradient: "from-purple-400 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Amit Patel",
      role: "CEO, StartupIndia",
      quote:
        "Fresh ideas, modern solutions! Their website development and SEO strategies are already showing promising results in our first quarter.",
      gradient: "from-orange-400 to-red-500",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Sneha Reddy",
      role: "Director of IT, FinCorp India",
      quote:
        "Impressed by their technical capabilities and commitment. The custom software solution is streamlining our operations effectively.",
      gradient: "from-green-400 to-teal-500",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Vikram Singh",
      role: "COO, RetailHub",
      quote:
        "Their digital marketing approach is data-driven and results-focused. We're already seeing strong engagement from our target audience.",
      gradient: "from-indigo-400 to-purple-500",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Neha Gupta",
      role: "Founder, EduTech India",
      quote:
        "Excellent communication and understanding of our needs. Phyteam brings a fresh perspective to solving business challenges with technology.",
      gradient: "from-pink-400 to-rose-500",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
    },
    
    {
      name: "Kavya Iyer",
      role: "Head of Product, HealthTech Plus",
      quote:
        "Outstanding UI/UX design and development. They transformed our healthcare app into an intuitive platform that our users absolutely love.",
      gradient: "from-teal-400 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Rohit Deshmukh",
      role: "CIO, Manufacturing Pro",
      quote:
        "Their IoT and automation solutions have revolutionized our factory floor operations. Real-time monitoring and analytics are game-changers.",
      gradient: "from-yellow-400 to-orange-500",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Meera Nair",
      role: "Digital Marketing Head, FashionHub",
      quote:
        "Their social media campaigns and content strategy drove a 300% increase in our online engagement. Truly impressive results!",
      gradient: "from-rose-400 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Karan Chopra",
      role: "Founder, LogiTrack",
      quote:
        "The logistics management system they built streamlined our entire supply chain. Real-time tracking and analytics have reduced costs by 40%.",
      gradient: "from-emerald-400 to-green-500",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Divya Menon",
      role: "VP Technology, BankSecure",
      quote:
        "Security and compliance were paramount for our fintech platform. Phyteam delivered a solution that exceeds industry standards.",
      gradient: "from-violet-400 to-purple-500",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (active + i + 1) % testimonials.length;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0a1e2e] to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #06b6d4 1px, transparent 1px),
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold"
          >
            What Our Clients{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Say
            </span>
          </motion.h2>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Featured Large Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-2 bg-gradient-to-r ${testimonials[active].gradient} rounded-3xl opacity-30 blur-2xl`}
              />

              {/* Featured Card */}
              <div className="relative bg-gradient-to-br from-[#1a2332]/95 to-[#0f1820]/95 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden">
                {/* Image */}
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                  <motion.img
                    key={testimonials[active].image}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    src={testimonials[active].image}
                    alt={testimonials[active].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1820] via-transparent to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {/* Quote icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-7xl text-cyan-400/30 font-serif mb-4"
                  >
                    &ldquo;
                  </motion.div>

                  {/* Quote */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-200 text-lg leading-relaxed mb-6"
                  >
                    {testimonials[active].quote}
                  </motion.p>

                  {/* Profile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[active].gradient} flex items-center justify-center text-white font-bold text-2xl border-2 border-white/20`}
                    >
                      {testimonials[active].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white">
                        {testimonials[active].name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonials[active].role}
                      </p>
                    </div>
                  </motion.div>

                  {/* Star rating */}
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Side - Grid of Smaller Cards */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={testimonial.originalIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActive(testimonial.originalIndex)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="relative cursor-pointer group"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${testimonial.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300`}
                  />

                  {/* Small Card */}
                  <div className="relative bg-gradient-to-br from-[#1a2332]/90 to-[#0f1820]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-5 flex gap-4 items-start">
                    {/* Small Image */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-full blur opacity-50`}
                      />
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-base mb-1 group-hover:text-cyan-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-xs mb-2">
                        {testimonial.role}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                        {testimonial.quote}
                      </p>

                      {/* Mini stars */}
                      <div className="flex gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-cyan-400"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 justify-center pt-4"
            >
              <button
                onClick={handlePrev}
                className="group w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="group w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Progress indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-2 mt-12"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === active
                  ? "bg-cyan-400 w-12"
                  : "bg-gray-600 w-2 hover:bg-gray-500"
              }`}
            />
          ))}
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-4 text-gray-400 text-sm"
        >
          {active + 1} / {testimonials.length}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(TestimonialsSection);
