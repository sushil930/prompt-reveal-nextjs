import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f1e8]/95 backdrop-blur-sm border-b border-gray-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PR</span>
            </div>
            <span className="text-2xl font-bold text-black">
              Prompt Reveal
            </span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  href="#fashion" 
                  className="text-gray-800 hover:text-black transition-colors duration-200 font-medium"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link 
                  href="#products" 
                  className="text-gray-800 hover:text-black transition-colors duration-200 font-medium"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="#portraits" 
                  className="text-gray-800 hover:text-black transition-colors duration-200 font-medium"
                >
                  Portraits
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-800 hover:text-black transition-colors duration-200 font-medium"
                >
                  Log in
                </Link>
              </li>
              <li>
                <button className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-full transition-all duration-200">
                  Sign up
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
