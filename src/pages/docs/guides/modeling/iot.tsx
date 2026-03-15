import { Layout } from '../../layout.tsx';

export function IoTGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            IoT & Sensor Data
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Handle high-frequency sensor data and IoT workloads.
          </p>
        </div>
      </div>
    </Layout>
  );
}
