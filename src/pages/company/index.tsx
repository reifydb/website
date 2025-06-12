import React from "react";
import {Navbar} from "@components/navbar.tsx";
import {Footer} from "@components/footer.tsx";
import {MissionStatement} from "@pages/company/components/mission.tsx";
import {CoreValues} from "@pages/company/components/values.tsx";
import {OriginStory} from "@pages/company/components/origin.tsx";

export const CompanyPage: React.FC = React.memo(() => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0b0c10] text-white">
            <Navbar/>
            <main className="min-h-screen bg-[#0b0c10] text-white font-sans">
                <MissionStatement/>
                <CoreValues/>
                <OriginStory/>
            </main>
            <Footer/>
        </div>
    );
});