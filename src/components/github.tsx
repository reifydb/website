import {useGitHubStars} from "@hooks/github";
import {GitHub} from "@components/image";
import {cn} from "@utils";

interface GitHubButtonProps {
    className?: string;
}

export function GithubButton({className, text}: GitHubButtonProps) {
    const stars = useGitHubStars();
    return (
        <a
            href="https://github.com/reifydb/reifydb"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("flex items-center gap-1 text-gray-300 hover:text-white transition", className)}
        >
            <GitHub className="w-4 h-4"/>
            {stars !== null ? stars.toLocaleString() : "—"}
        </a>
    );
}