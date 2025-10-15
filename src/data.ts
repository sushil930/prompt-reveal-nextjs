export const prompts = [
    {
      id: 1,
      imageSrc: '/images/fashion-1.jpg',
      prompt: 'A high-fashion model on a runway in a futuristic gown made of iridescent fabric, studio lighting, 8k, hyperrealistic.',
      category: 'Fashion',
      generator: 'Midjourney',
    },
    {
      id: 2,
      imageSrc: '/images/product-1.jpg',
      prompt: 'A sleek, minimalist smartwatch on a black marble surface, with a soft, diffused light source from the side. Product photography, 4k.',
      category: 'Products',
      generator: 'Stable Diffusion',
    },
    {
      id: 3,
      imageSrc: '/images/portrait-1.jpg',
      prompt: 'A dramatic portrait of a man with a beard, looking away from the camera, with a single light source creating strong shadows. Rembrandt style.',
      category: 'Portraits',
      generator: 'DALL-E 3',
    },
    {
        id: 4,
        imageSrc: '/images/fashion-2.jpg',
        prompt: 'A model wearing a vibrant, floral-patterned dress in a lush garden setting. The sun is setting, casting a warm, golden glow. Shot on a Canon 5D Mark IV.',
        category: 'Fashion',
        generator: 'Nano Banana',
      },
      {
        id: 5,
        imageSrc: '/images/product-2.jpg',
        prompt: 'A pair of wireless earbuds in a sleek, metallic charging case, placed on a wooden table. The background is blurred, creating a sense of depth. Commercial photography.',
        category: 'Products',
        generator: 'Flux',
      },
      {
        id: 6,
        imageSrc: '/images/portrait-2.jpg',
        prompt: 'A close-up portrait of a woman with freckles, smiling gently. The lighting is soft and even, and the background is a neutral gray. Studio portrait.',
        category: 'Portraits',
        generator: 'ChatGPT',
      },
  ];
  
  export const categories = ['All', 'Fashion', 'Products', 'Portraits', 'Nano Banana', 'ChatGPT', 'Midjourney', 'Flux', 'Stable Diffusion'];
  
  export const generators = ['All', 'Nano Banana', 'ChatGPT', 'Midjourney', 'Flux', 'Stable Diffusion'];
  