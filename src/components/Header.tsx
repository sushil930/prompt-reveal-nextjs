import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Prompt Reveal
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="#fashion" className="hover:text-gray-400">Fashion</Link></li>
            <li><Link href="#products" className="hover:text-gray-400">Products</Link></li>
            <li><Link href="#portraits" className="hover:text-gray-400">Portraits</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
