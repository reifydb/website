import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

function HomepageHeader() {
  return (
    <header className="relative overflow-hidden py-32 pb-24 text-center">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-100 pointer-events-none animate-pulse-scale" />
      
      <div className="container relative mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/img/logo.png" 
            alt="ReifyDB Logo" 
            className="w-40 h-40 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(255, 107, 53, 0.2)) drop-shadow(0 16px 32px rgba(142, 68, 173, 0.15))'
            }}
          />
        </div>
        <h1 className="text-7xl font-black mb-6 leading-tight tracking-tight gradient-text">
          ReifyDB
        </h1>
        <p className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          The Modern Database To Get Things Done
        </p>
        <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-400 leading-relaxed">
          Fast, embeddable, and cloud-native database with real-time capabilities.
          Built for modern applications that demand performance and simplicity.
        </p>
        <div className="flex gap-6 justify-center items-center flex-wrap">
          <Link
            className="btn-comic text-lg min-w-[160px]"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="btn-comic-outline text-lg min-w-[160px]"
            to="/playground"
          >
            Try Online
          </Link>
          <Link
            className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-primary hover:text-primary-dark transition-colors"
            to="https://github.com/reifydb/reifydb"
          >
            View on GitHub →
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickExample() {
  const exampleCode = `-- Create a real-time stream
CREATE STREAM user_events (
  user_id INT,
  action VARCHAR,
  timestamp TIMESTAMP
);

-- Query with automatic reactivity
SELECT user_id, COUNT(*) as actions
FROM user_events
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY user_id;`;

  return (
    <section className="py-20 bg-gradient-to-br from-warm-surface to-white dark:from-dark-warm-surface dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-dark">Simple, Powerful, Reactive</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Write SQL queries that automatically update when data changes</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="code-block-comic">
            <CodeBlock language="sql" title="example.sql">
              {exampleCode}
            </CodeBlock>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4 p-4 rounded-medium bg-white dark:bg-gray-800 shadow-soft hover:shadow-comic transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl flex-shrink-0">⚡</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Real-time Updates</h4>
                <p className="text-gray-600 dark:text-gray-400">Queries automatically refresh when underlying data changes</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-medium bg-white dark:bg-gray-800 shadow-soft hover:shadow-comic transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl flex-shrink-0">🔄</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Streaming Support</h4>
                <p className="text-gray-600 dark:text-gray-400">Native support for continuous data streams and event processing</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-medium bg-white dark:bg-gray-800 shadow-soft hover:shadow-comic transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl flex-shrink-0">📊</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Standard SQL</h4>
                <p className="text-gray-600 dark:text-gray-400">Use familiar SQL syntax with powerful extensions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Blazing Fast',
      icon: '🚀',
      description: 'Optimized for analytical workloads with columnar storage and vectorized execution',
    },
    {
      title: 'Zero Dependencies',
      icon: '📦',
      description: 'Single binary with no external dependencies. Deploy anywhere, from edge to cloud',
    },
    {
      title: 'Real-time Reactive',
      icon: '⚡',
      description: 'Automatic query updates when data changes. Perfect for dashboards and live analytics',
    },
    {
      title: 'Cloud Native',
      icon: '☁️',
      description: 'Built for modern cloud architectures with native support for object storage',
    },
    {
      title: 'SQL Compatible',
      icon: '🔧',
      description: 'PostgreSQL-compatible SQL with extensions for streaming and time-series data',
    },
    {
      title: 'Open Source',
      icon: '💚',
      description: 'MIT licensed with a vibrant community. Contribute, fork, or embed freely',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-dark">Why ReifyDB?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Built from the ground up for modern data applications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card-comic group hover:rotate-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const useCases = [
    {
      title: 'Real-time Analytics',
      description: 'Build dashboards that update instantly as new data arrives',
      icon: '📊',
    },
    {
      title: 'Stream Processing',
      description: 'Process continuous data streams with SQL queries',
      icon: '🌊',
    },
    {
      title: 'Edge Computing',
      description: 'Deploy at the edge with minimal resource requirements',
      icon: '🌐',
    },
    {
      title: 'Time-Series Data',
      description: 'Efficiently store and query time-series data',
      icon: '⏰',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-lightest to-white dark:from-dark-warm-bg dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-dark">Use Cases</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ReifyDB powers a wide range of applications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-medium shadow-soft hover:shadow-comic transition-all duration-300 hover:-translate-y-2 text-center comic-border">
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Installation() {
  const installCommands = {
    docker: 'docker run -p 8090:8090 reifydb/reifydb',
    brew: 'brew install reifydb',
    cargo: 'cargo install reifydb',
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-dark">Get Started in Seconds</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Choose your preferred installation method</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-medium shadow-soft">
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Docker</h4>
            <CodeBlock language="bash">{installCommands.docker}</CodeBlock>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-medium shadow-soft">
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Homebrew</h4>
            <CodeBlock language="bash">{installCommands.brew}</CodeBlock>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-medium shadow-soft">
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Cargo</h4>
            <CodeBlock language="bash">{installCommands.cargo}</CodeBlock>
          </div>
        </div>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            className="btn-comic text-lg"
            to="/docs/getting-started/installation"
          >
            Installation Guide
          </Link>
          <Link
            className="btn-comic-outline text-lg"
            to="/docs/getting-started/quickstart"
          >
            Quick Start Tutorial
          </Link>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="py-20 bg-gradient-to-br from-warm-bg to-white dark:from-dark-warm-bg dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-dark">Join the Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Get help, share ideas, and contribute to ReifyDB</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="https://github.com/reifydb/reifydb"
            className="card-comic text-center group hover:rotate-1 no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <img src="/img/github-mark.svg" alt="GitHub" width="48" height="48" className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">GitHub</h3>
            <p className="text-gray-600 dark:text-gray-400">Star, fork, and contribute</p>
          </a>
          <a
            href="https://discord.com/invite/vuBrm5kuuF"
            className="card-comic text-center group hover:rotate-1 no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💬</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Discord</h3>
            <p className="text-gray-600 dark:text-gray-400">Chat with the community</p>
          </a>
          <a
            href="https://x.com/reifydb"
            className="card-comic text-center group hover:rotate-1 no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">𝕏</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Twitter</h3>
            <p className="text-gray-600 dark:text-gray-400">Follow for updates</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Layout
        title="ReifyDB - The Modern Database To Get Things Done"
        description="Fast, embeddable, and cloud-native database with real-time capabilities. Built for modern applications that demand performance and simplicity."
      >
        <HomepageHeader />
        <main>
          <QuickExample />
          <Features />
          <UseCases />
          <Installation />
          <Community />
        </main>
      </Layout>
    </div>
  );
}