import {GithubButton} from "@components/github.tsx";
import {CallButton} from "@components/call.tsx";
import {Link} from "react-router-dom";

export function Description() {
    return (
        <section>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/3 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                    <img
                        src="/logo.png"
                        alt="ReifyDB Logo"
                        className="w-full object-contain p-2 bg-[#0e0f14]"
                    />
                </div>

                <div className="w-full lg:w-2/3">
                    <p className="text-blue-500 uppercase tracking-wide text-sm font-medium mb-2">
                        A DATABASE WITH YOUR NEEDS IN MIND
                    </p>
                    <h2 className="text-4xl font-extrabold mb-6">What is ReifyDB</h2>
                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                        You can think of ReifyDB as both a relational database and backend combined into one.
                        Instead of deploying a web server that sits in between your frontend and your database,
                        clients connect directly to the database and execute your logic inside the database itself.
                    </p>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                        ReifyDB takes stored procedures to the next level, allowing you to deploy your whole application
                        directly into the database.
                        It's like a smart contract... if smart contracts were fast, cheap, and easy to use.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <Link
                            to="/documentation"
                            className="inline-block bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition text-sm"
                        >
                            → Learn More
                        </Link>
                        <div className="hidden md:block">
                            <GithubButton/>
                        </div>
                        <CallButton/>
                    </div>
                </div>
            </div>
        </section>
    );
}