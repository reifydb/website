import React from "react";
import {Hero} from "@pages/home/components/hero.tsx";
import {Features} from "@pages/home/components/features.tsx";
import {CallToAction} from "@pages/home/components/cta.tsx";
import {Navbar} from "@components/navbar.tsx";
import {Footer} from "@components/footer.tsx";
import {Description} from "@pages/home/components/description.tsx";
import {DemoSection} from "@pages/home/components/demo.tsx";

export const HomePage: React.FC = React.memo(() => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0b0c10] text-white">
            <Navbar/>
            <main className="pb-12 min-h-screen text-white font-sans">
                <Hero/>
                <Description/>
                <DemoSection/>
                <Features/>
                <CallToAction/>
            </main>
            <Footer/>
        </div>
    );
});