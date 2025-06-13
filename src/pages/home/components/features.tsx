import { CheckCircle2, Clock4 } from "lucide-react";

type Feature = {
    label: string;
    status: "shipped" | "planned";
};

const features: Feature[] = [
    { label: "In memory storage engine", status: "shipped" },
    { label: "LMDB storage engine", status: "planned" },
    { label: "Sqlite storage engine", status: "planned" },
    { label: "Delayed storage engine", status: "planned" },
    { label: "Atomic transactions (MVCC)", status: "shipped" },
    { label: "RQL imperative query language", status: "shipped" },
    { label: "Command line interface", status: "planned" },
    { label: "User-defined functions", status: "planned" },
    { label: "Schema versioning", status: "planned" },
    { label: "Migration framework", status: "planned" },
    { label: "Backup/Restore", status: "planned" },
    { label: "Time travel queries", status: "planned" },
    { label: "Webassembly support", status: "planned" },
    { label: "Dockerized server", status: "planned" },
    { label: "Rust sdk", status: "planned" },
    { label: "Python sdk", status: "planned" },
    { label: "Typescript sdk", status: "planned" },
    { label: "Replication", status: "planned" },
];

export function Features() {
    return (
        <section>
            <div className="max-w-6xl mx-auto bg-[#0e0f14] border border-gray-800 rounded-2xl p-10 md:p-14 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-300">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                            {feature.status === "shipped" ? (
                                <CheckCircle2 className="text-green-500 mt-[2px]" size={16} />
                            ) : (
                                <Clock4 className="text-gray-500 mt-[2px]" size={16} />
                            )}
                            <span className={feature.status === "planned" ? "text-gray-500 italic" : ""}>
                {feature.label}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
