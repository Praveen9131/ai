import { Award, BadgeCheck } from "lucide-react";
import { aboutStoryImage } from "../config/stockImages.js";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <div className="overflow-hidden rounded-2xl shadow-md">
        <img
          src={aboutStoryImage}
          alt="Organic whole grains and ingredients"
          className="aspect-[21/9] w-full object-cover md:aspect-[3/1]"
          width="1200"
          height="400"
        />
      </div>
      <h1 className="mt-10 font-heading text-3xl font-bold text-brand-dark md:text-5xl">
        Our Story
      </h1>
      <div className="mt-8 space-y-6 font-normal leading-relaxed text-brand-dark">
        <p>
          Zaanvi Organics began with a simple belief: mothers deserve nourishment
          that honours tradition without compromising on safety or science. We
          blend heritage millets with trimester-aware nutrition so every bowl
          feels both familiar and purposeful.
        </p>
        <blockquote className="rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-md">
          <p className="font-heading text-lg font-bold text-brand-dark">
            Hi, I&apos;m Priya, a mother of two from Hyderabad. After my first
            pregnancy, I struggled to find clean, convenient millet-based foods
            that actually matched what my body needed each trimester. Zaanvi is
            the pantry I wished I had — honest ingredients, small batches, and
            recipes rooted in our home kitchens.
          </p>
          <footer className="mt-4 text-sm font-bold text-brand-green">
            — Priya, Founder
          </footer>
        </blockquote>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="font-heading text-xl font-bold text-brand-green">Mission</h2>
          <p className="mt-3 text-sm font-normal text-brand-dark/85">
            Make trimester-specific millet nutrition accessible, transparent, and
            delicious for every mother in India.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="font-heading text-xl font-bold text-brand-green">Vision</h2>
          <p className="mt-3 text-sm font-normal text-brand-dark/85">
            A generation of children born nourished by millets — and mothers who
            feel seen at every stage.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-xl font-bold text-brand-dark">
          Certifications
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm font-bold text-brand-dark">
            <BadgeCheck className="h-4 w-4 text-brand-green" />
            FSSAI Licensed
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm font-bold text-brand-dark">
            <Award className="h-4 w-4 text-brand-green" />
            Organic India Partner
          </span>
        </div>
      </div>
    </div>
  );
}
