/**
 * Format a date (Date or ISO string) into a friendly string for display.
 * Example: "28 Jan 2026, 9:18 am"
 */
export const formatFriendlyDate = (value: Date | string): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    // Fallback: return the original value if parsing fails
    return typeof value === "string" ? value : "";
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

