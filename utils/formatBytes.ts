export function formatBytes(bytes: number) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.ceil(kb)} KB`;
  return `${Math.ceil(kb / 1024)} MB`;
};