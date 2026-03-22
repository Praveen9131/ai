/**
 * Remote product & marketing imagery (Unsplash — free to use under their license).
 * Replace with your own photography or Shopify CDN URLs in production.
 *
 * @see https://unsplash.com/license
 */
const q = "w=1200&auto=format&fit=crop&q=82";

export const heroBackgroundImage = `https://images.unsplash.com/photo-1506368083636-6defb67639a7?${q}`;

export const aboutStoryImage = `https://images.unsplash.com/photo-1586201375761-83865001e31c?${q}`;

/**
 * Home “Why choose us” — professional food photography (Unsplash).
 * Override with `VITE_WHY_CHOOSE_IMAGE_URL` for your own CDN asset in production.
 */
const viteEnv = import.meta.env;

/** Top-down vibrant salad bowl on slate — reads as fresh, organic, wholesome. */
const whyChooseUsDefault = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?${q}`;

export const whyChooseUsImage =
  viteEnv.VITE_WHY_CHOOSE_IMAGE_URL ?? whyChooseUsDefault;
