import {useEffect, useState} from "react";

export function useGitHubStars() {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/repos/reifydb/reifydb`)
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.stargazers_count === "number") {
                    setStars(data.stargazers_count);
                } else {
                    setStars(null);
                }
            })
            .catch(() => setStars(null));
    }, []);

    return stars;
}
