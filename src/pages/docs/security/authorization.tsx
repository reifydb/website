import { Layout } from '../layout.tsx';

export function AuthorizationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Authorization & Roles
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Set up role-based access control.
          </p>
        </div>
      </div>
    </Layout>
  );
}
