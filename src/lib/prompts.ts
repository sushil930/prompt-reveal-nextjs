'use server';

import { prisma } from '@/lib/db';
import type { Prisma, GeneratorModel } from '@prisma/client';

export type { GeneratorModel };

type PromptAuthor = {
  id: string;
  name: string | null;
  avatar: string | null;
  email: string;
};

const basePromptInclude = {
  createdBy: {
    select: { id: true, name: true, avatar: true, email: true },
  },
  tags: {
    include: { tag: true },
  },
} satisfies Prisma.PromptInclude;

type PromptWithRelations = Prisma.PromptGetPayload<{
  include: typeof basePromptInclude;
}>;

export interface PromptResponse {
  id: string;
  title: string;
  prompt: string;
  negativePrompt?: string | null;
  category: string;
  generator: GeneratorModel;
  imageSrc: string;
  imageUrl: string;
  thumbnailUrl?: string | null;
  blurDataUrl?: string | null;
  likesCount: number;
  savesCount: number;
  viewsCount: number;
  createdAt: string;
  createdBy: PromptAuthor | null;
  tags: string[];
}

export interface CategoryStat {
  category: string;
  count: number;
  imageSrc: string | null;
  imageUrl: string | null;
  blurDataUrl?: string | null;
}

interface GetAllPromptsOptions {
  take?: number;
  skip?: number;
  sort?: 'newest' | 'popular';
}

const mapPromptToResponse = (prompt: PromptWithRelations): PromptResponse => ({
  id: prompt.id,
  title: prompt.title,
  prompt: prompt.promptText,
  negativePrompt: prompt.negativePrompt,
  category: prompt.category,
  generator: prompt.model,
  imageSrc: prompt.thumbnailUrl || prompt.imageUrl,
  imageUrl: prompt.imageUrl,
  thumbnailUrl: prompt.thumbnailUrl,
  blurDataUrl: prompt.blurDataUrl,
  likesCount: prompt.likesCount,
  savesCount: prompt.savesCount,
  viewsCount: prompt.viewsCount,
  createdAt: prompt.createdAt.toISOString(),
  createdBy: prompt.createdBy,
  tags: prompt.tags.map((tag) => tag.tag.name),
});

export async function getAllPrompts(options: GetAllPromptsOptions = {}): Promise<PromptResponse[]> {
  const { take = 100, skip = 0, sort = 'newest' } = options;

  try {
    const prompts = await prisma.prompt.findMany({
      where: { visibility: 'PUBLIC' },
      include: basePromptInclude,
      orderBy:
        sort === 'popular'
          ? { likesCount: 'desc' }
          : { createdAt: 'desc' },
      take,
      skip,
    });

    return prompts.map(mapPromptToResponse);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return [];
  }
}

export async function getPromptsByCategory(category: string): Promise<PromptResponse[]> {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        visibility: 'PUBLIC',
        category: { equals: category, mode: 'insensitive' },
      },
      include: basePromptInclude,
      orderBy: { createdAt: 'desc' },
    });

    return prompts.map(mapPromptToResponse);
  } catch (error) {
    console.error('Error fetching prompts by category:', error);
    return [];
  }
}

export async function getPromptById(id: string): Promise<PromptResponse | null> {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: basePromptInclude,
    });

    if (!prompt) return null;

    return mapPromptToResponse(prompt);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return null;
  }
}

export async function getCategoryStats(): Promise<CategoryStat[]> {
  try {
    const categoryCounts = await prisma.prompt.groupBy({
      by: ['category'],
      where: { visibility: 'PUBLIC' },
      _count: { _all: true },
    });

    if (categoryCounts.length === 0) {
      return [];
    }

    categoryCounts.sort((a, b) => (b._count?._all ?? 0) - (a._count?._all ?? 0));

    const latestPerCategory = await prisma.prompt.findMany({
      where: { visibility: 'PUBLIC' },
      orderBy: { createdAt: 'desc' },
      distinct: ['category'],
      select: {
        category: true,
        imageUrl: true,
        thumbnailUrl: true,
        blurDataUrl: true,
      },
    });

    const imageMap = new Map(
      latestPerCategory.map((item) => [item.category.toLowerCase(), item])
    );

    return categoryCounts.map((entry) => {
      const image = imageMap.get(entry.category.toLowerCase());
      return {
        category: entry.category,
  count: entry._count?._all ?? 0,
        imageSrc: image?.thumbnailUrl || image?.imageUrl || null,
        imageUrl: image?.imageUrl || null,
        blurDataUrl: image?.blurDataUrl ?? null,
      } satisfies CategoryStat;
    });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return [];
  }
}

export async function createPromptRecord(data: {
  title: string;
  promptText: string;
  negativePrompt?: string;
  category: string;
  model: GeneratorModel;
  imageUrl: string;
  imageKey: string;
  thumbnailUrl?: string;
  blurDataUrl?: string;
  width?: number;
  height?: number;
  userId?: string;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  tags?: string[];
}) {
  try {
    const slug = `${data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50)}-${Date.now().toString(36)}`;

    let authorId = data.userId;

    if (!authorId) {
      if (!data.userEmail) {
        throw new Error('User information is required to create a prompt.');
      }

      const user = await prisma.user.upsert({
        where: { email: data.userEmail },
        update: {
          name: data.userName ?? undefined,
          avatar: data.userAvatar ?? undefined,
        },
        create: {
          email: data.userEmail,
          name: data.userName,
          avatar: data.userAvatar,
        },
      });

      authorId = user.id;
    } else {
      await prisma.user.upsert({
        where: { id: authorId },
        update: {
          name: data.userName ?? undefined,
          avatar: data.userAvatar ?? undefined,
        },
        create: {
          id: authorId,
          email: data.userEmail ?? `${authorId}@guest.promptreveal.app`,
          name: data.userName,
          avatar: data.userAvatar,
        },
      });
    }

    if (!authorId) {
      throw new Error('Unable to resolve author for prompt creation.');
    }

    const prompt = await prisma.prompt.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        model: data.model,
        promptText: data.promptText,
        negativePrompt: data.negativePrompt,
        imageUrl: data.imageUrl,
        imageKey: data.imageKey,
        thumbnailUrl: data.thumbnailUrl,
        blurDataUrl: data.blurDataUrl,
        width: data.width,
        height: data.height,
        aspectRatio: '4:5',
        visibility: 'PUBLIC',
  createdById: authorId,
        tags: {
          create: (data.tags || []).map((tagName) => {
            const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
            return {
              tag: {
                connectOrCreate: {
                  where: { slug: tagSlug },
                  create: { name: tagName, slug: tagSlug },
                },
              },
            };
          }),
        },
      },
      include: basePromptInclude,
    });

    return { success: true, prompt: mapPromptToResponse(prompt) };
  } catch (error) {
    console.error('Error creating prompt:', error);
    return { success: false, error: 'Failed to create prompt' };
  }
}
