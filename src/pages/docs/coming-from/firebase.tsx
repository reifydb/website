import { Layout } from '../layout.tsx';

export function ComingFromFirebasePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Coming from Firebase / Firestore
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A guide for developers transitioning from Firebase or Firestore to ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
