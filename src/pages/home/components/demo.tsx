import {CodeEditor} from "@components/editor";

export function DemoSection() {
    return (
        <section>
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2">
                    <CodeEditor/>
                </div>
                <div className="w-full lg:w-1/2 text-left">
                    <h2 className="text-4xl font-extrabold mb-4">Try the Demo</h2>
                    <p className="text-gray-400 mb-6 text-base leading-relaxed max-w-md">
                        Write and run a live query directly against ReifyDB — no backend, no glue code.
                        Just one request, one transaction, and instant results.
                    </p>

                    <div className="flex gap-4">
                        <button
                            className="bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition text-sm"
                            disabled
                        >
                            ⚡ Run (coming soon)
                        </button>
                        <a
                            href="mailto:founder@reifydb.com"
                            className="bg-blue-800 text-white font-medium px-5 py-2 rounded hover:bg-green-700 transition text-sm"
                        >
                            ✉️ Contact Dominique
                        </a>
                    </div>
                </div>
            </div>
        </section>

    );
}
