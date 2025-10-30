'use server';
import { revalidatePath } from 'next/cache';
import type { GeneratorModel } from '@/lib/prompts';
import { createPromptRecord } from '@/lib/prompts';

interface CreatePromptInput {
  title: string;
  promptText: string;
  negativePrompt?: string;
  category: string;
  model: GeneratorModel;
  image: {
    url: string;
    thumbnailUrl: string;
    key: string;
    blurDataUrl: string;
    width: number;
    height: number;
  };
  tags?: string[];
  userId?: string;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
}

export async function createPrompt(input: CreatePromptInput) {
  try {
    const result = await createPromptRecord({
      title: input.title,
      promptText: input.promptText,
      negativePrompt: input.negativePrompt,
      category: input.category,
      model: input.model,
      imageUrl: input.image.url,
      imageKey: input.image.key,
      thumbnailUrl: input.image.thumbnailUrl,
      blurDataUrl: input.image.blurDataUrl,
      width: input.image.width,
      height: input.image.height,
      userId: input.userId,
      userEmail: input.userEmail,
      userName: input.userName,
      userAvatar: input.userAvatar,
      tags: input.tags,
    });

    if (!result.success) {
      return result;
    }

    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath('/categories');

    return result;
  } catch (error) {
    console.error('Create prompt error:', error);
    return { success: false, error: 'Failed to create prompt' };
  }
}