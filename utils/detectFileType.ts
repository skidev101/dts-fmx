export const detectFileType = (mimeType: string) => {
    switch (mimeType) {
        case "application/pdf":
            return "PDF";
        
        case "application/msword":
            return "DOC";
        
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "DOCX";
        
        case "application/vnd.ms-excel":
            return "XLS";
        
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "XLSX";
        
        case "application/vnd.ms-powerpoint":
            return "PPT";
        
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "PPTX";
        
        case "text/plain":
            return "TXT";
        
        case "image/jpeg":
            return "JPEG";
        
        case "image/png":
            return "PNG";
        
        case "image/webp":
            return "WEBP";
        
        case "application/zip":
            return "ZIP";
        
    
        default:
            return "PDF";
    }
}