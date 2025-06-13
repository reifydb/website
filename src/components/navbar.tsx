import {ReifyLogo} from "@components/image";
import {GithubButton} from "@components/github.tsx";
import {CallButton} from "@components/call.tsx";
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
                <Link to="/" className="flex items-center gap-2">
                    <ReifyLogo className="h-7 w-7"/>
                    <span className="text-white font-semibold text-sm sm:text-base">ReifyDB</span>
                    <span
                        className="bg-blue-700 text-[10px] sm:text-xs font-medium text-white px-2 sm:px-4 py-1 rounded-full">
                        v0.0
                    </span>
                </Link>

                <nav className="flex flex-wrap justify-end items-center gap-2 sm:gap-4 text-sm font-medium">
                    <GithubButton/>

                    <Link
                        to="/documentation"
                        className="px-3 py-1.5 rounded-md border border-gray-700 bg-[#121212] text-gray-200 hover:text-white hover:border-gray-500 transition text-xs sm:text-sm"
                    >
                        Docs
                    </Link>

                    <div className="hidden md:block">
                        <CallButton/>
                    </div>
                </nav>
            </div>
        </header>
    );
}