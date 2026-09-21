"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { useState } from "react";
import { fadeUp, scaleIn } from "../utils/motion";
import { submitLead } from "../lib/firebase";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website Development",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitLead({
      type: "call_booking",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service || "Website Development",
      message: formData.message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Website Development",
        message: "",
      });
    } else {
      setErrorMessage(res.error || "Failed to schedule call. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    onClose();
  };

  const services = [
    "Website Development",
    "Custom Software",
    "Mobile App Development",
    "Data & AI Consulting",
    "SEO & Digital Marketing",
    "Digital Strategy",
    "Other",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-20">
            <motion.div
              {...scaleIn}
              initial="initial"
              animate="animate"
              exit="initial"
              className="relative w-full max-w-xl my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                {/* Close button */}
                <button
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Content */}
                <div className="relative p-6 md:p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/40">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Call Request Received!
                      </h3>
                      <p className="text-gray-300 text-sm max-w-sm mx-auto mb-8">
                        Thank you for reaching out. Our engineering & consulting team will review your project details and contact you promptly.
                      </p>
                      <button
                        onClick={handleModalClose}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/40 transition-all cursor-pointer"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {/* Header */}
                      <motion.div {...fadeUp} className="mb-6 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          Book a Call
                        </h2>
                        <p className="text-sm text-gray-400">
                          Let&apos;s discuss how we can help transform your business
                        </p>
                      </motion.div>

                      {errorMessage && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
                          {errorMessage}
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="relative">
                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2.5 bg-white/5 border ${
                                focusedField === "name"
                                  ? "border-cyan-400"
                                  : "border-gray-700"
                              } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 cursor-text`}
                              placeholder="John Doe"
                            />
                          </div>

                          {/* Email */}
                          <div className="relative">
                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2.5 bg-white/5 border ${
                                focusedField === "email"
                                  ? "border-cyan-400"
                                  : "border-gray-700"
                              } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 cursor-text`}
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Phone */}
                          <div className="relative">
                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2.5 bg-white/5 border ${
                                focusedField === "phone"
                                  ? "border-cyan-400"
                                  : "border-gray-700"
                              } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 cursor-text`}
                              placeholder="+91 98765 43210"
                            />
                          </div>

                          {/* Company */}
                          <div className="relative">
                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                              Company
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("company")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2.5 bg-white/5 border ${
                                focusedField === "company"
                                  ? "border-cyan-400"
                                  : "border-gray-700"
                              } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 cursor-text`}
                              placeholder="Acme Inc."
                            />
                          </div>
                        </div>

                        {/* Service Selection */}
                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Service Needed *
                          </label>
                          <select
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("service")}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-3 py-2.5 bg-white/5 border ${
                              focusedField === "service"
                                ? "border-cyan-400"
                                : "border-gray-700"
                            } rounded-xl text-white focus:outline-none transition-all duration-300 cursor-pointer`}
                          >
                            {services.map((service, index) => (
                              <option key={index} value={service} className="bg-gray-900 text-white">
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Message
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-3 py-2.5 bg-white/5 border ${
                              focusedField === "message"
                                ? "border-cyan-400"
                                : "border-gray-700"
                            } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none cursor-text`}
                            placeholder="Tell us about your timeline and project goals..."
                          />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Scheduling...</span>
                            </>
                          ) : (
                            <span>Schedule Call</span>
                          )}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(BookCallModal);
