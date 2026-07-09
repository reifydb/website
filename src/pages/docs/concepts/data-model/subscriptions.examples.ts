import type { CodeExample } from '@/lib/examples/types';

// Subscriptions are not available in the browser WASM build (no
// SubscriptionService), so this page renders static CodeBlocks instead of
// executable snippets. This file exists to keep the colocated pattern and
// document that fact; it intentionally exports no runnable examples.
export const dataModelSubscriptionsExamples: CodeExample[] = [];
