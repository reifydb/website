import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroLogo}>
          <img 
            src="/img/logo.png" 
            alt="ReifyDB Logo" 
            className={styles.heroLogoImage}
          />
        </div>
        <h1 className={styles.heroTitle}>
          ReifyDB
        </h1>
        <p className={styles.heroSubtitle}>
          The Modern Database To Get Things Done
        </p>
        <p className={styles.heroDescription}>
          Fast, embeddable, and cloud-native database with real-time capabilities.
          Built for modern applications that demand performance and simplicity.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/playground"
          >
            Try Online
          </Link>
          <Link
            className="button button--link button--lg"
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
    <section className={styles.quickExample}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Simple, Powerful, Reactive</h2>
          <p>Write SQL queries that automatically update when data changes</p>
        </div>
        <div className={styles.exampleContainer}>
          <div className={styles.exampleCode}>
            <CodeBlock language="sql" title="example.sql">
              {exampleCode}
            </CodeBlock>
          </div>
          <div className={styles.exampleFeatures}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <div>
                <h4>Real-time Updates</h4>
                <p>Queries automatically refresh when underlying data changes</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔄</div>
              <div>
                <h4>Streaming Support</h4>
                <p>Native support for continuous data streams and event processing</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📊</div>
              <div>
                <h4>Standard SQL</h4>
                <p>Use familiar SQL syntax with powerful extensions</p>
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
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Why ReifyDB?</h2>
          <p>Built from the ground up for modern data applications</p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureCardIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
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
    <section className={styles.useCases}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Use Cases</h2>
          <p>ReifyDB powers a wide range of applications</p>
        </div>
        <div className={styles.useCaseGrid}>
          {useCases.map((useCase, idx) => (
            <div key={idx} className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>{useCase.icon}</div>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
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
    <section className={styles.installation}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Get Started in Seconds</h2>
          <p>Choose your preferred installation method</p>
        </div>
        <div className={styles.installOptions}>
          <div className={styles.installOption}>
            <h4>Docker</h4>
            <CodeBlock language="bash">{installCommands.docker}</CodeBlock>
          </div>
          <div className={styles.installOption}>
            <h4>Homebrew</h4>
            <CodeBlock language="bash">{installCommands.brew}</CodeBlock>
          </div>
          <div className={styles.installOption}>
            <h4>Cargo</h4>
            <CodeBlock language="bash">{installCommands.cargo}</CodeBlock>
          </div>
        </div>
        <div className={styles.installActions}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation"
          >
            Installation Guide
          </Link>
          <Link
            className="button button--outline button--lg"
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
    <section className={styles.community}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Join the Community</h2>
          <p>Get help, share ideas, and contribute to ReifyDB</p>
        </div>
        <div className={styles.communityLinks}>
          <a
            href="https://github.com/reifydb/reifydb"
            className={styles.communityCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.communityIcon}>
              <img src="/img/github-mark.svg" alt="GitHub" width="32" height="32" />
            </div>
            <h3>GitHub</h3>
            <p>Star, fork, and contribute</p>
          </a>
          <a
            href="https://discord.com/invite/vuBrm5kuuF"
            className={styles.communityCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.communityIcon}>💬</div>
            <h3>Discord</h3>
            <p>Chat with the community</p>
          </a>
          <a
            href="https://x.com/reifydb"
            className={styles.communityCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.communityIcon}>𝕏</div>
            <h3>Twitter</h3>
            <p>Follow for updates</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
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
  );
}