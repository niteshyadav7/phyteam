"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, memo } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Star,
  PhoneCall,
} from "lucide-react";

const PricingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: "starter",
      name: "Starter Package",
      badge: "50% OFF LAUNCH OFFER",
      badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/30",
      description:
        "Essential digital foundation for solo founders, creators, and new businesses looking to launch quickly.",
      monthlyPrice: "₹999",
      yearlyPrice: "₹799",
      originalPrice: "₹1,999",
      period: "/month",
      billingNote: isYearly ? "Billed annually (Save ₹2,400/yr)" : "Flexible monthly billing",
      features: [
        "1-Page High-Converting Landing Page",
        "Essential SEO & Google Search Indexing",
        "WhatsApp & Direct Contact Capture",
        "High-Speed Cloud Hosting & Free SSL",
        "Social Media & Link-in-Bio Setup",
        "1 Month Free Technical Support",
      ],
      notIncluded: [
        "Multi-Page Architecture",
        "Custom Mobile Application",
        "Dedicated Tech Lead",
      ],
      ctaText: isYearly ? "Get Started (₹799/mo)" : "Get Started (₹999/mo)",
      ctaLink: "/contact?plan=Starter%20Package",
      popular: false,
      cardBorder: "border-[#1c2c48] hover:border-cyan-500/50",
      glowColor: "from-cyan-500/10 via-blue-500/5 to-transparent",
      accentColor: "cyan",
    },
    {
      id: "business",
      name: "Business Growth",
      badge: "⭐ MOST POPULAR • BEST VALUE",
      badgeColor: "from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30",
      description:
        "Engineered for scaling brands and businesses seeking higher visibility, consistent leads, and speed.",
      monthlyPrice: "₹2,999",
      yearlyPrice: "₹2,399",
      originalPrice: "₹5,999",
      period: "/month",
      billingNote: isYearly ? "Billed annually (Save ₹7,200/yr)" : "No lock-in • Cancel anytime",
      features: [
        "Up to 5 Pages Custom UI/UX Web System",
        "Full On-Page & Local SEO Strategy",
        "Integrated Booking & Firebase CRM Flow",
        "Strategic PR & Media Pitching Integration",
        "95+ Core Web Vitals Speed Optimization",
        "Priority 24/7 WhatsApp & Email Support",
        "3 Months Free Maintenance & Iterations",
      ],
      notIncluded: [
        "Native iOS & Android Mobile Apps",
      ],
      ctaText: isYearly ? "Claim Business Plan (₹2,399/mo)" : "Claim Business Plan (₹2,999/mo)",
      ctaLink: "/contact?plan=Business%20Package",
      popular: true,
      cardBorder: "border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.25)]",
      glowColor: "from-cyan-500/25 via-blue-500/20 to-purple-500/15",
      accentColor: "blue",
    },
    {
      id: "enterprise",
      name: "Enterprise & Bespoke",
      badge: "💎 100% CUSTOMIZABLE",
      badgeColor: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/30",
      description:
        "Full-stack custom software, cross-platform mobile apps, AI automation, and strategic PR architecture.",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      originalPrice: "",
      period: "",
      billingNote: "Milestone-based or dedicated team retainer",
      features: [
        "Full-Stack Web & SaaS Platform Development",
        "Native iOS & Android Mobile Apps",
        "Custom Backend, CRM & Secure REST APIs",
        "AI Workflows, Automation & Chatbots",
        "Nationwide Strategic PR & Media Outreach",
        "Dedicated Tech Lead & Solutions Architect",
        "Up to 12 Months Premium Enterprise SLA",
      ],
      notIncluded: [],
      ctaText: "Schedule Custom Consultation",
      ctaLink: "/contact?plan=Enterprise%20Package",
      popular: false,
      cardBorder: "border-[#1c2c48] hover:border-purple-500/50",
      glowColor: "from-purple-500/10 via-pink-500/5 to-transparent",
      accentColor: "purple",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-32 px-6 bg-gradient-to-b from-black via-[#06101c] to-[#081526] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid line pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 mb-5 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>TRANSPARENT & ACCESSIBLE PRICING</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-gray-300">
              High-Impact Digital Solutions,
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Priced to Scale With You.
            </span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From quick online launches to full-scale digital infrastructure. Start small,
            upgrade anytime, and never pay for features you don&apos;t need.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-10 flex items-center justify-center">
            <div className="relative flex items-center bg-[#0d1a2d] border border-[#1d2f4d] p-1.5 rounded-full shadow-inner">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  !isYearly ? "text-white shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {!isYearly && (
                  <motion.div
                    layoutId="pricing-billing-pill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly Billing</span>
              </button>

              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isYearly ? "text-white shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isYearly && (
                  <motion.div
                    layoutId="pricing-billing-pill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Yearly Billing</span>
                <span className="relative z-10 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full animate-pulse">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((plan) => {
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#0e223d] to-[#081526] lg:-translate-y-4"
                    : "bg-gradient-to-b from-[#0c182a]/90 to-[#07111e]/90"
                } border ${plan.cardBorder} backdrop-blur-xl group`}
              >
                {/* Popular Card Ambient Aura */}
                {plan.popular && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none -z-10" />
                )}

                {/* Popular Floating Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30">
                      <Star className="w-3.5 h-3.5 fill-white text-white animate-spin" style={{ animationDuration: "8s" }} />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Top Part: Title, Badge, Description, Price */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${plan.badgeColor}`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                    {plan.name}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-400 mb-6 leading-relaxed min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Price Section */}
                  <div className="py-5 border-y border-[#182944] mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        {currentPrice}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-base text-gray-500 line-through font-semibold">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-cyan-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">
                      {plan.billingNote}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="mb-8">
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>What&apos;s Included:</span>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs md:text-sm text-gray-200"
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              plan.popular
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                                : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}

                      {/* Not included items (gives contrast) */}
                      {plan.notIncluded.map((item, i) => (
                        <li
                          key={`not-${i}`}
                          className="flex items-start gap-3 text-xs md:text-sm text-gray-500"
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-800/40 text-gray-600 border border-gray-700/40">
                            <span className="text-xs">✕</span>
                          </div>
                          <span className="line-through">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 mt-auto">
                  <Link href={plan.ctaLink} className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        plan.popular
                          ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110"
                          : "bg-[#112239] hover:bg-[#182f4e] text-white border border-[#22395d] hover:border-cyan-400/40"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  <p className="text-[11px] text-center text-gray-500 mt-2.5">
                    {plan.id === "enterprise"
                      ? "Custom contract & scope proposal in 24h"
                      : "Immediate onboarding • No hidden setup costs"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust & Assurance Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-20 pt-10 border-t border-[#122238] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-3.5 p-4 rounded-2xl bg-[#0b1728]/60 border border-[#172942]">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-400/30 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Transparent Terms</div>
              <div className="text-xs text-gray-400">Fixed milestones with zero hidden fees.</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 p-4 rounded-2xl bg-[#0b1728]/60 border border-[#172942]">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-400/30 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Fast Turnaround</div>
              <div className="text-xs text-gray-400">Launch in days, not months.</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 p-4 rounded-2xl bg-[#0b1728]/60 border border-[#172942]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 border border-purple-400/30 flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Direct Developer Access</div>
              <div className="text-xs text-gray-400">Instant WhatsApp & email support.</div>
            </div>
          </div>
        </motion.div>

        {/* Custom Consultation Callout */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Looking for something tailored or have complex technical requirements?{" "}
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 cursor-pointer"
            >
              Talk to our tech leads directly →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(PricingSection);
