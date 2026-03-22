/**
 * Static scripted replies for the product “AI assistant” (demo only — not medical advice).
 * Replace with a real API later; keep copy brand-safe.
 */

/**
 * @param {{ name: string; description?: string; category?: string; audiences?: string[] }} product
 */
export function getWelcomeMessage(product) {
  return `Hi! I’m Zaanvi’s product guide for **${product.name}**. I can suggest serving ideas, who it’s often chosen for, and how it might fit your routine.\n\n_This is demo text, not medical advice — always check with your doctor for pregnancy or diabetes care._`;
}

/**
 * @param {{ name: string; audiences?: string[]; category?: string; description?: string }} product
 * @param {string} userText
 * @param {number} turnIndex 0-based assistant reply count (for rotation)
 */
export function getAssistantReply(product, userText, turnIndex) {
  const q = userText.toLowerCase().trim();
  const name = product.name;

  if (/diabet|sugar|glucose|gi|insulin/.test(q)) {
    if (product.audiences?.includes("diabetic")) {
      return `${name} is often picked for **steady energy** thanks to whole millets and fibre. Pair with vegetables and protein, watch portions, and follow your care team’s plan.`;
    }
    return `For diabetes-specific needs, your clinician should guide portions and timing. ${name} is a whole-grain option many families use alongside balanced meals — not a replacement for medical advice.`;
  }

  if (/pregnan|trimester|baby|maa|mother|nausea|morning sick/.test(q)) {
    return `${name} fits our **pregnancy & postpartum** range (${product.category}). Many customers use it as part of trimester-wise millet nutrition — listen to your body and your doctor’s guidance.`;
  }

  if (/lactat|milk|nursing|breastfeed|postpartum|after birth/.test(q)) {
    if (product.category === "Postpartum" || product.trimester === 0) {
      return `${name} is popular in the **postpartum** window for easy, nourishing meals. Hydration and balanced food support lactation — confirm choices with your lactation consultant or doctor.`;
    }
    return `For lactation support, ${name} can be part of a varied diet. Our **Postpartum** items and kits are curated for that phase — consider browsing those alongside ${name}.`;
  }

  if (/cook|recipe|how to|prepare|make|serve|eat/.test(q)) {
    return `Try ${name} as a **simple base**: cook per pack instructions, add seasonal vegetables, a protein you tolerate well, and a little ghee or oil if you like. Start with small portions if you’re introducing millets for the first time.`;
  }

  if (/organic|ingredient|what'?s in|preservative/.test(q)) {
    return `Zaanvi focuses on **organic millets** and clear labels. For the exact ingredient list and allergens, read the physical pack or contact us — I only show demo guidance here.`;
  }

  if (/price|cost|₹|rupee|cheap|expensive/.test(q)) {
    return `This product is listed at **₹${product.price}** on the site (demo storefront). Shipping and offers may change — use **Add to cart** for the current flow.`;
  }

  if (/kit|bundle|box/.test(q)) {
    return product.category === "Kit"
      ? `This **kit** bundles complementary items for a stage of the journey. Great as a gift or pantry reset — open each pack and follow its prep notes.`
      : `${name} is sold as a single SKU. Explore **Kits** in the shop for bundled trimester sets.`;
  }

  const fallbacks = [
    `${name} works well as part of a **rotation** with other millets and whole foods — variety matters for micronutrients.`,
    `Customers often pair ${name} with **dal, sabzi, or yogurt** for a complete plate.`,
    `If you share what meal time you’re planning (breakfast vs dinner), I can suggest a simple way to use ${name} next.`,
    `Still exploring? Add ${name} to your cart when you’re ready — you can keep chatting here anytime (demo replies).`,
  ];

  return fallbacks[turnIndex % fallbacks.length];
}
