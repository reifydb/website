import {GithubButton} from "@components/github.tsx";
import {CallButton} from "@components/call.tsx";

export function Hero() {
    return (
        <section className="relative px-4 py-28 md:py-36 text-center text-white overflow-hidden">
            <div className="mb-4 flex justify-center gap-2 flex-wrap">
                <span className="bg-orange-700 text-xs font-medium text-white px-3 py-1 rounded-full">
                   Open Source
                </span>
                <span className="bg-green-800 text-xs font-medium text-white px-3 py-1 rounded-full">
                  Rust
                </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
                Unified <span className="text-blue-400">Columnar</span>-Relational Database<br/>
                for <span className="text-blue-400">Realtime Data Apps</span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-base md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ReifyDB is blazing fast, embeddable, and built
                for modern data pipelines.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <GithubButton/>
                <CallButton/>
            </div>
        </section>
    );
}
