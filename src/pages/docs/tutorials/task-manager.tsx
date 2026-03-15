import { Layout } from '../layout.tsx';

export function TaskManagerPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Task Manager
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build a full-featured task management application with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
