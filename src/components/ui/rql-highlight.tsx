import { useEffect, useState } from 'react';

const TOKEN = /(\s+)|([A-Za-z_]\w*::[A-Za-z_]\w*)|([A-Za-z_]\w*)|(\d+(?:\.\d+)?)|(.)/g;

let keywordsPromise: Promise<Set<string>> | null = null;

function loadKeywords(): Promise<Set<string>> {
  keywordsPromise ??= import('@reifydb/editor').then(
    ({ rqlLanguageDefinition }) => new Set(rqlLanguageDefinition.keywords.map((word: string) => word.toLowerCase())),
  );
  return keywordsPromise;
}

export function RqlHighlight({ code, className }: { code: string; className?: string }) {
  const [keywords, setKeywords] = useState<Set<string> | null>(null);

  useEffect(() => {
    let live = true;
    void loadKeywords().then((set) => {
      if (live) setKeywords(set);
    });
    return () => {
      live = false;
    };
  }, []);

  const parts = [...code.matchAll(TOKEN)].map((match, index) => {
    const [text, space, namespaced, word, number] = match;
    if (space) return text;
    if (namespaced) return <span key={index} className="font-bold text-[#18181B]">{text}</span>;
    if (word && keywords?.has(word.toLowerCase())) return <span key={index} className="font-bold text-[#2E39DF]">{text}</span>;
    if (number) return <span key={index} className="font-bold text-[#2E39DF]">{text}</span>;
    if (word) return <span key={index} className="text-[#18181B]">{text}</span>;
    return <span key={index} className="text-[#3F3F46]">{text}</span>;
  });

  return (
    <pre className={className}>
      <code>{parts}</code>
    </pre>
  );
}
