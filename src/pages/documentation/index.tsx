import {Footer} from "@components/footer.tsx";
import {Navbar} from "@components/navbar.tsx";

export default function DocumentationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0b0c10] text-white">
            <Navbar/>
            <main className="relative flex-1 px-6 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">📚 Documentation</h1>
                    <p className="text-gray-400 text-lg mb-10">Nothing to see, yet.</p>

                    <div className="bg-[#111217] p-6 rounded-xl border border-gray-800 max-w-2xl mx-auto">
                        <p className="text-gray-300 text-base">
                            In the meantime, feel free to explore the{" "}
                            <a
                                href="https://github.com/reifydb/reifydb"
                                className="text-blue-400 underline hover:text-blue-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub repository
                            </a>{" "}
                            or reach out with questions.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
