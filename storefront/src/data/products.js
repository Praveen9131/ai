/** Unsplash CDN — see src/config/stockImages.js */
const u = (id) =>
  `https://images.unsplash.com/${id}?w=900&auto=format&fit=crop&q=82`;

const _rawProducts = [
  {
    id: 1,
    name: "Foxtail Millet Porridge Mix",
    image: u("photo-1517673400267-0259440c07be"),
    category: "Trimester 1",
    price: 249,
    weight: "250g",
    trimester: 1,
    tag: "Iron Rich",
    description:
      "Gentle on the stomach, rich in iron and folic acid. Perfect for early pregnancy.",
  },
  {
    id: 2,
    name: "Barnyard Millet Khichdi Mix",
    image: u("photo-1588168333986-3858f321471d"),
    category: "Trimester 1",
    price: 269,
    weight: "300g",
    trimester: 1,
    tag: "Folic Acid",
    description:
      "High in fibre and B-vitamins to support neural tube development.",
  },
  {
    id: 3,
    name: "Little Millet Upma Mix",
    image: u("photo-1490645935967-10de6ba17061"),
    category: "Trimester 1",
    price: 229,
    weight: "250g",
    trimester: 1,
    tag: "B-Vitamins",
    description: "Easy to digest, helps manage morning sickness.",
  },
  {
    id: 4,
    name: "Pearl Millet (Bajra) Roti Mix",
    image: u("photo-1565557623262-b40e163b2c83"),
    category: "Trimester 2",
    price: 259,
    weight: "400g",
    trimester: 2,
    tag: "Calcium Boost",
    description:
      "Calcium and magnesium-rich for baby bone development.",
  },
  {
    id: 5,
    name: "Sorghum (Jowar) Dosa Mix",
    image: u("photo-1589302168068-964664d93dc0"),
    category: "Trimester 2",
    price: 279,
    weight: "300g",
    trimester: 2,
    tag: "Protein Rich",
    description:
      "High-protein mix for growing baby and mother's strength.",
  },
  {
    id: 6,
    name: "Finger Millet (Ragi) Ladoo",
    image: u("photo-1558961363-fa8fdf82db35"),
    category: "Trimester 2",
    price: 299,
    weight: "200g",
    trimester: 2,
    tag: "Calcium",
    description: "Traditional ragi ladoos packed with calcium and iron.",
  },
  {
    id: 7,
    name: "Kodo Millet Pulao Mix",
    image: u("photo-1604908176989-8760c6e9f8d1"),
    category: "Trimester 2",
    price: 249,
    weight: "300g",
    trimester: 2,
    tag: "Antioxidants",
    description: "Rich in antioxidants, supports immune function.",
  },
  {
    id: 8,
    name: "Ragi Sathu Maavu",
    image: u("photo-1506368083636-6defb67639a7"),
    category: "Trimester 3",
    price: 319,
    weight: "400g",
    trimester: 3,
    tag: "Energy Dense",
    description:
      "Multi-grain energy mix to prepare for labour and delivery.",
  },
  {
    id: 9,
    name: "Foxtail Millet Halwa Mix",
    image: u("photo-1578985545062-69928b1d9587"),
    category: "Trimester 3",
    price: 289,
    weight: "250g",
    trimester: 3,
    tag: "Omega 3",
    description:
      "Nourishing halwa mix with omega-3 support for baby brain development.",
  },
  {
    id: 10,
    name: "Bajra Methi Thepla Mix",
    image: u("photo-1563379926898-05f4525eaaa2"),
    category: "Trimester 3",
    price: 259,
    weight: "300g",
    trimester: 3,
    tag: "Iron Rich",
    description: "Iron-boosting mix to combat third trimester anaemia.",
  },
  {
    id: 11,
    name: "Ragi Kanji Mix",
    image: u("photo-1544145945-f90425340c7e"),
    category: "Postpartum",
    price: 299,
    weight: "400g",
    trimester: 0,
    tag: "Lactation",
    description:
      "Traditional postpartum drink to boost milk supply and energy.",
  },
  {
    id: 12,
    name: "Jowar Pancake Mix",
    image: u("photo-1528207776546-365db710ddf3"),
    category: "Postpartum",
    price: 269,
    weight: "250g",
    trimester: 0,
    tag: "High Protein",
    description:
      "Easy-to-make pancakes for nursing mothers needing quick nutrition.",
  },
  {
    id: 13,
    name: "Multi-Millet Lactation Cookies",
    image: u("photo-1499636136210-6f4ee915583e"),
    category: "Postpartum",
    price: 349,
    weight: "200g",
    trimester: 0,
    tag: "Lactation Boost",
    description:
      "Oats + millet cookies with fenugreek and flaxseed for milk production.",
  },
  {
    id: 14,
    name: "First Trimester Wellness Kit",
    image: u("photo-1549465220-5771c0884f4f"),
    category: "Kit",
    price: 699,
    weight: "Kit",
    trimester: 1,
    tag: "Bestseller",
    description:
      "Complete nutrition kit for the first 12 weeks — products 1, 2 & 3 bundled.",
  },
  {
    id: 15,
    name: "Second Trimester Strength Kit",
    image: u("photo-1607082348824-0a96f2a4b9da"),
    category: "Kit",
    price: 799,
    weight: "Kit",
    trimester: 2,
    tag: "Most Popular",
    description: "Bundled kit for weeks 13–26 — products 4, 5 & 6.",
  },
  {
    id: 16,
    name: "Third Trimester Power Kit",
    image: u("photo-1596040033229-a9821ebd058d"),
    category: "Kit",
    price: 849,
    weight: "Kit",
    trimester: 3,
    tag: "Labour Prep",
    description:
      "Energy and iron-focused kit for the final stretch — products 8, 9 & 10.",
  },
  {
    id: 17,
    name: "New Maa Recovery Kit",
    image: u("photo-1547592166-23ac45744acd"),
    category: "Kit",
    price: 899,
    weight: "Kit",
    trimester: 0,
    tag: "Postpartum",
    description:
      "Complete postpartum recovery and lactation support kit.",
  },
];

