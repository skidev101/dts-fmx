export default function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
