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
              className="px-6 py-3 font-mono border border-primary text-primary hover:bg-primary hover:text-bg-primary transition-colors"
            >
              [&gt; go home]
            </Link>
            <Link
              to="/docs"
              className="px-6 py-3 font-mono border-2 border-dashed border-white/15 text-text-secondary hover:text-text-primary hover:border-white/30 transition-colors"
            >
              [docs]
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
