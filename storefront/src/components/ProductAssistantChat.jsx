import { useEffect, useId, useRef, useState } from "react";
import { Check, Send, X } from "lucide-react";
import {
  getAssistantReply,
  getWelcomeMessage,
} from "../data/productChatReplies.js";
import { playProductOpenTick } from "../utils/playProductOpenTick.js";
import ClaudeStyleIcon from "./ClaudeStyleIcon.jsx";

/** Brand accent aligned with reference mockup (orange). */
const ACCENT = "#d16b08";

/** Quick prompts shown as horizontal chips (demo copy). */
const QUICK_PROMPTS = [
  "Safe in 3rd trimester?",
  "How to use?",
  "Key nutrients?",
  "Is it diabetic-friendly?",
];

/** Debounce duplicate runs (e.g. React Strict Mode) for the same product. */
let lastOpenChime = { id: null, at: 0 };

/** Renders `**bold**` segments as <strong>; preserves newlines. */
function FormattedMessage({ text, variant = "light" }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  const strongClass =
    variant === "claude"
      ? "font-semibold text-stone-900"
      : "font-bold text-brand-dark";
  return (
    <span className="whitespace-pre-line text-[15px] leading-relaxed text-stone-700">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className={strongClass}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/**
 * Left column of the split assistant overlay: product summary (reference layout).
 *
 * @param {{ product: object }} props
 */
function ProductSplitLeft({ product }) {
  const kicker =
    (product.tag && String(product.tag).toUpperCase()) ||
    (product.category && String(product.category).toUpperCase()) ||
    "PRODUCT";
  const cards = [
    { main: product.tag || "—", sub: "Focus" },
    { main: product.weight || "—", sub: "Pack size" },
    { main: product.category || "—", sub: "Stage" },
    { main: "100% organic", sub: "Quality" },
  ];
  const useCases = Array.isArray(product.useCases) ? product.useCases : [];

  return (
    <aside className="flex max-h-[42vh] min-h-0 w-full shrink-0 flex-col overflow-y-auto border-b border-stone-200/90 bg-[#faf7f2] px-5 py-6 md:max-h-none md:w-1/2 md:border-b-0 md:border-r md:border-stone-200/90 md:px-8 md:py-10">
      {product.image ? (
        <div className="mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm ring-1 ring-stone-200/60">
          <img
            src={product.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <p
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ color: ACCENT }}
      >
        — {kicker}
      </p>
      <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-stone-900 md:text-3xl">
        {product.name}
      </h2>
      <p
        className="mt-2 font-heading text-2xl font-bold md:text-3xl"
        style={{ color: ACCENT }}
      >
        ₹{product.price}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone-700">
        {product.description}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div
            key={`${c.main}-${c.sub}`}
            className="rounded-xl border border-stone-200/90 bg-white p-3 shadow-sm"
          >
            <p
              className="text-[11px] font-bold uppercase leading-snug tracking-wide"
              style={{ color: ACCENT }}
            >
              {c.main}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-stone-500">
              {c.sub}
            </p>
          </div>
        ))}
      </div>
      {useCases.length ? (
        <ul className="mt-6 space-y-2.5 pb-2">
          {useCases.map((u) => (
            <li key={u} className="flex gap-2.5 text-sm text-stone-700">
              <span className="shrink-0 font-bold" style={{ color: ACCENT }}>
                ✓
              </span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

/**
 * Full-viewport overlay: **50/50 horizontal split** (reference layout).
 * Left = product summary; right = nutrition assistant (slides in from the right).
 * On small screens, product stacks above the assistant (scrollable).
 * Controlled via `open` / `onOpenChange`.
 *
 * @param {{
 *   product: object;
 *   open?: boolean;
 *   onOpenChange?: (open: boolean) => void;
 * }} props
 */
export default function ProductAssistantChat({
  product,
  open: openProp,
  onOpenChange,
}) {
  const panelId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const controlled = openProp !== undefined;
  const open = controlled ? Boolean(openProp) : uncontrolledOpen;
  const setOpen = (v) => {
    if (controlled) onOpenChange?.(v);
    else setUncontrolledOpen(v);
  };

  const [showInvite, setShowInvite] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [replyTurn, setReplyTurn] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const now = Date.now();
    const same =
      lastOpenChime.id === product.id && now - lastOpenChime.at < 900;
    if (!same) {
      lastOpenChime = { id: product.id, at: now };
      playProductOpenTick();
    }
    setShowInvite(true);
    const t = window.setTimeout(() => setShowInvite(false), 10000);
    return () => window.clearTimeout(t);
  }, [product.id]);

  useEffect(() => {
    if (!open) {
      setMessages([]);
      setInput("");
      setReplyTurn(0);
      return;
    }
    setShowInvite(false);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: getWelcomeMessage(product),
      },
    ]);
    setReplyTurn(0);
  }, [open, product.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const enqueueUserAndReply = (raw) => {
    const text = String(raw).trim();
    if (!text) return;
    const userId = `u-${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", text }]);
    const turn = replyTurn;
    setReplyTurn((t) => t + 1);
    window.setTimeout(() => {
      const reply = getAssistantReply(product, text, turn);
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", text: reply },
      ]);
    }, 400);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    enqueueUserAndReply(text);
  };

  const sendQuick = (prompt) => enqueueUserAndReply(prompt);

  const dismissInvite = () => setShowInvite(false);
  const openAssistant = () => setOpen(true);

  return (
    <>
      {showInvite && !open ? (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex max-w-[min(calc(100vw-2rem),340px)] flex-col items-end md:bottom-6 md:right-6">
          <div className="pointer-events-auto flex w-full items-stretch gap-1 rounded-2xl border border-stone-200 bg-white py-2 pl-2 pr-1 shadow-xl ring-1 ring-black/5">
            <button
              type="button"
              onClick={openAssistant}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-xl py-1.5 pl-1.5 text-left transition hover:bg-stone-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-900">
                <ClaudeStyleIcon className="h-7 w-7" />
              </span>
              <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-stone-800">
                Ask anything about this product
              </p>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                aria-hidden
              >
                <Check className="h-4 w-4" strokeWidth={2.75} />
              </span>
            </button>
            <button
              type="button"
              onClick={dismissInvite}
              className="shrink-0 self-center rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              aria-label="Dismiss hint"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[100]" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/45 backdrop-blur-[2px]"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={panelId}
            className="animate-assistant-split-in absolute inset-y-0 right-0 flex h-full w-full max-w-full flex-col overflow-hidden bg-[#faf9f5] shadow-[-12px_0_48px_rgba(0,0,0,0.15)] md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductSplitLeft product={product} />

            <main className="flex min-h-0 w-full flex-1 flex-col bg-[#f5f0e8] md:w-1/2">
              <div className="shrink-0 border-b border-stone-200/80 bg-[#ebe8e0]/90 px-3 py-1 sm:px-4">
                <p className="text-[10px] font-medium leading-snug text-stone-600 sm:text-[11px]">
                  Demo replies only — not medical advice.
                </p>
              </div>

              <header className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-200/90 px-3 py-3 sm:px-5 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md ring-2 ring-white/80"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <ClaudeStyleIcon className="h-7 w-7 text-white" />
                  </span>
                  <div className="min-w-0">
                    <p
                      id={panelId}
                      className="font-body text-base font-bold leading-tight text-stone-900 sm:text-lg"
                    >
                      Zaanvi — Nutrition AI
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                      <span
                        className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden
                      />
                      <span>Online · Ask me anything about this product</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-800 text-white shadow-md transition hover:bg-stone-900"
                  aria-label="Close assistant"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </header>

              <div
                ref={listRef}
                className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:space-y-4 sm:px-5 sm:py-4"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.role === "user"
                        ? "ml-auto max-w-[min(92%,420px)] rounded-2xl rounded-tr-sm border border-stone-200/90 bg-white px-3.5 py-2.5 text-stone-900 shadow-sm sm:rounded-3xl sm:rounded-tr-md sm:px-4 sm:py-3"
                        : "mr-auto max-w-[min(96%,480px)] rounded-2xl rounded-tl-sm border border-[#e8dfd2] bg-[#ebe4d8] px-3.5 py-3 shadow-sm sm:rounded-3xl sm:rounded-tl-md sm:px-5 sm:py-4"
                    }
                  >
                    {msg.role === "assistant" ? (
                      <FormattedMessage text={msg.text} variant="claude" />
                    ) : (
                      <span className="whitespace-pre-line text-sm leading-relaxed text-stone-800 sm:text-[15px]">
                        {msg.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-stone-200/60 bg-[#f5f0e8] px-3 pb-2 pt-2 sm:px-5">
                <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 pt-0.5">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => sendQuick(p)}
                      className="shrink-0 rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50"
                      style={{ borderColor: ACCENT, color: ACCENT }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <footer className="shrink-0 border-t border-stone-200/80 bg-[#f5f0e8] px-3 py-3 sm:px-5 sm:py-4">
                <div
                  className="flex items-end gap-2 rounded-xl border-2 bg-[#faf6ef] p-1.5 shadow-inner sm:rounded-2xl sm:p-2"
                  style={{ borderColor: ACCENT }}
                >
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Ask about this product…"
                    className="max-h-24 min-h-[44px] w-full resize-none bg-transparent px-2 py-2 text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:px-3 sm:py-2.5 sm:text-[15px]"
                    aria-label="Message"
                  />
                  <button
                    type="button"
                    onClick={send}
                    className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-white shadow-md transition hover:opacity-90 disabled:opacity-35 sm:h-11 sm:w-11"
                    style={{ backgroundColor: ACCENT }}
                    disabled={!input.trim()}
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] text-stone-400 sm:text-[11px]">
                  Demo assistant — not medical advice.
                </p>
              </footer>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
}
