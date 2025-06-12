import {useState} from "react";

const useCases = [
    {title: "Realtime Dashboards", icon: "📊"},
    {title: "Embedded Analytics", icon: "📦"},
    {title: "Custom Alerting Systems", icon: "🔔"},
    {title: "Distributed Counters", icon: "🧮"},
    {title: "ML Feature Stores", icon: "🧠"},
    {
        title: "Code Indexing & Retrieval",
        icon: "🌲",
        description: "Store code in structured trees for indexing and retrieval."
    },
];

export function UseCases() {
    const [selected, setSelected] = useState("Code Indexing & Retrieval");

    return (
        <section id="use-cases" className="relative px-4 py-24 bg-[#0b0c10] text-white">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Use Cases</h2>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                    Explore how ReifyDB empowers real-time, low-latency use cases across modern systems and tooling.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {useCases.map((uc) => (
                    <button
                        key={uc.title}
                        onClick={() => setSelected(uc.title)}
                        className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-150 ${
                            selected === uc.title
                                ? "border-white text-white bg-gradient-to-br from-gray-800 to-gray-900"
                                : "border-gray-700 text-gray-300 hover:border-white hover:text-white"
                        }`}
                    >
                        <span className="mr-2">{uc.icon}</span>
                        <span className="text-sm font-medium text-left">{uc.title}</span>
                    </button>
                ))}
            </div>

            <div className="mt-12 max-w-5xl mx-auto bg-[#111217] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🌲</div>
                    <div>
                        <h3 className="text-xl font-semibold">Code Indexing & Retrieval</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Store chunked code in tree structures mapping function calls, dependencies, and imports
                            for semantic and structured retrieval by agents and developers.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-[#1a1b1e] p-4 rounded-md border border-blue-900">
                        <h4 className="text-blue-400 font-semibold mb-1">Relational Use</h4>
                        <p className="text-sm text-gray-300">
                            Represent class hierarchies, module dependencies, and file structures for fine-grained
                            data access and lineage tracing.
                        </p>
                    </div>
                    <div className="bg-[#1a1b1e] p-4 rounded-md border border-blue-900">
                        <h4 className="text-blue-400 font-semibold mb-1">Vector Use</h4>
                        <p className="text-sm text-gray-300">
                            Embed functions or code blocks for fast semantic search, similarity detection, and
                            contextual navigation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
