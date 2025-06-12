import {GitHub} from "@components/image.tsx";
import {GithubButton} from "@components/github.tsx";

export function Hero() {
    return (
        <section
            className="relative px-4 py-28 md:py-36 bg-[#0b0c10] text-center text-white overflow-hidden"
            style={{
                backgroundImage: "url('/your-background-network.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Optional CTA badges */}
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
                <a
                    href="#"
                    className="bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition"
                >
                    Book a Call
                </a>
            </div>
        </section>
    );
}
