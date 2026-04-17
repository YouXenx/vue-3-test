// Format angka ke rupiah (IDR)
export function formatRupiah(value) {
  if (!value) return "Rp0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

// Format angka biasa (pakai separator ribuan)
export function formatNumber(value) {
  if (!value) return "0";

  return new Intl.NumberFormat("id-ID").format(value);
}

// Format tanggal (simple)
export function formatDate(date) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
}

// Format datetime
export function formatDateTime(date) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// Capitalize text
export function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}
