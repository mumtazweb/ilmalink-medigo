export default function PortalAuthMessage({
  message,
  success = false,
}: {
  message: string;
  success?: boolean;
}) {
  if (!message) return null;

  return (
    <p
      role="status"
      className={`rounded-xl border px-3 py-2.5 text-sm font-semibold leading-5 ${
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </p>
  );
}
