/**
 * Display name for checkout / payment UIs (env-driven for Docker deploys).
 * @returns {string}
 */
export function getMerchantDisplayName() {
  const fromEnv = import.meta.env.VITE_SITE_BRAND_NAME;
  if (fromEnv && String(fromEnv).trim()) return String(fromEnv).trim();
  return "Zaanvi Organics";
}
