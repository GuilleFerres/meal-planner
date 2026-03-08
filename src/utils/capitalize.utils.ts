export function capitalizeFirstLetter(text: string): string {
  if (!text) return text
  const clean = text.trimStart()
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}
