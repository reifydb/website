import { acAuthPasswordExample as acAuthPassword, acAuthTokenExample as acAuthToken, acCreateRoleExample as acCreateRole, acCreateUserDuplicateExample as acCreateUserDuplicate, acCreateUserExample as acCreateUser, acDropAuthExample as acDropAuth, acDropRoleAndUserExample as acDropRoleAndUser, acDropUserIfExistsExample as acDropUserIfExists, acGrantExample as acGrant, acGrantMissingRoleExample as acGrantMissingRole, acListIdentitiesExample as acListIdentities, acListPoliciesExample as acListPolicies, acPolicyAttributeExample as acPolicyAttribute, acPolicyDisableExample as acPolicyDisable, acPolicyDropExample as acPolicyDrop, acPolicyEnableExample as acPolicyEnable, acPolicyIdentityNameExample as acPolicyIdentityName, acPolicyIdentityRolesExample as acPolicyIdentityRoles, acPolicyNamespaceScopeExample as acPolicyNamespaceScope, acPolicyReadFilterExample as acPolicyReadFilter, acPolicyReadMapExample as acPolicyReadMap, acPolicySetupExample as acPolicySetup, acPolicyWriteRequireExample as acPolicyWriteRequire, acRevokeExample as acRevoke, acRootSeesAllExample as acRootSeesAll, acUserAttributeExample as acUserAttribute, acUserAttributeUndeclaredExample as acUserAttributeUndeclared } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { AsciiDiagram, Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function AccessControlOverviewPage() {
  return (
    <Layout
      title="Access Control"
      description="Identities, roles, credentials, and table policies: how ReifyDB decides which rows a caller can read and which writes it can make."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Access Control</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB is built to be reached from frontends directly, so access control lives
            inside the database rather than in an API layer in front of it. You create{' '}
            <strong>identities</strong> for the people and services that connect, group them
            with <strong>roles</strong>, attach <strong>credentials</strong> so they can log
            in, and write <strong>table policies</strong> in RQL that say which rows an
            identity may see and which writes it may make. Everything on this page is
            ordinary admin DDL, and the snippets run in order against one shared playground.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The model in one picture</h2>
          <AsciiDiagram label="who can do what">
{`identity (alice)  --grant-->  role (editors)
      |
      | logs in with a credential (password, token, ...)
      v
  request  ---->  table policy on ac::documents
                    from:   filter { public == true }      rows she can read
                    insert: require { title != "" }        writes she can make
                    $identity.name / $identity.roles / declared attributes`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Two rules shape everything below. First, <strong>default deny</strong>: an
            identity with no matching policy reads nothing and cannot write. Second,{' '}
            <strong>root bypasses policies</strong>. The built-in <Code>root</Code> identity
            is the administrator; it always sees every row and every write it makes goes
            through. The browser playground runs as root, which is why the policies you
            create on this page never filter what the snippets return.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Identities</h2>
          <p className="text-text-secondary mb-4">
            An identity is a name the database knows. <Code>create user</Code> registers
            one; it has no credentials yet and cannot log in until you attach some.
          </p>
          <ExecutableSnippet title={acCreateUser.title} initialCode={acCreateUser.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Names are unique. Creating the same identity twice is an error
            (<Code>CA_040</Code>), not a no-op:
          </p>
          <ExecutableSnippet title={acCreateUserDuplicate.title} initialCode={acCreateUserDuplicate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop user</Code> removes an identity and fails with <Code>CA_043</Code> if
            it does not exist; <Code>drop user if exists</Code> reports <Code>false</Code>{' '}
            instead of failing, which is the shape you want in scripts that must be safe to
            re-run:
          </p>
          <ExecutableSnippet title={acDropUserIfExists.title} initialCode={acDropUserIfExists.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Roles</h2>
          <p className="text-text-secondary mb-4">
            A role is a named group. Roles carry no permissions of their own; they exist
            so that a policy can ask "does the caller hold <Code>editors</Code>?" instead
            of listing names. Create the role, then grant it to identities:
          </p>
          <ExecutableSnippet title={acCreateRole.title} initialCode={acCreateRole.code} />
          <div className="mt-4">
            <ExecutableSnippet title={acGrant.title} initialCode={acGrant.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            <Code>revoke</Code> takes the role away again. Both statements return the
            role and identity they touched:
          </p>
          <ExecutableSnippet title={acRevoke.title} initialCode={acRevoke.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Grants are checked, not created on the fly. The role and the identity must both
            exist:
          </p>
          <ExecutableSnippet title={acGrantMissingRole.title} initialCode={acGrantMissingRole.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The catalog exposes what you have created through the{' '}
            <Code>system::identities</Code> and <Code>system::roles</Code> virtual tables.{' '}
            <Code>root</Code> is always there:
          </p>
          <ExecutableSnippet title={acListIdentities.title} initialCode={acListIdentities.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Credentials</h2>
          <p className="text-text-secondary mb-4">
            An identity logs in through an authentication method attached with{' '}
            <Code>create authentication for</Code>. The built-in methods are{' '}
            <Code>password</Code>, <Code>token</Code>, <Code>solana</Code> (wallet
            signature), and <Code>github</Code> (OAuth, which needs client settings on the
            server).
          </p>
          <ExecutableSnippet title={acAuthPassword.title} initialCode={acAuthPassword.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>token</Code> method is the fit for services and scripts. You do not
            supply the secret; the statement generates it and hands it back in the result:
          </p>
          <ExecutableSnippet title={acAuthToken.title} initialCode={acAuthToken.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Dropping a method revokes that way in without touching the identity or its
            roles:
          </p>
          <ExecutableSnippet title={acDropAuth.title} initialCode={acDropAuth.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Clients present the credential when they connect: over HTTP with{' '}
            <Code>POST /v1/authenticate</Code>, over WebSocket with an <Code>Auth</Code>{' '}
            message, and the SDKs wrap both. A successful login returns a session token that
            is sent as <Code>Authorization: Bearer</Code> on every following request; sessions
            expire after 24 hours by default. A request without a token runs as the{' '}
            <strong>anonymous</strong> identity, which is subject to policies like any other
            non-root caller. See{' '}
            <Link to="/docs/connect" className="text-primary hover:text-primary-light font-medium transition-colors">Connect</Link>{' '}
            for the wire details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Table policies</h2>
          <p className="text-text-secondary mb-4">
            A table policy is a small RQL block that the engine splices into every request a
            non-root identity makes against a table. It has up to four parts, one per
            operation: <Code>from</Code> for reads, and <Code>insert</Code>,{' '}
            <Code>update</Code>, <Code>delete</Code> for writes. Start with a table and a few
            rows:
          </p>
          <ExecutableSnippet title={acPolicySetup.title} initialCode={acPolicySetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A read policy holds a pipeline fragment that runs on top of every scan of the
            table. The common case is a <Code>filter</Code>, which decides which rows exist
            from the caller's point of view:
          </p>
          <ExecutableSnippet title={acPolicyReadFilter.title} initialCode={acPolicyReadFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            With that policy in place, a non-root identity querying{' '}
            <Code>from ac::documents</Code> gets only the public rows. The private budget
            document is not hidden by an error; it is simply not there:
          </p>
          <AsciiDiagram label="what alice sees">
{`org    | owner | title   | public
-------+-------+---------+-------
globex | carol | Launch  | true
acme   | alice | Roadmap | true`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            A read policy can also reshape rows. A <Code>map</Code> keeps only the columns it
            names, which is how you hide a column from a class of callers without a second
            table:
          </p>
          <ExecutableSnippet title={acPolicyReadMap.title} initialCode={acPolicyReadMap.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Write policies use <Code>require</Code>: an expression over the row being
            written that must be true for the write to go through. Each operation is
            declared separately, so a table can allow inserts, constrain updates, and forbid
            deletes for everyone but root:
          </p>
          <ExecutableSnippet title={acPolicyWriteRequire.title} initialCode={acPolicyWriteRequire.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A write that fails a <Code>require</Code> is rejected with{' '}
            <Code>POLICY_001</Code>, and a write against a table that has no policy for that
            operation at all is rejected with <Code>POLICY_002</Code>:
          </p>
          <AsciiDiagram label="alice inserts a row with an empty title">
{`Error POLICY_001
  Policy 'title_required' denied insert on ac::documents

HELP
  The write operation violates a policy constraint`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>on</Code> clause sets the scope. <Code>on ac::documents</Code> targets
            one table; <Code>on ac</Code> applies to every table in the namespace, existing
            and future; leaving <Code>on</Code> out entirely makes a global policy that
            applies to every table in the database:
          </p>
          <ExecutableSnippet title={acPolicyNamespaceScope.title} initialCode={acPolicyNamespaceScope.code} />
          <RqlCodeBlock className="mt-4" code={`create table policy no_deletes_anywhere {
  delete: { require { $identity.roles contains ["admins"] } }
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            When several policies apply to one operation, from any mix of scopes, they{' '}
            <strong>all</strong> have to pass: read filters are chained, and every{' '}
            <Code>require</Code> must hold. Policies never widen access, only narrow it.
            That is why the namespace-wide <Code>filter {'{'} true {'}'}</Code> above is
            useful: it turns default deny into "readable" for the whole namespace, and
            table policies then carve rows away from that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Policies that look at the caller</h2>
          <p className="text-text-secondary mb-4">
            Inside a policy body, <Code>$identity</Code> refers to the identity making the
            request. <Code>$identity.id</Code> is its id, <Code>$identity.name</Code> its
            name, and <Code>$identity.roles</Code> the list of roles granted to it. The
            classic row-ownership rule is one comparison:
          </p>
          <ExecutableSnippet title={acPolicyIdentityName.title} initialCode={acPolicyIdentityName.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Under this policy alone, alice sees the roadmap, bob sees the budget, and carol
            sees the launch document. <Code>$identity.roles contains [...]</Code> is true
            when the caller holds every role in the list; combine it with <Code>match</Code>{' '}
            to express tiers. Role checks work in write policies too:
          </p>
          <ExecutableSnippet title={acPolicyIdentityRoles.title} initialCode={acPolicyIdentityRoles.code} />
          <p className="text-text-secondary mt-4 mb-4">
            For anything beyond name and roles, such as a tenant or an organisation,
            declare a <strong>user attribute</strong>. The declaration is global and typed;
            after it, an identity can be created or altered with a value for that key, and
            policies can read it as <Code>$identity.&lt;key&gt;</Code>:
          </p>
          <ExecutableSnippet title={acUserAttribute.title} initialCode={acUserAttribute.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Attributes fail loud. Assigning a key that was never declared is rejected with{' '}
            <Code>CA_091</Code>, and a policy body that misspells one fails the caller's
            request with <Code>RUNTIME_009</Code> rather than quietly denying. An attribute
            that is declared but not set on the caller evaluates to <Code>none</Code>, so a
            comparison against it is false and the policy fails closed:
          </p>
          <ExecutableSnippet title={acUserAttributeUndeclared.title} initialCode={acUserAttributeUndeclared.code} />
          <div className="mt-4">
            <ExecutableSnippet title={acPolicyAttribute.title} initialCode={acPolicyAttribute.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Attributes can also be changed from a procedure with{' '}
            <Code>call identity::set_attribute($id, 'org_id', 'acme')</Code>, which is
            root-only like the rest of the catalog. A changed attribute applies to the
            caller's next request.
          </p>
          <Callout variant="note" title="$identity is empty for root">
            The privileged identity skips policy evaluation altogether, so{' '}
            <Code>$identity</Code> is never populated for it. A policy such as{' '}
            <Code>owner == $identity.name</Code> is not "true for root"; root simply does not
            go through the policy. The anonymous identity, by contrast, does: its name and
            attributes are <Code>none</Code> and its role list is empty, so identity-based
            policies deny it unless you write them otherwise.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Managing policies</h2>
          <p className="text-text-secondary mb-4">
            Every policy is listed in <Code>system::policies</Code> with its scope and
            whether it is enabled. The namespace-wide policy has no <Code>target_shape</Code>:
          </p>
          <ExecutableSnippet title={acListPolicies.title} initialCode={acListPolicies.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A policy can be switched off without dropping it. A disabled policy is treated
            exactly as if it did not exist, which under default deny means callers lose the
            access it granted rather than gaining any:
          </p>
          <ExecutableSnippet title={acPolicyDisable.title} initialCode={acPolicyDisable.code} />
          <div className="mt-4">
            <ExecutableSnippet title={acPolicyEnable.title} initialCode={acPolicyEnable.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop table policy</Code> removes one for good, with the same{' '}
            <Code>if exists</Code> form as identities and roles:
          </p>
          <ExecutableSnippet title={acPolicyDrop.title} initialCode={acPolicyDrop.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Policy changes are ordinary admin transactions and take effect for the next
            request from any identity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Checking your work as root</h2>
          <p className="text-text-secondary mb-4">
            Because the playground runs as root, every policy created above is bypassed and
            a scan returns all three documents. On a server, log in as one of the identities
            through a client and run the same query to see the policies apply:
          </p>
          <ExecutableSnippet title={acRootSeesAll.title} initialCode={acRootSeesAll.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Roles and identities are dropped the same way they were created:
          </p>
          <ExecutableSnippet title={acDropRoleAndUser.title} initialCode={acDropRoleAndUser.code} />
        </section>

        <Callout variant="tip" title="A workable starting point">
          Keep <Code>root</Code> for migrations and operations only, and give every
          application a token identity of its own. Put one namespace-wide read policy in
          place, then add per-table <Code>require</Code> rules and{' '}
          <Code>$identity</Code> filters where the data is actually sensitive. Write the
          policies as part of your{' '}
          <Link to="/docs/scripting/migrations" className="text-primary hover:text-primary-light font-medium transition-colors">migrations</Link>{' '}
          so they are versioned with the schema they protect.
        </Callout>
      </div>
    </Layout>
  );
}
