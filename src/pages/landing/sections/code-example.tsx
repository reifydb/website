import { CodeViewer } from '@/components/ui';

const examples = [
  {
    title: 'Join + Derived Calculations',
    code: `from test.employees
join { from test.departments } dept on dept_id == dept.id
extend { bonus: salary * 0.1 }`,
    description: 'Joins employees to departments and computes a bonus field in one query.',
  },
  {
    title: 'Incremental Materialized View',
    code: `create deferred view test.unique_products {
  id: int4, name: utf8
} as {
  from test.products
  distinct { name }
}`,
    description: 'View updates automatically when source data changes. No refresh jobs.',
  },
  {
    title: 'Filter + Aggregate',
    code: `from test.orders
filter status == "completed"
aggregate math::sum(total) by region`,
    description: 'Filter, group, and aggregate in a single readable pipeline.',
  },
  {
    title: 'Inline Data',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"}
]`,
    description: 'Query inline data directly. Great for prototyping and testing.',
  },
];

export function CodeExampleSection() {
  return (
    <section id="code-example" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            See RQL in Action
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            A query language designed for application state.
          </p>
        </div>

        {/* Code Examples Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {examples.map((example) => (
            <div
              key={example.title}
              className="bg-white border-2 border-border-default rounded-lg shadow-minimal overflow-hidden"
            >
              <div className="px-4 py-3 bg-bg-secondary border-b-2 border-border-default">
                <span className="text-sm font-bold text-text-primary">{example.title}</span>
              </div>
              <CodeViewer code={example.code} />
              <div className="px-4 py-3 bg-bg-secondary border-t-2 border-border-default">
                <span className="text-xs text-text-muted">{example.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
