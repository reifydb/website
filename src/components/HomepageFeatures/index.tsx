import type { ReactNode } from 'react';

type FeatureItem = {
  title: string;
  Icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Icon: '🚀',
    description: (
      <>
        ReifyDB was designed from the ground up to be easily installed and used to get your database
        up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Icon: '🎯',
    description: (
      <>
        ReifyDB lets you focus on your data, and we&apos;ll handle the complexity. Enjoy real-time
        queries and automatic optimizations.
      </>
    ),
  },
  {
    title: 'Modern Architecture',
    Icon: '⚡',
    description: (
      <>
        Built with performance in mind. ReifyDB leverages modern techniques for blazing fast queries
        and real-time data synchronization.
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className="text-center">
      <div className="text-6xl mb-4 inline-block transition-transform hover:scale-110">
        {Icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed px-4">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className="py-20 bg-gradient-to-br from-warm-surface to-white dark:from-dark-warm-surface dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}