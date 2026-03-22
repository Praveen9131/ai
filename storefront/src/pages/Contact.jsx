import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";

export default function Contact() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-dark md:text-5xl">
        Contact
      </h1>
      <p className="mt-3 max-w-2xl font-subheading text-sm font-medium text-brand-dark/80 md:text-base">
        Questions about trimester nutrition, wholesale, or collaborations? Write
        to us.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-md"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold text-brand-dark">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-full border border-brand-light bg-brand-cream px-4 py-2.5 outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-brand-dark">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-full border border-brand-light bg-brand-cream px-4 py-2.5 outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-sm font-bold text-brand-dark"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full rounded-2xl border border-brand-light bg-brand-cream px-4 py-3 outline-none focus:border-brand-green"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-brand-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
          >
            Send message
          </button>
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-lg font-bold text-brand-dark">Visit</h2>
            <p className="mt-2 text-sm font-normal text-brand-dark/85">
              Hyderabad, Telangana, India
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-lg font-bold text-brand-dark">Email</h2>
            <a
              href="mailto:hello@zaanviorganics.com"
              className="mt-2 inline-block text-sm font-bold text-brand-green hover:underline"
            >
              hello@zaanviorganics.com
            </a>
          </div>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
