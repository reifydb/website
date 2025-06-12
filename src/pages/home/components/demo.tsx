import {CodeEditor} from "@components/editor";

export function DemoSection() {
    return (
        <section className="relative  text-white px-6 py-28">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2 text-left">
                    <h2 className="text-4xl font-extrabold mb-4">Try the demo</h2>
                    <p className="text-gray-400 mb-6 text-base leading-relaxed max-w-md">
                        Edit an example ReifyDB module and see how logic lives inside your
                        database — no middleware, no glue code. One request, one
                        transaction.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            className="bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition text-sm"
                        disabled={true}>
                            ⚡ Run (not yet..)
                        </button>
                        <a
                            href="mailto:founder@reifydb.com"
                            className="bg-blue-800 text-white font-medium px-5 py-2 rounded hover:bg-green-700 transition text-sm"
                        >
                            ✉️ Contact a Founder
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <CodeEditor/>
                </div>
            </div>
        </section>
    );
}
