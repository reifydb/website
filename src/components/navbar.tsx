import {Calendar} from "lucide-react";
import {ReifyLogo} from "@components/image";
import {GithubButton} from "@components/github.tsx";

export function Navbar() {

    return (
        <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    <ReifyLogo className="h-6 w-6"/>
                    <span className="text-white font-semibold text-sm sm:text-base">ReifyDB</span>
                </a>

                <nav className="flex items-center gap-4 text-sm font-medium">
                    <GithubButton/>

                    <a
                        href="#docs"
                        className="px-3 py-1.5 rounded-md border border-gray-700 bg-[#121212] text-gray-200 hover:text-white hover:border-gray-500 transition"
                    >
                        Docs
                    </a>

                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-md hover:opacity-90 transition"
                    >
                        <Calendar className="h-4 w-4"/>
                        Book a Call
                    </a>
                </nav>
            </div>
        </header>
    );
}