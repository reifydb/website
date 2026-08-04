import { createUserExample, createRoleExample, createPolicyExample, grantRevokeExample } from './overview.examples';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';

export function AccessControlOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Access Control
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB provides users, roles, and policies for controlling access to data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a User</h2>
          <ExecutableSnippet
            title="Create User"
            initialCode={createUserExample.code}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE USER</code> registers
            a new identity that roles can be granted to.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Role</h2>
          <ExecutableSnippet
            title="Create Role"
            initialCode={createRoleExample.code}
          />
          <p className="text-text-secondary mt-4">
            Roles group permissions together. Grant a role to one or more users instead of
            managing permissions per user.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Policies</h2>
          <ExecutableSnippet
            title="Create Policy"
            initialCode={createPolicyExample.code}
          />
          <p className="text-text-secondary mt-4">
            A table policy defines row-level access rules. This one restricts reads on{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ac::documents</code> to
            rows where <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">public</code> is
            true.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Grant and Revoke</h2>
          <ExecutableSnippet
            title="Grant and Revoke"
            initialCode={grantRevokeExample.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">GRANT</code> and{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">REVOKE</code> to manage role assignments.
          </p>
        </section>
      </div>
    </Layout>
  );
}
