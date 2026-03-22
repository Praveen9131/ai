import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Shield,
  Sparkles,
} from "lucide-react";
import { products, bestsellerIds } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import {
  heroBackgroundImage,
  whyChooseUsImage,
} from "../config/stockImages.js";

const journey = [
  { title: "Trimester 1", subtitle: "Early weeks", filter: "1" },
  { title: "Trimester 2", subtitle: "Growth phase", filter: "2" },
  { title: "Trimester 3", subtitle: "Final stretch", filter: "3" },
  { title: "Postpartum", subtitle: "Recovery & lactation", filter: "postpartum" },
];

const usps = [
  {
    icon: Leaf,
    title: "100% Organic",
    text: "Certified organic millets and ingredients — no shortcuts, full traceability from farm to your kitchen.",
  },
  {
    icon: Shield,
    title: "No Preservatives",
    text: "Small-batch blends with clear labels. Nothing hidden — just whole foods prepared the traditional way.",
  },
  {
    icon: Baby,
    title: "Trimester-Specific",
    text: "Curated nutrition for each trimester and postpartum, supporting both baby's growth and mother's recovery.",
  },
  {
    icon: Sparkles,
    title: "Millet-Based",
    text: "Ragi, foxtail, barnyard and more — ancient grains, modern convenience.",
  },
];

const testimonials = [
  {
    quote:
      "The first trimester kit was gentle on my stomach and genuinely comforting.",
    name: "Ananya R.",
    place: "Hyderabad",
  },
  {
    quote:
      "I lived on the ragi ladoos and dosa mix in my second trimester — so filling!",
    name: "Preethi S.",
    place: "Bengaluru",
  },
  {
    quote:
      "Postpartum kanji became my evening ritual. Felt rooted and nourished.",
    name: "Kavitha N.",
    place: "Chennai",
  },
];

export default function Home() {
  const scroller = useRef(null);
  const bestsellers = bestsellerIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div>
      <section className="relative isolate min-h-[min(88vh,560px)] overflow-hidden px-4 py-16 text-white md:min-h-[min(85vh,640px)] md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroBackgroundImage}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-black/30"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green/72 to-brand-gold/68" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
            Zaanvi Organics
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.15] text-[#FFFCF7] drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] md:text-5xl md:leading-tight">
            Born from Nature. Made for Maa.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-semibold leading-relaxed text-stone-200 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] md:text-lg">
            Trimester-wise millet nutrition for pregnancy and postpartum — crafted
            with care in Hyderabad.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-block rounded-full border-2 border-[#FFFCF7]/40 bg-brand-cream/95 px-10 py-3.5 text-sm font-black uppercase tracking-widest text-brand-green shadow-lg backdrop-blur-sm transition hover:border-brand-cream hover:bg-brand-cream"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="why-zaanvi-heading">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green-dark">
                Why Zaanvi
              </p>
              <h2
                id="why-zaanvi-heading"
                className="mt-3 font-heading text-2xl font-bold text-brand-green-dark md:text-3xl lg:text-4xl"
              >
                Why Choose Zaanvi Organics?
              </h2>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-brand-green md:text-base">
                We combine certified organic millets, trimester-smart recipes, and
                honest sourcing — so every mother gets nourishment she can feel good
                about, from early pregnancy through postpartum.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {usps.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-amber-100/90 bg-[#FFF9EB] p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green-dark shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-bold text-brand-green-dark md:text-lg">
                      {title}
                    </h3>
                    <p className="mt-2 text-left text-sm font-medium leading-relaxed text-brand-dark/80">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
                <img
                  src={whyChooseUsImage}
                  alt="Wholesome organic salad bowl with fresh vegetables, avocado, and grains on a wooden surface"
                  className="aspect-[3/4] h-full w-full object-cover"
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-brand-dark md:text-4xl">
          Your Trimester Journey
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-semibold text-brand-dark/75 md:text-base">
          Tap a stage to shop picks curated for that phase.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((j) => (
            <Link
              key={j.filter}
              to={`/shop?filter=${j.filter}`}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <h3 className="font-heading text-xl font-bold text-brand-green">{j.title}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-dark/75">{j.subtitle}</p>
              <span className="mt-4 inline-block text-sm font-bold uppercase tracking-wide text-brand-gold">
                Shop this stage →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-light bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-dark md:text-4xl">
                Bestsellers
              </h2>
              <p className="mt-2 text-sm font-semibold text-brand-dark/75 md:text-base">
                Loved by mothers across India.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="rounded-full border border-brand-light p-2 hover:bg-brand-cream"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="rounded-full border border-brand-light p-2 hover:bg-brand-cream"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={scroller}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {bestsellers.map((p) => (
              <div
                key={p.id}
                className="w-[min(100%,260px)] shrink-0 snap-start"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light/50 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-brand-dark md:text-4xl">
            From mothers like you
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <Heart className="h-6 w-6 text-brand-gold" aria-hidden />
                <p className="mt-4 text-sm font-semibold leading-relaxed text-brand-dark">
                  “{t.quote}”
                </p>
                <footer className="mt-4 text-sm font-bold text-brand-green">
                  {t.name}
                  <span className="font-bold text-brand-dark/65">
                    {" "}
                    · {t.place}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
