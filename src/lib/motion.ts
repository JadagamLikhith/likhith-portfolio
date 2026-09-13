/**
 * Portfolio Motion System V1 - Shared Motion Language & Constants
 * Engineered for smooth, editorial, hardware-accelerated animations.
 */

// Premium editorial easing curves
export const editorialEase = [0.25, 0.1, 0.25, 1.0] as const;
export const gentleEase = [0.16, 1, 0.3, 1] as const;
export const subtleSpring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
} as const;

// Common Section Header Reveal Variants
export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: editorialEase,
    },
  },
};

// Container Stagger Variants
export const staggerContainerVariants = (staggerDelay = 0.1, delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Standard Card Reveal
export const cardRevealVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: editorialEase,
    },
  },
};

// Capabilities Varied Depth Variants (Card 1: 40px, Card 2: 55px, Card 3: 70px, Card 4: 85px)
export const capabilityCardVariants = (customY: number) => ({
  hidden: { opacity: 0, y: customY, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: editorialEase,
    },
  },
});

// Editorial Monograph / Paper Card Variants
export const monographCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: editorialEase,
    },
  },
};
