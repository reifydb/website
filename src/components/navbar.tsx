import {ReifyLogo} from "@components/image";
import {GithubButton} from "@components/github.tsx";
import {CallButton} from "@components/call.tsx";

export function Navbar() {

    return (
        <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    <ReifyLogo className="h-6 w-6"/>
                    <span className="text-white font-semibold text-sm sm:text-base">ReifyDB</span>
                    <span className="bg-blue-700 text-xs font-medium text-white px-3 py-1 rounded-full">
                       v0.0
                    </span>
                </a>

                <nav className="flex items-center gap-4 text-sm font-medium">
                    <GithubButton/>
                    <a
                        href="/documentation"
                        className="px-3 py-1.5 rounded-md border border-gray-700 bg-[#121212] text-gray-200 hover:text-white hover:border-gray-500 transition"
                    >
                        Docs
                    </a>

                    <CallButton/>
                </nav>
            </div>
        </header>
    );
}