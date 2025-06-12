export function CloudService() {
    return (
        <section className="relative py-24 text-white">
            <div
                className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                {/* Visual Side */}
                <div className="relative w-full md:w-1/2 flex justify-center items-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gray-800 opacity-10 blur-2xl"/>
                        <div className="absolute inset-6 rounded-full bg-gray-700 opacity-10 blur-2xl"/>
                        <div
                            className="relative z-10 h-32 w-32 bg-[#1f1f1f] rounded-full flex items-center justify-center border border-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white opacity-80"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M3 15a4 4 0 014-4h1V9a4 4 0 118 0v2h1a4 4 0 110 8H7a4 4 0 01-4-4z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2">
          <span className="text-xs font-medium bg-gray-700 px-3 py-1 rounded-full mb-3 inline-block">
            Planned
          </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Managed Cloud Service</h2>
                    <p className="text-gray-400 mb-6">
                        Focus on building while we handle the infrastructure. Our fully managed ReifyDB service takes
                        care of scaling, maintenance,
                        and security so you can concentrate on what matters most.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 text-sm">
                        <li>24/7 expert support and monitoring</li>
                        <li>Enterprise-grade security and compliance</li>
                    </ul>
                    {/*<div className="flex items-center gap-4">*/}
                    {/*    <a*/}
                    {/*        href="#"*/}
                    {/*        className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition"*/}
                    {/*    >*/}
                    {/*        <svg*/}
                    {/*            className="h-4 w-4"*/}
                    {/*            fill="none"*/}
                    {/*            stroke="currentColor"*/}
                    {/*            strokeWidth={2}*/}
                    {/*            viewBox="0 0 24 24"*/}
                    {/*        >*/}
                    {/*            <path d="M3 15a4 4 0 014-4h1V9a4 4 0 118 0v2h1a4 4 0 110 8H7a4 4 0 01-4-4z"/>*/}
                    {/*        </svg>*/}
                    {/*        Join Waitlist*/}
                    {/*    </a>*/}
                    {/*    <span className="text-sm text-gray-500">Be the first to know when we launch</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}