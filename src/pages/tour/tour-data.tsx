import type { ReactNode } from 'react';
import { PipelineVisual } from '@/pages/examples/widgets/pipeline-visual';
import { AsciiBarChart } from './widgets/ascii-bar-chart';
import { LiveDataWidget } from './widgets/live-data-widget';

export interface TourStep {
  id: string;
  title: string;
  description: ReactNode;
  code: string;
  before?: ReactNode;
  after?: ReactNode;
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: '00. Welcome to the Tour',
    description: (
      <div>
        <p>This tour walks you through RQL interactively. Here's how to use the UI:</p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Editor controls</strong> (top-right of each snippet):
        </p>
        <ul style={{ marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
          <li><code className="bg-bg-tertiary px-1 text-primary text-xs">[[]]</code> expand to fullscreen (Esc to exit)</li>
          <li><code className="bg-bg-tertiary px-1 text-primary text-xs">[cp]</code> copy code to clipboard</li>
          <li><code className="bg-bg-tertiary px-1 text-primary text-xs">[↺]</code> reset code to original</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Running a statement:</strong>
        </p>
        <ul style={{ marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
          <li>Click <strong>[run]</strong> or press <strong>Ctrl+Enter</strong> / <strong>Cmd+Enter</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Navigation:</strong>
        </p>
        <ul style={{ marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
          <li><code className="bg-bg-tertiary px-1 text-primary text-xs">[&lt; prev]</code> / <code className="bg-bg-tertiary px-1 text-primary text-xs">[next &gt;]</code> buttons at the bottom</li>
          <li><strong>←</strong> / <strong>→</strong> arrow keys (when not typing in the editor)</li>
          <li>Dot indicators to jump to any step directly</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Extra widgets</strong> (appear on some steps):
        </p>
        <ul style={{ marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
          <li><code className="bg-bg-tertiary px-1 text-primary text-xs">[refresh]</code> on the ASCII bar chart: re-queries the DB after running the snippet above</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>Try <strong>[run]</strong> on the snippet below, then press <strong>[next &gt;]</strong> to begin.</p>
      </div>
    ),
    code: `from [
  {step: 1, topic: "hello rql"},
  {step: 2, topic: "querying tables"},
  {step: 3, topic: "filtering rows"}
]`,
  },

  {
    id: 'hello-rql',
    title: '02. Hello RQL',
    description: (
      <p>
        RQL queries start with <code className="bg-bg-tertiary px-1 text-primary text-xs">from</code> - a data
        source. You can use <strong>inline data</strong> directly in your query, no tables needed. Click{' '}
        <strong>[run]</strong> to execute and see results instantly.
      </p>
    ),
    code: `from [
  {id: 1, name: "Alice", score: 95},
  {id: 2, name: "Bob", score: 87},
  {id: 3, name: "Carol", score: 92}
]`,
  },

  {
    id: 'querying-tables',
    title: '03. Querying Tables',
    description: (
      <p>
        Tables are organized in <strong>namespaces</strong>. Use{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">namespace::table</code> syntax to query them.
        The playground database comes pre-loaded with sample data across multiple namespaces.
      </p>
    ),
    code: `from app::users`,
  },

  {
    id: 'filtering-rows',
    title: '04. Filtering Rows',
    description: (
      <p>
        The <code className="bg-bg-tertiary px-1 text-primary text-xs">filter</code> transform keeps only rows
        matching a condition. Supports <code className="bg-bg-tertiary px-1 text-primary text-xs">==</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">!=</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">{'>'}</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">{'<'}</code>, and logical operators{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">and</code> /{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">or</code>.
      </p>
    ),
    code: `from app::users
filter {active == true}`,
    after: (
      <PipelineVisual
        steps={[
          { label: 'from app::users', description: 'Load all 5 rows from the users table' },
          { label: 'filter {active == true}', description: 'Keep only rows where active is true (4 rows)' },
        ]}
      />
    ),
  },

  {
    id: 'sorting-limiting',
    title: '05. Sorting & Limiting',
    description: (
      <p>
        Chain <code className="bg-bg-tertiary px-1 text-primary text-xs">sort</code> and{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">take</code> to rank and paginate results. Use{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">{'{ col: desc }'}</code> for descending order.
        The top 3 most expensive products:
      </p>
    ),
    code: `from app::products
sort {price: desc}
take {3}`,
    after: (
      <PipelineVisual
        steps={[
          { label: 'from app::products', description: 'Load all 5 rows from the products table' },
          { label: 'sort {price: desc}', description: 'Reorder rows from most to least expensive' },
          { label: 'take {3}', description: 'Keep only the top 3 results' },
        ]}
      />
    ),
  },

  {
    id: 'aggregating-data',
    title: '06. Aggregating Data',
    description: (
      <p>
        The <code className="bg-bg-tertiary px-1 text-primary text-xs">aggregate</code> transform computes
        summary statistics. Use{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">math::sum</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">math::avg</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">math::min</code>,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">math::max</code> and more. Run the query,
        then refresh the chart below.
      </p>
    ),
    code: `from app::sales
aggregate {total: math::sum(amount)} by {region}`,
    after: (
      <>
        <PipelineVisual
          steps={[
            { label: 'from app::sales', description: 'Load all 5 rows from the sales table' },
            { label: 'aggregate {total: math::sum(amount)} by {region}', description: 'Sum amounts grouped by region — one row per region' },
          ]}
        />
        <AsciiBarChart
          query="from app::sales aggregate {total: math::sum(amount)} by {region}"
          labelKey="region"
          valueKey="total"
        />
      </>
    ),
  },

  {
    id: 'extending-columns',
    title: '07. Extending Columns',
    description: (
      <p>
        The <code className="bg-bg-tertiary px-1 text-primary text-xs">extend</code> transform adds new computed
        columns without removing existing ones. Expressions can use arithmetic, comparisons, or any valid RQL
        expression. Here we compute a 10% bonus from salary.
      </p>
    ),
    code: `from app::employees
extend { bonus: salary * 0.1 }`,
    after: (
      <PipelineVisual
        steps={[
          { label: 'from app::employees', description: 'Load all 5 rows from the employees table' },
          { label: 'extend {bonus: salary * 0.1}', description: 'Add a bonus column to every row — all 5 rows kept' },
        ]}
      />
    ),
  },

  {
    id: 'complex-pipeline',
    title: '08. Complex Pipelines',
    description: (
      <p>
        Chain multiple transforms to build powerful pipelines. Data flows from one transform to the next. Here
        we <code className="bg-bg-tertiary px-1 text-primary text-xs">filter</code> completed orders,{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">aggregate</code> revenue by region, then{' '}
        <code className="bg-bg-tertiary px-1 text-primary text-xs">sort</code> highest first.
      </p>
    ),
    code: `from app::orders
filter {status == "completed"}
aggregate {revenue: math::sum(total)} by {region}
sort {revenue: desc}`,
    after: (
      <PipelineVisual
        steps={[
          { label: 'from app::orders', description: 'Load all 5 rows from the orders table' },
          { label: 'filter {status == "completed"}', description: 'Keep only completed orders' },
          { label: 'aggregate {revenue: math::sum(total)} by {region}', description: 'Sum revenue per region — one row per region' },
          { label: 'sort {revenue: desc}', description: 'Rank regions from highest to lowest revenue' },
        ]}
      />
    ),
  },

  {
    id: 'live-data',
    title: '09. Live Data',
    description: (
      <p>
        RQL queries run against the <strong>current state</strong> of your data. Use the widget below to insert
        rows into <code className="bg-bg-tertiary px-1 text-primary text-xs">tour::events</code>, then{' '}
        <strong>run the query</strong> to see your changes reflected immediately.
      </p>
    ),
    code: `from tour::events
aggregate {count: math::sum(value)} by {type}`,
    before: <LiveDataWidget />,
    after: (
      <PipelineVisual
        steps={[
          { label: 'from tour::events', description: 'Load rows inserted via the widget above' },
          { label: 'aggregate {count: math::sum(value)} by {type}', description: 'Count events grouped by type' },
        ]}
      />
    ),
  },
];
