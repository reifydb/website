export function CallToAction() {
    return (
        <section className="relative py-24 bg-[#0b0c10] text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute left-1/2 top-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#1f1f1f] to-transparent rounded-full opacity-20 blur-3xl"/>
            </div>

            <div className="text-center max-w-2xl mx-auto px-4 mb-12 relative z-10">
                <h2 className="text-3xl font-bold">Commercial Support</h2>
                <p className="text-gray-400 mt-4">
                    Do you want to use ReifyDB in production, with automated disaster recovery, monitoring, consulting?
                </p>
            </div>

            <div
                className="max-w-xl mx-auto p-8 bg-[#111217] border border-gray-800 rounded-2xl shadow-xl text-center relative z-10">
                <div className="mb-4 flex justify-center">
                    <div className="bg-blue-900/50 p-3 rounded-full">
                        <svg
                            className="w-6 h-6 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z"/>
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                <p className="text-gray-400 text-sm mb-6">
                    Book a call with me to discuss your specific needs and get ReifyDB running in production.
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-200 justify-items-center mb-6">
                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                        ⚡ Feature Priority
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                        🏠 Self-Hosted
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                        🎓 Expert Support
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                        🏢 Enterprise Ready
                    </div>
                </div>

                <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z"/>
                    </svg>
                    Book a call
                </a>

                <p className="mt-3 text-xs text-gray-500">
                    Free 30-minute consultation · No commitment required
                </p>
            </div>
        </section>
    );
}
