import { describe, it, expect, beforeAll } from 'vitest';
import type { WasmDB } from '@reifydb/wasm';
import { createTestDB, verifyExample } from './wasm-test-db';
import type { CodeExample } from '../examples/types';
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
  examples: CodeExample[]
): void {
  const post = blogPosts.find((candidate) => candidate.sequence === sequence);

  if (!post) {
    throw new Error(
      `no blog post with sequence ${sequence}; expected ${sequence}/content.md`
    );
  }

  const fences = extractRqlExamples(post);

  describe(`blog ${post.sequence} ${post.slug}`, () => {
    let db: WasmDB;

    beforeAll(async () => {
      db = await createTestDB();
    });

    it('has one examples.ts entry per content.md fence', () => {
      expect(
        examples.length,
        `${post.slug}: content.md has ${fences.length} \`\`\`rql fences but examples.ts exports ${examples.length} entries`
      ).toBe(fences.length);
    });

    if (fences.length > 0) {
      it.each(fences)('$id (body line $bodyLine) mirrors examples.ts', (fence) => {
        expect(
          fence.code,
          `${post.slug}: fence ${fence.ordinal} at body line ${fence.bodyLine} drifted from examples.ts entry ${fence.ordinal}; content.md is the display source, examples.ts must mirror it verbatim`
        ).toBe(examples[fence.ordinal - 1]?.code);
      });
    }

    if (examples.length > 0) {
      it.each(examples)('$id - $title', (example) => {
        const result = verifyExample(db, example);
        expect(
          result.success,
          `${post.slug} example ${example.id} failed:\n${result.error}`
        ).toBe(true);
      });
    }
  });
}
