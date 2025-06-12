export function Hero() {
    return (
        <section className="relative px-4 py-28  text-center text-white overflow-hidden">
            <div className="mb-4 flex justify-center gap-2 flex-wrap">
                <span className="bg-blue-900 text-xs font-medium text-white px-3 py-1 rounded-full">
                   In development
                </span>
                <span className="bg-blue-700 text-xs font-medium text-white px-3 py-1 rounded-full">
                   Open Source
                </span>
                <span className="bg-blue-500 text-xs font-medium text-white px-3 py-1 rounded-full">
                  Rust
                </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
                Relational Database<br/>
                To <span className="text-blue-400">Get Things Done</span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-base md:text-lg">
                Designed for those who care more about building than configuring.
            </p>

        </section>
    );
}
