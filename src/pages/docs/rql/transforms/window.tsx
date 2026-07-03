import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';

export function WindowPage() {
  return (
    <Layout>
      <OperatorPage
        name="window"
        summary="Aggregates rows over time windows, such as tumbling intervals."
        syntax={`window tumbling { n: math::count(id) } with { interval: '5s' }`}
        description={
          <p>
            window groups incoming rows into time buckets and aggregates each bucket. The
            with block configures the window, for example the tumbling interval.
          </p>
        }
        notes={
          <p>
            window is only supported inside{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary-color hover:underline">
              deferred views
            </Link>
            , where the flow engine maintains the buckets incrementally. It cannot run in a
            plain ad-hoc query, which also means it cannot execute in the browser sandbox on
            this page.
          </p>
        }
        related={[
          { label: 'aggregate', href: '/docs/rql/transforms/aggregate' },
          { label: 'Deferred views', href: '/docs/scripting/views/deferred' },
        ]}
      />
    </Layout>
  );
}
