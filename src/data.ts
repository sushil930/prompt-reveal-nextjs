export const CATEGORY_METADATA = [
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical worlds and mythical creatures',
    image: '/images/1.webp',
    color: 'from-purple-500 to-pink-500',
    tags: ['Magic', 'Dragons', 'Mystical'],
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    description: 'Futuristic and technological themes',
    image: '/images/2.webp',
    color: 'from-blue-500 to-cyan-500',
    tags: ['Future', 'Tech', 'Space'],
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Landscapes and natural beauty',
    image: '/images/3.webp',
    color: 'from-green-500 to-emerald-500',
    tags: ['Forest', 'Mountains', 'Ocean'],
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Creative and artistic expressions',
    image: '/images/4.webp',
    color: 'from-orange-500 to-red-500',
    tags: ['Art', 'Colors', 'Patterns'],
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Characters and people',
    image: '/images/5.webp',
    color: 'from-pink-500 to-rose-500',
    tags: ['People', 'Faces', 'Characters'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'Buildings and structures',
    image: '/images/6.webp',
    color: 'from-gray-500 to-slate-500',
    tags: ['Buildings', 'Cities', 'Design'],
  },
];

export const GENERATOR_OPTIONS = [
  { label: 'Midjourney', value: 'MIDJOURNEY' },
  { label: 'DALL·E 3', value: 'DALLE_3' },
  { label: 'DALL·E', value: 'DALLE' },
  { label: 'Stable Diffusion XL', value: 'STABLE_DIFFUSION_XL' },
  { label: 'Stable Diffusion', value: 'STABLE_DIFFUSION' },
  { label: 'Flux Pro', value: 'FLUX_PRO' },
  { label: 'Flux Schnell', value: 'FLUX_SCHNELL' },
  { label: 'Flux', value: 'FLUX' },
  { label: 'Ideogram', value: 'IDEOGRAM' },
  { label: 'Imagen 3', value: 'IMAGEN_3' },
  { label: 'Recraft V3', value: 'RECRAFT_V3' },
  { label: 'Leonardo AI', value: 'LEONARDO_AI' },
  { label: 'Adobe Firefly', value: 'ADOBE_FIREFLY' },
  { label: 'Playground AI', value: 'PLAYGROUND_AI' },
  { label: 'Freepik AI', value: 'FREEPIK_AI' },
  { label: 'Krea AI', value: 'KREA_AI' },
  { label: 'ChatGPT', value: 'CHAT_GPT' },
  { label: 'Nano Banana', value: 'NANOBANANA' },
];

export const CATEGORY_OPTIONS = CATEGORY_METADATA.map((category) => category.name);
  