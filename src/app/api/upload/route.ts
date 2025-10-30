import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import sharp from 'sharp';

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = process.env.SUPABASE_PROMPT_IMAGE_BUCKET ?? 'prompt-images';

let bucketEnsured = false;

async function ensureBucketExists() {
  if (bucketEnsured) return;

  try {
    const { data } = await supabaseAdmin.storage.getBucket(BUCKET_NAME);

    if (!data) {
      const { error } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 52428800, // 50MB per file
      });

      if (error) {
        console.error('Failed to create storage bucket:', error);
        throw error;
      }
    }

    bucketEnsured = true;
  } catch (error) {
    bucketEnsured = false;
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables are not configured.');
      return NextResponse.json(
        { error: 'Server storage is not configured. Please check Supabase credentials.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.' 
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `prompts/${fileName}`;

    // Get image dimensions and create thumbnail
    const metadata = await sharp(buffer).metadata();
    const thumbnailBuffer = await sharp(buffer)
      .resize(400, 500, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate blur placeholder
    const blurBuffer = await sharp(buffer)
      .resize(10, 13, { fit: 'cover' })
      .blur()
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    await ensureBucketExists();

    // Upload original image to Supabase Storage
  const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      
      // Handle specific Supabase error types
      let errorMessage = uploadError.message ?? 'Upload failed';
      
      if (uploadError.message?.includes('exceeded the maximum allowed size')) {
        errorMessage = 'File is too large for storage. Please compress your image or use a smaller file.';
      } else if (uploadError.message?.includes('InvalidBucketName')) {
        errorMessage = 'Storage configuration error. Please try again later.';
      } else if (uploadError.message?.includes('insufficient_scope')) {
        errorMessage = 'Storage permissions error. Please contact support.';
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    // Upload thumbnail
    const thumbnailPath = `thumbnails/${fileName}`;
    const { error: thumbnailError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(thumbnailPath, thumbnailBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (thumbnailError) {
      console.warn('Thumbnail upload failed:', thumbnailError);
      // Continue without thumbnail - we'll use the original image
    }

    // Get public URLs
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    const { data: { publicUrl: thumbnailUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(thumbnailPath);

    // Use original image URL if thumbnail upload failed
    const finalThumbnailUrl = thumbnailError ? publicUrl : thumbnailUrl;

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        thumbnailUrl: finalThumbnailUrl,
        key: filePath,
        blurDataUrl,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: buffer.length,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}