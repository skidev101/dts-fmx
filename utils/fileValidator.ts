export const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const ALLOWED_TYPES = [
  // PDF files
  "application/pdf",

  // Microsoft Word (.doc)
  "application/msword",

  // Microsoft Word (.docx)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Microsoft Excel (.xls)
  "application/vnd.ms-excel",

  // Microsoft Excel (.xlsx)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // Microsoft PowerPoint (.ppt)
  "application/vnd.ms-powerpoint",

  // Microsoft PowerPoint (.pptx)
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // Plain text files (.txt)
  "text/plain",


  // JPEG images
  "image/jpeg",

  // PNG images
  "image/png",

  // WebP images
  "image/webp",

  // Zip files (.zip)
  "application/zip",
];

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `File must be under ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Unsupported file type";
  }

  return null;
}
