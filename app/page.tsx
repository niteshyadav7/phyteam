"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

// Lazy load heavy components
const ExpertiseSection = dynamic(
  () => import("./components/ExpertiseSection"),
  { ssr: true }
);
const WhyChooseSection = dynamic(
  () => import("./components/WhyChooseSection"),
  { ssr: true }
);
const StatsSection = dynamic(() => import("./components/StatsSection"), {
  ssr: true,
});
const TestimonialsSection = dynamic(
  () => import("./components/TestimonialsSection"),
  { ssr: true }
);
const PricingSection = dynamic(() => import("./components/PricingSection"), {
  ssr: true,
});
const CTASection = dynamic(() => import("./components/CTASection"), {
  ssr: true,
});
const FooterSection = dynamic(() => import("./components/FooterSection"), {
  ssr: true,
});
const BookCallModal = dynamic(() => import("./components/BookCallModal"), {
  ssr: false,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="min-h-screen bg-[#0a1e2e] text-white">
      {/* Book Call Modal */}
      {isModalOpen && (
        <BookCallModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}

      {/* Header */}
      <Header onBookCallClick={handleOpenModal} />

      {/* Hero Section */}
      <HeroSection />
      <ExpertiseSection />

      <WhyChooseSection />

      <StatsSection />
      <TestimonialsSection />
      <PricingSection />

      {/* CTA Section */}
      <CTASection onBookCallClick={handleOpenModal} />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

