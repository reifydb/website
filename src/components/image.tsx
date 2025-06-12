import {cn} from "@utils";

export function ReifyLogo({className}: { className?: string }) {
    return (
        <div className={cn("relative h-20 w-20", className)}>
            <img
                src="/logo.png"
                alt="ReifyDB Logo"
                className="h-full w-full object-contain drop-shadow-lg"
            />
        </div>
    );
}


interface GitHubProps {
    className?: string;
}

export function GitHub({className}: GitHubProps) {
    return (
        <img
            src="/icons/github.svg"
            alt="GitHub"
            className="w-4 h-4 invert"
        />

    );
}