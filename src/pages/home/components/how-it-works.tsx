export function HowItWorks() {
    return (
        <section className="px-6 py-20 bg-[#0b0c10] text-center">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                ante dapibus diam.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {step: "1", label: "Connect Data"},
                    {step: "2", label: "Define Views"},
                    {step: "3", label: "Query in Real-Time"}
                ].map(({step, label}) => (
                    <div key={step} className="border border-gray-700 p-6 rounded-xl">
                        <div className="text-blue-500 text-5xl font-bold mb-2">{step}</div>
                        <h3 className="text-xl font-semibold text-white">{label}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
