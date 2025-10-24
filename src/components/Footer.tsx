import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-black tracking-tight">
                PromptReveal
              </span>
            </div>
            <p className="text-gray-600 text-sm font-light leading-relaxed max-w-xs">
              Discover, copy, and create with thousands of curated AI art prompts.
            </p>
          </div>
          
          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="text-black font-semibold mb-4 text-sm tracking-wide">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#gallery" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Gallery</Link></li>
              <li><Link href="#categories" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Categories</Link></li>
              <li><Link href="#pricing" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-black font-semibold mb-4 text-sm tracking-wide">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Documentation</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Tutorials</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Blog</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-black font-semibold mb-4 text-sm tracking-wide">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-black font-semibold mb-4 text-sm tracking-wide">Connect</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Twitter</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Instagram</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors text-sm font-light">Discord</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-light">
            © 2025 PromptReveal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-black transition-colors text-sm font-light">Privacy</Link>
            <Link href="#" className="text-gray-500 hover:text-black transition-colors text-sm font-light">Terms</Link>
            <Link href="#" className="text-gray-500 hover:text-black transition-colors text-sm font-light">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
