import { toast } from "sonner";

export const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Link copied!");
  } catch (err: any) {
    toast.error("Failed to copy link", {
      description: err.message,
    });
  }
};
