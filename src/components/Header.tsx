// components/Header.tsx
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-lg">
      <nav className="flex items-center max-w-7xl mx-auto gap-10">
        <Link
          href="/"
          className="text-xl font-semibold hover:text-blue-200 transition duration-200 relative after:duration-300 hover:after:right-0 after:absolute hover:after:w-full after:w-0 after:h-1 after:-bottom-0.5 after:right-1/2 after:bg-blue-200"
        >
          Home
        </Link>
        <Link
          href="/upload-image"
          className="text-xl font-semibold hover:text-blue-200 transition duration-200 relative after:duration-300 hover:after:right-0 after:absolute hover:after:w-full after:w-0 after:h-1 after:-bottom-0.5 after:right-1/2 after:bg-blue-200"
        >
          Upload Image
        </Link>
        <Link
          href="/api"
          className="text-xl font-semibold hover:text-blue-200 transition duration-200 relative after:duration-300 hover:after:right-0 after:absolute hover:after:w-full after:w-0 after:h-1 after:-bottom-0.5 after:right-1/2 after:bg-blue-200"
        >
          API
        </Link>
      </nav>
    </header>
  );
};
