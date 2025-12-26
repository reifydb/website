import { Link } from 'react-router-dom';
import { DocsLayout } from '../docs-layout';
import { CodeBlock, Callout } from '../components';

export function InstallationPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Installation
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get ReifyDB installed and running on your machine.
          </p>
        </div>

        {/* Requirements */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Requirements</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>Rust 1.90+</strong> — ReifyDB is written in Rust.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>Cargo</strong> — Rust's package manager (included with Rust).</span>
            </li>
          </ul>
        </section>

        {/* Install Rust */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Install Rust</h2>
          <p className="text-text-secondary mb-4">
            If you don't have Rust installed, use rustup to install it:
          </p>
          <CodeBlock
            language="bash"
            code={`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`}
          />
          <p className="text-text-muted text-sm mt-3">
            Follow the prompts to complete the installation, then restart your terminal.
          </p>
        </section>

        {/* Install ReifyDB */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Install ReifyDB</h2>
          <p className="text-text-secondary mb-4">
            Install ReifyDB using Cargo:
          </p>
          <CodeBlock
            language="bash"
            code={`cargo install reifydb`}
          />
        </section>

        {/* Build from Source */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Build from Source</h2>
          <p className="text-text-secondary mb-4">
            Alternatively, clone and build from source:
          </p>
          <CodeBlock
            language="bash"
            code={`git clone https://github.com/reifydb/reifydb.git
cd reifydb
cargo build --release`}
          />
          <p className="text-text-muted text-sm mt-3">
            The binary will be available at <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs">target/release/reifydb</code>.
          </p>
        </section>

        {/* Verify Installation */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Verify Installation</h2>
          <p className="text-text-secondary mb-4">
            Confirm ReifyDB is installed correctly:
          </p>
          <CodeBlock
            language="bash"
            code={`reifydb --version`}
          />
        </section>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Now that ReifyDB is installed, head to the{' '}
          <Link to="/docs/quick-start" className="text-primary-color hover:underline font-medium">
            Quick Start
          </Link>{' '}
          guide to write your first query.
        </Callout>
      </div>
    </DocsLayout>
  );
}
