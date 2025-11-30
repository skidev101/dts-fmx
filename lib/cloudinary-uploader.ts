export async function uploadToCloudinary(file: File) {
  // Get signature from backend
  const { signature, timestamp, cloudName, apiKey } = await fetch(
    "/api/cloudinary-signature",
    {
      method: "POST",
    }
  ).then((res) => res.json());

  // Prepare form data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey);
  formData.append("folder", "notes");

  // Upload to Cloudinary
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) throw new Error("Upload failed");

  return response.json();
}
