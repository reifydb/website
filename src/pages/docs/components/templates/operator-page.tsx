import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ExecutableSnippet } from '@/components/ui';
import type { CodeExample } from '@/lib/examples/types';
import { RqlCodeBlock } from '../rql-code-block';

export interface OperatorExample {
  example: CodeExample;
  heading?: string;
  note?: ReactNode;
}

export interface OperatorPageProps {
  name: string;
  summary: string;
  syntax: string;
  description?: ReactNode;
  examples?: OperatorExample[];
  noneBehavior?: ReactNode;
  notes?: ReactNode;
  related?: { label: string; href: string }[];
}

export function OperatorPage({
  name,
  summary,
  syntax,
  description,
  examples = [],
  noneBehavior,
  notes,
  related = [],
}: OperatorPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-text-muted mb-2">
          <Link to="/docs/rql/transforms" className="font-bold hover:text-primary-color">
            RQL
          </Link>
          {' pipeline operator'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">{name}</h1>
        <p className="text-lg text-text-secondary leading-relaxed">{summary}</p>
      </div>

      <section>
        <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
        <RqlCodeBlock code={syntax} />
        {description && <div className="text-text-secondary mt-4 space-y-4">{description}</div>}
      </section>

      {examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          {examples.map(({ example, heading, note }) => (
            <div key={example.id} className="mb-6">
              <h3 className="text-lg font-bold mb-3">{heading ?? example.title}</h3>
              <ExecutableSnippet title={example.title} initialCode={example.code} />
              {note && <p className="text-text-muted text-sm mt-3">{note}</p>}
            </div>
          ))}
        </section>
      )}

      {noneBehavior && (
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Behavior with none</h2>
          <div className="text-text-secondary space-y-4">{noneBehavior}</div>
        </section>
      )}

      {notes && (
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Notes</h2>
          <div className="text-text-secondary space-y-4">{notes}</div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related</h2>
          <div className="flex gap-3 flex-wrap">
            {related.map((item) => (
              <Link key={item.href} to={item.href} className="text-primary-color hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
