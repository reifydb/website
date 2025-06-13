import {cn} from "@utils";

export function OriginStory() {
    return (
        <section>
            <div className="max-w-3xl mx-auto border border-blue-900/50 bg-[#0f1117] rounded-2xl shadow-xl p-6 sm:p-10 md:p-14 space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-center">
                    Why I <span className="text-blue-400">Started</span> ReifyDB
                </h2>

                <div className="flex justify-center">
                    <div className="h-72 w-72 rounded-2xl overflow-hidden border-3 border-blue-700 shadow-md">
                        <img
                            src="/me.jpeg"
                            alt="ReifyDB Founder with my daughter"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>


                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    ReifyDB started during long nights with my newborn. While taking care of her, I had time to think —
                    mostly about how frustrating databases have been throughout my career.
                </p>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    After 15 years as a software engineer, one thing has always bothered me: databases are complicated,
                    slow, and feel like black boxes. Integration tests take seconds when they should take milliseconds.
                    Features like constraints, triggers, or functions exist — but most teams avoid them because they’re
                    hard to test or keep in sync with the app code.
                </p>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    I wanted something better. <strong>You deserve something better.</strong> So I started building ReifyDB.
                </p>

                <p className="text-gray-400 font-semibold text-base sm:text-lg">Here’s what it tries to fix:</p>

                <ul className="list-disc list-inside text-gray-300 space-y-2 pl-1 text-sm sm:text-base">
                    <li><strong>Designed for embedding</strong> — run ReifyDB anywhere your app runs.</li>
                    <li><strong>Boots in milliseconds</strong> — start fast, stay fast, no warm-up required.</li>
                    <li><strong>One tx per request</strong> — every API call is atomic, no partial state, no race conditions.</li>
                    <li><strong>Zero-config testing</strong> — spin up real environment, no mocks or containers.</li>
                    <li><strong>Code runs in the DB</strong> — execute logic right where the data lives.</li>
                    <li><strong>App user = DB user</strong> — no injection risk, frontend talks to the database directly.</li>
                    <li><strong>RQL is imperative</strong> — write queries like code, stay in control.</li>
                </ul>

                <p className="text-gray-300 font-semibold text-base sm:text-lg">
                    ReifyDB isn’t trying to replace Postgres or be a general-purpose solution for everyone. It’s for developers
                    who want something that works, makes sense, and doesn’t waste time.
                </p>
            </div>
        </section>
    );
}