'use server';
import { revalidatePath } from 'next/cache';
import type { GeneratorModel } from '@/lib/prompts';
import { createPromptRecord } from '@/lib/prompts';
import { GeneratorModel as PrismaGeneratorModel } from '@prisma/client';

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
    // Defensive: ensure model is a valid Prisma enum value at runtime
    const allowedModels = new Set<string>(Object.values(PrismaGeneratorModel));
    const safeModel = (allowedModels.has(input.model as unknown as string)
      ? input.model
      : PrismaGeneratorModel.MIDJOURNEY) as GeneratorModel;

    const result = await createPromptRecord({
      title: input.title,
      promptText: input.promptText,
      negativePrompt: input.negativePrompt,
      category: input.category,
      model: safeModel,
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to create prompt';
    return { success: false, error: errorMessage };
  }
}