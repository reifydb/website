import { ReifyLogo } from "@components/image";

export function Footer() {
    return (
        <footer className="relative bg-[#0b0c10] text-gray-400 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <ReifyLogo className="h-6 w-6" />
                        <span className="text-white font-semibold text-lg">ReifyDB</span>
                    </div>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-2 text-sm">Docs</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#getting-started" className="hover:text-white">Getting Started</a></li>
                        <li><a href="#api" className="hover:text-white">API Reference</a></li>
                        <li><a href="#tutorials" className="hover:text-white">Tutorials</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-2 text-sm">Community</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="https://github.com/reifydb/reifydb/issues" className="hover:text-white" target="_blank" rel="noopener noreferrer">GitHub Issues</a></li>
                        <li><a href="mailto:founder@reifydb.com" className="hover:text-white">Contact (Founder)</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-2 text-sm">More</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#changelog" className="hover:text-white">Changelog</a></li>
                        <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                        <li><a href="https://github.com/reifydb/reifydb" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} ReifyDB. All rights reserved.
            </div>
        </footer>
    );
}
