export interface FaqItemData {
  question: string;
  answer: string;
}

export const faqs: FaqItemData[] = [
  {
    question: 'What is ReifyDB?',
    answer: 'ReifyDB is a database for application state. It helps you understand, mutate, and derive live application state under a single transactional model. State is kept in memory for low latency, persisted asynchronously for durability, and extended with application-defined logic that runs next to the data.',
  },
  {
    question: 'How is ReifyDB different from PostgreSQL or Redis?',
    answer: 'PostgreSQL is disk-first: durable and query-rich, but slow for real-time state. Redis is memory-first: fast, but transactions lack rollbacks and there is no derived state. ReifyDB is designed around reasoning about state - with full ACID transactions, plus incremental materialized views and programmable logic that runs inside the database.',
  },
  {
    question: 'Is ReifyDB production ready?',
    answer: 'No. ReifyDB is in active development. APIs and guarantees may change. I recommend using it for experimentation and development, but not for production workloads yet.',
  },
  {
    question: 'What is the licensing model?',
    answer: 'ReifyDB uses dual licensing: AGPL-3.0 for open-source users and contributors, and a commercial license for closed-source or hosted use. This keeps ReifyDB open, fair, and sustainable while making it easy for teams to build with confidence.',
  },
  {
    question: 'Can I embed ReifyDB in my application?',
    answer: 'Yes. ReifyDB can run embedded in your application process or as a standalone server. This is similar to how SQLite or DuckDB work - you choose the deployment model that fits your architecture.',
  },
  {
    question: 'What languages are supported?',
    answer: 'ReifyDB is written in Rust with a native Rust API. TypeScript/JavaScript clients are available for web and Node.js applications. More language bindings are planned.',
  },
  {
    question: 'Why should I trust a new database?',
    answer: 'ReifyDB is open source under AGPL-3.0, so you can inspect every line. The core is written in Rust for memory safety and performance. Development is active and transparent on GitHub. For production use cases requiring support guarantees, commercial licenses are available.',
  },
  {
    question: 'What can I use ReifyDB for today?',
    answer: 'ReifyDB is suitable for prototyping, internal tools, and non-critical workloads where you want to explore the programming model. Use it to build proofs-of-concept, understand incremental derived state, or experiment with colocating logic and data. Wait for a stable release before using it for production systems.',
  },
];