/**
 * Extra shop facets & copy. Merged into each product below.
 * `audiences`: keys for Shop “Wellness focus” chips (`pregnancy`, `diabetic`, `wellness`).
 */
const PRODUCT_ENRICH = {
  1: {
    audiences: ["pregnancy", "diabetic"],
    useCases: [
      "Gentle breakfast during morning sickness",
      "Iron-rich snack between meals",
      "Warm evening porridge for comfort",
    ],
  },
  2: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "One-pot lunch with vegetables",
      "High-fibre meal for steady energy",
      "Post-activity recovery dinner",
    ],
  },
  3: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Quick weekday breakfast",
      "Light dinner when appetite is low",
      "Tiffin-box friendly upma",
    ],
  },
  4: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Roti or paratha with dal",
      "Calcium support with greens",
      "Family dinner alongside sabzi",
    ],
  },
  5: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Weekend dosa or uttapam",
      "Protein-forward brunch",
      "Kids’ lunchbox dosa rolls",
    ],
  },
  6: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Mid-morning energy bite",
      "Calcium boost with milk or ghee",
      "Festival tray sweet (portion-aware)",
    ],
  },
  7: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Vegetable pulao for lunch",
      "Meal-prep batch for the week",
      "Light dinner with raita",
    ],
  },
  8: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Third-trimester energy drink",
      "Pre-labour nourishment routine",
      "Shared with family as malt drink",
    ],
  },
  9: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Comfort dessert after dinner",
      "Omega-aware sweet craving",
      "Warm halwa in cooler months",
    ],
  },
  10: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Travel-friendly thepla stack",
      "Iron support with yogurt",
      "Office lunch with pickle",
    ],
  },
  11: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Postpartum morning kanji ritual",
      "Hydration with gentle grains",
      "Lactation-supporting routine (with diet advice)",
    ],
  },
  12: {
    audiences: ["pregnancy", "diabetic", "wellness"],
    useCases: [
      "Quick nursing-break meal",
      "Weekend brunch pancakes",
      "Toddler-friendly finger food",
    ],
  },
  13: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Evening snack while nursing",
      "Desk snack between feeds",
      "Gift for new mothers",
    ],
  },
  14: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Starter bundle for week 4–12",
      "Gift for newly expecting parents",
      "One-cart solution for early trimester",
    ],
  },
  15: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Mid-pregnancy nutrition reset",
      "Gifting at baby shower",
      "Two-week meal rotation base",
    ],
  },
  16: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "Final weeks energy planning",
      "Iron + energy combo before due date",
      "Hospital bag friendly dry mixes",
    ],
  },
  17: {
    audiences: ["pregnancy", "wellness"],
    useCases: [
      "First 40 days recovery support",
      "Lactation-focused pantry restock",
      "Care package for new Maa",
    ],
  },
};

const DEFAULT_AUDIENCES = ["pregnancy", "wellness"];
const DEFAULT_USE_CASES = [
  "Everyday millet nutrition",
  "Family-friendly meals",
  "Wholesome alternative to refined grains",
];

export const products = _rawProducts.map((p) => ({
  ...p,
  audiences: PRODUCT_ENRICH[p.id]?.audiences ?? DEFAULT_AUDIENCES,
  useCases: PRODUCT_ENRICH[p.id]?.useCases ?? DEFAULT_USE_CASES,
}));

/** Featured on home bestsellers carousel */
export const bestsellerIds = [14, 15, 6, 11];
