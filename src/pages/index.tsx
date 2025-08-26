import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';
import AnimatedText from '@site/src/components/AnimatedText';
import Card from '@site/src/components/Card';
import InlineCodeBlock from "@site/src/components/InlineCodeBlock";
import InlineViewer from "@site/src/components/InlineViewer";

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
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    A fast, reactive database you can embed or run as a server.
                </p>
                <p className="font-bold text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Made for hackers, not suits.
                </p>
                <div className="mb-8">
                    <AnimatedText/>
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
    const exampleCode = `
# Create a near real-time automatic refreshing view
create deferred view demo.adults { 
    name: utf8, 
    age: int1 
} with {
    from test.users
    filter { age >= 18 }
    map { name: firstname + ' ' + lastname, age }
};

`;

    return (
        <section className="quick-example-section py-20 section-separator">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Simple,
                        Powerful, Reactive</h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Write RQL queries that
                        automatically update when data changes</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <BrowserOnly fallback={<div>Loading...</div>}>
                        {() => <InlineViewer query={exampleCode}/>}
                    </BrowserOnly>
                    <div className="grid gap-4">

                        <div className="card-clean">
                            <div className="flex gap-4">
                                <div className="text-4xl flex-shrink-0">🔀</div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                                        Streaming Views
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Views that stay fresh automatically. No cron jobs, no glue code -
                                        just queries that update as your data changes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card-clean">
                            <div className="flex gap-4">
                                <div className="text-4xl flex-shrink-0">🛠️</div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                                        Unified Query Model
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Reads, writes, and subscriptions all go through the same engine.
                                        One request = one transaction. Simple, safe, and fast.
                                    </p>
                                </div>
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
            title: 'Developer-First',
            icon: '👩‍💻',
            description:
                'Made for hackers, not suits. Zero boilerplate, clear errors, and an API that feels like code - not config files.',
        },
        {
            title: 'Blazing Fast',
            icon: '⚡',
            description:
                'Columnar storage with vectorized execution. Crunch millions of rows without sweating the hardware.',
        },
        {
            title: 'Fun to Use',
            icon: '🎉',
            description:
                'Queries feel like Lego bricks. Drop it into a game, bot, or side-project without enterprise baggage.',
        },
        {
            title: 'Embedded or Server',
            icon: '🧩',
            description:
                'Ship it as a tiny embedded DB in Rust/Node/Bun, or flip the switch and run it as a server in the cloud.',
        },
        {
            title: 'Open Source',
            icon: '💚',
            description:
                'AGPL for the community, commercial if you need it. Fork it, hack it, or build with us.',
        },
        {
            title: 'Always Reactive',
            icon: '🔄',
            description:
                'Data changes = instant updates. Build live dashboards, trading bots, and real-time apps without glue code.',
        },
    ];

    return (
        <section className="py-20 section-separator bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">
                        Why ReifyDB?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        A fast, reactive, open-source database - built for developers who want to have fun
                    </p>
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
            title: 'Trading Bots',
            description: 'Stream Solana DEX data straight into ReifyDB and fire strategies the moment prices move.',
            icon: '⚡',
        },
        {
            title: 'On-Chain Indexing',
            description: 'Ingest Solana transactions and keep live views of wallets, tokens, and LP pools with transactional CDC.',
            icon: '🪙',
        },
        {
            title: 'Live Dashboards',
            description: 'No polling. Just reactive queries that push sub-ms updates to your charts.',
            icon: '📈',
        },
        {
            title: 'Game State Persistence',
            description: 'Drop ReifyDB into your game engine for instant saves, reactive leaderboards, and event-driven logic.',
            icon: '🎮',
        },
        {
            title: 'Chatbots & Agents',
            description: 'Build bots that subscribe to data changes - perfect for Telegram/Discord trading or support flows.',
            icon: '🤖',
        },
        {
            title: 'Audit Logs & Ledgering',
            description: 'Every row change is captured in CDC. Use it to build ledgers, audits, and compliance trails with no extra code.',
            icon: '📜',
        },
        {
            title: 'AI Memory Store',
            description: 'Turn ReifyDB into structured memory for AI agents - queries double as context fetchers.',
            icon: '🧠',
        },
        {
            title: 'Multi-Tenant SaaS',
            description: 'Run it embedded per tenant, or scale out as a shared service - same engine, no friction.',
            icon: '🏗️',
        },
    ];

    return (
        <section className="py-20 section-separator bg-orange-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">
                        Use Cases
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        What developers are actually building with ReifyDB
                    </p>
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
        cargo: 'cargo install reifydb',
    };

    return (
        <section className="py-20 section-separator bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Get
                        Started in Seconds</h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Choose your preferred
                        installation method</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="card-clean">
                        <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase">Docker</h4>
                        <CodeBlock language="bash">{installCommands.docker}</CodeBlock>
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">Join the
                        Community</h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Get help, share ideas, and
                        contribute to ReifyDB</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <a
                        href="https://github.com/reifydb/reifydb"
                        className="card-clean text-center no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="mb-4">
                            <img src="/img/github-mark.svg" alt="GitHub" width="48" height="48" className="mx-auto"/>
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
                <HomepageHeader/>
                <main>
                    <QuickExample/>
                    <Features/>
                    <UseCases/>
                    <Installation/>
                    <Community/>
                </main>
            </Layout>
        </div>
    );
}