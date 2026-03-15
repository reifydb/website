import { Layout } from '../../layout.tsx';

export function KubernetesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Kubernetes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Deploy and manage ReifyDB on Kubernetes.
          </p>
        </div>
      </div>
    </Layout>
  );
}
