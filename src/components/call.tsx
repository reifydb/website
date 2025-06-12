import React from "react";
import {Calendar} from "lucide-react";

export function CallButton({className = ""}: { className?: string }) {
    return (
        <a
            href="https://cal.com/reifydb/30min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded hover:opacity-90 transition ${className}`}
        >
            <Calendar className={"w-4 h-4"}/>
            Book a call
        </a>
    );
}