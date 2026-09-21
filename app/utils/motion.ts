// Optimized motion configurations for better performance

export const pageTransition = {
  ease: "easeOut",
  duration: 0.4,
} as const;

export const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
} as const;

export const slideIn = (
  direction: "left" | "right" | "up" | "down" = "left"
) => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const value = direction === "left" || direction === "up" ? -20 : 20;

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  } as const;
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

export const hoverLift = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2, ease: "easeOut" },
  },
} as const;
