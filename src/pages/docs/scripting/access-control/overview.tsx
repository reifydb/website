import { Layout } from '../../layout.tsx';
import { CodeBlock } from '../../components';
import { Callout } from '../../components';

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

        <Callout variant="note" title="Server Required">
          Access control features require a running ReifyDB server and cannot be
          demonstrated in the browser playground.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Users and Roles</h2>
          <CodeBlock
            language="rql"
            code={`CREATE USER alice;
CREATE ROLE editors;
GRANT editors TO alice`}
          />
          <p className="text-text-secondary mt-4">
            Create users and roles, then grant roles to users. Roles determine what a user can access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Policies</h2>
          <CodeBlock
            language="rql"
            code={`CREATE NAMESPACE app;
CREATE TABLE app::documents { id: int4, title: utf8 };

CREATE TABLE POLICY read_only {
  read: { FILTER { true } }
}`}
          />
          <p className="text-text-secondary mt-4">
            Policies define row-level access rules. They specify filters for read, write,
            and other operations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Grant and Revoke</h2>
          <CodeBlock
            language="rql"
            code={`CREATE ROLE managers;
CREATE USER bob;
GRANT managers TO bob;
REVOKE managers FROM bob`}
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
