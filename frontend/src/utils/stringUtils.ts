/**
 * Return 1-2 uppercase initials from a full name.
 * If the input is empty, only spaces, or falsy, returns an empty string.
 *
 * @param {string} fullName - The full name to extract initials from.
 * @returns {string} One or two uppercase initials.
 */
export function getInitials(fullName: string): string {
  if (!fullName) return "";

  // Trim and bail out if nothing remains (handles spaces-only input)
  const cleaned = fullName.trim();
  if (!cleaned) return "";

  // Split by whitespace and remove any empty parts (defensive)
  const words = cleaned.split(/\s+/).filter(Boolean);

  // Take up to first two words and map to their first character
  const initials = words
    .slice(0, 2)
    .map((word) => (word && word[0] ? word[0].toUpperCase() : ""))
    .join("");

  return initials;
}
