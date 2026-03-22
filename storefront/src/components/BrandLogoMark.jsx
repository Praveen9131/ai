/**
 * Circular crop of `/logo.png` focused on the center (icon/mark), not the full wordmark.
 * Uses `object-cover` + slight scale so the middle of the asset fills the round frame.
 * Tune zoom with `VITE_LOGO_MARK_SCALE` (e.g. `1.1`–`1.35`) if the mark feels too tight/loose.
 *
 * @param {{ size?: "sm" | "md" | "lg"; className?: string }} props
 */
export default function BrandLogoMark({ size = "md", className = "" }) {
  const raw = import.meta.env.VITE_LOGO_MARK_SCALE;
  const parsed = raw !== undefined && raw !== "" ? Number(raw) : NaN;
  const zoom = Number.isFinite(parsed) && parsed > 0 ? parsed : 1.22;
  const frame =
    size === "sm"
      ? "h-14 w-14 sm:h-16 sm:w-16"
      : size === "lg"
        ? "h-[5.75rem] w-[5.75rem] md:h-28 md:w-28"
        : "h-16 w-16 sm:h-[4.25rem] sm:w-[4.25rem] md:h-[4.75rem] md:w-[4.75rem]";

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full bg-white shadow-inner ring-2 ring-brand-light/90 ${frame} ${className}`}
    >
      <img
        src="/logo.png"
        alt=""
        width={256}
        height={256}
        decoding="async"
        className="h-full w-full object-cover object-center"
        style={{ transform: `scale(${zoom})` }}
      />
    </span>
  );
}
