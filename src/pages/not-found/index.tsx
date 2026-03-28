import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui';

export function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center px-6 py-24">
          <h1 className="text-6xl sm:text-8xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button href="/" size="lg">
              Go Home
            </Button>
            <Button href="/docs" variant="secondary" size="lg">
              Docs
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
