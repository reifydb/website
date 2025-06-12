import {useEffect, useState} from "react";

const CACHE_KEY = "github-stars";
const CACHE_TTL_MS = 1000 * 60 * 60;
let fetchPromise: Promise<number> | null = null;

function loadCachedStars(): number | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const {value, timestamp} = JSON.parse(raw);
        if (Date.now() - timestamp < CACHE_TTL_MS) {
            return value;
        }
    } catch {
        // invalid JSON or unavailable
    }
    return null;
}

function saveStarsToCache(value: number) {
    try {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({value, timestamp: Date.now()})
        );
    } catch {
        // localStorage unavailable
    }
}

export function useGitHubStars(): number | null {
    const [stars, setStars] = useState<number | null>(() => loadCachedStars());

    useEffect(() => {
        if (stars !== null) return;

        if (!fetchPromise) {
            fetchPromise = fetch("https://api.github.com/repos/reifydb/reifydb")
                .then((res) => {
                    if (!res.ok) throw new Error("GitHub API error");
                    return res.json();
                })
                .then((data) => {
                    const count = typeof data.stargazers_count === "number" ? data.stargazers_count : null;
                    if (count !== null) saveStarsToCache(count);
                    return count;
                })
                .catch(() => null);
        }

        fetchPromise.then((count) => {
            if (count !== null) setStars(count);
        });
    }, [stars]);

    return stars;
}