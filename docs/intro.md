---
title: Documentation
slug: /
sidebar_position: 1
---

import Link from '@docusaurus/Link';
import Card from '@site/src/components/Card';

<div className="doc-landing">
  <div className="doc-landing-header">
    <h1>ReifyDB Documentation</h1>
    <p className="lead">Everything you need to know about ReifyDB - from getting started to advanced features</p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <Card
      href="/docs/getting-started/installation"
      icon="🚀"
      title="Getting Started"
      description="Get up and running with ReifyDB in minutes. Installation guides, quick start tutorials, and interactive examples."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

    <Card
      href="/docs/core-concepts/architecture"
      icon="📚"
      title="Core Concepts"
      description="Understand the fundamental concepts behind ReifyDB. Learn about the architecture and data types."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

    <Card
      href="/docs/rql-reference/data-types"
      icon="📝"
      title="RQL Reference"
      description="Complete reference for ReifyDB Query Language (RQL). Learn syntax, operators, and advanced query patterns."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

    <Card
      href="/docs/api"
      icon="🔧"
      title="API Reference"
      description="Comprehensive API documentation for all supported languages and frameworks. Code examples included."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

    <Card
      href="/docs/advanced/query-optimization"
      icon="⚡"
      title="Advanced Topics"
      description="Deep dive into advanced features, performance optimization, and best practices for production use."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

    <Card
      href="/docs/faq"
      icon="❓"
      title="FAQ"
      description="Frequently asked questions about ReifyDB. Find answers to common questions and troubleshooting tips."
      iconClassName="text-4xl mb-4"
      className="card-clean text-center"
    />

  </div>
</div>