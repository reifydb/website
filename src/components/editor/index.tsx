import { useState } from "react";
import { Maximize2, X } from "lucide-react";

export function CodeEditor() {
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <>
            {/* Editor container */}
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-800 bg-[#0e0f14] shadow-xl">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
                    <span className="font-mono">RQL</span>
                    <button onClick={() => setFullscreen(true)} className="hover:text-white">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>

                <pre className="p-4 text-sm text-gray-100 overflow-x-auto font-mono leading-relaxed whitespace-pre">
{`
from tasks
join users on tasks.assigned_to = users.id
filter tasks.status = "open" and tasks.due_date < today()
select 
  user: users.name,
  overdue_tasks: count(tasks.id)
`}
        </pre>
            </div>

            {/* Fullscreen Modal */}
            {fullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl h-full border border-gray-700 rounded-lg bg-[#0e0f14] shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
                            <span className="font-mono">RQL</span>
                            <button onClick={() => setFullscreen(false)} className="hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <pre className="p-6 text-sm text-gray-100 overflow-auto font-mono h-full leading-relaxed whitespace-pre-wrap">
{`from tasks
join users on tasks.assigned_to = users.id
filter tasks.status = "open" and tasks.due_date < today()
select 
  user: users.name,
  overdue_tasks: count(tasks.id)`}
            </pre>
                    </div>
                </div>
            )}
        </>
    );
}
