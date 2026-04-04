import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { EmptyState } from '@reifydb/ui';

export function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-24">
        <EmptyState
          icon={
            <span className="text-6xl sm:text-8xl font-bold text-text-primary">404</span>
          }
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
          action={
            <div className="flex gap-4 justify-center">
              <Button href="/" size="lg">
                Go Home
              </Button>
              <Button href="/docs" variant="secondary" size="lg">
                Docs
              </Button>
            </div>
          }
        />
      </main>

      <Footer />
    </>
  );
}
