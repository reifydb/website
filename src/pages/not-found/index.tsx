import { Link } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';

export function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center px-6 py-24">
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Page Not Found
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/docs"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              View Docs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}