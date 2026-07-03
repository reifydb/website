import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

export function RoutinesOverviewPage() {
  return (
    <Layout>
      <DocStub
        title="Routines"
        description="Everything callable in ReifyDB is a routine: functions that compute values inside expressions, and procedures that run statements with CALL."
        sections={[
          {
            heading: 'Namespaced names',
            body: (
              <p>
                Routines are addressed as namespace::name, for example math::abs or
                text::concat. Built-ins ship in fixed namespaces; user-defined routines live
                in yours.
              </p>
            ),
          },
          {
            heading: 'Functions',
            body: (
              <p>
                Functions are pure computations used inside expressions: in map, filter,
                aggregate, and anywhere else a value is expected. Around 200 built-ins are
                documented in the{' '}
                <Link to="/docs/functions" className="text-primary hover:text-primary-light font-medium transition-colors">
                  function reference
                </Link>
                .
              </p>
            ),
          },
          {
            heading: 'Procedures',
            body: (
              <p>
                Procedures run statements, can have side effects, and are invoked with CALL.
                See{' '}
                <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Procedures
                </Link>{' '}
                for definitions, parameters, and control flow.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
