import { describe, it, expect, beforeAll } from 'vitest';
import type { WasmDB } from '@reifydb/wasm';
import { createTestDB, executeExample } from './wasm-test-db';
import { blogPosts, type BlogPost } from '../../data/blog-data';

export interface BlogExample {
  id: string;
  ordinal: number;
  bodyLine: number;
  code: string;
}

export function extractRqlExamples(post: BlogPost): BlogExample[] {
  const examples: BlogExample[] = [];
  const lines = post.content.split('\n');
  let openLine = -1;
  let body: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (openLine === -1) {
      if (trimmed === '```rql') {
        openLine = i + 1;
        body = [];
      }
      continue;
    }

    if (trimmed === '```') {
      examples.push({
        id: `${post.sequence}#${examples.length + 1}`,
        ordinal: examples.length + 1,
        bodyLine: openLine,
        code: body.join('\n').trim(),
      });
      openLine = -1;
      continue;
    }

    body.push(lines[i]);
  }

  if (openLine !== -1) {
    throw new Error(
      `${post.slug}: unterminated \`\`\`rql fence opened at body line ${openLine}`
    );
  }

  return examples;
}

export function verifyBlogExamples(
  sequence: string,
  expectedExampleCount: number
): void {
  const post = blogPosts.find((candidate) => candidate.sequence === sequence);

  if (!post) {
    throw new Error(
      `no blog post with sequence ${sequence}; expected ${sequence}/content.md`
    );
  }

  const examples = extractRqlExamples(post);

  describe(`blog ${post.sequence} ${post.slug}`, () => {
    let db: WasmDB;

    beforeAll(async () => {
      db = await createTestDB();
    });

    it(`extracts exactly ${expectedExampleCount} runnable examples`, () => {
      expect(examples.length).toBe(expectedExampleCount);
    });

    it.each(examples)('$id (body line $bodyLine)', (example) => {
      const result = executeExample(db, example.code);
      expect(
        result.success,
        `${post.slug} example ${example.ordinal} at body line ${example.bodyLine} failed:\n${result.error}\n\ncode:\n${example.code}`
      ).toBe(true);
    });
  });
}
