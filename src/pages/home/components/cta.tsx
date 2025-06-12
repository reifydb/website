import { CallButton } from "@components/call";

export function CallToAction() {
    return (
        <section className="relative py-24 text-white overflow-hidden">
            <div className="text-center max-w-2xl mx-auto px-4 mb-4">
                <h2 className="text-4xl font-extrabold tracking-tight">Support</h2>
                <p className="text-gray-400 mt-4 text-base leading-relaxed">
                    Using ReifyDB in production? Feature requests? Let’s talk!
                </p>
            </div>

            {/* Card */}
            <div className="relative z-10 max-w-xl mx-auto px-6 sm:px-8 py-10 bg-[#111217] border border-gray-800 rounded-2xl shadow-2xl text-center">
                <div className="mb-5 flex justify-center">
                    <div className="bg-blue-900/50 p-3 rounded-full">
                        <svg
                            className="w-6 h-6 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mb-3">Ready to Get Started?</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Schedule a 30-minute call to talk through production use cases and commercial support options.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-200 mb-6">
                    {[
                        "⚡ Feature Priority",
                        "🏠 Self-Hosted",
                        "🎓 Expert Support",
                    ].map((tag) => (
                        <div
                            key={tag}
                            className="bg-gray-800 px-3 py-1 rounded-full"
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                <CallButton />
                <p className="mt-4 text-xs text-gray-500">
                    Free 30-minute consultation · No commitment required
                </p>
            </div>
        </section>
    );
}