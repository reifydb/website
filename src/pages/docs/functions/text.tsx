import { DocsLayout } from '../docs-layout';
import { RqlCodeBlock } from '../components';

export function TextFunctionsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            text Functions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text</code> module
            provides functions for string manipulation.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::lower</h2>
          <p className="text-text-secondary mb-4">
            Convert a string to lowercase.
          </p>
          <RqlCodeBlock
            code={`from app.users
extend { lower_email: text::lower(email) }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::upper</h2>
          <p className="text-text-secondary mb-4">
            Convert a string to uppercase.
          </p>
          <RqlCodeBlock
            code={`from app.users
extend { upper_name: text::upper(name) }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::trim</h2>
          <p className="text-text-secondary mb-4">
            Remove leading and trailing whitespace.
          </p>
          <RqlCodeBlock
            code={`from app.inputs
extend { clean_value: text::trim(raw_value) }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::length</h2>
          <p className="text-text-secondary mb-4">
            Get the length of a string.
          </p>
          <RqlCodeBlock
            code={`from app.posts
filter text::length(content) > 100`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::concat</h2>
          <p className="text-text-secondary mb-4">
            Concatenate multiple strings.
          </p>
          <RqlCodeBlock
            code={`from app.users
extend { full_name: text::concat(first_name, " ", last_name) }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">text::substring</h2>
          <p className="text-text-secondary mb-4">
            Extract a portion of a string.
          </p>
          <RqlCodeBlock
            code={`from app.codes
extend { prefix: text::substring(code, 0, 3) }`}
          />
        </section>

      </div>
    </DocsLayout>
  );
}
