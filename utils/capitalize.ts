export default function capitalize(text: string) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}
