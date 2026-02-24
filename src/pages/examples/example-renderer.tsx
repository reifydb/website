import { ExecutableSnippet } from '@/components/ui';
import type { ExampleSection } from './sections';

interface ExampleRendererProps {
  section: ExampleSection;
}

export function ExampleRenderer({ section }: ExampleRendererProps) {
  const { example, body, footer } = section;

  return (
    <div className="space-y-6">
      {body && <div>{body}</div>}

      <ExecutableSnippet
        initialCode={example.code}
        title={example.title}
        description={example.description}
      />

      {footer && <div>{footer}</div>}
    </div>
  );
}
