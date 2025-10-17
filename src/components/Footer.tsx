import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Prompt Reveal
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover studio-quality AI-generated art. Reveal prompts, modify them, and create your own masterpieces.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="#fashion" className="text-gray-400 hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="#portraits" className="text-gray-400 hover:text-white transition-colors">Portraits</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">AI Models</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Midjourney</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Stable Diffusion</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">DALL-E</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Flux</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Discord</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 Prompt Reveal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
