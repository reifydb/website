import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '../components/PageHeader';
import styles from './support.module.css';

export default function Support(): JSX.Element {
  return (
    <Layout title="Support" description="Get help with ReifyDB">
      <main className={styles.supportPage}>
        <PageHeader 
          title="SUPPORT"
          subtitle="Get help from the ReifyDB community and team"
        />
        <div className={styles.container}>

          <div className={styles.supportGrid}>
            <div className={styles.supportCard + ' ' + styles.commercialCard}>
              <div className={styles.cardIcon + ' ' + styles.reifydbIcon}>
                <img src="/img/logo.png" alt="ReifyDB" width="32" height="32" />
              </div>
              <h2 className={styles.cardTitle}>Commercial Support</h2>
              <p className={styles.cardDescription}>
                Custom support tailored to your organization's needs
              </p>
              <ul className={styles.featureList}>
                <li>Private issue tracker and datasets</li>
                <li>Guaranteed response time</li>
                <li>Flexible scope</li>
                <li>Deployment advice</li>
                <li>Long-term support</li>
                <li>Negotiable support volume</li>
              </ul>
              <a href="/contact" className={styles.cardButton}>
                Get in Touch
              </a>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.037c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Discord Community</h2>
              <p className={styles.cardDescription}>
                Join our active Discord community for real-time help, discussions, and updates about ReifyDB.
              </p>
              <a href="https://discord.com/invite/vuBrm5kuuF" className={styles.cardButton} target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h2 className={styles.cardTitle}>GitHub Issues</h2>
              <p className={styles.cardDescription}>
                Report bugs, request features, or browse existing issues on our GitHub repository.
              </p>
              <a href="https://github.com/reifydb/reifydb/issues" className={styles.cardButton} target="_blank" rel="noopener noreferrer">
                Open Issue
              </a>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 2v12h16V6H4m8 3a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1z"/>
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Documentation</h2>
              <p className={styles.cardDescription}>
                Browse our comprehensive documentation for guides, tutorials, and API references.
              </p>
              <a href="/docs/getting-started/installation" className={styles.cardButton}>
                View Docs
              </a>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.85.38-1.75.65-2.71.77 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.42.72-.66 1.56-.66 2.46 0 1.68.85 3.16 2.14 4.02-.79-.02-1.53-.24-2.18-.6v.06c0 2.35 1.67 4.31 3.88 4.76-.4.1-.83.16-1.27.16-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.83 2.1-6.15 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.52 14.02-14.02 0-.21 0-.41-.01-.61.96-.69 1.79-1.56 2.45-2.55-.88.39-1.83.65-2.82.77z"/>
                </svg>
              </div>
              <h2 className={styles.cardTitle}>X (Twitter)</h2>
              <p className={styles.cardDescription}>
                Follow us on X for the latest news, updates, and community highlights.
              </p>
              <a href="https://x.com/reifydb" className={styles.cardButton} target="_blank" rel="noopener noreferrer">
                Follow on X
              </a>
            </div>
          </div>

          <div className={styles.additionalResources}>
            <h2>Additional Resources</h2>
            <div className={styles.resourcesGrid}>
              <div className={styles.resourceItem}>
                <h3>FAQ</h3>
                <p>Find answers to commonly asked questions about ReifyDB.</p>
                <a href="/docs/faq">View FAQ →</a>
              </div>
              <div className={styles.resourceItem}>
                <h3>Examples</h3>
                <p>Explore example projects and use cases built with ReifyDB.</p>
                <a href="https://github.com/reifydb/reifydb/tree/main/bin/examples/examples" target="_blank" rel="noopener noreferrer">Browse Examples →</a>
              </div>
              <div className={styles.resourceItem}>
                <h3>Blog</h3>
                <p>Read about ReifyDB features, updates, and best practices.</p>
                <a href="/blog">Visit Blog →</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}