/**
 * Soft four-lobe starburst (rounded “AI assistant” style — not an official logo).
 */
export default function ClaudeStyleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g fill="currentColor">
        <circle cx="12" cy="8.15" r="4.45" />
        <circle cx="12" cy="15.85" r="4.45" />
        <circle cx="8.15" cy="12" r="4.45" />
        <circle cx="15.85" cy="12" r="4.45" />
      </g>
    </svg>
  );
}
