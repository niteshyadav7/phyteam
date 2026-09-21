"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import { submitLead } from "../lib/firebase";

const ContactPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.15 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
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
      type: "contact_form",
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
        company: "",
        phone: "",
        service: "",
        message: "",
      });
    } else {
      setErrorMessage(res.error || "Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      detail: "contact@phyteam.com",
      link: "mailto:contact@phyteam.com",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: "📞",
      title: "Call Us",
      detail: "coming soon",
      link: "tel:+91",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: "📍",
      title: "Visit Us",
      detail: "Aligarh, U.P. India",
      link: "#",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "⏰",
      title: "Business Hours",
      detail: "Mon - Fri: 9AM - 6PM IST",
      link: "#",
      gradient: "from-pink-500 to-cyan-500",
    },
  ];

  const services = [
    "Website Development",
    "Custom Software Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Data & AI",
    "Digital Strategy",
    "Consulting",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e2e] via-black to-[#0a1e2e] text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isHeroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl mb-8"
          >
            💬
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Let&apos;s Connect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
          >
            Have a project in mind? We&apos;d love to hear from you. Send us a
            message and we&apos;ll respond as soon as possible.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 relative z-10"
                  >
                    <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
                      <svg
                        className="w-10 h-10 text-white"
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
                    <h2 className="text-3xl font-bold text-white mb-3">
                      Message Sent Successfully!
                    </h2>
                    <p className="text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
                      Thank you for contacting Phyteam. We have received your project details and an advisor will reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/40 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent relative z-10">
                      Send us a Message
                    </h2>

                    {errorMessage && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
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
                          className={`w-full px-4 py-3 bg-gray-800/50 border ${
                            focusedField === "name"
                              ? "border-cyan-400"
                              : "border-gray-700"
                          } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder-gray-500 cursor-text`}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
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
                            className={`w-full px-4 py-3 bg-gray-800/50 border ${
                              focusedField === "email"
                                ? "border-cyan-400"
                                : "border-gray-700"
                            } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder-gray-500 cursor-text`}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border ${
                              focusedField === "phone"
                                ? "border-cyan-400"
                                : "border-gray-700"
                            } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder-gray-500 cursor-text`}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("company")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-gray-800/50 border ${
                            focusedField === "company"
                              ? "border-cyan-400"
                              : "border-gray-700"
                          } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder-gray-500 cursor-text`}
                          placeholder="Your Company"
                        />
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Service Interested In *
                        </label>
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("service")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-gray-800/50 border ${
                            focusedField === "service"
                              ? "border-cyan-400"
                              : "border-gray-700"
                          } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white cursor-pointer`}
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service} className="bg-gray-900">
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          rows={5}
                          className={`w-full px-4 py-3 bg-gray-800/50 border ${
                            focusedField === "message"
                              ? "border-cyan-400"
                              : "border-gray-700"
                          } rounded-xl focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none text-white placeholder-gray-500 cursor-text`}
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We&apos;re here to answer any questions you may have about our
                  services. Reach out to us and we&apos;ll respond as soon as we can.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="block group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {info.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Follow Us</h3>
                <div className="flex gap-4">
                  {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(
                    (social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500 hover:to-blue-600 border border-cyan-400/30 hover:border-cyan-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
                      >
                        <span className="text-xs font-semibold text-cyan-400 hover:text-white transition-colors duration-300">
                          {social[0]}
                        </span>
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624426!2d78.03231355!3d27.8973944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a2d06e3c9957%3A0x6cda968c7c8bbb5d!2sAligarh%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1639000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-cyan-400/30">
                <p className="text-cyan-400 font-semibold flex items-center gap-2">
                  <span>📍</span> Aligarh, U.P. India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ContactPage;
