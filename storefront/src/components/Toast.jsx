import { useToast } from "../context/ToastContext";

export default function Toast() {
  const { message } = useToast();
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-brand-dark px-6 py-3 text-sm text-white shadow-lg"
    >
      {message}
    </div>
  );
}
