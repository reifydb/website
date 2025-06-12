import { Card, CardContent } from "@components/ui/card";

export function Features() {
    return (
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16">
            {[
                { title: "Fast & Lightweight", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
                { title: "Real-Time Views", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
                { title: "Powerful Querying", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." }
            ].map(({ title, text }, i) => (
                <Card key={i} className="bg-[#0b0c10] border-none">
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-2">{title}</h2>
                        <p className="text-gray-400">{text}</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}