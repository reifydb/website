import { ReifyLogo } from "@components/image";
import {Mail, BookOpen, Users, Briefcase, Github} from "lucide-react";
import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer className="relative pb-0 bg-[#0b0c10] text-gray-400 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <ReifyLogo className="h-6 w-6" />
                        <span className="text-white font-semibold text-lg">ReifyDB</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Data. Backend. Done.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Docs</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to={"/documentation"} className="hover:text-white flex items-center gap-2"><BookOpen size={14}/> Getting Started</Link></li>
                        <li><Link to={"/documentation"} className="hover:text-white flex items-center gap-2"><BookOpen size={14}/> API Reference</Link></li>
                        <li><Link to={"/documentation"} className="hover:text-white flex items-center gap-2"><BookOpen size={14}/>Tutorials</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Help</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="https://github.com/reifydb/reifydb/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2"><Users size={14}/> GitHub Issues</a></li>
                        <li><a href="mailto:founder@reifydb.com" className="hover:text-white flex items-center gap-2"><Mail size={14}/> Contact Founder</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">More</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/company" className="hover:text-white flex items-center gap-2"><Briefcase size={14}/> Company</Link></li>
                        <li><a href="https://github.com/reifydb/reifydb" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2"><Github size={14}/> GitHub</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} ReifyDB. Built with clarity — not hype.
            </div>
        </footer>
    );
}
