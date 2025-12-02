import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';


export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const params = {
    timestamp,
    folder: 'dts-fmx/notes', // Optional
    // Add any other upload parameters you need 
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );

  console.log("signature generated", signature)

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}