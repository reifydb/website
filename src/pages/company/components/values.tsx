import { useState } from "react";

const values = [
    {
        title: "Developer-First Always",
        description:
            "Every decision favors the everyday developer — not abstract enterprise use cases. Simplicity, clarity, and utility come first.",
    },
    {
        title: "No Boilerplate, No BS",
        description:
            "ReifyDB avoids ceremony and complexity. It’s built to feel intuitive and productive from the first line of code.",
    },
    {
        title: "Make It Work. Make It Right. Make It Fast.",
        description:
            "Correctness comes before cleverness. ReifyDB prioritizes solid, well-tested foundations before chasing benchmarks — performance is earned, not assumed.",
    },
    {
        title: "Tested, Not Just Shipped",
        description:
            "A sophisticated test suite is not a luxury — it’s part of the product. Stability, correctness, and long-term maintainability come from deliberate testing at every layer.",
    },
    {
        title: "Radical Honesty Over Hype",
        description:
            "ReifyDB makes no empty promises. Every claim can be backed by code. Marketing stays honest, features are real, and expectations are never inflated.",
    },
    {
        title: "Support That Solves, Not Deflects",
        description:
            "Helping customers means solving real problems — not sending links or asking them to wait. Everyone on the team contributes to support, because great support is part of the product.",
    },
];

export function CoreValues() {
    const [selected, setSelected] = useState(values[0]);

    return (
        <section id="core-values" className="relative px-4 py-12 text-white">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold">
                    Values
                </h2>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm">
                    What ReifyDB stands for — practical principles built into the product, not just marketing copy.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {values.map((val) => (
                    <button
                        key={val.title}
                        onClick={() => setSelected(val)}
                        className={`flex items-center justify-start gap-2 px-4 py-3 border rounded-xl transition-all duration-150 ${
                            selected.title === val.title
                                ? "border-white text-white bg-gradient-to-br from-gray-800 to-gray-900 shadow-md"
                                : "border-gray-700 text-gray-300 hover:border-white hover:text-white"
                        }`}
                    >
                        <span className="text-center font-medium">{val.title}</span>
                    </button>
                ))}
            </div>

            <div className="mt-12 max-w-3xl mx-auto bg-[#111217] rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                    <div>
                        <h3 className="text-xl text-center font-semibold mb-2">{selected.title}</h3>
                        <p className="text-gray-400 text-center text-lg leading-relaxed">{selected.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}