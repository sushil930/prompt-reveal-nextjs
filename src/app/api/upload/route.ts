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

export async function POST(req: NextRequest) {
  try {
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

    // Upload original image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('prompt-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Upload thumbnail
    const thumbnailPath = `thumbnails/${fileName}`;
    await supabaseAdmin.storage
      .from('prompt-images')
      .upload(thumbnailPath, thumbnailBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    // Get public URLs
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('prompt-images')
      .getPublicUrl(filePath);

    const { data: { publicUrl: thumbnailUrl } } = supabaseAdmin.storage
      .from('prompt-images')
      .getPublicUrl(thumbnailPath);

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        thumbnailUrl,
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