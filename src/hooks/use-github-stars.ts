import { useState, useEffect } from 'react';

let cachedStars: number | null = null;
let hasFailed = false;

export function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(cachedStars);
  const [loading, setLoading] = useState(!cachedStars && !hasFailed);

  useEffect(() => {
    if (cachedStars !== null || hasFailed) return;

    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/reifydb/reifydb');
        if (response.status === 403) {
          hasFailed = true;
          setLoading(false);
          return;
        }
        if (response.ok) {
          const data = await response.json();
          cachedStars = data.stargazers_count;
          setStars(cachedStars);
        }
      } catch {
        hasFailed = true;
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  const formatted = stars !== null
    ? stars >= 1000
      ? (stars / 1000).toFixed(1) + 'k'
      : stars.toString()
    : null;

  return { stars, formatted, loading };
}
