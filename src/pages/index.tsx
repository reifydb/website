import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import AnimatedText from '@site/src/components/AnimatedText';
import Card from '@site/src/components/Card';

function HomepageHeader() {
  return (
    <header className="hero-section py-12 md:py-24 text-center">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-center">
          <img 
            src="/img/logo.png" 
            alt="ReifyDB Logo" 
            className="hero-logo"
            width="180" 
            height="180"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white tracking-tight">
          ReifyDB
        </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-400 leading-relaxed">
              Fast, embeddable, and cloud-native database with real-time capabilities.
              Built for modern applications that demand performance and simplicity.
          </p>
        <div className="mb-8">
          <AnimatedText />
        </div>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <Link
            className="btn-primary"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="btn-secondary"
            to="/playground"
          >
            Try Online
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
    <section className="quick-example-section py-20 section-separator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Simple, Powerful, Reactive</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Write SQL queries that automatically update when data changes</p>
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
    <section className="py-20 section-separator bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Why ReifyDB?</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Built from the ground up for modern data applications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
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
    <section className="py-20 section-separator bg-orange-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Use Cases</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">ReifyDB powers a wide range of applications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, idx) => (
            <Card
              key={idx}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
              className="card-clean text-center"
            />
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
    <section className="py-20 section-separator bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Get Started in Seconds</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Choose your preferred installation method</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card-clean">
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase">Docker</h4>
            <CodeBlock language="bash">{installCommands.docker}</CodeBlock>
          </div>
          <div className="card-clean">
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase">Homebrew</h4>
            <CodeBlock language="bash">{installCommands.brew}</CodeBlock>
          </div>
          <div className="card-clean">
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase">Cargo</h4>
            <CodeBlock language="bash">{installCommands.cargo}</CodeBlock>
          </div>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            className="btn-primary"
            to="/docs/getting-started/installation"
          >
            Installation Guide
          </Link>
          <Link
            className="btn-secondary"
            to="/docs/getting-started/quickstart"
          >
            Quick Start
          </Link>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="py-20 bg-stone-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Join the Community</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Get help, share ideas, and contribute to ReifyDB</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="https://github.com/reifydb/reifydb"
            className="card-clean text-center no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-4">
              <img src="/img/github-mark.svg" alt="GitHub" width="48" height="48" className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">GitHub</h3>
            <p className="text-gray-600 dark:text-gray-400">Star, fork, and contribute</p>
          </a>
          <a
            href="https://discord.com/invite/vuBrm5kuuF"
            className="card-clean text-center no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Discord</h3>
            <p className="text-gray-600 dark:text-gray-400">Chat with the community</p>
          </a>
          <a
            href="https://x.com/reifydb"
            className="card-clean text-center no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-4xl mb-4">𝕏</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Twitter</h3>
            <p className="text-gray-600 dark:text-gray-400">Follow for updates</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-gray-950">
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