import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
} from "date-fns";


export default function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


export function formatDistantTime(date: Date | string | null | undefined) {
  if (!date) return "Never";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isToday(d)) return format(d, "p"); // 10:32 AM
  if (isYesterday(d)) return "Yesterday";

  const daysDiff = differenceInDays(new Date(), d);

  if (daysDiff < 10) {
    return formatDistanceToNow(d, { addSuffix: true }); // "3 days ago"
  }

  return format(d, "MMM d, yyyy"); // "Jan 12, 2023"
}
