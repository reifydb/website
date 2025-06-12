import React from "react";
import {Hero} from "@pages/home/components/hero.tsx";
import {HowItWorks} from "@pages/home/components/how-it-works.tsx";
import {Features} from "@pages/home/components/features.tsx";
import {CallToAction} from "@pages/home/components/cta.tsx";
import {Navbar} from "@components/navbar.tsx";
import {UseCases} from "@pages/home/components/use-cases.tsx";
import {CloudService} from "@pages/home/components/cloud-service.tsx";
import {Footer} from "@components/footer.tsx";

export const HomePage: React.FC = React.memo(() => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0b0c10] text-white">
            <Navbar/>
            <main className="min-h-screen bg-[#0b0c10] text-white font-sans">
                <Hero/>
                <Features/>
                <HowItWorks/>
                <CallToAction/>
                <UseCases/>
                <CloudService/>
            </main>
            <Footer/>
        </div>
    );
});