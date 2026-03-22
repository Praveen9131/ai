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
    text: "Curated nutrition for each trimester and postpartum, so you get the right balance when it matters most.",
  },
  {
    icon: Sparkles,
    title: "Millet-Based",
    text: "Ragi, foxtail, barnyard and more — ancient grains, modern convenience, rooted in Indian wisdom.",
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
        {/* Hero video (public/hero-video.mp4 — copy of Video_Generation_Request.mp4) */}
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
        {/* Darken video / image for contrast — blackish wash */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/30"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green/72 to-brand-gold/68" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="font-subheading text-xs font-medium uppercase tracking-[0.2em] text-amber-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
            Zaanvi Organics
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.12] text-[#FFFCF7] drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl md:leading-tight lg:text-[3.5rem]">
            Born from Nature. Made for Maa.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-normal leading-relaxed text-stone-200 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] md:text-lg">
            Trimester-wise millet nutrition for pregnancy and postpartum — crafted
            with care in Hyderabad.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-block rounded-full border-2 border-[#FFFCF7]/40 bg-brand-cream/95 px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-green shadow-lg backdrop-blur-sm transition hover:border-brand-cream hover:bg-brand-cream"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Section 2 — Why choose us (copy + image) */}
      <section
        className="bg-white py-16 md:py-20 lg:py-24"
        aria-labelledby="why-choose-heading"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="min-w-0 text-left lg:pr-4">
              <p className="font-subheading text-xs font-medium uppercase tracking-[0.18em] text-brand-green md:text-sm">
                Why Zaanvi
              </p>
              <h2
                id="why-choose-heading"
                className="mt-3 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-brand-dark md:text-4xl md:leading-[1.1] lg:text-5xl xl:text-[2.75rem]"
              >
                Why Choose{" "}
                <span className="text-brand-green">Zaanvi Organics?</span>
              </h2>
              <p className="mt-5 max-w-xl font-subheading text-base font-medium leading-relaxed text-brand-dark/80 md:mt-6 md:text-lg lg:text-xl">
                We combine certified organic millets, trimester-smart recipes, and
                honest sourcing — so every mother gets nourishment she can feel good
                about, from early pregnancy through postpartum.
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10">
                {usps.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex gap-4 rounded-2xl border border-brand-light/90 bg-brand-cream/35 p-5 shadow-sm transition hover:border-brand-green/25 hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-green">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-bold leading-snug text-brand-dark md:text-xl">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm font-normal leading-relaxed text-brand-dark/75 md:text-base">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-brand-light/80 bg-brand-light/40 shadow-lg lg:mx-0 lg:max-w-none lg:max-h-[min(640px,75vh)]">
              <img
                src={whyChooseUsImage}
                alt="Wholesome organic meals and fresh ingredients — the care behind every Zaanvi blend."
                className="absolute inset-0 h-full w-full object-cover"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-green-dark/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Trimester journey */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="text-center font-heading text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
          Your Trimester Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-subheading text-base font-medium text-brand-dark/75 md:mt-5 md:text-lg">
          Tap a stage to shop picks curated for that phase.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((j) => (
            <Link
              key={j.filter}
              to={`/shop?filter=${j.filter}`}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <h3 className="font-heading text-xl font-bold text-brand-green md:text-2xl">{j.title}</h3>
              <p className="mt-1 text-sm font-normal text-brand-dark/75">{j.subtitle}</p>
              <span className="mt-4 inline-block text-sm font-bold uppercase tracking-wide text-brand-gold">
                Shop this stage →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-light bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
                Bestsellers
              </h2>
              <p className="mt-3 font-subheading text-base font-medium text-brand-dark/75 md:text-lg">
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

      <section className="bg-brand-light/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center font-heading text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
            From mothers like you
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <Heart className="h-6 w-6 text-brand-gold" aria-hidden />
                <p className="mt-4 text-sm font-normal leading-relaxed text-brand-dark">
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
